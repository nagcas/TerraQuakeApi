import { verifyToken } from '../utils/handleJwt.js'
import handleHttpError from '../utils/handleHttpError.js'
import User from '../models/userModels.js'

/**
 * Admin authentication middleware
 *
 * Enhanced security implementation:
 * - Validates JWT token on every request
 * - Checks token expiration and blacklist status
 * - Verifies user exists and still has admin role in database
 * - Protects against token replay and session hijacking
 */
export const adminMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header: "Bearer <token>"
    const token = req.get('Authorization')?.split(' ')[1]

    if (!token) {
      return handleHttpError(res, 'Authorization token missing. Admin access denied.', 401)
    }

    // Verify JWT token (includes blacklist check and expiration validation)
    const decoded = await verifyToken(token)
    if (!decoded) {
      return handleHttpError(res, 'Invalid, expired, or revoked token. Please log in again.', 401)
    }

    // Check if the decoded token contains the admin role
    if (!decoded.role || !decoded.role.includes('admin')) {
      return handleHttpError(res, 'Access denied. Admin privileges required.', 403)
    }

    // CRITICAL: Fetch user from DB to verify current role and account status
    // This prevents using old tokens if admin privileges were revoked
    const user = await User.findById(decoded._id).select('-password')

    if (!user) {
      return handleHttpError(res, 'User account not found or has been deleted.', 404)
    }

    // Verify user still has admin role in the database
    if (!user.role || !user.role.includes('admin')) {
      return handleHttpError(res, 'Admin privileges have been revoked. Access denied.', 403)
    }

    // Attach full user object and token to request for further use
    req.user = user
    req.token = token
    req.tokenDecoded = decoded

    next()
  } catch (error) {
    console.error('Admin authentication error:', error)

    if (error.name === 'JsonWebTokenError') {
      return handleHttpError(res, 'Malformed or invalid token', 401)
    }

    if (error.name === 'TokenExpiredError') {
      return handleHttpError(res, 'Token has expired. Please log in again.', 401)
    }

    handleHttpError(res, 'Internal server error during authentication', 500)
  }
}

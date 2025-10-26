import { verifyToken } from '../utils/handleJwt.js'
import handleHttpError from '../utils/handleHttpError.js'
import User from '../models/userModels.js'

/**
 * JWT Authentication Middleware
 *
 * Verifies JWT token from Authorization header and attaches decoded user to req.user
 * Use this for routes that require authentication but not admin privileges
 */
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.get('Authorization')?.split(' ')[1]

    if (!token) {
      return handleHttpError(res, 'Authorization token missing', 401)
    }

    // Verify JWT token (includes blacklist check and expiration validation)
    const decoded = await verifyToken(token)
    if (!decoded) {
      return handleHttpError(
        res,
        'Invalid, expired, or revoked token. Please log in again.',
        401
      )
    }

    // Fetch user from DB to verify account exists and is active
    const user = await User.findById(decoded._id).select('-password')

    if (!user) {
      return handleHttpError(
        res,
        'User account not found or has been deleted.',
        404
      )
    }

    // Attach user object and token to request
    req.user = user
    req.token = token
    req.tokenDecoded = decoded

    next()
  } catch (error) {
    console.error('Authentication error:', error)

    if (error.name === 'JsonWebTokenError') {
      return handleHttpError(res, 'Malformed or invalid token', 401)
    }

    if (error.name === 'TokenExpiredError') {
      return handleHttpError(
        res,
        'Token has expired. Please log in again.',
        401
      )
    }

    handleHttpError(res, 'Internal server error during authentication', 500)
  }
}

/**
 * Admin Role Check Middleware
 *
 * Checks if the authenticated user has admin role
 * Must be used after authMiddleware
 */
export const requireAdmin = async (req, res, next) => {
  try {
    // Ensure user is authenticated first
    if (!req.user) {
      return handleHttpError(res, 'Authentication required', 401)
    }

    // Check if user has admin role
    if (!req.user.role || !req.user.role.includes('admin')) {
      return handleHttpError(
        res,
        'Access denied. Admin privileges required.',
        403
      )
    }

    next()
  } catch (error) {
    console.error('Admin role check error:', error)
    handleHttpError(res, 'Internal server error during role verification', 500)
  }
}

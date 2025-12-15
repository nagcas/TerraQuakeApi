import { verifyToken } from '../utils/handleJwt.js'
import handleHttpError from '../utils/handleHttpError.js'
import User from '../models/userModels.js'

/**
 * Regular authentication middleware
 *
 * Validates JWT token for any authenticated user (not just admin)
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
      return handleHttpError(res, 'Invalid, expired, or revoked token. Please log in again.', 401)
    }

    // Fetch user from DB to verify account exists and is active
    const user = await User.findById(decoded._id).select('-password')

    if (!user) {
      return handleHttpError(res, 'User account not found or has been deleted.', 404)
    }

    // Attach user object and token to request
    req.user = user
    req.token = token
    req.tokenDecoded = decoded

    next()
  } catch (error) {
    // Log error to the server console
    console.error('Authentication error:', error)

    if (error.name === 'JsonWebTokenError') {
      return handleHttpError(res, 'Malformed or invalid token', 401)
    }

    if (error.name === 'TokenExpiredError') {
      return handleHttpError(res, 'Token has expired. Please log in again.', 401)
    }

    handleHttpError(res, 'Internal server error during authentication', 500)
  }
}

/**
 * Alias for authMiddleware (for backward compatibility)
 * Use this name if you prefer the old naming convention
 */
export const authenticateUser = authMiddleware

/**
 * Admin authentication middleware (legacy - use adminMiddleware from adminMiddlewares.js)
 *
 * @deprecated Use adminMiddleware from adminMiddlewares.js instead
 */
export const validateAdminToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      })
    }

    const decoded = await verifyToken(token)

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid, expired, or revoked token.'
      })
    }

    // Check if user is admin
    if (!decoded.role || !decoded.role.includes('admin')) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      })
    }

    // Verify user still exists and has admin role
    const user = await User.findById(decoded._id).select('-password')
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      })
    }

    if (!user.role || !user.role.includes('admin')) {
      return res.status(403).json({
        success: false,
        message: 'Admin privileges have been revoked.'
      })
    }

    req.user = user
    req.token = token
    next()
  } catch (error) {
    // Log error to the server console
    console.error('Admin token validation error:', error.message)
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.'
    })
  }
}

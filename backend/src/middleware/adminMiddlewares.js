import { verifyToken } from '../utils/handleJwt.js'
import handleHttpError from '../utils/handleHttpError.js'
import User from '../models/userModels.js'

/**
 * Admin authentication middleware
 *
 * Checks for JWT token, verifies it,
 * ensures the user exists in the DB, and checks the admin role.
 */
export const adminMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header: "Bearer <token>"
    const token = req.get('Authorization')?.split(' ')[1]

    if (!token) {
      return handleHttpError(res, 'Authorization token missing', 401)
    }

    // Verify JWT token
    const decoded = await verifyToken(token)
    if (!decoded) {
      return handleHttpError(res, 'Invalid or expired token', 401)
    }

    // Check if the decoded token contains the admin role
    if (!decoded.role || !decoded.role.includes('admin')) {
      return handleHttpError(res, 'Unauthorized access', 401)
    }

    // Optionally fetch user from DB
    const user = await User.findById(decoded._id).select('-password')
    if (!user) {
      return handleHttpError(res, 'User not found', 404)
    }

    // Attach user to request object
    req.user = user

    next()
  } catch (error) {
    console.error('Admin authentication error:', error)

    if (error.name === 'JsonWebTokenError') {
      return handleHttpError(res, 'Invalid token', 401)
    }

    handleHttpError(res, 'Internal server error during authentication', 500)
  }
}

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

// Secret key for JWT signing
const JWT_SECRET = process.env.JWT_SECRET

// In-memory token blacklist (for production, use Redis or database)
const tokenBlacklist = new Set()

/**
 * Generate a JWT token for a given user.
 * The token includes the user's main public data
 * and expires in 24 hours.
 * Also includes a unique token ID (jti) for session tracking.
 */
export const tokenSign = async (user) => {
  const tokenId = `${user._id}_${Date.now()}_${Math.random().toString(36).substring(7)}`

  const sign = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      jti: tokenId, // JWT ID for tracking and invalidation
      iat: Math.floor(Date.now() / 1000) // Issued at timestamp
    },
    JWT_SECRET,
    {
      expiresIn: '24h'
    }
  )

  return sign
}

/**
 * Verify a JWT token and return the decoded payload.
 * Returns null if token is invalid, expired, or blacklisted.
 */
export const verifyToken = async (tokenJwt) => {
  try {
    const decoded = jwt.verify(tokenJwt, JWT_SECRET)

    // Check if token is blacklisted (logged out)
    if (tokenBlacklist.has(decoded.jti)) {
      return null
    }

    return decoded
  } catch (error) {
    return null
  }
}

/**
 * Invalidate a token by adding it to the blacklist.
 * Used for logout functionality.
 */
export const invalidateToken = async (tokenJwt) => {
  try {
    const decoded = jwt.decode(tokenJwt)

    if (decoded && decoded.jti) {
      tokenBlacklist.add(decoded.jti)

      // Clean up expired tokens from blacklist after token expiry
      // Calculate time until token expires
      const expiryTime = (decoded.exp - Math.floor(Date.now() / 1000)) * 1000
      if (expiryTime > 0) {
        setTimeout(() => {
          tokenBlacklist.delete(decoded.jti)
        }, expiryTime)
      }

      return true
    }
    return false
  } catch (error) {
    return false
  }
}

/**
 * Check if a token is blacklisted
 */
export const isTokenBlacklisted = (tokenJwt) => {
  try {
    const decoded = jwt.decode(tokenJwt)
    return decoded && decoded.jti ? tokenBlacklist.has(decoded.jti) : false
  } catch (error) {
    return false
  }
}

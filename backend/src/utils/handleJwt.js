import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

// Secret key for JWT signing
const JWT_SECRET = process.env.JWT_SECRET

/**
 * Generate a JWT token for a given user.
 * The token includes the user's main public data
 * and expires in 24 hours.
 */
export const tokenSign = async (user) => {
  const sign = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role
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
 * Returns null if token is invalid or expired.
 */
export const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET)
  } catch (error) {
    return null
  }
}

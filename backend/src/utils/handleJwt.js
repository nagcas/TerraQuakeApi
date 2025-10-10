import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

// NOTE: Secret key for JWT signing, loaded from environment variables
const JWT_SECRET = process.env.JWT_SECRET

// NOTE: Function to generate a JWT token for a given user
// The token includes the user's ID and role, and expires in 24 hours.
export const tokenSign = async (user) => {
  const sign = jwt.sign(
    {
      _id: user._id,
      role: user.role
    },
    JWT_SECRET,
    {
      expiresIn: '24h' // Token validity duration
    }
  )

  return sign
}

// NOTE: Function to verify a JWT token
// Returns the decoded token payload if valid, otherwise returns null.
export const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET)
  } catch (error) {
    // NOTE: Token is invalid or expired
    return null
  }
}

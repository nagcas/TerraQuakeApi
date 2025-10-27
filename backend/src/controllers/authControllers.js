import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

dotenv.config()

/**
 * NOTE: Controller: Register a new user.
 */
export const signUp = ({
  User,
  buildResponse,
  handleHttpError,
  matchedData,
  sendEmailRegister
}) => {
  return async (req, res) => {
    try {
      // Extract validated data from request
      const data = matchedData(req)

      // Check if a user already exists, including soft-deleted ones
      const existingUser = await User.findOneWithDeleted({ email: data.email })

      if (existingUser) {
        if (existingUser.deleted) {
          // Restore soft-deleted account and update with new data
          existingUser.deleted = false
          existingUser.deletedAt = null
          existingUser.name = data.name
          existingUser.password = data.password // hashed in pre-save hook
          existingUser.role = data.role || 'user'
          existingUser.experience = data.experience || ''
          existingUser.student = data.student || 'No'
          existingUser.bio = data.bio || ''
          existingUser.location = data.location || ''
          existingUser.website = data.website || ''
          existingUser.portfolio = data.portfolio || ''
          existingUser.github = data.github || ''
          existingUser.linkedin = data.linkedin || ''
          existingUser.terms = data.terms || false

          const restoredUser = await existingUser.save()

          const user = restoredUser.toObject()
          delete user.password // Remove sensitive data

          // Send registration confirmation email
          await sendEmailRegister(user)

          return res
            .status(200)
            .json(
              buildResponse(
                req,
                'Registration successful',
                user,
                null,
                {}
              )
            )
        }

        // If user exists and is active, return conflict error
        return handleHttpError(
          res,
          'User with this email already exists!',
          409
        )
      }

      // Create a new user
      const newUser = new User(data)
      const savedUser = await newUser.save()
      const user = savedUser.toObject()
      delete user.password // Remove sensitive data

      // Send registration confirmation email
      await sendEmailRegister(user)

      return res
        .status(201)
        .json(buildResponse(req, 'Registration successful', user, null, {}))
    } catch (error) {
      console.error('Signup error:', error)

      if (error.code === 11000) {
        return handleHttpError(
          res,
          'User with this email already exists!',
          409
        )
      }
      return handleHttpError(res, 'Internal server error', 500)
    }
  }
}

/**
 * NOTE: Controller: Authenticate user (login).
 */
export const signIn = ({
  User,
  buildResponse,
  handleHttpError,
  tokenSign,
  matchedData,
  compare
}) => {
  return async (req, res) => {
    try {
      // Sanitize and validate request data
      req.body = matchedData(req)

      // Find user by email
      const user = await User.findOne({ email: req.body.email })
        .select('password name email role experience student bio location website portfolio github linkedin githubId googleId')
        .lean()

      if (!user) {
        return handleHttpError(
          res,
          'User not found. Please register first.',
          404
        )
      }

      // Check if user registered via Google or GitHub
      if (!user.password) {
        const provider = user.githubId ? 'GitHub' : user.googleId ? 'Google' : 'an external provider'
        return handleHttpError(
          res,
          `This email is already registered via ${provider}. Please sign in with ${provider}.`,
          400
        )
      }

      // Compare provided password with hashed one
      const isPasswordValid = await compare(req.body.password, user.password)
      if (!isPasswordValid) {
        return handleHttpError(res, 'Incorrect password.', 401)
      }

      // Remove password before returning user data
      delete user.password

      // Send success response with JWT token
      return res.status(200).json(
        buildResponse(req, 'Logged in successfully!', user, null, {
          token: await tokenSign(user)
        })
      )
    } catch (error) {
      console.error(error.message)
      handleHttpError(res, 'An internal server error occurred.', 500)
    }
  }
}

/**
 * NOTE: Controller: Forgot password (send reset link).
 */
export const forgotPassword = ({
  User,
  buildResponse,
  matchedData,
  handleHttpError,
  sendForgotPassword
}) => {
  return async (req, res) => {
    try {
      req.body = matchedData(req)

      const user = await User.findOne({ email: req.body.email })
        .select('email name')
        .lean()
      if (!user) return handleHttpError(res, 'User not found.', 404)

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '15m'
      })

      await sendForgotPassword(user, token)

      return res
        .status(200)
        .json(
          buildResponse(
            req,
            'Password reset instructions sent to your email.',
            user,
            null,
            {}
          )
        )
    } catch (error) {
      console.error(error.message)
      handleHttpError(res, 'Error processing request.', 400)
    }
  }
}

/**
 * NOTE: Controller: Reset password.
 */
export const resetPassword = ({ User, handleHttpError, buildResponse }) => {
  return async (req, res) => {
    try {
      const { token } = req.params
      const { password1, password2 } = req.body

      if (password1 !== password2) {
        return handleHttpError(res, 'Passwords must match', 400)
      }

      let decoded
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
      } catch (err) {
        return err.name === 'TokenExpiredError'
          ? handleHttpError(
            res,
            'Reset link expired. Please request a new one.',
            401
          )
          : handleHttpError(res, 'Invalid or missing token', 400)
      }

      const user = await User.findById(decoded.id).select('+password')
      if (!user) return handleHttpError(res, 'User not found', 404)

      const isSame = await bcrypt.compare(password1, user.password)
      if (isSame) {
        return handleHttpError(
          res,
          'New password cannot be the same as the old one!',
          409
        )
      }

      user.password = password1
      await user.save()

      const userResponse = user.toObject()
      delete userResponse.password

      return res
        .status(200)
        .json(
          buildResponse(
            req,
            'Password successfully reset!',
            userResponse,
            null,
            {}
          )
        )
    } catch (error) {
      console.error(error.message)
      handleHttpError(res, 'Error resetting password', 500)
    }
  }
}

/**
 * NOTE: Controller: Change password (logged-in user).
 */
export const changePassword = ({ User, handleHttpError, buildResponse, sendChangePassword }) => {
  return async (req, res) => {
    try {
      const { passwordOld, passwordNew, confirmPassword } = req.body

      if (!passwordOld || !passwordNew || !confirmPassword) {
        return handleHttpError(res, 'All password fields are required', 400)
      }

      if (passwordNew !== confirmPassword) {
        return handleHttpError(res, 'Passwords must match', 400)
      }

      const userId = req.user._id || req.user.id
      const user = await User.findById(userId).select('+password')
      if (!user) return handleHttpError(res, 'User not found', 404)

      const isMatch = await bcrypt.compare(passwordOld, user.password)
      if (!isMatch) {
        return handleHttpError(res, 'Current password is incorrect', 400)
      }

      const isSame = await bcrypt.compare(passwordNew, user.password)
      if (isSame) {
        return handleHttpError(
          res,
          'New password cannot be the same as the old one!',
          409
        )
      }

      user.password = passwordNew
      await user.save()

      const userResponse = user.toObject()
      delete userResponse.password

      // Send change password confirmation email
      await sendChangePassword(user)

      return res
        .status(200)
        .json(
          buildResponse(
            req,
            'Password successfully changed!',
            userResponse,
            null,
            {}
          )
        )
    } catch (error) {
      console.error(error)
      handleHttpError(
        res,
        'Error changing password, please try again later',
        500
      )
    }
  }
}

/**
 * NOTE: Controller: Logout user
 * ---------------------------------
 * Invalidates the user's current JWT token by adding it to the blacklist.
 * This provides session expiration and prevents token reuse after logout.
 */
export const logout = ({ buildResponse, handleHttpError, invalidateToken }) => {
  return async (req, res) => {
    try {
      // Retrieve token from Authorization header
      const authHeader = req.headers.authorization

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return handleHttpError(res, 'No token provided', 400)
      }

      const token = authHeader.split(' ')[1]

      // Invalidate the token (add it to blacklist)
      const success = await invalidateToken(token)

      if (!success) {
        return handleHttpError(res, 'Failed to logout. Invalid token.', 400)
      }

      return res.status(200).json(
        buildResponse(
          req,
          'Logout successful. Your session has been terminated.',
          null,
          null,
          {}
        )
      )
    } catch (error) {
      console.error('Logout error:', error)
      return handleHttpError(res, 'Error during logout', 500)
    }
  }
}

/**
 * NOTE: Controller: Google OAuth Callback
 * ---------------------------------
 * This controller is triggered after Google authentication succeeds.
 * It receives `req.user` populated by Passport with the authenticated user
 * and a signed JWT token. Then, it redirects the user to the frontend app
 * with the token and user data as query parameters.
 */

export const googleAuthCallback = ({ buildResponse, handleHttpError }) => (req, res) => {
  try {
    const { user, token } = req.user || {}

    if (!user || !token) {
      return res.status(400).send('Invalid authentication data from Google.')
    }

    // Get the frontend URL from environment variables
    const FRONTEND_REDIRECT_URL =
      process.env.FRONTEND_PRODUCTION || process.env.FRONTEND_DEVELOPMENT

    if (!FRONTEND_REDIRECT_URL) {
      // If the environment variable is missing, respond with an error
      return res.status(500).send('Frontend redirect URL not configured.')
    }

    // Construct the frontend redirect URL
    const successUrl = new URL(FRONTEND_REDIRECT_URL)

    // The frontend route that will handle the OAuth data
    successUrl.pathname = '/login-success'

    // Append all necessary query parameters
    successUrl.searchParams.append('token', token)
    successUrl.searchParams.append('user_id', user._id.toString() || '')
    successUrl.searchParams.append('googleId', user.googleId.toString() || '')
    successUrl.searchParams.append('name', user.name || '')
    successUrl.searchParams.append('email', user.email || '')
    successUrl.searchParams.append('avatar', user.avatar || '')
    successUrl.searchParams.append('role', user.role || 'user')
    successUrl.searchParams.append('experience', user.experience || '')
    successUrl.searchParams.append('student', user.student || 'No')
    successUrl.searchParams.append('bio', user.bio || '')
    successUrl.searchParams.append('location', user.location || '')
    successUrl.searchParams.append('website', user.website || '')
    successUrl.searchParams.append('portfolio', user.portfolio || '')
    successUrl.searchParams.append('github', user.github || '')
    successUrl.searchParams.append('linkedin', user.linkedin || '')

    // Redirect the user to the frontend with all data attached
    return res.redirect(successUrl.toString())
  } catch (error) {
    // Handle unexpected errors gracefully
    console.error('Error in Google callback:', error)
    const failureUrl = process.env.FRONTEND_DEVELOPMENT || 'http://localhost:5173'
    res.redirect(`${failureUrl}/signin?error=google_auth_failed`)
  }
}

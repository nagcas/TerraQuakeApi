import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

dotenv.config()

/**
 * Controller: Register a new user.
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
          existingUser.student = data.student || false
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
 * Controller: Authenticate user (login).
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
      req.body = matchedData(req)

      const user = await User.findOne({ email: req.body.email })
        .select('password name email role')
        .lean()

      if (!user) {
        return handleHttpError(
          res,
          'User not found. Please register first.',
          404
        )
      }

      const isPasswordValid = await compare(req.body.password, user.password)
      if (!isPasswordValid) {
        return handleHttpError(res, 'Incorrect password.', 401)
      }

      delete user.password

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
 * Controller: Forgot password (send reset link).
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
 * Controller: Reset password.
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
 * Controller: Change password (logged-in user).
 */
export const changePassword = ({ User, handleHttpError, buildResponse }) => {
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

export const googleAuthCallback = ({ buildResponse, handleHttpError }) => (req, res) => {
  try {
    const { user, token } = req.user

    // Get the frontend URL from environment variables
    const FRONTEND_REDIRECT_URL = process.env.FRONTEND_PRODUCTION || process.env.FRONTEND_DEVELOPMENT;

    if (!FRONTEND_REDIRECT_URL) {
        // Fallback or error handling if environment variable is missing
        return res.status(500).send('Frontend redirect URL not configured.');
    }

    // 1. Construct the successful redirect URL with the JWT as a query parameter
    // The frontend must have a route/component that reads this token.
    const successUrl = new URL(FRONTEND_REDIRECT_URL);
    successUrl.pathname = '/login-success'; // Adjust this path to your client's success route
    successUrl.searchParams.append('token', token);
    successUrl.searchParams.append('user_id', user._id.toString());
    
    // 2. Perform the redirect, handing control back to the client application
    return res.redirect(successUrl.toString());
  } catch (error) {
    console.error('Error in Google callback:', error)
    const failureUrl = process.env.FRONTEND_DEVELOPMENT || 'http://localhost:5173';
    res.redirect(`${failureUrl}/login-failure?error=google_auth_failed`)
  }
}

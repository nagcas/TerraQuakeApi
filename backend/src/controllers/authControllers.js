import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

dotenv.config()

/**
 * Controller: Register a new user.
 *
 * - Creates a new user document in the database.
 * - Returns the newly created user data without the password.
 * - Responds with `400 Bad Request` if validation fails or user already exists.
 * - Sends a mail to user on registration
 */
export const signUp = ({ User, buildResponse, handleHttpError, matchedData, sendEmailRegister }) => {
  return async (req, res) => {
    try {
      const data = matchedData(req)

      // Check if the email is already registered before creating a new user
      const existingUser = await User.findOne({ email: data.email })
      if (existingUser) {
        return handleHttpError(res, 'User with this email already exists !', 409)
      }

      // Create a new user
      const newUser = new User(data)
      const savedUser = await newUser.save()
      const user = savedUser.toObject()

      // Remove password from the user object before sending response
      delete user.password

      await sendEmailRegister(user)

      // Return success response
      return res
        .status(201)
        .json(buildResponse(req, 'Registration successful', user, null, {}))
    } catch (error) {
      console.error('Signup error:', error)

      // Handle duplicate key error from MongoDB
      if (error.code === 11000) {
        return handleHttpError(res, 'User with this email already exists !', 409)
      }

      // Fallback for unexpected errors
      return handleHttpError(res, 'Internal server error', 500)
    }
  }
}


/**
 * Controller: Authenticate user (sign in).
 *
 * - Looks up the user by email in the database.
 * - Responds with `404 Not Found` if no user exists with the given email.
 * - Compares the provided password with the stored hashed password.
 * - Responds with `401 Unauthorized` if the password is incorrect.
 * - Removes password field from the user object before returning.
 * - Generates a signed authentication token and includes it in the response.
 * - Responds with `200 OK` and user data + token on successful login.
 * - Responds with `500 Internal Server Error` if an unexpected error occurs.
 */
export const signIn = ({ User, buildResponse, handleHttpError, tokenSign, matchedData, compare }) => {
  return async (req, res) => {
    try {
      req.body = matchedData(req)

      const user = await User.findOne({ email: req.body.email }).select('password name email role').lean()
      if (!user) {
        handleHttpError(res, 'User not found. Please check the email address or register to create an account', 404)
        return
      }

      const check = await compare(req.body.password, user.password)
      if (!check) {
        handleHttpError(res, 'Incorrect password. Please check and try again, or use the password recovery feature', 401)
        return
      }
      delete user.password

      res.status(200).json(buildResponse(req, 'Logged in successfully!', user, null, {
        token: await tokenSign(user)
      }))
    } catch (error) {
      console.error(error.message)
      handleHttpError(res, 'An internal server error occurred. Please try again later or contact support if the problem persists')
    }
  }
}

// NOTE: Funzione per il recupero della password
export const forgotPassword = ({ User, buildResponse, matchedData, handleHttpError, sendForgotPassword }) => {
  return async (req, res) => {
    try {
      req.body = matchedData(req)

      const user = await User.findOne({ email: req.body.email }).select('email').lean()
      if (!user) {
        handleHttpError(res, 'User not found. Please check the email address or register to create an account', 404)
        return
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '15m'
      })

      await sendForgotPassword(user, token)

      res.status(200).json(buildResponse(req, 'We’ve sent you an email with instructions to reset your password', user, null, {}))
    } catch (error) {
      console.error(error.message)
      handleHttpError(res, null, 400)
    }
  }
}

/**
 * Controller: Reset user password.
 *
 * - Finds the user by email in the database.
 * - Returns 404 if the user is not found.
 * - Checks if the new password matches the old one; returns 409 if it does.
 * - Updates the user's password and saves it.
 * - Excludes the password field from the response.
 * - Returns 200 with success message on success.
 * - Returns 500 if an unexpected error occurs.
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
        if (err.name === 'TokenExpiredError') {
          return handleHttpError(res, 'Reset link expired. Please request a new one.', 401)
        }
        return handleHttpError(res, 'Invalid or missing token', 400)
      }

      const user = await User.findById(decoded.id).select('+password')
      if (!user) {
        return handleHttpError(res, 'User not found', 404)
      }

      const isSame = await bcrypt.compare(password1, user.password)
      if (isSame) {
        return handleHttpError(res, 'New password cannot be the same as the old one!', 409)
      }

      user.password = password1
      await user.save()

      const userResponseObject = user.toObject()
      delete userResponseObject.password

      res.status(200).json(buildResponse(req, 'Password successfully reset!', userResponseObject, null, {}))
    } catch (error) {
      console.error(error.message)
      handleHttpError(res, 'Error resetting password', 500)
    }
  }
}

/**
 * Controller: Change user password.
 *
 * - Retrieves the logged-in user from JWT payload (req.user.id).
 * - Validates that all password fields are present.
 * - Checks if new password and confirmation match.
 * - Verifies the current password.
 * - Ensures the new password is different from the old one.
 * - Updates the user's password and saves it.
 * - Excludes the password from the response.
 * - Returns 200 with a success message on success.
 * - Returns appropriate status codes and messages for errors.
 */
export const changePassword = ({ User, handleHttpError, buildResponse }) => {
  return async (req, res) => {
    try {
      const { passwordOld, passwordNew, confirmPassword } = req.body

      // Check that all password fields are provided
      if (!passwordOld || !passwordNew || !confirmPassword) {
        return handleHttpError(res, 'All password fields are required', 400)
      }

      // Check if new password and confirmation match
      if (passwordNew !== confirmPassword) {
        return handleHttpError(res, 'Passwords must match', 400)
      }

      // Get logged-in user from JWT payload
      const userId = req.user._id || req.user.id
      const user = await User.findById(userId).select('+password')
      if (!user) {
        return handleHttpError(res, 'User not found', 404)
      }

      // Verify current password
      const isMatch = await bcrypt.compare(passwordOld, user.password)
      if (!isMatch) {
        return handleHttpError(res, 'Current password is incorrect', 400)
      }

      // Check that new password is different from the old password
      const isSame = await bcrypt.compare(passwordNew, user.password)
      if (isSame) {
        return handleHttpError(res, 'New password cannot be the same as the old one!', 409)
      }

      // Update user's password
      user.password = passwordNew
      await user.save()

      // Remove password field from response object
      const userResponseObject = user.toObject()
      delete userResponseObject.password

      // Send success response
      res.status(200).json(
        buildResponse(req, 'Password successfully changed!', userResponseObject, null, {})
      )
    } catch (error) {
      console.error(error)
      handleHttpError(res, 'Error changing password, please try again later', 500)
    }
  }
}

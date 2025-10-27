import express from 'express'
import passport from 'passport'
import '../config/passportConfig.js'
import {
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
  changePassword,
  googleAuthCallback,
  logout,
} from '../controllers/authControllers.js'
import {
  validatorSignIn,
  validatorSignUp,
  validatorForgotPassword,
  validatorResetPassword,
  validatorChangePassword,
} from '../validators/userValidators.js'

import User from '../models/userModels.js'
import { matchedData } from 'express-validator'
import { tokenSign, invalidateToken, verifyToken } from '../utils/handleJwt.js'
import { compare } from '../utils/handlePassword.js'
import { buildResponse } from '../utils/buildResponse.js'
import handleHttpError from '../utils/handleHttpError.js'
import {
  authenticateUser,
  authMiddleware,
} from '../middleware/authMiddleware.js'
import { sendEmailRegister } from '../libs/sendEmailRegister.js'
import { sendForgotPassword } from '../libs/sendForgotPassword.js'
import { sendChangePassword } from '../libs/sendChangePassword.js'
const router = express.Router()

// NOTE: AUTH

// NOTE: register user
router.post(
  '/signup',
  validatorSignUp,
  signUp({
    User,
    buildResponse,
    handleHttpError,
    matchedData,
    sendEmailRegister,
  })
)

// NOTE: login user
router.post(
  '/signin',
  validatorSignIn,
  signIn({
    User,
    buildResponse,
    handleHttpError,
    tokenSign,
    matchedData,
    compare,
  })
)

// NOTE: forgot password
router.post(
  '/forgot-password',
  validatorForgotPassword,
  forgotPassword({
    User,
    buildResponse,
    handleHttpError,
    matchedData,
    sendForgotPassword,
  })
)

// NOTE: reset password
router.post(
  '/reset-password/:token',
  validatorResetPassword,
  resetPassword({ User, handleHttpError, buildResponse, matchedData })
)

// NOTE: change password
router.post(
  '/change-password',
  authenticateUser,
  validatorChangePassword,
  changePassword({
    User,
    handleHttpError,
    buildResponse,
    matchedData,
    sendChangePassword,
  })
)

// NOTE: logout user
// SECURED: Requires authentication - invalidates current session token
router.post(
  '/logout',
  authMiddleware,
  logout({ buildResponse, handleHttpError, invalidateToken })
)

// NOTE: get current user info
// SECURED: Returns user info if token is valid, else returns null
router.get('/me', async (req, res) => {
  try {
    const token = req.get('Authorization')?.split(' ')[1]

    if (!token) {
      return res.status(200).json({
        success: true,
        data: { user: null },
        message: 'No token provided',
      })
    }

    // Verify JWT token (includes blacklist check and expiration validation)
    const decoded = await verifyToken(token)
    if (!decoded) {
      return res.status(200).json({
        success: true,
        data: { user: null },
        message: 'Invalid or expired token',
      })
    }

    // Fetch user from DB to verify account exists and is active
    const user = await User.findById(decoded._id).select('-password')

    if (!user) {
      return res.status(200).json({
        success: true,
        data: { user: null },
        message: 'User not found',
      })
    }

    res.status(200).json({
      success: true,
      data: { user },
      message: 'User info retrieved successfully',
    })
  } catch (error) {
    console.error('Auth me error:', error)
    res.status(200).json({
      success: true,
      data: { user: null },
      message: 'Authentication error',
    })
  }
})

// NOTE: GOOGLE AUTHENTICATION ROUTES

// Step 1: Redirect user to Google for authentication
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

// Step 2: Handle Google callback after user grants permission
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/auth/failure',
  }),
  googleAuthCallback({
    buildResponse,
    handleHttpError,
  })
)

// Step 3: Optional failure route
router.get('/failure', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Google authentication failed',
  })
})

export default router

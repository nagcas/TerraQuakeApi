import express from 'express'
import passport from 'passport'
import '../config/passportConfig.js'
import {
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
  changePassword,
  googleAuthCallback
} from '../controllers/authControllers.js'
import {
  validatorSignIn,
  validatorSignUp,
  validatorForgotPassword,
  validatorResetPassword,
  validatorChangePassword
} from '../validators/userValidators.js'

import User from '../models/userModels.js'
import { matchedData } from 'express-validator'
import { tokenSign } from '../utils/handleJwt.js'
import { compare } from '../utils/handlePassword.js'
import { buildResponse } from '../utils/buildResponse.js'
import handleHttpError from '../utils/handleHttpError.js'
import { sendEmailRegister, sendForgotPassword } from '../libs/sendEmail.js'
import { authenticateUser } from '../middleware/authMiddleware.js'
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
    sendEmailRegister
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
    compare
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
    sendForgotPassword
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
  changePassword({ User, handleHttpError, buildResponse, matchedData })
)

// NOTE: GOOGLE AUTHENTICATION ROUTES

// Step 1: Redirect user to Google for authentication
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

// Step 2: Handle Google callback after user grants permission
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/failure' }),
  googleAuthCallback({
    buildResponse,
    handleHttpError
  })
)

// Step 3: Optional failure route
router.get('/failure', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Google authentication failed'
  })
})

export default router

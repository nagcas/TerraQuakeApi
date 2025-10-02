import express from 'express'
import {
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
  changePassword
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
import { sendEmailRegister, sendForgotPassword } from '../libs/mailerService.js'
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

export default router

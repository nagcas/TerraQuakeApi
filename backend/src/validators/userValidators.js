import { check } from 'express-validator'
import { validateResults } from '../utils/handleValidator.js'

export const validatorSignUp = [
  check('name')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 99 })
    .withMessage('Please enter a valid username (3–99 characters).'),

  check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage('Please enter a valid email address.'),

  check('role').notEmpty(),

  check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 8, max: 64 })
    .withMessage('Password must be between 8 and 64 characters long.')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter.')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter.')
    .matches(/\d/)
    .withMessage('Password must contain at least one number.')
    .matches(/[^A-Za-z0-9]/)
    .withMessage('Password must contain at least one special character.'),

  check('terms')
    .exists()
    .withMessage('Terms field is required.')
    .custom((value) => {
      if (value !== true && value !== 'true' && value !== 1 && value !== 'on') {
        throw new Error('You must accept the Terms and Conditions.')
      }
      return true
    }),

  (req, res, next) => validateResults(req, res, next)
]

export const validatorSignIn = [
  check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage('Please enter a valid email address.'),

  check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 8, max: 16 })
    .withMessage('Password must be between 8 and 16 characters long.'),

  (req, res, next) => validateResults(req, res, next)
]

export const validatorForgotPassword = [
  check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage('Please enter a valid email address.'),
  (req, res, next) => validateResults(req, res, next)
]

export const validatorResetPassword = [
  check('password1')
    .exists()
    .withMessage('Password is required.')
    .notEmpty()
    .withMessage('Password cannot be empty.')
    .isLength({ min: 8, max: 16 })
    .withMessage('Password must be between 8 and 16 characters long.')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter.')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter.')
    .matches(/\d/)
    .withMessage('Password must contain at least one number.')
    .matches(/[^A-Za-z0-9]/)
    .withMessage('Password must contain at least one special character.'),

  check('password2')
    .exists()
    .withMessage('Confirm password is required.')
    .custom((value, { req }) => value === req.body.password1)
    .withMessage('Passwords must match.'),

  (req, res, next) => validateResults(req, res, next)
]

export const validatorChangePassword = [
  check('passwordOld')
    .exists()
    .withMessage('Current password is required.')
    .notEmpty()
    .withMessage('Current password cannot be empty.')
    .isLength({ min: 8, max: 16 })
    .withMessage('Current password must be between 8 and 16 characters long.'),

  check('passwordNew')
    .exists()
    .withMessage('New password is required.')
    .notEmpty()
    .withMessage('New password cannot be empty.')
    .isLength({ min: 8, max: 16 })
    .withMessage('New password must be between 8 and 16 characters long.')
    .matches(/[a-z]/)
    .withMessage('New password must contain at least one lowercase letter.')
    .matches(/[A-Z]/)
    .withMessage('New password must contain at least one uppercase letter.')
    .matches(/\d/)
    .withMessage('New password must contain at least one number.')
    .matches(/[^A-Za-z0-9]/)
    .withMessage('Password must contain at least one special character.'),

  check('confirmPassword')
    .exists()
    .withMessage('Confirm password is required.')
    .custom((value, { req }) => value === req.body.passwordNew)
    .withMessage('Passwords must match.'),

  (req, res, next) => validateResults(req, res, next)
]

export const validatorGetItem = [
  check('userId').exists().notEmpty().isMongoId(),

  (req, res, next) => validateResults(req, res, next)
]

export const validatorUpdateCurrentUserData = [
  check('name')
    .optional()
    .isLength({ min: 3, max: 99 })
    .withMessage('Please enter a valid username (3 – 99 characters).'),

  check('email')
    .optional()
    .isEmail()
    .withMessage('Please enter a valid email address.'),

  check('password')
    .optional()
    .isLength({ min: 8, max: 16 })
    .withMessage('Password must be between 8 and 16 characters long.')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter.')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter.')
    .matches(/\d/)
    .withMessage('Password must contain at least one number.')
    .matches(/[^A-Za-z0-9]/)
    .withMessage('Password must contain at least one special character.'),

  (req, res, next) => validateResults(req, res, next)
]

export const validatorUpdateRoleById = [
  check('role')
    .exists()
    .isIn(['admin', 'user', 'contributor'])
    .withMessage('Role must be either admin, user, or contributor.'),

  (req, res, next) => validateResults(req, res, next)
]

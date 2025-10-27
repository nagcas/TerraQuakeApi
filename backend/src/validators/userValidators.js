import { check } from 'express-validator'
import { validateResults } from '../utils/handleValidator.js'

// NOTE: Validator for user sign-up
// Ensures all required fields exist and meet validation rules
export const validatorSignUp = [
  // Validate 'name': required, not empty, length between 3 and 99 characters
  check('name')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 99 })
    .withMessage('Please enter a valid username (3–99 characters).'),

  // Validate 'email': required, not empty, valid email format
  check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage('Please enter a valid email address.'),

  // Validate 'role': required, must be one of allowed values
  check('role')
    .exists()
    .notEmpty()
    .isIn(['user', 'admin', 'contributor'])
    .withMessage('Role must be user, admin, or contributor.'),

  // Validate 'experience': optional string, must be one of allowed values
  check('experience')
    .optional()
    .isString()
    .isIn(['Beginner', 'Intermediate', 'Expert'])
    .withMessage('Experience must be Beginner, Intermediate or Expert.'),

  // Validate 'student': optional string, must be yes/no
  check('student')
    .optional()
    .isString()
    .isIn(['Yes', 'No'])
    .withMessage('Student field must be Yes or No.'),

  // Validate 'password': required, not empty, length 8–64, must contain lowercase, uppercase, number, special char
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

  // Validate 'terms': required, must be accepted
  check('terms')
    .exists()
    .withMessage('Terms field is required.')
    .custom((value) => {
      if (value !== true && value !== 'true' && value !== 1 && value !== 'on') {
        throw new Error('You must accept the Terms and Conditions.')
      }
      return true
    }),

  // Final middleware: handle validation results
  (req, res, next) => validateResults(req, res, next),
]

// NOTE: Validator for user sign-in
// Checks required fields for login
export const validatorSignIn = [
  // Validate 'email': required, not empty, valid email
  check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage('Please enter a valid email address.'),

  // Validate 'password': required, not empty, length 8–16
  check('password')
    .exists()
    .notEmpty()
    .isLength({ min: 8, max: 16 })
    .withMessage('Password must be between 8 and 16 characters long.'),

  (req, res, next) => validateResults(req, res, next),
]

// NOTE: Validator for forgot password request
// Requires a valid email
export const validatorForgotPassword = [
  check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage('Please enter a valid email address.'),
  (req, res, next) => validateResults(req, res, next),
]

// NOTE: Validator for resetting password
// Checks both passwords and ensures they match
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

  (req, res, next) => validateResults(req, res, next),
]

// NOTE: Validator for changing password
// Requires old password and validates new password with confirmation
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

  (req, res, next) => validateResults(req, res, next),
]

// NOTE: Validator for getting a specific user item by ID
export const validatorGetItem = [
  check('userId').exists().notEmpty().isMongoId(),
  (req, res, next) => validateResults(req, res, next),
]

// NOTE: Validator for updating current user data
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

  // Validate 'experience': optional string, must be one of allowed values
  check('experience')
    .optional()
    .isString()
    .isIn(['Beginner', 'Intermediate', 'Expert'])
    .withMessage('Experience must be Beginner, Intermediate or Expert.'),

  // Validate 'student': optional string, must be yes/no
  check('student')
    .optional()
    .isString()
    .isIn(['Yes', 'No'])
    .withMessage('Student field must be Yes or No.'),

  // Validate 'bio': optional string
  check('bio')
    .optional({ checkFalsy: true })
    .isString()
    .isLength({ max: 500 })
    .withMessage('Bio must be up to 500 characters.'),

  // Validate 'location': optional string
  check('location')
    .optional({ checkFalsy: true })
    .isString()
    .isLength({ max: 100 })
    .withMessage('Location must be up to 100 characters.'),

  // Validate 'website': optional string
  check('website')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Website must be a valid URL.'),

  // Validate 'portfolio': optional string
  check('portfolio')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Portfolio must be a valid URL.'),

  // Validate 'github': optional string
  check('github')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('GitHub must be a valid URL.'),

  // Validate 'linkedin': optional string
  check('linkedin')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Linkedin must be a valid URL.'),

  (req, res, next) => validateResults(req, res, next)
]

// NOTE: Validator for updating a user's role by ID
export const validatorUpdateRoleById = [
  check('role')
    .exists()
    .isIn(['admin', 'user', 'contributor'])
    .withMessage('Role must be either admin, user, or contributor.'),

  (req, res, next) => validateResults(req, res, next),
]

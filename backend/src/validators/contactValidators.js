import { check } from 'express-validator'
import { validateResults } from '../utils/handleValidator.js'

// NOTE: Validator for contact form submissions
// Ensures all required fields exist and meet length/format requirements
export const validatorContact = [
  // Validate 'name' field: required, not empty, length between 3 and 99 characters
  check('name')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 99 })
    .withMessage('Please enter a valid first name (3–99 characters).'),

  // Validate 'lastname' field: required, not empty, length between 3 and 99 characters
  check('lastname')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 99 })
    .withMessage('Please enter a valid last name (3–99 characters).'),

  // Validate 'email' field: required, not empty, must be a valid email format
  check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage('Please enter a valid email address.'),

  // Validate 'subject' field: required, not empty
  check('subject')
    .exists()
    .notEmpty()
    .withMessage('Please enter a subject.'),

  // Validate 'message' field: required, not empty
  check('message')
    .exists()
    .notEmpty()
    .withMessage('Please enter a message.'),

  // Final middleware: handle validation results
  (req, res, next) => validateResults(req, res, next)
]

// NOTE: Validator for answers to messages or tickets
// Ensures 'answer' field exists and has at least 3 characters
export const validatorAnswer = [
  check('answer')
    .exists()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage('Please enter a valid answer (min 3 characters).'),

  // Final middleware: handle validation results
  (req, res, next) => validateResults(req, res, next)
]

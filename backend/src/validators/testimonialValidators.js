import { check } from 'express-validator'
import { validateResults } from '../utils/handleValidator.js'

// NOTE: Validator for testimonial form submissions
// Ensures all required fields exist and meet length/format requirements
export const validatorTestimonial = [
  // Validate 'name' field: required, not empty, length between 3 and 99 characters
  check('name')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 99 })
    .withMessage('Please enter a valid first name (3–99 characters).'),

  // Validate 'email' field: required, not empty, must be a valid email format
  check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage('Please enter a valid email address.'),

  // Validate 'role' field: required, not empty
  check('role')
    .exists()
    .notEmpty()
    .withMessage('Please enter a role.'),

  // Validate 'message' field: required, not empty
  check('message')
    .exists()
    .notEmpty()
    .withMessage('Please enter a message.'),

  // Final middleware: handle validation results
  (req, res, next) => validateResults(req, res, next)
]

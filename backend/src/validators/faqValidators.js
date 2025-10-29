import { check } from 'express-validator'
import { validateResults } from '../utils/handleValidator.js'

/**
 * NOTE: Validator for FAQ submissions.
 * Ensures both 'question' and 'answer' fields exist and are not empty.
 * Each field must contain valid text content before saving to the database.
 */
export const validatorFaq = [
  // Validate 'question' field: required, not empty, reasonable length (3–500 characters recommended)
  check('question')
    .exists()
    .notEmpty()
    .withMessage('Please provide a valid question.'),

  // Validate 'answer' field: required, not empty, reasonable length (3–1000 characters recommended)
  check('answer')
    .exists()
    .notEmpty()
    .withMessage('Please provide a valid answer.'),

  // Final middleware: handle and return validation results
  (req, res, next) => validateResults(req, res, next)
]

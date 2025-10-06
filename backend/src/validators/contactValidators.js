import { check } from 'express-validator'
import { validateResults } from '../utils/handleValidator.js'

export const validatorContact = [
  check('name')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 99 })
    .withMessage('Please enter a valid first name (3–99 characters).'),

  check('lastname')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 99 })
    .withMessage('Please enter a valid last name (3–99 characters).'),

  check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .withMessage('Please enter a valid email address.'),

  check('subject')
    .exists()
    .notEmpty()
    .withMessage('Please enter a subject.'),

  check('message')
    .exists()
    .notEmpty()
    .withMessage('Please enter a message.'),

  (req, res, next) => validateResults(req, res, next)
]

export const validatorAnswer = [
  check('answer')
    .exists()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage('Please enter a valid answer (min 3 characters).'),
  (req, res, next) => validateResults(req, res, next)
]

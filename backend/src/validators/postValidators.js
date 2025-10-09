import { check } from 'express-validator'
import { validateResults } from '../utils/handleValidator.js'

export const validatorCreatePost = [
  check('title').exists().notEmpty().isLength({ min: 3, max: 200 }),
  check('excerpt').exists().notEmpty().isLength({ min: 10, max: 300 }),
  check('slug').optional().isLength({ min: 3, max: 100 }),
  check('author').exists().notEmpty().isMongoId(),
  check('categories').isArray({ min: 1 }),
  check('content').exists().notEmpty().isLength({ min: 10 }),
  check('tags').optional().isArray(),
  (req, res, next) => validateResults(req, res, next)
]

export const validatorUpdatePost = [
  check('title').optional().isLength({ min: 3, max: 200 }),
  check('excerpt').optional().isLength({ min: 10, max: 300 }),
  check('slug').optional().isLength({ min: 3, max: 100 }),
  check('author').optional().isMongoId(),
  check('categories').optional().isArray({ min: 1 }),
  check('content').optional().isLength({ min: 10 }),
  check('tags').optional().isArray(),
  (req, res, next) => validateResults(req, res, next)
]

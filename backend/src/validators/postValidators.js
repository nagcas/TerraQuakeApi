import { check } from 'express-validator'
import { validateResults } from '../utils/handleValidator.js'

// NOTE: Validator for creating a new post
// Ensures all required fields are present and meet length/type requirements
export const validatorCreatePost = [
  // Validate 'title': required, not empty, length between 3 and 200 characters
  check('title')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 200 }),

  // Validate 'excerpt': required, not empty, length between 10 and 300 characters
  check('excerpt')
    .exists()
    .notEmpty()
    .isLength({ min: 10, max: 300 }),

  // Validate 'slug': optional, length between 3 and 100 characters
  check('slug')
    .optional()
    .isLength({ min: 3, max: 100 }),

  // Validate 'author': required, must be a valid MongoDB ObjectId
  check('author')
    .exists()
    .notEmpty()
    .isMongoId(),

  // Validate 'categories': required, must be an array with at least one item
  check('categories')
    .isArray({ min: 1 }),

  // Validate 'content': required, not empty, length at least 10 characters
  check('content')
    .exists()
    .notEmpty()
    .isLength({ min: 10 }),

  // Validate 'tags': optional, must be an array if provided
  check('tags')
    .optional()
    .isArray(),

  // Validate 'readTime'
  check('readTime')
    .optional()
    .isString(),

  // Final middleware: handle validation results
  (req, res, next) => validateResults(req, res, next)
]

// NOTE: Validator for updating a post
// All fields are optional but must meet validation rules if provided
export const validatorUpdatePost = [
  // Validate 'title': optional, length between 3 and 200 characters
  check('title').optional().isLength({ min: 3, max: 200 }),

  // Validate 'excerpt': optional, length between 10 and 300 characters
  check('excerpt').optional().isLength({ min: 10, max: 300 }),

  // Validate 'slug': optional, length between 3 and 100 characters
  check('slug').optional().isLength({ min: 3, max: 100 }),

  // Validate 'author': optional, must be a valid MongoDB ObjectId
  check('author').optional().isMongoId(),

  // Validate 'categories': optional, must be an array with at least one item if provided
  check('categories').optional().isArray({ min: 1 }),

  // Validate 'content': optional, length at least 10 characters
  check('content').optional().isLength({ min: 10 }),

  // Validate 'tags': optional, must be an array if provided
  check('tags').optional().isArray(),

  // Final middleware: handle validation results
  (req, res, next) => validateResults(req, res, next)
]

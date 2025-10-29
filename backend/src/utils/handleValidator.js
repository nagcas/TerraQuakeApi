import { validationResult } from 'express-validator'

// NOTE: Middleware to validate request results from express-validator
// If validation errors exist, it throws an error and responds with status 403
// and a JSON containing the array of validation errors.
// Otherwise, it calls next() to proceed to the next middleware/controller.
export const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error) {
    res.status(403)
    res.json({ errors: error.array() })
  }
}

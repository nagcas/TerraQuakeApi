/**
 * Utility to standardize API responses.
 *
 * @param {import("express").Request} req - Express request object
 * @param {string} message - Human-readable message
 * @param {Object|Object[]} data - Response payload
 * @param {number|null} [total=null] - Optional total count (defaults to data length)
 * @param {Object} [rest={}] - Optional extra fields to merge into response
 * @returns {Object} A consistent response object with metadata
 */
export const buildResponse = (req = {}, message = '', payload = null, total = null, rest = {}) => ({
  success: true,
  code: 200,
  status: 'OK',
  message,
  payload, //
  meta: {
    method: req.method?.toUpperCase() || null,
    path: req.originalUrl || null,
    timestamp: new Date().toISOString()
  },
  ...rest
})

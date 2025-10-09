/**
 * Utility to standardize API responses.
 *
 * @param {import("express").Request} req - Express request object
 * @param {string} message - Human-readable message
 * @param {Object|Object[]} data - Response payload
 * @param {number|null} [total=null] - Optional total count (defaults to data length)
 * @returns {Object} A consistent response object with metadata
 */

export const buildResponse = (req, message, data, total = null, { ...rest }) => ({
  success: true,
  code: 200,
  status: 'OK',
  message,
  total: total ?? (Array.isArray(data) ? data.length : 1),
  user: data,
  meta: {
    method: req.method.toUpperCase(),
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  },
  ...rest
})

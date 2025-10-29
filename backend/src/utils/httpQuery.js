// NOTE: Validates and parses positive integers from req.query parameters
// q: the query object (usually req.query)
// key: the query parameter name to validate
// options: optional object containing min (minimum value, default 1),
//          max (maximum allowed value), and def (default value if not provided)
// Returns:
// - The parsed integer if valid
// - The capped maximum if value exceeds max
// - The default value if parameter is missing
// - null if the value is invalid (caller should handle with 400 Bad Request)
export function getPositiveInt (q, key, { min = 1, max, def } = {}) {
  const raw = q?.[key]
  if (raw === undefined || raw === null || raw === '') return def
  const n = Number(raw)
  if (!Number.isFinite(n) || n < min) return null // caller should return 400 error
  if (max && n > max) return max // cap at max
  return Math.floor(n)
}

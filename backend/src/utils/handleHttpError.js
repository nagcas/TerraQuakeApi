// NOTE: Helper function for centralized HTTP error handling
// This function sends a JSON response with a custom error message
// and an HTTP status code (default is 500).
// It is used in controllers to standardize error handling and responses.
const handleHttpError = (
  res,
  message = 'Internal server error. Your request cannot be processed at this time',
  code = 500
) => {
  res.status(code).json({
    success: false,
    status: code,
    message,
    meta: {
      // NOTE: Timestamp of when the error occurred
      timestamp: new Date().toISOString()
    }
  })
}

export default handleHttpError

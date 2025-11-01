/**
 * @route GET /start
 * @desc Health check endpoint — verifies that the API is running and returns basic metadata.
 * @access Public
 */
export const getStart = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      // Basic API information
      const apiInfo = {
        author: 'Dr. Gianluca Chiaravalloti',
        version: '1.0.1',
        date: '2025.10.31',
        description:
          'This is the test endpoint for TerraQuake API, used to verify server status and configuration.',
        project: 'TerraQuake API — Open-source seismic data API',
        documentation: 'https://github.com/nagcas/TerraQuakeAPI#readme',
        contact: 'terraquakeapi@gmail.com',
        web: 'https://terraquakeapi.com',
        status: 'stable',
        environment: process.env.NODE_ENV || 'development'
      }

      // Build standardized success response
      const response = buildResponse(req, 'Server started successfully', null, null, apiInfo)

      return res.status(200).json(response)
    } catch (error) {
      console.error('Error in getStart controller:', error)

      // Safely extract message
      const message =
        error?.message?.includes('HTTP error')
          ? error.message
          : 'Unexpected error while starting the server'

      // Send structured error response
      return handleHttpError(res, message, 500)
    }
  }
}

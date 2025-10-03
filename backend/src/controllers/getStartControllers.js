import handleHttpError from '../utils/handleHttpError.js'
import { buildResponse } from '../utils/buildResponse.js'

/**
 * GET /start
 *
 * Endpoint to check if the server is running and return basic API information.
 *
 * Responds with a JSON object containing server status, project metadata,
 * and environment information.
 *
 * @async
 * @function getStart
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<void>} Sends a JSON response with server and API info
 *
 * @example
 * // Successful response
 * GET /start
 * {
 *   "success": true,
 *   "code": 200,
 *   "status": "OK",
 *   "message": "Server started successfully",
 *   "total": 0,
 *   "data": undefined,
 *   "meta": { ... },
 *   "extra": {
 *     "author": "Gii",
 *     "version": "1.0.0",
 *     "date": "01.01.2025",
 *     "description": "This is the test endpoint ...",
 *     "project": "TerraQuake API — Open-source seismic data API",
 *     "documentation": "https://github.com/nagcas/TerraQuakeAPI#readme",
 *     "contact": "t",
 *     "status": "stable",
 *     "environment": "development"
 *   }
 * }
 */
export const getStart = async (req, res) => {
  try {
    res.status(200).json(
      buildResponse(req, 'Server started successfully', undefined, null, {
        author: 'Gianluca Chiaravalloti',
        version: '1.0.0',
        date: '01.01.2025',
        description:
          'This is the test endpoint for TerraQuake API, used to verify server status and basic configuration.',
        project: 'TerraQuake API — Open-source seismic data API',
        documentation: 'https://github.com/nagcas/TerraQuakeAPI#readme',
        contact: 'terraquakeapi@gmail.com',
        status: 'stable',
        environment: process.env.NODE_ENV || 'development'
      })
    )
  } catch (error) {
    console.error('Error in the getStart controller:', error.message)
    handleHttpError(res)
  }
}

import { fetchINGVStations } from '../services/ingvStationService.js'
import { getPositiveInt } from '../utils/httpQuery.js'

/**
 * Controller to fetch all seismic stations from INGV.
 * Supports an optional "limit" query parameter to limit the number of stations returned.
 *
 * @param {Object} dependencies - Dependencies injected for response building and error handling
 * @param {Function} dependencies.buildResponse - Utility to format API responses
 * @param {Function} dependencies.handleHttpError - Utility to handle HTTP errors
 * @returns {Function} Express handler function
 */
export const getAllStations = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      // Parse and validate the "limit" query parameter (default: 50)
      const limit = getPositiveInt(req.query, 'limit', { def: 50 })

      if (limit === null) {
        // If limit is invalid, return a 400 Bad Request with an explanatory message
        return handleHttpError(
          res,
          'The limit parameter must be a positive integer greater than 0. Example: ?limit=50',
          400
        )
      }

      // Fetch all stations from the INGV API
      const stations = await fetchINGVStations()

      // Apply the limit to the list of stations
      const limitedStations = stations.slice(0, limit)

      // Return the response including the stations and pagination metadata
      res.status(200).json({
        ...buildResponse(
          req,
          'List stations seismic INGV',
          limitedStations
        ),
        pagination: {
          limit, // Number of stations requested
          total: stations.length, // Total stations retrieved from INGV
          hasMore: stations.length > limit // Whether more stations exist beyond the limit
        }
      })
    } catch (error) {
      // Log error to the server console
      console.error('Error retrieving stations:', error.message)

      // Handle unexpected errors gracefully
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

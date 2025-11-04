import { fetchINGVStations } from '../services/ingvStationService.js'
import { getPositiveInt } from '../utils/httpQuery.js'

/**
 * NOTE: Controller: Get all seismic monitoring stations (INGV network).
 *
 * @route GET /stations
 * @description
 *  - Retrieves all available seismic monitoring stations from the INGV API (FDSN format).
 *  - Supports pagination through `limit` and `page` query parameters.
 *  - Returns metadata such as total stations, total pages, and pagination info.
 */
export const getAllStations = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const urlINGV = process.env.URL_INGV_STATION
      const limit = getPositiveInt(req.query, 'limit', { def: 50 })
      const page = getPositiveInt(req.query, 'page', { def: 1 })

      if (limit === null || limit <= 0) {
        return handleHttpError(
          res,
          'The "limit" parameter must be a positive integer greater than 0. Example: ?limit=50',
          400
        )
      }

      if (page <= 0) {
        return handleHttpError(
          res,
          'The "page" parameter must be a positive integer greater than 0. Example: ?page=2',
          400
        )
      }

      const baseUrl = `${urlINGV}`

      // Pass as object with baseUrl key
      const stations = await fetchINGVStations({ baseUrl })

      const totalCount = stations.length
      const totalPages = Math.ceil(totalCount / limit)

      // Manual pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedStations = stations.slice(startIndex, endIndex)

      const message = 'List of seismic monitoring stations (INGV Network)'

      // Send successful response
      res.status(200).json({
        ...buildResponse(req, message, paginatedStations),
        totalStations: totalCount,
        pagination: {
          page,
          totalPages,
          limit,
          hasMore: page < totalPages
        }
      })
    } catch (error) {
      console.error('Error retrieving stations:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

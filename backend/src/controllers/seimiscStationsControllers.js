import { eventsProcessed } from '../middleware/metrics.js'
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

      // Increment metrics for monitoring
      eventsProcessed.inc(paginatedStations.length || 0)

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

/**
 * NOTE: Controller: Get a seismic monitoring station by code (INGV network).
 *
 * @route GET /stations/code
 * @queryParam {string} code - The unique station code to search for (e.g., "ACATE").
 *
 * @description
 *  - Retrieves detailed information for a single seismic monitoring station based on its station code.
 *  - The station list is fetched from the INGV FDSN Station service (XML converted to JSON).
 *  - The lookup is case-insensitive (e.g., "acate" and "ACATE" return the same result).
 *  - Returns a structured payload containing all station metadata (location, elevation, site name, creation date, etc.).
*/
export const getCodeStation = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const urlINGV = process.env.URL_INGV_STATION
      const { code } = req.query

      // Validate query parameter
      if (!code) {
        return handleHttpError(res, "Parameter 'code' is required", 400)
      }

      // Base URL for the INGV station list fetch
      const baseUrl = urlINGV

      // Fetch the full station list from INGV source
      // The function is expected to return an object with a `payload` property (array of stations)
      const stations = await fetchINGVStations({ baseUrl })

      // Ensure payload structure is valid
      if (!Array.isArray(stations)) {
        return handleHttpError(res, 'Invalid station data format received', 500)
      }

      // Filter stations by matching station code
      // The code is located inside the "$" field in each station entry
      const filteredStation = stations.filter(
        (stations) => stations?.$?.code?.toUpperCase() === code.toUpperCase()
      )

      // Increment metrics for monitoring
      eventsProcessed.inc(filteredStation.length || 0)

      // If no station found, return 404
      if (filteredStation.length === 0) {
        return handleHttpError(res, `No station found with code '${code}'`, 404)
      }

      const message = `Station found with code '${code}'`

      // Send formatted response including station data
      return res.status(200).json({
        ...buildResponse(req, message, filteredStation),
        codeStation: code.toUpperCase() // useful reference for the client
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

/**
 * NOTE: Controller: Get a seismic monitoring station.
 *
 * @route GET /stations/geojson
 *
 * @description
 *  Returns the complete list of seismic monitoring stations formatted as GeoJSON.
 *  Useful for mapping, visualization layers, and GIS applications.
 *  Each feature includes station coordinates, elevation, name, and metadata.
 */

export const getStationsGeoJson = ({ buildResponse, handleHttpError }) => {
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

      // Base URL for the INGV station list fetch
      const baseUrl = urlINGV

      // Fetch the full station list from INGV source
      // The function is expected to return an object with a `payload` property (array of stations)
      const stations = await fetchINGVStations({ baseUrl })

      if (!stations) {
        return handleHttpError(res, 'Invalid stations data format received', 500)
      }

      const geoJson = {
        type: 'FeatureCollection',
        features: stations.map((station) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              station?.Longitude,
              station?.Latitude,
              station?.Elevation
            ]
          },
          properties: {
            code: station?.$?.code,
            name: station?.$?.name,
            site: station?.Site?.Name,
            status: station?.$?.restrictedStatus || 'unknow'
          }
        }))
      }

      const totalCount = geoJson.features.length
      const totalPages = Math.ceil(totalCount / limit)

      // Manual pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedStations = geoJson.features.slice(startIndex, endIndex)

      // Increment metrics for monitoring
      eventsProcessed.inc(paginatedStations.length || 0)

      const message = 'Stations format geojson'

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

/**
 * NOTE: Controller: Get a seismic monitoring station.
 *
 * @route GET /stations/status/open
 *
 * @description
 *  Retrieves only the stations that are currently operational (open status).
 *  These are stations actively collecting and transmitting seismic data.
 */

export const getStationsStatusOpen = ({ buildResponse, handleHttpError }) => {
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

      // Base URL for the INGV station list fetch
      const baseUrl = urlINGV

      // Fetch the full station list from INGV source
      // The function is expected to return an object with a `payload` property (array of stations)
      const stations = await fetchINGVStations({ baseUrl })

      if (!stations) {
        return handleHttpError(res, 'Invalid stations data format received', 500)
      }

      // Ensure payload structure is valid
      if (!Array.isArray(stations)) {
        return handleHttpError(res, 'Invalid station data format received', 500)
      }

      // Filter stations by matching station code
      // The code is located inside the "$" field in each station entry
      const filteredStationOpen = stations.filter(
        (stations) => stations?.$?.restrictedStatus === 'open'
      )

      const totalCount = filteredStationOpen.length
      const totalPages = Math.ceil(totalCount / limit)

      // Manual pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedStations = filteredStationOpen.slice(startIndex, endIndex)

      // Increment metrics for monitoring
      eventsProcessed.inc(paginatedStations.length || 0)

      // If no station found, return 404
      if (filteredStationOpen.length === 0) {
        return handleHttpError(res, 'No station found restrictedStatus open', 404)
      }

      const message = 'List of active seismic stations'

      res.status(200).json({
        ...buildResponse(req, message, paginatedStations),
        totalStationsOpen: totalCount,
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

/**
 * NOTE: Controller: Get a seismic monitoring station.
 *
 * @route GET /stations/status/closed
 *
 * @description
 *  Returns the list of stations that are no longer active.
 *  Useful for historical analysis and network evolution studies.
*/

export const getStationsStatusClosed = ({ buildResponse, handleHttpError }) => {
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

      // Base URL for the INGV station list fetch
      const baseUrl = urlINGV

      // Fetch the full station list from INGV source
      // The function is expected to return an object with a `payload` property (array of stations)
      const stations = await fetchINGVStations({ baseUrl })

      if (!stations) {
        return handleHttpError(res, 'Invalid stations data format received', 500)
      }

      // Ensure payload structure is valid
      if (!Array.isArray(stations)) {
        return handleHttpError(res, 'Invalid station data format received', 500)
      }

      // Filter stations by matching station code
      // The code is located inside the "$" field in each station entry
      const filteredStationClosed = stations.filter(
        (stations) => stations?.$?.restrictedStatus === 'closed' || stations?.$?.restrictedStatus === 'inactive' || stations?.$?.restrictedStatus === 'deprecated' || stations?.$?.restrictedStatus === 'unavailable'
      )

      const totalCount = filteredStationClosed.length
      const totalPages = Math.ceil(totalCount / limit)

      // Manual pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedStations = filteredStationClosed.slice(startIndex, endIndex)

      // Increment metrics for monitoring
      eventsProcessed.inc(paginatedStations.length || 0)

      // If no station found, return 404
      if (filteredStationClosed.length === 0) {
        return handleHttpError(res, 'No station found restrictedStatus closed', 404)
      }

      const message = 'List of closed seismic stations'

      res.status(200).json({
        ...buildResponse(req, message, paginatedStations),
        totalStationsClosed: totalCount,
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

/**
 * NOTE: Controller: Get a seismic monitoring station.
 *
 * @route GET /stations/statistics
 *
 * @description
 *  Provides aggregate metrics such as:
 *   - Total stations
 *   - Number of active stations
 *   - Number of closed stations
 *  Useful for dashboards and monitoring network scale.
 */

export const getStationsStatistics = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const urlINGV = process.env.URL_INGV_STATION

      // Base URL for the INGV station list fetch
      const baseUrl = urlINGV

      // Fetch the full station list from INGV source
      // The function is expected to return an object with a `payload` property (array of stations)
      const stations = await fetchINGVStations({ baseUrl })

      if (!stations) {
        return handleHttpError(res, 'Invalid stations data format received', 500)
      }

      // Ensure payload structure is valid
      if (!Array.isArray(stations)) {
        return handleHttpError(res, 'Invalid station data format received', 500)
      }

      // Filter stations by matching station code
      // The code is located inside the "$" field in each station entry
      const filteredStationOpen = stations.filter(
        (stations) => stations?.$?.restrictedStatus === 'open'
      )

      // Filter stations by matching station code
      // The code is located inside the "$" field in each station entry
      const filteredStationClosed = stations.filter(
        (stations) => stations?.$?.restrictedStatus === 'closed' || stations?.$?.restrictedStatus === 'inactive' || stations?.$?.restrictedStatus === 'deprecated' || stations?.$?.restrictedStatus === 'unavailable'
      )

      const totalStations = stations.length
      const stationsOpen = filteredStationOpen.length
      const stationsClosed = filteredStationClosed.length

      const statisticsStations = {
        type: 'data',
        statistics: {
          totalStations,
          stationsOpen,
          stationsClosed
        }
      }

      // Increment metrics for monitoring
      eventsProcessed.inc()

      const message = 'Statistics stations'

      res.status(200).json({
        ...buildResponse(req, message, statisticsStations)
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

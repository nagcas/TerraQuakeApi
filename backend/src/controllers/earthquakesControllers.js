import { eventsProcessed } from '../middleware/metrics.js'
import { regionBoundingBoxes } from '../config/regionBoundingBoxes.js'
import { getPositiveInt } from '../utils/httpQuery.js'
import { processFeatures } from '../utils/processFeatures.js'
import haversine from 'haversine-distance'

/**
 * NOTE: Fetch JSON data from the INGV API with error handling.
 *
 * @param {string} url - Full INGV endpoint URL.
 * @returns {Promise<any>} Parsed JSON response.
 * @throws {Error} When HTTP response is not OK.
 */
const fetchINGV = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(
      `HTTP error from the INGV source: ${response.status} ${
        response.statusText || ''
      }`.trim()
    )
  }
  return response.json()
}

/**
 * NOTE: Controller: Get recent seismic events (from the start of the year until today).
 *
 * @route GET /earthquakes/recent
 * @description
 *  - Retrieves earthquake data from the INGV API.
 *  - Supports pagination through `limit`, `page`, and sorting.
 *  - Counts the total number of earthquakes in the selected period, not only those limited by the query.
 *  - Returns metadata including total results and pagination info.
 */
export const getEarthquakesByRecent = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const urlINGV = process.env.URL_INGV
      const limit = getPositiveInt(req.query, 'limit', { def: 50 })

      if (limit === null) {
        return handleHttpError(
          res,
          'The limit parameter must be a positive integer greater than 0. Example: ?limit=50',
          400
        )
      }

      const now = new Date().toISOString().split('T')[0]
      const startOfYear = new Date(new Date().getFullYear(), 0, 1)
        .toISOString()
        .split('T')[0]

      // Base URL for both total count and limited data fetch
      const baseUrl = `${urlINGV}?orderby=time&starttime=${startOfYear}&endtime=${now}&format=geojson`

      // Fetch all events to calculate the total number of earthquakes since the start of the year
      const totalData = await fetchINGV(baseUrl)
      const totalCount = totalData.features?.length || 0

      // Fetch only the limited number of events for current page visualization
      let url = baseUrl
      if (limit) url += `&limit=${limit}`

      const data = await fetchINGV(url)

      // Increment metrics for monitoring (optional)
      eventsProcessed.inc(data.features.length || 0)

      // Process and sort data according to query parameters
      const result = processFeatures(data.features, req.query, {
        defaultSort: '-time',
        sortWhitelist: ['time', 'magnitude', 'depth'],
        fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
      })

      // Calculate pagination details
      const totalPages = Math.ceil(totalCount / result.limit)
      const hasMore = result.page < totalPages

      const message = 'Earthquakes recent events'

      // Send successful response with data and pagination info
      res.status(200).json({
        ...buildResponse(
          req,
          message,
          result.items
        ),
        totalEarthquakes: totalCount,
        pagination: {
          page: result.page,
          totalPages,
          limit: result.limit,
          hasMore
        }
      })
    } catch (error) {
      // Log detailed error for debugging
      console.error('Error retrieving recent earthquakes controller:', error.message)

      // Send user-friendly error response
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Get today’s seismic events.
 *
 * @route GET /earthquakes/today
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesByToday = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const urlINGV = process.env.URL_INGV
      const limit = getPositiveInt(req.query, 'limit', { def: 50 })

      if (limit === null) {
        return handleHttpError(
          res,
          'The limit parameter must be a positive integer greater than 0. Example: ?limit=50',
          400
        )
      }

      const nowUTC = new Date()
      const dateStr = nowUTC.toISOString().split('T')[0]

      // Base URL for both total count and limited data fetch
      const baseUrl = `${urlINGV}?starttime=${dateStr}T00:00:00&endtime=${dateStr}T23:59:59&orderby=time&format=geojson`

      // Fetch all events to calculate the total number of earthquakes
      const totalData = await fetchINGV(baseUrl)
      const totalCount = totalData.features?.length || 0

      // Fetch only the limited number of events for current page visualization
      let url = `${urlINGV}?starttime=${dateStr}T00:00:00&endtime=${dateStr}T23:59:59&orderby=time&format=geojson`
      if (limit) url += `&limit=${limit}`

      const data = await fetchINGV(url)
      eventsProcessed.inc(data.features.length || 0)
      const result = processFeatures(data.features, req.query, {
        defaultSort: '-time',
        sortWhitelist: ['time', 'magnitude', 'depth'],
        fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
      })

      const message = 'Earthquakes events for today'

      // Send successful response with data and pagination info
      res.status(200).json({
        ...buildResponse(
          req,
          message,
          result.items,
          result.totalFetched
        ),
        totalEarthquakes: totalCount,
        pagination: {
          page: result.page,
          totalPages: result.totalPages,
          limit: result.limit,
          hasMore: result.hasMore
        }
      })
    } catch (error) {
      // Log error to the server console
      console.error('Error retrieving earthquakes today controller', error.message)

      // Handle unexpected errors gracefully
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Get seismic events from the last 7 days.
 *
 * @route GET /earthquakes/last-week
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesByLastWeek = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const urlINGV = process.env.URL_INGV
      const limit = getPositiveInt(req.query, 'limit', { def: 50 })

      if (limit === null) {
        return handleHttpError(
          res,
          'The limit parameter must be a positive integer greater than 0. Example:limit=50',
          400
        )
      }

      const today = new Date()
      const endDate = today.toISOString().split('T')[0]

      const lastWeekDate = new Date(today)
      lastWeekDate.setDate(today.getDate() - 7)
      const startDate = lastWeekDate.toISOString().split('T')[0]

      // Base URL for both total count and limited data fetch
      const baseUrl = `${urlINGV}?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`

      // Fetch all events to calculate the total number of earthquakes
      const totalData = await fetchINGV(baseUrl)
      const totalCount = totalData.features?.length || 0

      // Fetch only the limited number of events for current page visualization
      let url = `${urlINGV}?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`
      if (limit) url += `&limit=${limit}`

      const data = await fetchINGV(url)
      eventsProcessed.inc(data.features.length || 0)
      const result = processFeatures(data.features, req.query, {
        defaultSort: '-time',
        sortWhitelist: ['time', 'magnitude', 'depth'],
        fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
      })

      const message = `Earthquakes events from ${startDate} to ${endDate}`

      // Send successful response with data and pagination info
      res.status(200).json({
        ...buildResponse(
          req,
          message,
          result.items,
          result.totalFetched
        ),
        totalEarthquakes: totalCount,
        pagination: {
          page: result.page,
          totalPages: result.totalPages,
          limit: result.limit,
          hasMore: result.hasMore
        }
      })
    } catch (error) {
      // Log error to the server console
      console.error('Error retrieving earthquakes last week controller', error.message)

      // Handle unexpected errors gracefully
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Get seismic events for a specific month.
 *
 * @route GET /earthquakes/month
 * @query {number} year - Year in YYYY format.
 * @query {number} month - Month in MM format.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesByMonth = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const urlINGV = process.env.URL_INGV
      const { year, month } = req.query
      const limit = getPositiveInt(req.query, 'limit', { def: 50 })

      if (limit === null) {
        return handleHttpError(
          res,
          'The limit parameter must be a positive integer greater than 0. Example: ?limit=50',
          400
        )
      }

      if (!parseInt(year) || !parseInt(month)) {
        return handleHttpError(
          res,
          'Year and month are required in the URL parameters (e.g., ?year=2025&month=03)',
          400
        )
      }

      const startDate = `${year}-${String(month).padStart(2, '0')}-01`
      const nextMonth = new Date(`${startDate}T00:00:00Z`)
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      const yyyy = nextMonth.getFullYear()
      const mm = String(nextMonth.getMonth() + 1).padStart(2, '0')
      const endDate = `${yyyy}-${mm}-01`

      // Base URL for both total count and limited data fetch
      const baseUrl = `${urlINGV}?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`

      // Fetch all events to calculate the total number of earthquakes
      const totalData = await fetchINGV(baseUrl)
      const totalCount = totalData.features?.length || 0

      // Fetch only the limited number of events for current page visualization
      let url = `${urlINGV}?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`
      if (limit) url += `&limit=${limit}`

      const data = await fetchINGV(url)
      eventsProcessed.inc(data.features.length || 0)
      const result = processFeatures(data.features, req.query, {
        defaultSort: '-time',
        sortWhitelist: ['time', 'magnitude', 'depth'],
        fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
      })

      const message = `Earthquakes events of ${year}-${String(month).padStart(2, '0')}`

      // Send successful response with data and pagination info
      res.status(200).json({
        ...buildResponse(
          req,
          message,
          result.items,
          result.totalFetched
        ),
        totalEarthquakes: totalCount,
        pagination: {
          page: result.page,
          totalPages: result.totalPages,
          limit: result.limit,
          hasMore: result.hasMore
        }
      })
    } catch (error) {
      // Log error to the server console
      console.error('Error retrieving earthquakes month controller', error.message)

      // Handle unexpected errors gracefully
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Get seismic events by Italian region (from start of year until today).
 *
 * @route GET /earthquakes/region
 * @query {string} region - Region name.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesByRegion = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const urlINGV = process.env.URL_INGV
      const { region } = req.query
      const limit = getPositiveInt(req.query, 'limit', { def: 50 })

      if (limit === null) {
        return handleHttpError(
          res,
          'The limit parameter must be a positive integer greater than 0. Example: ?limit=50',
          400
        )
      }

      if (!regionBoundingBoxes[region?.toLowerCase()?.trim()]) {
        return handleHttpError(res, `Region ${region} not supported`, 400)
      }

      const { minlatitude, maxlatitude, minlongitude, maxlongitude } =
        regionBoundingBoxes[region.toLowerCase().trim()]

      const today = new Date()
      const startOfYear = new Date(today.getFullYear(), 0, 1)
      const startDate = startOfYear.toISOString().split('T')[0]
      const endDate = today.toISOString().split('T')[0]

      // Base URL for both total count and limited data fetch
      const baseUrl = `${urlINGV}?minlatitude=${minlatitude}&maxlatitude=${maxlatitude}&minlongitude=${minlongitude}&maxlongitude=${maxlongitude}&starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`

      // Fetch all events to calculate the total number of earthquakes
      const totalData = await fetchINGV(baseUrl)
      const totalCount = totalData.features?.length || 0

      // Fetch only the limited number of events for current page visualization
      let url = `${urlINGV}?minlatitude=${minlatitude}&maxlatitude=${maxlatitude}&minlongitude=${minlongitude}&maxlongitude=${maxlongitude}&starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`
      if (limit) url += `&limit=${limit}`

      const data = await fetchINGV(url)
      eventsProcessed.inc(data.features.length || 0)
      const result = processFeatures(data.features, req.query, {
        defaultSort: '-time',
        sortWhitelist: ['time', 'magnitude', 'depth'],
        fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
      })

      const message = `Earthquakes events in region ${region} from ${startDate} to ${endDate}`

      // Send successful response with data and pagination info
      res.status(200).json({
        ...buildResponse(
          req,
          message,
          result.items,
          result.totalFetched
        ),
        totalEarthquakes: totalCount,
        pagination: {
          page: result.page,
          totalPages: result.totalPages,
          limit: result.limit,
          hasMore: result.hasMore
        }
      })
    } catch (error) {
      // Log error to the server console
      console.error('Error retrieving earthquakes region controller', error.message)

      // Handle unexpected errors gracefully
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Get seismic events filtered by depth (from start of year until today).
 *
 * @route GET /earthquakes/depth
 * @query {number} depth - Minimum depth in km.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesByDepth = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const urlINGV = process.env.URL_INGV
      const { depth } = req.query

      if (depth === undefined) {
        return handleHttpError(res, 'The depth parameter is required and must be a positive number greater than 0', 400)
      }

      const depthValue = parseFloat(depth)
      if (isNaN(depthValue) || depthValue <= 0) {
        return handleHttpError(res, 'The depth parameter must be a positive number greater than 0', 400)
      }

      const limit = getPositiveInt(req.query, 'limit', { def: 50 })
      if (limit === null) {
        return handleHttpError(res, 'The limit parameter must be a positive integer greater than 0. Example: ?limit=50', 400)
      }

      const today = new Date()
      const startOfYear = new Date(today.getFullYear(), 0, 1)
      const startDate = startOfYear.toISOString().split('T')[0]
      const endDate = today.toISOString().split('T')[0]

      // Base URL (full dataset from INGV for current year)
      const baseUrl = `${urlINGV}?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`

      // Fetch all events to determine total count based on depth filter
      const allData = await fetchINGV(baseUrl)
      const allFeatures = allData.features || []

      // Filter earthquakes deeper than the provided depth
      const filteredFeatures = allFeatures.filter(
        feature => feature.geometry.coordinates[2] > depthValue
      )

      // Total count of earthquakes that meet the depth condition
      const totalCount = filteredFeatures.length

      // Apply limit only for visualization (pagination)
      const limitedFeatures = filteredFeatures.slice(0, limit)

      // Process and sort features
      const result = processFeatures(limitedFeatures, req.query, {
        defaultSort: '-time',
        sortWhitelist: ['time', 'magnitude', 'depth'],
        fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
      })

      // Calculate pagination info
      const totalPages = Math.ceil(totalCount / limit)
      const hasMore = result.page < totalPages

      const message = `Earthquake events with depth > ${depthValue} km`

      // Send successful response with data and pagination info
      res.status(200).json({
        ...buildResponse(
          req,
          message,
          result.items, result.totalFetched
        ),
        totalEarthquakes: totalCount,
        pagination: {
          page: result.page,
          totalPages: result.totalPages,
          limit: result.limit,
          hasMore
        }
      })
    } catch (error) {
      // Log error to the server console
      console.error('Error retrieving earthquakes depth controller', error.message)

      // Handle unexpected errors gracefully
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Get seismic events within a date range.
 *
 * @route GET /earthquakes/range
 * @query {string} startdate - Start date (YYYY-MM-DD).
 * @query {string} enddate - End date (YYYY-MM-DD).
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesByDateRange = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const urlINGV = process.env.URL_INGV
      const { startdate, enddate } = req.query
      const limit = getPositiveInt(req.query, 'limit', { def: 50 })

      if (limit === null) {
        return handleHttpError(
          res,
          'The limit parameter must be a positive integer greater than 0. Example: ?limit=50',
          400
        )
      }

      if (!startdate || !enddate) {
        return handleHttpError(
          res,
          'The parameters startdate and enddate are required. Example: ?startdate=2024-01-01&enddate=2024-01-31',
          400
        )
      }

      const isoRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!isoRegex.test(startdate) || !isoRegex.test(enddate)) {
        return handleHttpError(
          res,
          'Use the ISO date format: YYYY-MM-DD. Example: ?starttime=2024-01-01',
          400
        )
      }

      // Base URL for both total count and limited data fetch
      const baseUrl = `${urlINGV}?starttime=${startdate}&endtime=${enddate}&orderby=time&format=geojson`

      // Fetch all events to calculate the total number of earthquakes
      const totalData = await fetchINGV(baseUrl)
      const totalCount = totalData.features?.length || 0

      // Fetch only the limited number of events for current page visualization
      let url = `${urlINGV}?starttime=${startdate}&endtime=${enddate}&orderby=time&format=geojson`
      if (limit) url += `&limit=${limit}`

      const data = await fetchINGV(url)
      eventsProcessed.inc(data.features.length || 0)
      const result = processFeatures(data.features, req.query, {
        defaultSort: '-time',
        sortWhitelist: ['time', 'magnitude', 'depth'],
        fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
      })

      const message = `Earthquakes events between ${startdate} and ${enddate}`

      // Send successful response with data and pagination info
      res.status(200).json({
        ...buildResponse(
          req,
          message,
          result.items,
          result.totalFetched
        ),
        totalEarthquakes: totalCount,
        pagination: {
          page: result.page,
          totalPages: result.totalPages,
          limit: result.limit,
          hasMore: result.hasMore
        }
      })
    } catch (error) {
      // Log error to the server console
      console.error('Error retrieving earthquakes range-time controller', error.message)

      // Handle unexpected errors gracefully
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Get seismic events filtered by magnitude.
 *
 * @route GET /earthquakes/magnitude
 * @query {number} mag - Minimum magnitude threshold.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesByMagnitude = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const urlINGV = process.env.URL_INGV
      const { mag } = req.query

      // Magnitude is mandatory
      if (mag === undefined) {
        return handleHttpError(
          res,
          'The mag parameter is required and must be a positive number greater than 0',
          400
        )
      }

      const magValue = parseFloat(mag)
      if (isNaN(magValue) || magValue <= 0) {
        return handleHttpError(
          res,
          'The mag parameter must be a positive number greater than 0',
          400
        )
      }

      const today = new Date()
      const startOfYear = new Date(today.getFullYear(), 0, 1)
      const startDate = startOfYear.toISOString().split('T')[0]
      const endDate = today.toISOString().split('T')[0]

      // Base URL (full dataset from INGV for current year)
      const baseUrl = `${urlINGV}?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`

      // Fetch all events to determine total count based on depth filter
      const allData = await fetchINGV(baseUrl)
      const allFeatures = allData.features || []

      // Filter earthquakes deeper than the provided depth
      const filteredFeatures = allFeatures.filter(
        feature => feature.properties.mag > magValue
      )

      // Total count of earthquakes that meet the depth condition
      const totalCount = filteredFeatures.length

      const limit = getPositiveInt(req.query, 'limit', { def: 50 })
      if (limit === null) {
        return handleHttpError(
          res,
          'The limit parameter must be a positive integer greater than 0. Example: ?limit=50',
          400
        )
      }

      // Fetch only the limited number of events for current page visualization
      let url = `${urlINGV}?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson&limit=${limit}`
      url += `&minmagnitude=${magValue}`

      const data = await fetchINGV(url)
      eventsProcessed.inc(data.features.length || 0)

      const result = processFeatures(data.features, req.query, {
        defaultSort: '-time',
        sortWhitelist: ['time', 'magnitude', 'depth'],
        fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
      })

      const message = `Earthquakes events with magnitude > ${magValue}`

      // Send successful response with data and pagination info
      res.status(200).json({
        ...buildResponse(
          req,
          message,
          result.items,
          result.totalFetched
        ),
        totalEarthquakes: totalCount,
        pagination: {
          page: result.page,
          totalPages: result.totalPages,
          limit: result.limit,
          hasMore: result.hasMore
        }
      })
    } catch (error) {
      // Log error to the server console
      console.error('Error retrieving earthquakes magnitude controller', error.message)

      // Handle unexpected errors gracefully
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Get a seismic event by its eventId.
 *
 * @route GET /earthquakes/id
 * @query {number} eventId - Unique event ID.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesById = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const urlINGV = process.env.URL_INGV
      const { eventId } = req.query

      const today = new Date()
      const startOfYear = new Date(today.getFullYear(), 0, 1)
      const startDate = startOfYear.toISOString().split('T')[0]
      const endDate = today.toISOString().split('T')[0]

      // Fetch by id
      const url = `${urlINGV}?starttime=${startDate}&endtime=${endDate}&format=geojson`
      const data = await fetchINGV(url)
      eventsProcessed.inc(data.features.length || 0)
      const { features } = data

      const filteredEvent = features.filter(
        (feature) => feature.properties.eventId === parseInt(eventId)
      )

      if (filteredEvent.length === 0) {
        return handleHttpError(res, `No event found with ID ${eventId}`, 404)
      }

      const result = processFeatures(filteredEvent, req.query, {
        sortWhitelist: ['time', 'magnitude', 'depth'],
        fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
      })

      const message = `Earthquakes event with id ${eventId}`

      // Send successful response with data and pagination info
      res.status(200).json({
        ...buildResponse(
          req,
          message,
          result.items,
          result.totalFetched
        )
      })
    } catch (error) {
      // Log error to the server console
      console.error('Error retrieving earthquakes eventId controller', error.message)

      // Handle unexpected errors gracefully
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Get seismic events near a specific geographic location.
 *
 * @route GET /earthquakes/location
 * @query {number} latitude - Latitude in decimal degrees.
 * @query {number} longitude - Longitude in decimal degrees.
 * @query {number} [radius=50] - Search radius in km (default 50 km).
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesLocation = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const urlINGV = process.env.URL_INGV
      const { latitude, longitude } = req.query
      const limit = getPositiveInt(req.query, 'limit', { def: 50 })
      const radiusNum = getPositiveInt(req.query, 'radius', {
        min: 0.1,
        def: 50
      })

      if (!latitude || isNaN(latitude) || !longitude || isNaN(longitude)) {
        return handleHttpError(
          res,
          'Please provide valid latitude and longitude',
          400
        )
      }

      const lat = parseFloat(latitude)
      const lon = parseFloat(longitude)

      // Date: from the beginning of the year until today
      const nowUTC = new Date()
      const startOfYear = `${nowUTC.getFullYear()}-01-01T00:00:00`
      const endOfToday = nowUTC.toISOString().split('.')[0] // YYYY-MM-DDTHH:MM:SS

      // Reduced global bounding box for safety
      const degreeRadius = radiusNum / 111 // 1° ≈ 111 km
      const minLat = Math.max(lat - degreeRadius, -90)
      const maxLat = Math.min(lat + degreeRadius, 90)
      const minLon = Math.max(lon - degreeRadius, -180)
      const maxLon = Math.min(lon + degreeRadius, 180)

      // Base URL for both total count and limited data fetch
      const baseUrl = `${urlINGV}?starttime=${startOfYear}&endtime=${endOfToday}&minlatitude=${minLat}&maxlatitude=${maxLat}&minlongitude=${minLon}&maxlongitude=${maxLon}&orderby=time&format=geojson`

      // Fetch all events to calculate the total number of earthquakes
      const totalData = await fetchINGV(baseUrl)
      const totalCount = totalData.features?.length || 0

      // Fetch only the limited number of events for current page visualization
      const url = `${urlINGV}?starttime=${startOfYear}&endtime=${endOfToday}&minlatitude=${minLat}&maxlatitude=${maxLat}&minlongitude=${minLon}&maxlongitude=${maxLon}&orderby=time&format=geojson&limit=${limit}`

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(
          `HTTP error from INGV source: ${response.status} ${response.statusText}`
        )
      }

      const data = await response.json()
      eventsProcessed.inc(data.features.length || 0)
      let { features } = data

      // Precise local filtering using haversine
      const userPoint = { latitude: lat, longitude: lon }
      features = features.filter(({ geometry }) => {
        const [lonF, latF] = geometry.coordinates
        const quakePoint = { latitude: latF, longitude: lonF }
        const distanceKm = haversine(userPoint, quakePoint) / 1000
        return distanceKm <= radiusNum
      })

      const result = processFeatures(features, req.query, {
        defaultSort: '-time',
        sortWhitelist: ['time', 'magnitude', 'depth'],
        fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
      })

      const message = `Earthquakes events near [${lat}, ${lon}] within ${radiusNum} km from ${startOfYear} to today`

      // Send successful response with data and pagination info
      res.status(200).json({
        ...buildResponse(
          req,
          message,
          result.items,
          result.totalFetched
        ),
        totalEarthquakes: totalCount,
        pagination: {
          page: result.page,
          totalPages: result.totalPages,
          limit: result.limit,
          hasMore: result.hasMore
        }
      })
    } catch (error) {
      // Log error to the server console
      console.error('Error retrieving earthquakes location controller', error.message)

      // Handle unexpected errors gracefully
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

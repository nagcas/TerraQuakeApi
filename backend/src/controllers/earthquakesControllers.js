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
 *  - Counts the total number of earthquakes in the selected period.
 *  - Returns metadata including total results and pagination info.
 */
export const getEarthquakesByRecent = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const urlINGV = process.env.URL_INGV
      const limit = getPositiveInt(req.query, 'limit', { def: 50 })
      const page = getPositiveInt(req.query, 'page', { def: 1 })

      if (limit === null || limit <= 0) {
        return handleHttpError(
          res,
          'The limit parameter must be a positive integer greater than 0. Example: ?limit=50',
          400
        )
      }

      if (page <= 0) {
        return handleHttpError(
          res,
          'The page parameter must be a positive integer greater than 0. Example: ?page=2',
          400
        )
      }

      const now = new Date().toISOString().split('T')[0]
      const startOfYear = new Date(new Date().getFullYear(), 0, 1)
        .toISOString()
        .split('T')[0]

      // Base URL for all events since start of the year
      const baseUrl = `${urlINGV}?orderby=time&starttime=${startOfYear}&endtime=${now}&format=geojson`

      // Fetch all data (INGV doesn't support offset)
      const totalData = await fetchINGV(baseUrl)
      const allFeatures = totalData.features || []
      const totalCount = allFeatures.length

      // Calculate pagination indexes
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit

      // Paginate data manually
      const paginatedFeatures = allFeatures.slice(startIndex, endIndex)

      // Increment metrics for monitoring (optional)
      eventsProcessed.inc(paginatedFeatures.length || 0)

      // Process and sort paginated data
      const result = processFeatures(paginatedFeatures, req.query, {
        defaultSort: '-time',
        sortWhitelist: ['time', 'magnitude', 'depth'],
        fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
      })

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalCount / limit)

      const message = 'Earthquakes recent events'

      // Send successful response
      res.status(200).json({
        ...buildResponse(
          req,
          message,
          result.items
        ),
        totalEarthquakes: totalCount,
        pagination: {
          page,
          totalPages,
          limit,
          hasMore: page < totalPages
        }
      })
    } catch (error) {
      console.error('Error retrieving recent earthquakes controller:', error.message)

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
      const page = getPositiveInt(req.query, 'page', { def: 1 })

      if (limit === null || limit <= 0) {
        return handleHttpError(
          res,
          'The limit parameter must be a positive integer greater than 0. Example: ?limit=50',
          400
        )
      }

      if (page <= 0) {
        return handleHttpError(
          res,
          'Invalid "page" parameter. It must be a positive integer (e.g., ?page=2).',
          400
        )
      }

      const nowUTC = new Date()
      const dateStr = nowUTC.toISOString().split('T')[0]

      // Base URL for today's events
      const baseUrl = `${urlINGV}?starttime=${dateStr}T00:00:00&endtime=${dateStr}T23:59:59&orderby=time&format=geojson`

      // Fetch all today's events (INGV doesn't support offset)
      const totalData = await fetchINGV(baseUrl)
      const allFeatures = totalData.features || []
      const totalCount = allFeatures.length

      // Calculate pagination indexes
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit

      // Paginate data manually
      const paginatedFeatures = allFeatures.slice(startIndex, endIndex)

      // Increment metrics for monitoring (optional)
      eventsProcessed.inc(paginatedFeatures.length || 0)

      // Process only paginated data
      const result = processFeatures(paginatedFeatures, req.query, {
        defaultSort: '-time',
        sortWhitelist: ['time', 'magnitude', 'depth'],
        fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
      })

      // Calculate pagination details
      const totalPages = Math.ceil(totalCount / limit)

      const message = 'Earthquake events for today'

      // Send successful response with data and pagination info
      res.status(200).json({
        ...buildResponse(
          req,
          message,
          result.items
        ),
        totalEarthquakes: totalCount,
        pagination: {
          page,
          totalPages,
          limit,
          hasMore: page < totalPages
        }
      })
    } catch (error) {
      console.error('Error retrieving earthquakes today controller:', error.message)

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
      const page = getPositiveInt(req.query, 'page', { def: 1 })

      // Validate query params
      if (limit === null || limit <= 0) {
        return handleHttpError(
          res,
          'The "limit" parameter must be a positive integer greater than 0. Example: ?limit=50',
          400
        )
      }

      if (page === null || page <= 0) {
        return handleHttpError(
          res,
          'The "page" parameter must be a positive integer (e.g., ?page=2).',
          400
        )
      }

      // Calculate date range
      const today = new Date()
      const endDate = today.toISOString().split('T')[0]
      const lastWeekDate = new Date(today)
      lastWeekDate.setDate(today.getDate() - 7)
      const startDate = lastWeekDate.toISOString().split('T')[0]

      // Base INGV URL
      const baseUrl = `${urlINGV}?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`

      // Fetch data
      const totalData = await fetchINGV(baseUrl)
      const allFeatures = totalData.features || []
      const totalCount = allFeatures.length

      // Manual pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedFeatures = allFeatures.slice(startIndex, endIndex)

      // Metrics (optional)
      eventsProcessed.inc(paginatedFeatures.length || 0)

      // Process and sort
      const result = processFeatures(paginatedFeatures, req.query, {
        defaultSort: '-time',
        sortWhitelist: ['time', 'magnitude', 'depth'],
        fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
      })

      const totalPages = Math.ceil(totalCount / limit)

      const message = `Earthquake events from the last 7 days (${startDate} to ${endDate})`

      // Response
      res.status(200).json({
        ...buildResponse(
          req,
          message,
          result.items
        ),
        totalEarthquakes: totalCount,
        pagination: {
          page,
          totalPages,
          limit,
          hasMore: page < totalPages
        }
      })
    } catch (error) {
      console.error('Error retrieving earthquakes last week controller:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Get seismic events filtered by specific month and year.
 *
 * @route GET /earthquakes/month
 * @query {number} year - Year in YYYY format.
 * @query {number} month - Month in MM format (1-12).
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesByMonth = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const urlINGV = process.env.URL_INGV
      const { year, month } = req.query
      const limit = getPositiveInt(req.query, 'limit', { def: 50 })
      const page = getPositiveInt(req.query, 'page', { def: 1 })

      // Validate pagination
      if (limit === null || limit <= 0) {
        return handleHttpError(
          res,
          'The "limit" parameter must be a positive integer greater than 0. Example: ?limit=50',
          400
        )
      }

      if (page === null || page <= 0) {
        return handleHttpError(
          res,
          'The "page" parameter must be a positive integer greater than 0. Example: ?page=2',
          400
        )
      }

      // Validate year and month
      const parsedYear = parseInt(year)
      const parsedMonth = parseInt(month)

      if (isNaN(parsedYear) || isNaN(parsedMonth)) {
        return handleHttpError(
          res,
          'Both "year" and "month" parameters are required and must be numbers. Example: ?year=2025&month=03',
          400
        )
      }

      if (parsedMonth < 1 || parsedMonth > 12) {
        return handleHttpError(
          res,
          'The "month" parameter must be between 1 and 12. Example: ?month=07 for July',
          400
        )
      }

      const currentYear = new Date().getFullYear()
      if (parsedYear < 1900 || parsedYear > currentYear + 1) {
        return handleHttpError(
          res,
          `The "year" parameter must be between 1900 and ${currentYear + 1}`,
          400
        )
      }

      // Build date range for the selected month
      const startDate = `${parsedYear}-${String(parsedMonth).padStart(2, '0')}-01`
      const nextMonth = new Date(`${startDate}T00:00:00Z`)
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      const yyyy = nextMonth.getFullYear()
      const mm = String(nextMonth.getMonth() + 1).padStart(2, '0')
      const endDate = `${yyyy}-${mm}-01`

      // Base URL (INGV doesn’t support offset pagination)
      const baseUrl = `${urlINGV}?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`

      // Fetch data
      const data = await fetchINGV(baseUrl)
      const allFeatures = data.features || []
      const totalCount = allFeatures.length

      // Pagination logic
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedFeatures = allFeatures.slice(startIndex, endIndex)

      // Increment monitoring metrics (optional)
      eventsProcessed.inc(paginatedFeatures.length || 0)

      // Process results
      const result = processFeatures(paginatedFeatures, req.query, {
        defaultSort: '-time',
        sortWhitelist: ['time', 'magnitude', 'depth'],
        fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
      })

      const totalPages = Math.ceil(totalCount / limit)
      const message = `Earthquake events for ${parsedYear}-${String(parsedMonth).padStart(2, '0')}`

      // Return successful response
      res.status(200).json({
        ...buildResponse(
          req,
          message,
          result.items
        ),
        totalEarthquakes: totalCount,
        pagination: {
          page,
          totalPages,
          limit,
          hasMore: page < totalPages
        }
      })
    } catch (error) {
      console.error('Error retrieving earthquakes by month:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Get seismic events filtered by Italian region (from start of year until today).
 *
 * @route GET /earthquakes/region
 * @query {string} region - Region name (case-insensitive).
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesByRegion = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const urlINGV = process.env.URL_INGV
      const { region } = req.query
      const limit = getPositiveInt(req.query, 'limit', { def: 50 })
      const page = getPositiveInt(req.query, 'page', { def: 1 })

      // Validate region parameter
      if (!region || typeof region !== 'string' || !region.trim()) {
        return handleHttpError(
          res,
          'The "region" parameter is required and must be a valid string. Example: ?region=Calabria',
          400
        )
      }

      const normalizedRegion = region.toLowerCase().trim()
      const boundingBox = regionBoundingBoxes[normalizedRegion]

      if (!boundingBox) {
        return handleHttpError(
          res,
          `Region "${region}" is not supported. Please provide a valid Italian region.`,
          400
        )
      }

      // Validate pagination parameters
      if (limit === null || limit <= 0) {
        return handleHttpError(
          res,
          'The "limit" parameter must be a positive integer greater than 0. Example: ?limit=50',
          400
        )
      }

      if (page === null || page <= 0) {
        return handleHttpError(
          res,
          'The "page" parameter must be a positive integer greater than 0. Example: ?page=2',
          400
        )
      }

      const { minlatitude, maxlatitude, minlongitude, maxlongitude } = boundingBox

      // Time range: from start of current year to today
      const today = new Date()
      const startOfYear = new Date(today.getFullYear(), 0, 1)
      const startDate = startOfYear.toISOString().split('T')[0]
      const endDate = today.toISOString().split('T')[0]

      // Build INGV query URL
      const baseUrl = `${urlINGV}?minlatitude=${minlatitude}&maxlatitude=${maxlatitude}&minlongitude=${minlongitude}&maxlongitude=${maxlongitude}&starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`

      // Fetch all events (INGV doesn't support pagination)
      const data = await fetchINGV(baseUrl)
      const allFeatures = data.features || []
      const totalCount = allFeatures.length

      // Manual pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedFeatures = allFeatures.slice(startIndex, endIndex)

      // Increment Prometheus metric (optional)
      eventsProcessed.inc(paginatedFeatures.length || 0)

      // Process data
      const result = processFeatures(paginatedFeatures, req.query, {
        defaultSort: '-time',
        sortWhitelist: ['time', 'magnitude', 'depth'],
        fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
      })

      const totalPages = Math.ceil(totalCount / limit)
      const message = `Earthquake events detected in the region "${region}" from ${startDate} to ${endDate}`

      // Send response
      res.status(200).json({
        ...buildResponse(
          req,
          message,
          result.items
        ),
        totalEarthquakes: totalCount,
        pagination: {
          page,
          totalPages,
          limit,
          hasMore: page < totalPages
        }
      })
    } catch (error) {
      console.error('Error retrieving earthquakes by region:', error.message)
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
      const limit = getPositiveInt(req.query, 'limit', { def: 50 })
      const page = getPositiveInt(req.query, 'page', { def: 1 })
      const { depth } = req.query

      if (depth === undefined) {
        return handleHttpError(
          res,
          'The depth parameter is required and must be a positive number greater than 0',
          400
        )
      }

      if (limit === null) {
        return handleHttpError(
          res,
          'The limit parameter must be a positive integer greater than 0. Example: ?limit=50',
          400
        )
      }

      if (page <= 0) {
        return handleHttpError(
          res,
          'The page parameter must be a positive integer greater than 0. Example: ?page=2',
          400
        )
      }

      const depthValue = parseFloat(depth)
      if (isNaN(depthValue) || depthValue <= 0) {
        return handleHttpError(res, 'The depth parameter must be a positive number greater than 0', 400)
      }

      const today = new Date()
      const startOfYear = new Date(today.getFullYear(), 0, 1)
      const startDate = startOfYear.toISOString().split('T')[0]
      const endDate = today.toISOString().split('T')[0]

      // Base URL (full dataset from INGV for current year)
      const baseUrl = `${urlINGV}?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`

      // Fetch all earthquakes from INGV (they don’t support offset pagination)
      const data = await fetchINGV(baseUrl)
      const allFeatures = data.features || []

      // Filter earthquakes by magnitude
      const filteredFeatures = allFeatures.filter(
        (feature) => feature.geometry.coordinates[2] >= depthValue
      )

      const totalCount = filteredFeatures.length
      const totalPages = Math.ceil(totalCount / limit)

      // Manual pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedFeatures = filteredFeatures.slice(startIndex, endIndex)

      // Increment metrics for monitoring (optional)
      eventsProcessed.inc(paginatedFeatures.length || 0)

      // Process only paginated data
      const result = processFeatures(paginatedFeatures, req.query, {
        defaultSort: '-time',
        sortWhitelist: ['time', 'magnitude', 'depth'],
        fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
      })

      const message = `Earthquake events with depth > ${depthValue} km`

      // Send successful response with data and pagination info
      res.status(200).json({
        ...buildResponse(
          req,
          message,
          result.items
        ),
        totalEarthquakes: totalCount,
        pagination: {
          page,
          totalPages,
          limit,
          hasMore: page < totalPages
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
 * NOTE: Get seismic events within a date range, with optional filters and pagination.
 *
 * @route GET /earthquakes/range
 * @query {string} startdate - Start date (YYYY-MM-DD).
 * @query {string} enddate - End date (YYYY-MM-DD).
 * @query {number} [minmag] - Minimum magnitude filter.
 * @query {number} [maxdepth] - Maximum depth filter (in km).
 * @query {number} [limit=50] - Number of results per page.
 * @query {number} [page=1] - Page number (starting from 1).
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesByDateRange = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const urlINGV = process.env.URL_INGV
      const limit = getPositiveInt(req.query, 'limit', { def: 50 })
      const page = getPositiveInt(req.query, 'page', { def: 1 })
      const { startdate, enddate, minmag, maxdepth } = req.query

      // 🔹 Validation: limit & page
      if (limit === null || limit <= 0) {
        return handleHttpError(
          res,
          'The "limit" parameter must be a positive integer greater than 0. Example: ?limit=50',
          400
        )
      }

      if (page === null || page <= 0) {
        return handleHttpError(
          res,
          'The "page" parameter must be a positive integer greater than 0. Example: ?page=2',
          400
        )
      }

      // 🔹 Validation: dates
      if (!startdate || !enddate) {
        return handleHttpError(
          res,
          'Both "startdate" and "enddate" parameters are required. Example: ?startdate=2024-01-01&enddate=2024-01-31',
          400
        )
      }

      const isoRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!isoRegex.test(startdate) || !isoRegex.test(enddate)) {
        return handleHttpError(
          res,
          'Invalid date format. Use ISO format: YYYY-MM-DD. Example: ?startdate=2024-01-01',
          400
        )
      }

      const start = new Date(startdate)
      const end = new Date(enddate)
      if (start > end) {
        return handleHttpError(
          res,
          '"startdate" must be earlier than or equal to "enddate".',
          400
        )
      }

      // 🔹 Build base URL
      const baseUrl = `${urlINGV}?starttime=${startdate}&endtime=${enddate}&orderby=time&format=geojson`

      // Fetch all events for the given range
      const data = await fetchINGV(baseUrl)
      let features = data.features || []

      // 🔹 Apply filters
      if (minmag) {
        const magValue = parseFloat(minmag)
        if (isNaN(magValue) || magValue < 0) {
          return handleHttpError(res, '"minmag" must be a positive number.', 400)
        }
        features = features.filter(f => f.properties.mag >= magValue)
      }

      if (maxdepth) {
        const depthValue = parseFloat(maxdepth)
        if (isNaN(depthValue) || depthValue < 0) {
          return handleHttpError(res, '"maxdepth" must be a positive number.', 400)
        }
        features = features.filter(f => f.properties.depth <= depthValue)
      }

      // Pagination logic
      const totalCount = features.length
      const totalPages = Math.ceil(totalCount / limit)
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit

      const paginatedFeatures = features.slice(startIndex, endIndex)

      eventsProcessed.inc(paginatedFeatures.length || 0)

      // Process paginated results
      const result = processFeatures(paginatedFeatures, req.query, {
        defaultSort: '-time',
        sortWhitelist: ['time', 'magnitude', 'depth'],
        fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
      })

      const message = `Earthquake events between ${startdate} and ${enddate}${
        minmag ? ` with magnitude ≥ ${minmag}` : ''
      }${maxdepth ? ` and depth ≤ ${maxdepth} km` : ''}`

      // Build response
      res.status(200).json({
        ...buildResponse(
          req,
          message,
          result.items
        ),
        totalEarthquakes: totalCount,
        pagination: {
          page,
          limit,
          totalPages,
          hasMore: page < totalPages
        }
      })
    } catch (error) {
      console.error('Error retrieving earthquakes by date range:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Get seismic events filtered by magnitude with pagination.
 *
 * @route GET /earthquakes/magnitude
 * @query {number} mag - Minimum magnitude threshold.
 * @query {number} [page=1] - Page number (must be positive).
 * @query {number} [limit=50] - Number of results per page (must be positive).
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesByMagnitude = ({ buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const urlINGV = process.env.URL_INGV
      const limit = getPositiveInt(req.query, 'limit', { def: 50 })
      const page = getPositiveInt(req.query, 'page', { def: 1 })
      const { mag } = req.query

      if (limit === null || limit <= 0) {
        return handleHttpError(
          res,
          'The "limit" parameter must be a positive integer greater than 0. Example: ?limit=50',
          400
        )
      }

      if (page === null || page <= 0) {
        return handleHttpError(
          res,
          'The "page" parameter must be a positive integer greater than 0. Example: ?page=2',
          400
        )
      }

      if (mag === undefined) {
        return handleHttpError(
          res,
          'The "mag" parameter is required and must be a positive number greater than 0.',
          400
        )
      }

      const magValue = parseFloat(mag)
      if (isNaN(magValue) || magValue <= 0) {
        return handleHttpError(
          res,
          'The "mag" parameter must be a positive number greater than 0.',
          400
        )
      }

      const today = new Date()
      const startOfYear = new Date(today.getFullYear(), 0, 1)
      const startDate = startOfYear.toISOString().split('T')[0]
      const endDate = today.toISOString().split('T')[0]

      // Base URL to fetch data
      const baseUrl = `${urlINGV}?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`

      // Fetch all earthquakes from INGV (they don’t support offset pagination)
      const data = await fetchINGV(baseUrl)
      const allFeatures = data.features || []

      // Filter earthquakes by magnitude
      const filteredFeatures = allFeatures.filter(
        (feature) => feature.properties.mag > magValue
      )

      const totalCount = filteredFeatures.length
      const totalPages = Math.ceil(totalCount / limit)

      // Manual pagination
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedFeatures = filteredFeatures.slice(startIndex, endIndex)

      // Increment monitoring metric
      eventsProcessed.inc(paginatedFeatures.length || 0)

      // Process paginated results
      const result = processFeatures(paginatedFeatures, req.query, {
        defaultSort: '-time',
        sortWhitelist: ['time', 'magnitude', 'depth'],
        fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
      })

      const message = `Earthquake events with magnitude > ${magValue}`

      // Response with pagination metadata
      res.status(200).json({
        ...buildResponse(
          req,
          message,
          result.items
        ),
        totalEarthquakes: totalCount,
        pagination: {
          page,
          limit,
          totalPages,
          hasMore: page < totalPages
        }
      })
    } catch (error) {
      console.error('Error retrieving earthquakes by magnitude:', error.message)
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

      // Increment monitoring metric
      eventsProcessed.inc()

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
          result.items
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
      const page = getPositiveInt(req.query, 'page', { def: 1 })
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

      if (limit === null) {
        return handleHttpError(
          res,
          'The limit parameter must be a positive integer greater than 0. Example: ?limit=50',
          400
        )
      }

      if (page <= 0) {
        return handleHttpError(
          res,
          'The page parameter must be a positive integer greater than 0. Example: ?page=2',
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
          result.items
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

import { regionBoundingBoxes } from '../config/regionBoundingBoxes.js'
import handleHttpError from '../utils/handleHttpError.js'
import { getPositiveInt } from '../utils/httpQuery.js'
import { processFeatures } from '../utils/processFeatures.js'
import haversine from 'haversine-distance'

/**
 * Build a standardized API response object.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {string} message - Response message.
 * @param {any} data - Data to include in the response.
 * @param {number|null} [total=null] - Optional total count of items.
 * @returns {object} Standardized response object.
 */
const buildResponse = (req, message, data, total = null) => ({
  success: true,
  code: 200,
  status: 'OK',
  message,
  total: total ?? data.features?.length ?? data.length ?? 0,
  data,
  meta: {
    method: req.method.toUpperCase(),
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  }
})

/**
 * Fetch JSON data from the INGV API with error handling.
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
 * Get recent seismic events (from the start of the year until today).
 *
 * @route GET /earthquakes/recent
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
export const getEarthquakesByRecent = async (req, res) => {
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

    let url = `${urlINGV}?orderby=time&starttime=${startOfYear}&endtime=${now}&format=geojson`
    if (limit) url += `&limit=${limit}`

    const data = await fetchINGV(url)
    const result = processFeatures(data.features, req.query, {
      defaultSort: '-time',
      sortWhitelist: ['time', 'magnitude', 'depth'],
      fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
    })

    res.status(200).json({
      ...buildResponse(
        req,
        'Recent seismic events',
        result.items,
        result.totalFetched
      ),
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        limit: result.limit,
        hasMore: result.hasMore
      }
    })
  } catch (error) {
    console.error('Error in the earthquakes/recent controller:', error.message)
    handleHttpError(
      res,
      error.message.includes('HTTP error') ? error.message : undefined
    )
  }
}

/**
 * Get today’s seismic events.
 *
 * @route GET /earthquakes/today
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesByToday = async (req, res) => {
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

    let url = `${urlINGV}?starttime=${dateStr}T00:00:00&endtime=${dateStr}T23:59:59&orderby=time&format=geojson`
    if (limit) url += `&limit=${limit}`

    const data = await fetchINGV(url)
    const result = processFeatures(data.features, req.query, {
      defaultSort: '-time',
      sortWhitelist: ['time', 'magnitude', 'depth'],
      fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
    })

    res.status(200).json({
      ...buildResponse(
        req,
        'Seismic events for today',
        result.items,
        result.totalFetched
      ),
      pagination: {
        page: result.page,
        limit: result.limit,
        hasMore: result.hasMore
      }
    })
  } catch (error) {
    console.error('Error in the earthquakes/today controller:', error.message)
    handleHttpError(
      res,
      error.message.includes('HTTP error') ? error.message : undefined
    )
  }
}

/**
 * Get seismic events from the last 7 days.
 *
 * @route GET /earthquakes/last-week
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesByLastWeek = async (req, res) => {
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

    let url = `${urlINGV}?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`
    if (limit) url += `&limit=${limit}`

    const data = await fetchINGV(url)
    const result = processFeatures(data.features, req.query, {
      defaultSort: '-time',
      sortWhitelist: ['time', 'magnitude', 'depth'],
      fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
    })

    res.status(200).json({
      ...buildResponse(
        req,
        `Seismic events from ${startDate} to ${endDate}`,
        result.items,
        result.totalFetched
      ),
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        limit: result.limit,
        hasMore: result.hasMore
      }
    })
  } catch (error) {
    console.error(
      'Error in the earthquakes/last-week controller:',
      error.message
    )
    handleHttpError(
      res,
      error.message.includes('HTTP error') ? error.message : undefined
    )
  }
}

/**
 * Get seismic events for a specific month.
 *
 * @route GET /earthquakes/month
 * @query {number} year - Year in YYYY format.
 * @query {number} month - Month in MM format.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesByMonth = async (req, res) => {
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

    let url = `${urlINGV}?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`
    if (limit) url += `&limit=${limit}`

    const data = await fetchINGV(url)
    const result = processFeatures(data.features, req.query, {
      defaultSort: '-time',
      sortWhitelist: ['time', 'magnitude', 'depth'],
      fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
    })

    res.status(200).json({
      ...buildResponse(
        req,
        `Seismic events of ${year}-${String(month).padStart(2, '0')}`,
        result.items,
        result.totalFetched
      ),
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        limit: result.limit,
        hasMore: result.hasMore
      }
    })
  } catch (error) {
    console.error('Error in the earthquakes/month controller:', error.message)
    handleHttpError(
      res,
      error.message.includes('HTTP error') ? error.message : undefined
    )
  }
}

/**
 * Get seismic events by Italian region (from start of year until today).
 *
 * @route GET /earthquakes/region
 * @query {string} region - Region name.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesByRegion = async (req, res) => {
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

    let url = `${urlINGV}?minlatitude=${minlatitude}&maxlatitude=${maxlatitude}&minlongitude=${minlongitude}&maxlongitude=${maxlongitude}&starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`
    if (limit) url += `&limit=${limit}`

    const data = await fetchINGV(url)
    const result = processFeatures(data.features, req.query, {
      defaultSort: '-time',
      sortWhitelist: ['time', 'magnitude', 'depth'],
      fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
    })

    res.status(200).json({
      ...buildResponse(
        req,
        `Seismic events in region ${region} from ${startDate} to ${endDate}`,
        result.items,
        result.totalFetched
      ),
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        limit: result.limit,
        hasMore: result.hasMore
      }
    })
  } catch (error) {
    console.error('Error in the earthquakes/region controller:', error.message)
    handleHttpError(
      res,
      error.message.includes('HTTP error') ? error.message : undefined
    )
  }
}

/**
 * Get seismic events filtered by depth (from start of year until today).
 *
 * @route GET /earthquakes/depth
 * @query {number} depth - Minimum depth in km.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesByDepth = async (req, res) => {
  try {
    const urlINGV = process.env.URL_INGV
    const { depth } = req.query

    // Depth è obbligatorio
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

    // Costruzione URL
    let url = `${urlINGV}?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`
    if (limit) url += `&limit=${limit}`

    const data = await fetchINGV(url)
    let { features } = data

    // Filtro per profondità maggiore di depthValue
    features = features.filter(feature => feature.geometry.coordinates[2] > depthValue)

    const result = processFeatures(features, req.query, {
      defaultSort: '-time',
      sortWhitelist: ['time', 'magnitude', 'depth'],
      fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
    })

    res.status(200).json({
      ...buildResponse(req, `Seismic events with depth > ${depthValue} km`, result.items, result.totalFetched),
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        limit: result.limit,
        hasMore: result.hasMore
      }
    })
  } catch (error) {
    console.error('Error in the earthquakes/depth controller:', error.message)
    handleHttpError(res, error.message.includes('HTTP error') ? error.message : undefined)
  }
}

/**
 * Get seismic events within a date range.
 *
 * @route GET /earthquakes/range
 * @query {string} startdate - Start date (YYYY-MM-DD).
 * @query {string} enddate - End date (YYYY-MM-DD).
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesByDateRange = async (req, res) => {
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

    let url = `${urlINGV}?starttime=${startdate}&endtime=${enddate}&orderby=time&format=geojson`
    if (limit) url += `&limit=${limit}`

    const data = await fetchINGV(url)
    const result = processFeatures(data.features, req.query, {
      defaultSort: '-time',
      sortWhitelist: ['time', 'magnitude', 'depth'],
      fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
    })

    res.status(200).json({
      ...buildResponse(
        req,
        `Seismic events between ${startdate} and ${enddate}`,
        result.items,
        result.totalFetched
      ),
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        limit: result.limit,
        hasMore: result.hasMore
      }
    })
  } catch (error) {
    console.error(
      'Error in the earthquakes/range-time controller:',
      error.message
    )
    handleHttpError(
      res,
      error.message.includes('HTTP error') ? error.message : undefined
    )
  }
}

/**
 * Get seismic events filtered by magnitude.
 *
 * @route GET /earthquakes/magnitude
 * @query {number} mag - Minimum magnitude threshold.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesByMagnitude = async (req, res) => {
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

    const limit = getPositiveInt(req.query, 'limit', { def: 50 })
    if (limit === null) {
      return handleHttpError(
        res,
        'The limit parameter must be a positive integer greater than 0. Example: ?limit=50',
        400
      )
    }

    const today = new Date()
    const startOfYear = new Date(today.getFullYear(), 0, 1)
    const startDate = startOfYear.toISOString().split('T')[0]
    const endDate = today.toISOString().split('T')[0]

    // Costruzione URL
    let url = `${urlINGV}?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson&limit=${limit}`
    url += `&minmagnitude=${magValue}`

    const data = await fetchINGV(url)

    const result = processFeatures(data.features, req.query, {
      defaultSort: '-time',
      sortWhitelist: ['time', 'magnitude', 'depth'],
      fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
    })

    res.status(200).json({
      ...buildResponse(
        req,
        `Seismic events with magnitude > ${magValue}`,
        result.items,
        result.totalFetched
      ),
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        limit: result.limit,
        hasMore: result.hasMore
      }
    })
  } catch (error) {
    console.error(
      'Error in the earthquakes/magnitude controller:',
      error.message
    )
    handleHttpError(
      res,
      error.message.includes('HTTP error') ? error.message : undefined
    )
  }
}

/**
 * Get a seismic event by its eventId.
 *
 * @route GET /earthquakes/id
 * @query {number} eventId - Unique event ID.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesById = async (req, res) => {
  try {
    const urlINGV = process.env.URL_INGV
    const { eventId } = req.query

    const today = new Date()
    const startOfYear = new Date(today.getFullYear(), 0, 1)
    const startDate = startOfYear.toISOString().split('T')[0]
    const endDate = today.toISOString().split('T')[0]

    const url = `${urlINGV}?starttime=${startDate}&endtime=${endDate}&format=geojson`
    const data = await fetchINGV(url)
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

    res.status(200).json({
      ...buildResponse(
        req,
        `Seismic event with id ${eventId}`,
        result.items,
        result.totalFetched
      )
    })
  } catch (error) {
    console.error(
      'Error in the earthquakes/eventId controller:',
      error.message
    )
    handleHttpError(
      res,
      error.message.includes('HTTP error') ? error.message : undefined
    )
  }
}

/**
 * Get seismic events near a specific geographic location.
 *
 * @route GET /earthquakes/location
 * @query {number} latitude - Latitude in decimal degrees.
 * @query {number} longitude - Longitude in decimal degrees.
 * @query {number} [radius=50] - Search radius in km (default 50 km).
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getEarthquakesLocation = async (req, res) => {
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

    // Endpoint INGV
    const url = `${urlINGV}?starttime=${startOfYear}&endtime=${endOfToday}&minlatitude=${minLat}&maxlatitude=${maxLat}&minlongitude=${minLon}&maxlongitude=${maxLon}&orderby=time&format=geojson&limit=${limit}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(
        `HTTP error from INGV source: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()
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

    const message = `Seismic events near [${lat}, ${lon}] within ${radiusNum} km from ${startOfYear} to today`

    res.status(200).json({
      ...buildResponse(req, message, result.items, result.totalFetched),
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        limit: result.limit,
        hasMore: result.hasMore
      }
    })
  } catch (error) {
    console.error(
      'Error in the earthquakes/location controller:',
      error.message
    )
    handleHttpError(
      res,
      error.message.includes('HTTP error') ? error.message : undefined
    )
  }
}

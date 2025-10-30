import express from 'express'
import {
  getEarthquakesByMonth,
  getEarthquakesByRegion,
  getEarthquakesByDateRange,
  getEarthquakesByDepth,
  getEarthquakesByLastWeek,
  getEarthquakesByMagnitude,
  getEarthquakesByRecent,
  getEarthquakesByToday,
  getEarthquakesById,
  getEarthquakesLocation
} from '../controllers/earthquakesControllers.js'
import { buildResponse } from '../utils/buildResponse.js'
import handleHttpError from '../utils/handleHttpError.js'

const router = express.Router()

// NOTE: CATEGORY -> Earthquakes

// NOTE: Retrieve the complete list of the most recent earthquake events
router.get('/recent', getEarthquakesByRecent({ buildResponse, handleHttpError }))

// NOTE: Retrieve all earthquake events that occurred today
router.get('/today', getEarthquakesByToday({ buildResponse, handleHttpError }))

// NOTE: Retrieve all earthquake events from the last 7 days
router.get('/last-week', getEarthquakesByLastWeek({ buildResponse, handleHttpError }))

// NOTE: Retrieve all earthquake events for a specific month (e.g., March 2025)
router.get('/month', getEarthquakesByMonth({ buildResponse, handleHttpError }))

// NOTE: Retrieve earthquake events near a specific latitude/longitude
router.get('/location', getEarthquakesLocation({ buildResponse, handleHttpError }))

// NOTE: Retrieve earthquake events by geographic region (e.g., Calabria)
router.get('/region', getEarthquakesByRegion({ buildResponse, handleHttpError }))

// NOTE: Filter earthquake events by depth (e.g., deeper than 100 km)
router.get('/depth', getEarthquakesByDepth({ buildResponse, handleHttpError }))

// NOTE: Filter earthquake events by date range (startDate and endDate)
router.get('/range-time', getEarthquakesByDateRange({ buildResponse, handleHttpError }))

// NOTE: Filter earthquake events by magnitude (e.g., ≥ 4.0)
router.get('/magnitude', getEarthquakesByMagnitude({ buildResponse, handleHttpError }))

// NOTE: Retrieve detailed information for a specific earthquake event by its ID
router.get('/eventId', getEarthquakesById({ buildResponse, handleHttpError }))

export default router

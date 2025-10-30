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

// NOTE: CATEGORIA -> Terremoti

// NOTE: lista completa eventi sismici più recenti
router.get('/recent', getEarthquakesByRecent({ buildResponse, handleHttpError }))

// NOTE: lista completa eventi sismici della data odierna
router.get('/today', getEarthquakesByToday({ buildResponse, handleHttpError }))

// NOTE: lista completa eventi sismici dell'ultima settimana
router.get('/last-week', getEarthquakesByLastWeek({ buildResponse, handleHttpError }))

// NOTE: lista completa eventi sismici per mese specifico (es. marzo 2025)
router.get('/month', getEarthquakesByMonth({ buildResponse, handleHttpError }))

// NOTE: cerca eventi sismici vicino a latitudine/longitudine specifica
router.get('/location', getEarthquakesLocation({ buildResponse, handleHttpError }))

// NOTE: lista completa eventi sismici per regione geografica (es. Calabria)
router.get('/region', getEarthquakesByRegion({ buildResponse, handleHttpError }))

// NOTE: filtra eventi sismici per profondità (es. > 100Km)
router.get('/depth', getEarthquakesByDepth({ buildResponse, handleHttpError }))

// NOTE: filtra eventi sismici per un intervallo di tempo startdate e enddate
router.get('/range-time', getEarthquakesByDateRange({ buildResponse, handleHttpError }))

// NOTE: filtra eventi sismici per magnitudo (es. 4.0)
router.get('/magnitude', getEarthquakesByMagnitude({ buildResponse, handleHttpError }))

// NOTE: dettagli di un singolo evento sismico specifico
router.get('/eventId', getEarthquakesById({ buildResponse, handleHttpError }))

export default router

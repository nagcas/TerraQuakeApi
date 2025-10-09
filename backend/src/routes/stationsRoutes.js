import express from 'express'

const router = express.Router()

// NOTE: CATEGORY -> Seismic stations in Italy

// NOTE: List and details of active seismic stations
// GET / — retrieves a list of seismic stations and their details
router.get('/')

// NOTE: Returns a single seismic station by code
// GET /:code — retrieves details of a specific seismic station identified by its code
router.get('/:code')

// NOTE: Returns all seismic stations in GeoJSON format (for mapping purposes)
// GET /geojson — provides GeoJSON data of all seismic stations
router.get('/geojson')

// NOTE: Lists active stations
// GET /status/open — retrieves a list of seismic stations that are currently active
router.get('/status/open')

// NOTE: Lists closed stations
// GET /status/closed — retrieves a list of seismic stations that are currently closed
router.get('/status/closed')

// NOTE: Statistics about seismic stations (e.g., total, active, by network)
// GET /statistics — provides statistical summaries for seismic stations
router.get('/statistics')

export default router

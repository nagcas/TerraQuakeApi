import express from 'express'

const router = express.Router()

// NOTE: CATEGORY -> Statistics

// NOTE: Global statistics (totals, averages, peak values)
// GET /stats/global — retrieves aggregated seismic statistics
router.get('/stats/global')

// NOTE: Seismic statistics by region
// GET /stats/region/:region — retrieves seismic statistics for a specific region
router.get('/stats/region/:region')

// NOTE: Seismic statistics by year
// GET /stats/yearly/:year — retrieves seismic statistics for a specific year
router.get('/stats/yearly/:year')

// NOTE: Data for creating a heatmap (coordinates + magnitude)
// GET /stats/heatmap — retrieves seismic event data for visualization
router.get('/stats/heatmap')

export default router

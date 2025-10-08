// NOTE: Router for metrics endpoint
// This module exposes a single GET /metrics route
// used to provide Prometheus-compatible metrics for monitoring and analysis.

import express from 'express'
import { getMetrics, getMetricsJSON } from '../controllers/metricsControllers.js'

const router = express.Router()

// NOTE: GET /metrics endpoint
// Returns system and API performance metrics collected by prom-client
router.get('/metrics', getMetrics)

router.get('/metrics/json', getMetricsJSON)

export default router

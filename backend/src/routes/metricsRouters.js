// NOTE: Router for metrics endpoint
// This module exposes a single GET /metrics route
// used to provide Prometheus-compatible metrics for monitoring and analysis.

import express from 'express'
import { getMetrics, getMetricsJSON } from '../controllers/metricsControllers.js'
import { adminMiddleware } from '../middleware/adminMiddlewares.js'

const router = express.Router()

// NOTE: GET /metrics endpoint
// Returns system and API performance metrics collected by prom-client
// SECURED: Admin-only access to system metrics
router.get('/metrics', adminMiddleware, getMetrics)

// SECURED: Admin-only access to JSON metrics
router.get('/metrics/json', adminMiddleware, getMetricsJSON)

export default router

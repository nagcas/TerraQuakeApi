// NOTE: Router for metrics endpoint
// This module exposes a single GET /metrics route
// used to provide Prometheus-compatible metrics for monitoring and analysis.

import express from 'express'
import { getMetrics, getMetricsJSON } from '../controllers/metricsControllers.js'
import Metrics from '../models/metricsModels.js'
import { buildResponse } from '../utils/buildResponse.js'
import handleHttpError from '../utils/handleHttpError.js'

const router = express.Router()

// NOTE: GET /metrics endpoint
// Returns system and API performance metrics collected by prom-client
router.get('/metrics', getMetrics)

// NOTE: GET /metrics/json endpoint
// Returns system and API performance JSON metrics
router.get('/metrics/json', getMetricsJSON({ Metrics, buildResponse, handleHttpError }))

export default router

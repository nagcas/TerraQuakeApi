// middleware/metrics.js
import promClient from 'prom-client'

// Collects default Node.js metrics every 5 seconds (CPU, memory, etc.)
promClient.collectDefaultMetrics({ timeout: 5000 })

// NOTE: Custom metric: total number of processed earthquake events
export const eventsProcessed = new promClient.Counter({
  name: 'terraquake_events_processed_total',
  help: 'Total number of earthquake events processed by TerraQuake API'
})

// NOTE: Custom metric: API latency measurement (in seconds)
// Buckets define the latency intervals used for histogram aggregation
export const apiLatencyHistogram = new promClient.Histogram({
  name: 'terraquake_api_latency_seconds',
  help: 'API response latency in seconds',
  buckets: [0.05, 0.1, 0.2, 0.5, 1, 2]
})

// NOTE: Middleware to automatically measure latency for all requests
// It starts a timer when the request begins and stops it when the response is sent
export const metricsMiddleware = (req, res, next) => {
  const end = apiLatencyHistogram.startTimer()
  res.on('finish', () => {
    end()
  })
  next()
}

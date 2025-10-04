import promClient from 'prom-client'

const buildResponse = (req, message, data) => ({
  success: true,
  code: 200,
  status: 'OK',
  message,
  data,
  meta: {
    method: req.method.toUpperCase(),
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  }
})

// Controller that handles the /metrics endpoint
// It outputs all collected metrics in a format readable by Prometheus
export const getMetrics = async (req, res) => {
  try {
    // Set the correct content type for Prometheus
    res.set('Content-Type', promClient.register.contentType)

    // Send all collected metrics (default + custom)
    res.end(await promClient.register.metrics())
  } catch (err) {
    // Handle and log any potential error
    res.status(500).json({ error: err.message })
  }
}

export const getMetricsJSON = async (req, res) => {
  try {
    const metrics = {
      eventsProcessed: promClient.register.getSingleMetric('terraquake_events_processed_total').hashMap[''].value,
      apiLatencyAvg: promClient.register.getSingleMetric('terraquake_api_latency_seconds').sum /
                     promClient.register.getSingleMetric('terraquake_api_latency_seconds').count || 0,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage().rss
    }

    res.status(200).json({
      ...buildResponse(
        req,
        'Metrics JSON TerraQuake API',
        metrics
      )
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

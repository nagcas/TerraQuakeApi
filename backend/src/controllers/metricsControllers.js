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

// NOTE: Controller that handles the /metrics endpoint
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
    const latencyMetric = promClient.register.getSingleMetric('terraquake_api_latency_seconds')
    const sum = latencyMetric?.hashMap?.['']?.sum || 0 // total latency in seconds
    const count = latencyMetric?.hashMap?.['']?.count || 0

    const apiLatencyAvgMs = count > 0 ? (sum / count) * 1000 : 0 // convert seconds → ms

    const metrics = {
      eventsProcessed: promClient.register.getSingleMetric('terraquake_events_processed_total')?.hashMap?.['']?.value || 0,
      apiLatencyAvgMs: Number(apiLatencyAvgMs.toFixed(2)), // ms with 2 decimals
      uptime: Number(process.uptime().toFixed(2)),
      memoryUsage: process.memoryUsage().rss
    }

    console.log(metrics)

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

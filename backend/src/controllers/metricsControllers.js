import promClient from 'prom-client'

// NOTE: Controller that handles the /metrics endpoint
// It outputs all collected metrics in a format readable by Prometheus
export const getMetrics = async (req, res) => {
  try {
    // Set the correct content type for Prometheus
    res.set('Content-Type', promClient.register.contentType)

    // Send all collected metrics (default + custom)
    res.end(await promClient.register.metrics())
  } catch (error) {
    // Log error to the server console
    console.error('Error in getMetrics controller:', error.message)
    // Handle and log any potential error
    res.status(500).json({ error: error.message })
  }
}

export const getMetricsJSON = ({ Metrics, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      // Get latency metric from Prometheus
      const latencyMetric =
        promClient.register.getSingleMetric('terraquake_api_latency_seconds')

      const sum = latencyMetric?.hashMap?.['']?.sum || 0
      const count = latencyMetric?.hashMap?.['']?.count || 0
      const apiLatencyAvgMs = count > 0 ? (sum / count) * 1000 : 0

      // Get events processed from Prometheus counter (monotonic)
      const eventsProcessedItems =
        promClient.register
          .getSingleMetric('terraquake_events_processed_total')
          ?.hashMap?.['']?.value || 0

      const uptime = Number(process.uptime().toFixed(2))
      const memoryUsage = process.memoryUsage().rss

      // Ensure a single metrics document exists
      let metricsItem = await Metrics.findOne()
      if (!metricsItem) {
        metricsItem = await Metrics.create({
          eventsProcessed: 0,
          totalEventsProcessed: 0
        })
      }

      // Calculate delta since last snapshot
      const diff = eventsProcessedItems - metricsItem.eventsProcessed

      // Handle counter reset (process restart)
      const increment = diff >= 0 ? diff : eventsProcessedItems

      // Persist metrics (NO RESET)
      const updatedMetrics = await Metrics.findOneAndUpdate(
        {},
        {
          $inc: { totalEventsProcessed: increment },
          $set: {
            eventsProcessed: eventsProcessedItems, // snapshot only
            apiLatencyAvgMs,
            uptime,
            memoryUsage
          }
        },
        { new: true, upsert: true }
      )

      res.status(200).json(
        buildResponse(req, 'Metrics JSON TerraQuake API', {
          eventsProcessed: updatedMetrics.eventsProcessed,
          totalEventsProcessed: updatedMetrics.totalEventsProcessed,
          apiLatencyAvgMs: Number(apiLatencyAvgMs.toFixed(2)),
          uptime,
          memoryUsage
        })
      )
    } catch (error) {
      console.error('Error in getMetricsJSON', {
        message: error.message,
        stack: error.stack
      })
      handleHttpError(res)
    }
  }
}

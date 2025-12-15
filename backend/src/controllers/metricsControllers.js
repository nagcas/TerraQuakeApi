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
      // -------------------------------
      // 1. Read Prometheus monotonic counter
      // -------------------------------
      const counterValue =
        promClient.register
          .getSingleMetric('terraquake_events_processed_total')
          ?.hashMap?.['']?.value || 0

      // -------------------------------
      // 2. Ensure a metrics document exists
      // -------------------------------
      let metricsItem = await Metrics.findOne()
      if (!metricsItem) {
        metricsItem = await Metrics.create({
          totalEventsProcessed: 0,
          lastCounterSnapshot: 0,
          apiLatencyAvgMs: 0,
          uptime: 0,
          memoryUsage: 0
        })
      }

      // -------------------------------
      // 3. Calculate delta since last snapshot
      // -------------------------------
      const lastSnapshot = metricsItem.lastCounterSnapshot || 0
      const delta = counterValue - lastSnapshot >= 0 ? counterValue - lastSnapshot : counterValue

      // -------------------------------
      // 4. Accumulate delta in totalEventsProcessed
      // -------------------------------
      metricsItem.totalEventsProcessed += delta

      // -------------------------------
      // 5. Reset lastCounterSnapshot to 0 for next interval
      // -------------------------------
      metricsItem.lastCounterSnapshot = 0

      // -------------------------------
      // 6. Update runtime metrics
      // -------------------------------
      const latencyMetric =
        promClient.register.getSingleMetric('terraquake_api_latency_seconds')
      const sum = latencyMetric?.hashMap?.['']?.sum || 0
      const count = latencyMetric?.hashMap?.['']?.count || 0
      metricsItem.apiLatencyAvgMs = count > 0 ? (sum / count) * 1000 : 0
      metricsItem.uptime = Number(process.uptime().toFixed(2))
      metricsItem.memoryUsage = process.memoryUsage().rss

      await metricsItem.save()

      // -------------------------------
      // 7. Send JSON response
      // -------------------------------
      res.status(200).json(
        buildResponse(req, 'Metrics JSON TerraQuake API', {
          totalEventsProcessed: metricsItem.totalEventsProcessed,
          delta, // events processed in this call
          apiLatencyAvgMs: Number(metricsItem.apiLatencyAvgMs.toFixed(2)),
          uptime: metricsItem.uptime,
          memoryUsage: metricsItem.memoryUsage
        })
      )
    } catch (error) {
      console.error('Error in getMetricsJSON', error)
      handleHttpError(res)
    }
  }
}

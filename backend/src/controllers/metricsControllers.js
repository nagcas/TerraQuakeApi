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
      // Read Prometheus monotonic counter
      const counterValue =
        promClient.register
          .getSingleMetric('terraquake_events_processed_total')
          ?.hashMap?.['']?.value || 0

      // Atomic DB update to calculate delta and update totals
      const updatedMetrics = await Metrics.findOneAndUpdate(
        {},
        [
          {
            // Calculate delta since last snapshot
            $set: {
              _delta: {
                $cond: [
                  { $gte: [counterValue, { $ifNull: ['$lastCounterSnapshot', 0] }] },
                  { $subtract: [counterValue, { $ifNull: ['$lastCounterSnapshot', 0] }] },
                  counterValue
                ]
              }
            }
          },
          {
            // Apply delta atomically and update snapshots
            $set: {
              totalEventsProcessed: {
                $add: [{ $ifNull: ['$totalEventsProcessed', 0] }, '$_delta']
              },
              intervalEventsProcessed: '$_delta', // resets every read
              lastCounterSnapshot: counterValue
            }
          },
          { $unset: '_delta' } // remove temporary field
        ],
        { new: true, upsert: true }
      )

      // Read Prometheus latency metrics
      const latencyMetric =
        promClient.register.getSingleMetric('terraquake_api_latency_seconds')
      const sum = latencyMetric?.hashMap?.['']?.sum || 0
      const count = latencyMetric?.hashMap?.['']?.count || 0
      const apiLatencyAvgMs = count > 0 ? (sum / count) * 1000 : 0

      // Runtime metrics
      const uptime = Number(process.uptime().toFixed(2))
      const memoryUsage = process.memoryUsage().rss

      // Update metrics fields in DB
      updatedMetrics.apiLatencyAvgMs = apiLatencyAvgMs
      updatedMetrics.uptime = uptime
      updatedMetrics.memoryUsage = memoryUsage
      await updatedMetrics.save()

      // Send JSON response
      res.status(200).json(
        buildResponse(req, 'Metrics JSON TerraQuake API', {
          intervalEventsProcessed: updatedMetrics.intervalEventsProcessed, // resets every call
          totalEventsProcessed: updatedMetrics.totalEventsProcessed, // cumulative
          apiLatencyAvgMs: Number(apiLatencyAvgMs.toFixed(2)),
          uptime,
          memoryUsage
        })
      )
    } catch (error) {
      console.error('Error in getMetricsJSON', error) // log error
      handleHttpError(res) // send generic HTTP error
    }
  }
}

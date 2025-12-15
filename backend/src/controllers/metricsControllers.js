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
      const latencyMetric =
        promClient.register.getSingleMetric('terraquake_api_latency_seconds')

      // Extract sum and count to calculate average latency
      const sum = latencyMetric?.hashMap?.['']?.sum || 0
      const count = latencyMetric?.hashMap?.['']?.count || 0

      // Average latency in milliseconds
      const apiLatencyAvgMs = count > 0 ? (sum / count) * 1000 : 0

      const eventsProcessedItems =
        promClient.register
          .getSingleMetric('terraquake_events_processed_total')
          ?.hashMap?.['']?.value || 0

      // Runtime metrics
      const uptime = Number(process.uptime().toFixed(2))
      const memoryUsage = process.memoryUsage().rss

      const updatedMetrics = await Metrics.findOneAndUpdate(
        {},
        [
          {
            // Compute the increment (delta) since last snapshot
            // If the counter restarted (value < stored snapshot),
            // we treat the current value as the full increment
            $set: {
              _increment: {
                $cond: [
                  { $gte: [eventsProcessedItems, '$eventsProcessed'] },
                  { $subtract: [eventsProcessedItems, '$eventsProcessed'] },
                  eventsProcessedItems
                ]
              }
            }
          },
          {
            // Apply the increment atomically and update the snapshot
            $set: {
              totalEventsProcessed: {
                $add: ['$totalEventsProcessed', '$_increment']
              },
              eventsProcessed: eventsProcessedItems, // snapshot (do NOT reset)
              apiLatencyAvgMs,
              uptime,
              memoryUsage
            }
          },
          {
            // Remove temporary field used for calculation
            $unset: '_increment'
          }
        ],
        {
          new: true,
          upsert: true // Ensure a single metrics document always exists
        }
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
      // Error handling
      console.error('Error in getMetricsJSON', {
        message: error.message,
        stack: error.stack
      })
      handleHttpError(res)
    }
  }
}

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
      const counterValue =
        promClient.register
          .getSingleMetric('terraquake_events_processed_total')
          ?.hashMap?.['']?.value || 0

      const updatedMetrics = await Metrics.findOneAndUpdate(
        {},
        [
          {
            $set: {
              _delta: {
                $cond: [
                  { $gte: [counterValue, '$lastCounterSnapshot'] },
                  { $subtract: [counterValue, '$lastCounterSnapshot'] },
                  counterValue
                ]
              }
            }
          },
          {
            $set: {
              totalEventsProcessed: {
                $add: ['$totalEventsProcessed', '$_delta']
              },
              intervalEventsProcessed: '$_delta',
              lastCounterSnapshot: counterValue
            }
          },
          { $unset: '_delta' }
        ],
        { new: true, upsert: true }
      )

      res.status(200).json(
        buildResponse(req, 'Metrics JSON TerraQuake API', {
          intervalEventsProcessed: updatedMetrics.intervalEventsProcessed,
          totalEventsProcessed: updatedMetrics.totalEventsProcessed
        })
      )
    } catch (error) {
      console.error('Error in getMetricsJSON', error)
      handleHttpError(res)
    }
  }
}

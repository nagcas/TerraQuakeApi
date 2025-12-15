import { Schema, model } from 'mongoose'

// NOTE: Metrics schema
const metricsSchema = new Schema(
  {
    totalEventsProcessed: {
      type: Number,
      default: 0
    }, // cumulative counter
    lastCounterSnapshot: {
      type: Number,
      default: 0
    }, // last Prometheus counter value
    intervalEventsProcessed: {
      type: Number,
      default: 0
    }, // events processed in current interval (resets after read)
    apiLatencyAvgMs: {
      type: Number
    },
    uptime: {
      type: Number
    },
    memoryUsage: {
      type: Number
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'metrics'
  }
)

// Creating the metrics model based on the metricsSchema schema
const Metrics = model('metrics', metricsSchema)

// Exporting the metrics model
export default Metrics

import { Schema, model } from 'mongoose'

// NOTE: Schema matrics
const metricsSchema = new Schema(
  {
    eventsProcessed:
    {
      type: Number,
      default: 0
    },
    totalEventsProcessed:
    {
      type: Number,
      default: 0
    }, // cumulative counter
    apiLatencyAvgMs:
    {
      type: Number
    },
    uptime:
    {
      type: Number
    },
    memoryUsage:
    {
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

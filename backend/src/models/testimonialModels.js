import { Schema, model } from 'mongoose'
import MongooseDelete from 'mongoose-delete'

const testimonialsSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'testimonials'
  }
)

// Plugin soft-delete
testimonialsSchema.plugin(MongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all'
})

// Creating the testiminial model based on the testimonialsSchema schema
const Testimonial = model('testimonials', testimonialsSchema)

// Exporting the contact model
export default Testimonial

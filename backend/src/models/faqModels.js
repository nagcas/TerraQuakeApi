import { Schema, model } from 'mongoose'
import mongooseDelete from 'mongoose-delete'

// NOTE: Schema faq
const faqSchema = new Schema(
  {
    request: {
      type: String
    },
    answer: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'faqs'
  }
)

// Plugin soft-delete
faqSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all'
})

// Creating the contact model based on the contactsSchema schema
const Faq = model('faq', faqSchema)

// Exporting the contact model
export default Faq

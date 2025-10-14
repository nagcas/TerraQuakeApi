import mongoose from 'mongoose'
import MongooseDelete from 'mongoose-delete'

// NOTE: Schema post
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  categories: [
    {
      type: String,
      required: true
    }
  ],
  content: {
    type: String,
    required: true
  },
  tags: [
    {
      type: String
    }
  ]
}, {
  timestamps: true, // adds createdAt and updatedAt
  versionKey: false,
  collection: 'posts'
})

postSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' })

const Post = mongoose.model('Post', postSchema)
export default Post

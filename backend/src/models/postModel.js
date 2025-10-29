import mongoose from 'mongoose'
import MongooseDelete from 'mongoose-delete'
import User from './userModels.js'

// NOTE: Schema post
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  categories: [
    {
      type: String,
      required: true,
      trim: true
    }
  ],
  content: {
    type: String,
    required: true
  },
  readTime: {
    type: String,
    trim: true
  },
  tags: [
    {
      type: String,
      trim: true
    }
  ]
}, {
  timestamps: true,
  versionKey: false,
  collection: 'posts'
})

postSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' })

const Post = mongoose.model('Post', postSchema)

export default Post

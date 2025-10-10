import mongoose from 'mongoose'

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
  timestamps: true // adds createdAt and updatedAt
})

const Post = mongoose.model('Post', postSchema)
export default Post

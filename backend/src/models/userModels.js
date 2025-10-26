import { Schema, model } from 'mongoose'
import MongooseDelete from 'mongoose-delete'
import { encrypt } from '../utils/handlePassword.js'

// NOTE: Schema user
const usersSchema = new Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows null values, required for users without a Google login
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
    avatar: {
      type: String,
      trim: true,
    },
    role: {
      type: ['user', 'admin', 'contributor'],
      default: 'user',
    },
    experience: {
      type: String,
      default: '',
      trim: true,
    },
    student: {
      type: String,
      default: 'No',
      trim: true,
    },
    terms: {
      type: Boolean,
      default: false,
    },
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },
    githubProfileUrl: {
      type: String,
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    portfolio: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'users',
  }
)

usersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await encrypt(this.password)
  next()
})

usersSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' })

const User = model('users', usersSchema)

export default User

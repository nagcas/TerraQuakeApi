import { Schema, model } from 'mongoose'
import MongooseDelete from 'mongoose-delete'
import { encrypt } from '../utils/handlePassword.js'

// NOTE: Schema user
const usersSchema = new Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Ignores null/undefined values, required for users without a Google login
      trim: true,
      default: undefined // Avoid saving empty string
    },
    githubId: {
      type: String,
      unique: true,
      sparse: true, // Ignores null/undefined values
      trim: true,
      default: undefined
    },
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      select: false
    },
    avatar: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    experience: {
      type: String,
      default: '',
      trim: true
    },
    student: {
      type: String,
      default: 'No',
      trim: true
    },
    terms: {
      type: Boolean,
      default: false
    },
    githubProfileUrl: {
      type: String,
      default: ''
    },
    bio: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: '',
      trim: true
    },
    website: {
      type: String,
      default: '',
      trim: true
    },
    portfolio: {
      type: String,
      default: '',
      trim: true
    },
    github: {
      type: String,
      default: '',
      trim: true
    },
    linkedin: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'users'
  }
)

// Encrypt password before saving
usersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await encrypt(this.password)
  next()
})

// Soft delete plugin
usersSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' })

const User = model('users', usersSchema)

export default User

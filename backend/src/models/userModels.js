import { Schema, model } from 'mongoose'
import MongooseDelete from 'mongoose-delete'
import { encrypt } from '../utils/handlePassword.js'

const usersSchema = new Schema(
  {
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
      type: ['user', 'admin', 'contributor'],
      default: 'user'
    },
    experience: {
      type: String,
      trim: true
    },
    student: {
      type: Boolean,
      default: false
    },
    terms: {
      type: Boolean,
      default: false
    },
    githubId: {
      type: String,
      unique: true
    },
    githubProfileUrl: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'users'
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

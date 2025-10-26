import mongoose from 'mongoose'
import User from './src/models/userModels.js'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

dotenv.config()

async function createAdminUser() {
  try {
    // Connect to MongoDB using the same method as the app
    const DB_URI = process.env.DB_URI
    if (!DB_URI) {
      throw new Error('DB_URI environment variable is not set')
    }
    await mongoose.connect(DB_URI)

    // Create a unique email with timestamp
    const timestamp = Date.now()
    const email = `admin${timestamp}@test.com`

    // Hash password
    const hashedPassword = await bcrypt.hash('Admin123!', 12)

    // Create new admin user
    const adminUser = new User({
      name: 'Admin User',
      email: email,
      password: hashedPassword,
      role: ['admin'],
      terms: true,
      experience: 'Expert',
      student: 'No',
    })

    // Remove githubId to avoid duplicate key error
    delete adminUser.githubId

    const savedUser = await adminUser.save()

    console.log('✅ Admin user created successfully!')
    console.log('Email:', savedUser.email)
    console.log('Name:', savedUser.name)
    console.log('Role:', savedUser.role)
    console.log('Password: Admin123!')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

createAdminUser()

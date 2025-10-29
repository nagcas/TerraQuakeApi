import mongoose from 'mongoose'
import User from './src/models/userModels.js'
import dotenv from 'dotenv'

dotenv.config()

async function updateUserToAdmin(email) {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name'
    )

    // Find and update user
    const user = await User.findOneAndUpdate(
      { email: email },
      { role: ['admin'] },
      { new: true }
    )

    if (user) {
      console.log('✅ User updated to admin successfully!')
      console.log('Email:', user.email)
      console.log('Name:', user.name)
      console.log('Role:', user.role)
    } else {
      console.log('❌ User not found with email:', email)
    }

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

// Get email from command line argument
const email = process.argv[2]
if (!email) {
  console.log('Usage: node updateAdmin.js <email>')
  console.log('Example: node updateAdmin.js user@example.com')
  process.exit(1)
}

updateUserToAdmin(email)

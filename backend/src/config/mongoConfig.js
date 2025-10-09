// Import the Mongoose library for MongoDB object modeling
import mongoose from 'mongoose'

// Asynchronous function to establish a MongoDB connection
const dbConnect = async () => {
  try {
    // Retrieve the database URI from environment variables (.env file)
    const DB_URI = process.env.DB_URI

    // Attempt to connect to MongoDB using Mongoose
    const conn = await mongoose.connect(DB_URI)

    // Log a success message including the connected database/app name
    console.log(`MongoDB connected to appName: ${conn.connection.name}`)
  } catch (error) {
    // Log any connection errors for easier debugging
    console.error('MongoDB connection error:', error.message)
  }
}

// Export the database connection function for use in other modules
export default dbConnect

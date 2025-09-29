import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import expressListEndpoints from 'express-list-endpoints'

import routeAuth from './routes/authRoutes.js'
import routeUsers from './routes/usersRoutes.js'
import routeContact from './routes/contactRoutes.js'
import routeGetStart from './routes/testRoutes.js'
import routeEarthquakes from './routes/earthquakesRoutes.js'
import dbConnect from './config/mongoConfig.js'
import { authenticateUser } from './middleware/authMiddleware.js'
import { apiLimiter, authLimiter, contactLimiter } from './middleware/rateLimiter.js'

dotenv.config()

const devEnv = process.env.DEV_ENV || 'development'
const app = express()

// Trust the first proxy (Render)
// app.set('trust proxy', 1)

// === MIDDLEWARE ===
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// === CORS ===
// Only /v1/earthquakes is public
app.use(
  '/v1/earthquakes',
  cors(), // Allow requests from any origin
  apiLimiter,
  routeEarthquakes
)

// Authenticated routes
const corsAuthOptions = {
  origin: [
    process.env.FRONTEND_PRODUCTION,
    process.env.FRONTEND_DEVELOPMENT
  ],
  credentials: true
}

app.use('/v1/test', cors(corsAuthOptions), apiLimiter, routeGetStart)
app.use('/auth', cors(corsAuthOptions), authLimiter, routeAuth)
app.use('/users', cors(corsAuthOptions), authLimiter, authenticateUser, routeUsers)
app.use('/contact', cors(corsAuthOptions), contactLimiter, routeContact)

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.message)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  })
})

// ===== START SERVER =====
const port = process.env.PORT || 5000

const startServer = async () => {
  try {
    console.clear()
    await dbConnect()

    app.listen(port, () => {
      console.log(`Server running in ${devEnv} environment`)
      console.log(`Started at: http://localhost:${port}`)
      console.log(`Test endpoint: http://localhost:${port}/v1/test`)

      const endPoints = expressListEndpoints(app)
      console.log('List of available endpoints:')
      console.table(endPoints)
    })
  } catch (error) {
    console.log('Server startup error:', error.message)
    process.exit(1)
  }
}

startServer()

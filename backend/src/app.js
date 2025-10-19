import express from 'express'
import cors from 'cors' // This was already here
import dotenv from 'dotenv'
import helmet from 'helmet'
import expressListEndpoints from 'express-list-endpoints'
import passport from 'passport'
import './config/passportConfig.js'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import hpp from 'hpp'

import routeAuth from './routes/authRoutes.js'
import routeUsers from './routes/usersRoutes.js'
import routeContact from './routes/contactRoutes.js'
import routeGetStart from './routes/testRoutes.js'
import routeEarthquakes from './routes/earthquakesRoutes.js'
import routeGitHub from './routes/githubAuthRoutes.js'
import newsletterRoutes from './routes/newsletterRoutes.js'
import dbConnect from './config/mongoConfig.js'
import { authenticateUser } from './middleware/authMiddleware.js'
import {
  apiLimiter,
  authLimiter,
  contactLimiter
} from './middleware/rateLimiter.js'
import { metricsMiddleware } from './middleware/metrics.js'
import routeMetrics from './routes/metricsRouters.js'
import postRoutes from './routes/postRoutes.js'

dotenv.config()

const devEnv = process.env.DEV_ENV || 'development'
const app = express()

// Trust proxy
app.set('trust proxy', 1)

// PASSPORT SETUP
app.use(passport.initialize())

// SECURITY MIDDLEWARE
app.use(helmet({ contentSecurityPolicy: false })) // Simplified for development
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

// Body parser
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// === CORS ===
// 1. ADD THIS LINE to allow requests from your frontend
app.use(cors())

// METRICS MIDDLEWARE
app.use(metricsMiddleware)

// === ROUTES ===
// 2. REMOVED the specific cors() call from this line
app.use('/v1/earthquakes', apiLimiter, routeEarthquakes)

// Protected/authenticated routes
app.use('/v1/test', apiLimiter, routeGetStart)
app.use('/v1', routeMetrics)
app.use('/auth', authLimiter, routeAuth)
app.use('/auth/github', authLimiter, routeGitHub)
app.use('/users', authLimiter, authenticateUser, routeUsers)
app.use('/contact', contactLimiter, routeContact)

// Newsletter (public)
app.use('/newsletter', newsletterRoutes)
app.use('/posts', postRoutes)

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error('Error:', err.message)
  res.status(err.status || 500).json({
    success: false,
    message: devEnv === 'development'
      ? err.message
      : 'Internal Server Error'
  })
})

// START SERVER
const port = process.env.PORT || 5000
const urlBackend = process.env.BACKEND_URL || 'http://localhost:5001'

const startServer = async () => {
  try {
    console.clear()
    await dbConnect()

    app.listen(port, () => {
      console.log(`Server running in ${devEnv} environment`)
      console.log(`Started at: ${urlBackend}`)
      console.log(`Test endpoint: ${urlBackend}/v1/test`)

      const endPoints = expressListEndpoints(app)
      console.log('List of available endpoints:')
      console.table(endPoints)
    })
  } catch (error) {
    console.error('Server startup error:', error.message)
    process.exit(1)
  }
}

startServer()
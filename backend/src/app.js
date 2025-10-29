import express from 'express'
import cors from 'cors'
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
import routeStation from './routes/stationsRoutes.js'
import routeDocsEarthquakes from './routes/docsEarthquakesRoutes.js'
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
import adminRoutes from './routes/admin.js'

dotenv.config()
const devEnv = process.env.DEV_ENV || 'development'
const app = express()

// 🔹 Trust proxy
app.set('trust proxy', 1)

// === PASSPORT ===
app.use(passport.initialize())

// === SECURITY MIDDLEWARE ===
app.use(helmet({ contentSecurityPolicy: false }))
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

// === BODY PARSER ===
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// === METRICS MIDDLEWARE ===
app.use(metricsMiddleware)

// === GLOBAL CORS per endpoint protetti ===
app.use(
  cors({
    origin: [process.env.FRONTEND_PRODUCTION, process.env.FRONTEND_DEVELOPMENT],
    credentials: true
  })
)

// === ROUTES ===

// Public route: earthquakes data, accessible from any origin
app.use('/v1/earthquakes', cors({ origin: '*' }), apiLimiter, routeEarthquakes)
app.use('/v1/earthquakes', cors({ origin: '*' }), apiLimiter, routeDocsEarthquakes)
app.use('/v1/stations', cors({ origin: '*' }), apiLimiter, routeStation)

// Protected routes
app.use('/v1/test', apiLimiter, routeGetStart)
app.use('/v1', routeMetrics)
app.use('/auth', authLimiter, routeAuth)
app.use('/auth/github', authLimiter, routeGitHub)
app.use('/users', authLimiter, authenticateUser, routeUsers)
app.use('/contact', contactLimiter, routeContact)

// Public routes
app.use('/newsletter', newsletterRoutes)
app.use('/posts', postRoutes)

// Admin routes (protected)
app.use('/admin', adminRoutes)

// === ERROR HANDLER ===
app.use((err, req, res, next) => {
  console.error('Error:', err.message)
  res.status(err.status || 500).json({
    success: false,
    message: devEnv === 'development' ? err.message : 'Internal Server Error'
  })
})

// === START SERVER ===
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
      console.table(expressListEndpoints(app))
    })
  } catch (error) {
    console.error('Server startup error:', error.message)
    process.exit(1)
  }
}

startServer()

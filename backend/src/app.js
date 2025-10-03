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
import routeGitHub from './routes/githubAuthRoutes.js'
import newsletterRoutes from './routes/newsletterRoutes.js'
import dbConnect from './config/mongoConfig.js'
import { authenticateUser } from './middleware/authMiddleware.js'
import {
  apiLimiter,
  authLimiter,
  contactLimiter
} from './middleware/rateLimiter.js'

dotenv.config()

const devEnv = process.env.DEV_ENV || 'development'
const app = express()

// 🔹 Trust the first proxy (Render)
app.set('trust proxy', 1)

// === MIDDLEWARE ===
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Debug middleware
app.use((req, res, next) => {
  console.log('METHOD:', req.method, 'URL:', req.originalUrl)
  console.log('HEADERS:', req.headers)
  console.log('BODY:', req.body)
  next()
})

// === GLOBAL CORS ===
const corsOptions = {
  origin: [
    process.env.FRONTEND_PRODUCTION, // es: https://terraquakeapi.com
    process.env.FRONTEND_DEVELOPMENT // es: http://localhost:5173
  ],
  credentials: true
}
app.use(cors(corsOptions))

// === ROUTES ===
// Only /v1/earthquakes is public
app.use('/v1/earthquakes', cors(), apiLimiter, routeEarthquakes)

// Authenticated routes
app.use('/v1/test', cors(corsOptions), apiLimiter, routeGetStart)
app.use('/auth', cors(corsOptions), authLimiter, routeAuth)
app.use('/auth/github', cors(corsOptions), authLimiter, routeGitHub)
app.use('/users', cors(corsOptions), authLimiter, authenticateUser, routeUsers)
app.use('/contact', cors(corsOptions), contactLimiter, routeContact)

// Newsletter routes (public)
app.use('/newsletter', cors(), newsletterRoutes)

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

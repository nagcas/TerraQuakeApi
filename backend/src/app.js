import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import expressListEndpoints from 'express-list-endpoints'
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

dotenv.config()

const devEnv = process.env.DEV_ENV || 'development'
const app = express()

// 🔹 Trust proxy (Render/Heroku/NGINX)
app.set('trust proxy', 1)

// === SECURITY MIDDLEWARE ===
// Helmet con Content Security Policy
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://apis.google.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: [
          "'self'",
          process.env.FRONTEND_PRODUCTION,
          process.env.FRONTEND_DEVELOPMENT
        ],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
      }
    },
    crossOriginEmbedderPolicy: false
  })
)

// Sanitizzazione input contro injection e XSS
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

// Body parser
app.use(express.json({ limit: '10kb' })) // evita payload enormi
app.use(express.urlencoded({ extended: true }))

// === GLOBAL CORS ===
const corsOptions = {
  origin: [
    process.env.FRONTEND_PRODUCTION, // es: https://terraquakeapi.com
    process.env.FRONTEND_DEVELOPMENT // es: http://localhost:5173
  ],
  credentials: true
}
app.use(cors(corsOptions))

// === METRICS MIDDLEWARE ===
app.use(metricsMiddleware)

// === ROUTES ===
// Solo /v1/earthquakes è pubblico
app.use('/v1/earthquakes', cors({ origin: '*' }), apiLimiter, routeEarthquakes)

// Rotte protette/autenticate
app.use('/v1/test', apiLimiter, routeGetStart)
app.use('/v1', routeMetrics)
app.use('/auth', authLimiter, routeAuth)
app.use('/auth/github', authLimiter, routeGitHub)
app.use('/users', authLimiter, authenticateUser, routeUsers)
app.use('/contact', contactLimiter, routeContact)

// Newsletter (pubblica)
app.use('/newsletter', newsletterRoutes)

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.message)
  res.status(err.status || 500).json({
    success: false,
    message: devEnv === 'development'
      ? err.message
      : 'Internal Server Error'
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
    console.error('Server startup error:', error.message)
    process.exit(1)
  }
}

startServer()

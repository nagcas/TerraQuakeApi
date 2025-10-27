import express from 'express'
import { githubAuthController } from '../controllers/githubController.js'
import { buildResponse } from '../utils/buildResponse.js'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Create a new Express router instance
const router = express.Router()

// Destructure required environment variables
const {
  GITHUB_CLIENT_ID,
  DEV_ENV,
  GITHUB_CALLBACK_URL_PROD,
  GITHUB_CALLBACK_URL_DEV
} = process.env

// Determine the GitHub callback URL depending on environment (production or development)
const GITHUB_CALLBACK_URL =
  DEV_ENV === 'production'
    ? GITHUB_CALLBACK_URL_PROD || '' // Use production callback URL
    : GITHUB_CALLBACK_URL_DEV || '' // Use development callback URL

// Check for missing configuration values and log error if necessary
if (!GITHUB_CLIENT_ID || !GITHUB_CALLBACK_URL) {
  console.error('GitHub OAuth config error: missing CLIENT_ID or CALLBACK_URL')
  console.log('GITHUB_CLIENT_ID:', GITHUB_CLIENT_ID)
  console.log('GITHUB_CALLBACK_URL:', GITHUB_CALLBACK_URL)
}

// NOTE: Route: Initiates GitHub OAuth process
// Redirects user to GitHub login/authorization page
router.get('/', (req, res) => {
  const scopes = ['read:user', 'user:email'].join(' ')
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_CALLBACK_URL}&scope=${encodeURIComponent(
    scopes
  )}`

  return res.redirect(redirectUrl)
})

// NOTE: Route: GitHub OAuth callback endpoint
// Handles the callback from GitHub after authentication
router.get(
  '/callback',
  githubAuthController({
    buildResponse,
    handleHttpError: (res, msg, code = 500) =>
      res.status(code).json({ success: false, message: msg })
  })
)

// Export the router to be used in main app
export default router

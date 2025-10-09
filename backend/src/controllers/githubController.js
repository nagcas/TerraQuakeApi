// For making HTTP requests to GitHub's OAuth API
import axios from 'axios'
// For generating JWT tokens after authentication
import jwt from 'jsonwebtoken'
// Mongoose model for user data
import User from '../models/userModels.js'
// For loading environment variables from .env
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Define frontend URL based on environment (development or production)
const FRONTEND_URL = process.env.DEV_ENV === 'production'
  ? process.env.FRONTEND_PRODUCTION
  : process.env.FRONTEND_DEVELOPMENT

// Destructure required environment variables
const {
  GITHUB_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  JWT_SECRET
} = process.env

// NOTE: GitHub OAuth controller
// Handles authentication using GitHub's OAuth 2.0 flow
export const githubAuthController = ({ handleHttpError }) => {
  return async (req, res) => {
    // Retrieve the "code" returned by GitHub after user authorization
    const code = req.query.code
    if (!code) return handleHttpError(res, 'Code is required', 400)

    try {
      // Step 1: Exchange the authorization code for an access token
      const tokenRes = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: process.env.GITHUB_CALLBACK_URL
        },
        { headers: { accept: 'application/json' } }
      )

      // Extract the access token from GitHub's response
      const accessToken = tokenRes.data.access_token

      // Step 2: Use the access token to fetch the user's GitHub profile
      const userRes = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${accessToken}` }
      })

      const githubUser = userRes.data

      // Fetch user's email if not included in main profile
      if (!githubUser.email) {
        const emailRes = await axios.get('https://api.github.com/user/emails', {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        const primaryEmail = emailRes.data.find(email => email.primary && email.verified)
        githubUser.email = primaryEmail?.email
      }

      // Step 3: Find or create a user in the database based on GitHub ID
      let user = await User.findOne({ githubId: githubUser.id })
      if (!user) {
        user = await User.create({
          githubId: githubUser.id.toString(),
          githubUsername: githubUser.login,
          githubProfileUrl: githubUser.html_url,
          name: githubUser.name || githubUser.login,
          email: githubUser.email,
          avatar: githubUser.avatar_url,
          role: ['user']
        })
      }

      // Step 4: Generate a signed JWT for the authenticated user
      const token = jwt.sign(
        { _id: user._id, role: user.role || ['user'] },
        JWT_SECRET,
        { expiresIn: '7d' }
      )

      // Step 5: Redirect back to the frontend with the JWT token
      return res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`)
    } catch (err) {
      // Log any error and send a proper response
      console.error('GitHub auth error:', err.message)
      return handleHttpError(res, 'GitHub login failed', 500)
    }
  }
}

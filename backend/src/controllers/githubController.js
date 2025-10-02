// githubController.js
import axios from 'axios'
import jwt from 'jsonwebtoken'
import User from '../models/userModels.js'
import dotenv from 'dotenv'

dotenv.config()

const FRONTEND_URL = process.env.DEV_ENV === 'production'
  ? process.env.FRONTEND_PRODUCTION
  : process.env.FRONTEND_DEVELOPMENT

const {
  GITHUB_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  JWT_SECRET
} = process.env

export const githubAuthController = ({ handleHttpError }) => {
  return async (req, res) => {
    const code = req.query.code
    if (!code) return handleHttpError(res, 'Code is required', 400)

    try {
      const tokenRes = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code
        },
        { headers: { accept: 'application/json' } }
      )

      const accessToken = tokenRes.data.access_token

      const userRes = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${accessToken}` }
      })

      const githubUser = userRes.data

      let user = await User.findOne({ githubId: githubUser.id })
      if (!user) {
        user = await User.create({
          githubId: githubUser.id.toString(),
          githubUsername: githubUser.login,
          githubProfileUrl: githubUser.html_url,
          name: githubUser.name || githubUser.login,
          avatar: githubUser.avatar_url,
          role: ['user']
        })
      }

      const token = jwt.sign(
        { _id: user._id, role: user.role || ['user'] },
        JWT_SECRET,
        { expiresIn: '7d' }
      )

      return res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`)
    } catch (err) {
      console.error('GitHub auth error:', err.message)
      return handleHttpError(res, 'GitHub login failed', 500)
    }
  }
}

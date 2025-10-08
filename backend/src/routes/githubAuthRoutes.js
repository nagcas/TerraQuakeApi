import express from 'express'
import { githubAuthController } from '../controllers/githubController.js'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

const { GITHUB_CLIENT_ID, DEV_ENV, GITHUB_CALLBACK_URL_PROD, GITHUB_CALLBACK_URL_DEV } = process.env

const GITHUB_CALLBACK_URL =
  DEV_ENV === 'production'
    ? (GITHUB_CALLBACK_URL_PROD || '')
    : (GITHUB_CALLBACK_URL_DEV || '')

if (!GITHUB_CLIENT_ID || !GITHUB_CALLBACK_URL) {
  console.error('❌ GitHub OAuth config error: missing CLIENT_ID or CALLBACK_URL')
  console.log('GITHUB_CLIENT_ID:', GITHUB_CLIENT_ID)
  console.log('GITHUB_CALLBACK_URL:', GITHUB_CALLBACK_URL)
}

router.get('/', (req, res) => {
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_CALLBACK_URL}&scope=read:user`
  return res.redirect(redirectUrl)
})

router.get('/callback', githubAuthController({
  handleHttpError: (res, msg, code = 500) =>
    res.status(code).json({ success: false, message: msg })
}))

export default router

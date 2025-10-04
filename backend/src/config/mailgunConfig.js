import formData from 'form-data'
import Mailgun from 'mailgun.js'
import dotenv from 'dotenv'

dotenv.config()

const mailgun = new Mailgun(formData)

export const client = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
  url: 'https://api.eu.mailgun.net'
})

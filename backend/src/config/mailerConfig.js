import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_MAILER, 
    pass: process.env.PASS_MAILER
  },
  pool: true,
  rateLimit: true,
  maxConnections: 5,
  connectionTimeout: 20000
})

transporter.verify()
  .then(() => console.log("Mailer ready to send emails ✅"))
  .catch(err => console.error("Mailer connection error ❌", err))

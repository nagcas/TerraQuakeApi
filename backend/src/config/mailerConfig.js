import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_MAILER,
    pass: process.env.PASS_MAILER
  }
})

transporter.verify().then(() => {
  console.log("Mailer ready to send emails")
}).catch(console.error)

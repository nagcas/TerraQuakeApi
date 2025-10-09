import { client } from '../config/mailgunConfig.js'
import dotenv from 'dotenv'

dotenv.config()

// NOTE: Send email forgot password user
export const sendForgotPassword = async (user, token) => {
  try {
    const resetUrl =
      process.env.DEV_ENV === 'development'
        ? `${process.env.FRONTEND_DEVELOPMENT}/reset-password/${token}`
        : `${process.env.FRONTEND_PRODUCTION}/reset-password/${token}`

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; color: #333;">
        <h2 style="color: #A48DC7; text-align: center;">Password Reset Request</h2>
        <p>Hello <strong>${user.name}</strong>,</p>
        <p>We received a request to reset your password.</p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${resetUrl}" target="_blank" style="background: #A48DC7; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Reset Password
          </a>
        </div>
        <p>This link will expire in <strong>15 minutes</strong>.</p>
        <p>If you did not request this, ignore this email.</p>
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;" />
        <p style="font-weight: bold; text-align: center;">The <span style="color: #A48DC7;">TerraQuake API</span> Team</p>
      </div>
    `

    const result = await client.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `TerraQuake API <postmaster@${process.env.MAILGUN_DOMAIN}>`,
      to: user.email,
      subject: '🔑 Reset Your TerraQuake API Password',
      html
    })

    console.log('Forgot password email sent:', result)
    return result
  } catch (error) {
    console.error('Error sending forgot password email:', error)
    throw error
  }
}

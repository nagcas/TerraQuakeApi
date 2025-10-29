import { client } from '../config/mailgunConfig.js'
import dotenv from 'dotenv'

dotenv.config()

// NOTE: Send email register user
export const sendEmailRegister = async (user) => {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; color: #333;">
        <h2 style="color: #A48DC7; text-align: center;">Registration Successful!</h2>

        <p>Hello <strong>${user.name}</strong>,</p>

        <p>Thank you for registering with <strong>TerraQuake API</strong>! We're excited to welcome you to our community.</p>

        <p><strong>We recommend completing your profile</strong> to personalize your experience and get the most out of our services.</p>

        <div style="text-align: center; margin: 24px 0;">
          <a href="${
            process.env.FRONTEND_PRODUCTION || process.env.FRONTEND_DEVELOPMENT
          }"
             style="background: #A48DC7; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Complete Your Profile
          </a>
        </div>

        <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;" />

        <p style="font-size: 0.9em; color: #666;">
          Need help or have questions? Contact our support team at
          <a href="mailto:terraquakeapi@gmail.com" style="color: #A48DC7;">terraquakeapi@gmail.com</a>.
        </p>

        <p style="font-weight: bold; font-size: 1.1em; color: #333; text-align: center;">
          The <span style="color: #A48DC7;">TerraQuake API</span> Team
        </p>
      </div>
    `

    const result = await client.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `TerraQuake API <support@${process.env.MAILGUN_DOMAIN}>`,
      to: user.email,
      subject: '🎉 Welcome to TerraQuake API!',
      html
    })

    console.log('Registration email sent:', result)
    return result
  } catch (error) {
    console.error('Error sending registration email:', error)
    throw error
  }
}

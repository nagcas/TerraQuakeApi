import { client } from '../config/mailgunConfig.js'
import dotenv from 'dotenv'

dotenv.config()

export const sendEmailRegister = async (user) => {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; color: #333;">
        <h2 style="color: #A48DC7; text-align: center;">Registration Successful!</h2>
        <p>Hello <strong>${user.name}</strong>,</p>
        <p>Thank you for registering with <strong>TerraQuake API</strong>! We’re excited to welcome you to our community.</p>
        <p><strong>We recommend completing your profile</strong> to personalize your experience.</p>
        <p>Contact our support team at <a href="mailto:terraquakeapi@gmail.com">terraquakeapi@gmail.com</a>.</p>
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;" />
        <p style="font-weight: bold; text-align: center;">The <span style="color: #A48DC7;">TerraQuake API</span> Team</p>
      </div>
    `

    const result = await client.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `TerraQuake API <postmaster@${process.env.MAILGUN_DOMAIN}>`,
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

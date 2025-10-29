import { client } from '../config/mailgunConfig.js'
import dotenv from 'dotenv'

dotenv.config()

// NOTE: Send confirmation email after admin replies to a user's contact message
export const sendEmailConfirmAnswer = async (updatedContact) => {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; color: #333;">
        <h2 style="color: #A48DC7; text-align: center;">You’ve received a reply from our team!</h2>

        <p>Hi <strong>${updatedContact.name}</strong>,</p>

        <p>We wanted to let you know that our team has reviewed your message sent through <strong>TerraQuake API</strong> and has provided a response.</p>

        <p>Here’s a summary of your original message and our reply:</p>

        <div style="background-color: #f9f9f9; border-left: 4px solid #A48DC7; padding: 16px; margin: 16px 0; border-radius: 4px;">
          <p style="margin: 0; color: #333; line-height: 1.6;"><strong>Your message:</strong><br>${updatedContact.message}</p>
        </div>

        <div style="background-color: #eef6ff; border-left: 4px solid #4a90e2; padding: 16px; margin: 16px 0; border-radius: 4px;">
          <p style="margin: 0; color: #333; line-height: 1.6;"><strong>Our reply:</strong><br>${updatedContact.answer}</p>
        </div>

        <p>If you have more questions or need further assistance, feel free to reply directly to this email.</p>

        <div style="text-align: center; margin: 24px 0;">
          <a href="${process.env.FRONTEND_PRODUCTION || process.env.FRONTEND_DEVELOPMENT}"
             style="background: #A48DC7; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Go to TerraQuake API
          </a>
        </div>

        <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;" />

        <p style="font-size: 0.9em; color: #666;">
          For any issues or further questions, please contact our support team at
          <a href="mailto:terraquakeapi@gmail.com" style="color: #A48DC7;">terraquakeapi@gmail.com</a>.
        </p>

        <p style="font-weight: bold; font-size: 1.1em; color: #333; text-align: center;">
          The <span style="color: #A48DC7;">TerraQuake API</span> Team
        </p>
      </div>
    `

    const result = await client.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `TerraQuake API <support@${process.env.MAILGUN_DOMAIN}>`,
      to: updatedContact.email,
      subject: '💬 You’ve received a reply from TerraQuake API',
      html
    })

    console.log('Reply email sent:', result)
    return result
  } catch (error) {
    console.error('Error sending reply email:', error)
    throw error
  }
}

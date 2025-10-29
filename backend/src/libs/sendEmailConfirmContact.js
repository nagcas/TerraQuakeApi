import { client } from '../config/mailgunConfig.js'
import dotenv from 'dotenv'

dotenv.config()

// NOTE: Send confirmation email after user contacts support
export const sendEmailConfirmContact = async (contact) => {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; color: #333;">
        <h2 style="color: #A48DC7; text-align: center;">Thanks for getting in touch!</h2>

        <p>Hi <strong>${contact.name}</strong>,</p>

        <p>We’ve received your message through <strong>TerraQuake API</strong> — thank you for reaching out.</p>

        <p>Our team is reviewing your request and will get back to you as soon as possible.  
        In the meantime, here’s a quick summary of your submission:</p>

         <div style="background-color: #f9f9f9; border-left: 4px solid #A48DC7; padding: 16px; margin: 16px 0; border-radius: 4px;">
          <p style="margin: 0; color: #333; line-height: 1.6;">${contact.message}</p>
        </div>

        <p>If you’d like to add more details or have any follow-up questions, feel free to reply directly to this email.</p>

        <div style="text-align: center; margin: 24px 0;">
          <a href="${process.env.FRONTEND_PRODUCTION || process.env.FRONTEND_DEVELOPMENT}"
             style="background: #A48DC7; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Visit Your Profile
          </a>
        </div>

        <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;" />

        <p style="font-size: 0.9em; color: #666;">
          Need help or have any questions? Contact our support team at
          <a href="mailto:terraquakeapi@gmail.com" style="color: #A48DC7;">terraquakeapi@gmail.com</a>.
        </p>

        <p style="font-weight: bold; font-size: 1.1em; color: #333; text-align: center;">
          The <span style="color: #A48DC7;">TerraQuake API</span> Team
        </p>
      </div>
    `

    const result = await client.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `TerraQuake API <support@${process.env.MAILGUN_DOMAIN}>`,
      to: contact.email,
      subject: '📩 We’ve received your message!',
      html
    })

    console.log('Message email sent:', result)
    return result
  } catch (error) {
    console.error('Error sending message email:', error)
    throw error
  }
}

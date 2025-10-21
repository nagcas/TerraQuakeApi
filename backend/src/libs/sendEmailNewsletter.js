import crypto from 'crypto'
import { client } from '../config/mailgunConfig.js'
import dotenv from 'dotenv'

dotenv.config()

// NOTE: Generate unsubscribe token
export const generateUnsubscribeToken = (email) => {
  return crypto
    .createHmac(
      'sha256',
      process.env.NEWSLETTER_SUBSCRIBE_SECRET || 'default_secret'
    )
    .update(email)
    .digest('hex')
}

// NOTE: Send confirmation email after newsletter subscription
export const sendConfirmationEmail = async (email, unsubscribeLink) => {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; color: #333;">
        <h2 style="color: #A48DC7; text-align: center;">Welcome to the TerraQuake API Newsletter!</h2>

        <p>Hi there 👋,</p>

        <p>Thank you for subscribing to the <strong>TerraQuake API</strong> newsletter!  
        You’re now part of a global community of developers, scientists, and innovators passionate about open data and seismic technology.</p>

        <p>Expect occasional updates on new API features, research collaborations, and open-source initiatives that aim to make earthquake data more accessible to everyone.</p>

        <div style="text-align: center; margin: 24px 0;">
          <a href="${unsubscribeLink}"
             style="background: #ff4d4d; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Unsubscribe
          </a>
        </div>

        <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;" />

        <p style="font-size: 0.9em; color: #666;">
          <strong>TerraQuake API</strong> is open-source software, released under the GNU Affero General Public License v3 or later.  
          You are free to use, modify, and share it — always with credit to the community.
        </p>

        <p style="font-weight: bold; font-size: 1.1em; color: #333; text-align: center;">
          The <span style="color: #A48DC7;">TerraQuake API</span> Team
        </p>
      </div>
    `

    const result = await client.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `TerraQuake API <support@${process.env.MAILGUN_DOMAIN}>`,
      to: email,
      subject: '🌍 Welcome to TerraQuake API Newsletter!',
      html
    })

    console.log('Confirmation email sent:', result)
    return result
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    throw error
  }
}

// NOTE: Send bulk newsletter to all subscribers
export const sendBulkNewsletter = async (
  subscribers,
  subject,
  content,
  generateUnsubscribeLink
) => {
  try {
    for (const subscriber of subscribers) {
      const unsubscribeLink = generateUnsubscribeLink(subscriber.email)

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; color: #333;">
          <div style="margin-bottom: 20px;">
            ${content}
          </div>

          <hr style="margin: 24px 0; border: none; border-top: 1px solid #ddd;" />

          <p style="font-size: 0.9em; color: #666;">
            <strong>TerraQuake API</strong> is free and open-source software under the GNU Affero General Public License v3 or later.  
            You are encouraged to contribute, share, and improve it.
          </p>

          <p style="font-size: 0.9em; color: #666;">
            If you no longer wish to receive updates, you can
            <a href="${unsubscribeLink}" style="color: #ff4d4d;">unsubscribe here</a>.
          </p>

          <p style="font-weight: bold; font-size: 1.1em; color: #333; text-align: center;">
            The <span style="color: #A48DC7;">TerraQuake API</span> Team
          </p>
        </div>
      `

      await client.messages.create(process.env.MAILGUN_DOMAIN, {
        from: `TerraQuake API <support${process.env.MAILGUN_DOMAIN}>`,
        to: subscriber.email,
        subject,
        html
      })
    }

    console.log('Bulk newsletter sent successfully')
    return true
  } catch (error) {
    console.error('Error sending bulk newsletter:', error)
    return false
  }
}

// NOTE: Send unsubscribe confirmation email after newsletter cancellation
export const sendUnsubscribeEmail = async (email) => {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; color: #333;">
        <h2 style="color: #A48DC7; text-align: center;">You’ve unsubscribed from TerraQuake API Newsletter</h2>

        <p>Hi there 👋,</p>

        <p>This is to confirm that your email <strong>${email}</strong> has been successfully unsubscribed from the <strong>TerraQuake API</strong> newsletter.</p>

        <p>You will no longer receive updates, news, or notifications about new API features and seismic data.</p>

        <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;" />

        <p style="font-size: 0.9em; color: #666;">
          <strong>TerraQuake API</strong> is open-source software, released under the GNU Affero General Public License v3 or later.  
          You are free to use, modify, and share it — always with credit to the community.
        </p>

        <p style="font-weight: bold; font-size: 1.1em; color: #333; text-align: center;">
          The <span style="color: #A48DC7;">TerraQuake API</span> Team
        </p>
      </div>
    `

    const result = await client.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `TerraQuake API <support@${process.env.MAILGUN_DOMAIN}>`,
      to: email,
      subject: '✅ You’ve unsubscribed from TerraQuake API Newsletter',
      html
    })

    console.log('Unsubscribe confirmation email sent:', result)
    return result
  } catch (error) {
    console.error('Error sending unsubscribe email:', error)
    throw error
  }
}

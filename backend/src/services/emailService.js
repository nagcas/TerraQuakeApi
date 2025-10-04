import crypto from 'crypto'
import { client } from '../config/mailgunConfig.js'

// NOTE: Token generator
export const generateUnsubscribeToken = (email) => {
  return crypto
    .createHmac(
      'sha256',
      process.env.NEWSLETTER_SUBSCRIBE_SECRET || 'default_secret'
    )
    .update(email)
    .digest('hex')
}

// NOTE: Confirmation email
export const sendConfirmationEmail = async (email, unsubscribeLink) => {
  try {
    const html = `
      <div style="max-width:600px; margin:20px auto; padding:20px; border-radius:12px; background:#f9fafc; font-family:Arial, sans-serif; text-align:center; color:#333; border:1px solid #e0e0e0;">
        <h2 style="color:#2E8B57; margin-bottom:10px;">Thank you for subscribing!</h2>
        <p style="font-size:16px; line-height:1.6; margin:10px 0;">
          TerraQuake API is free software: you can redistribute it and/or modify 
          it under the terms of the GNU Affero General Public License as published 
          by the Free Software Foundation, either version 3 of the License, or 
          (at your option) any later version.
        </p>
        <p style="font-size:14px; color:#555; margin:20px 0;">
          If you ever wish to unsubscribe, click the button below:
        </p>
        <a href="${unsubscribeLink}" 
           style="display:inline-block; padding:10px 20px; margin-top:10px; background:#ff4d4d; color:#fff; text-decoration:none; border-radius:6px; font-size:14px;">
           Unsubscribe
        </a>
      </div>
    `

    const result = await client.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `"TerraQuake API" <postmaster@${process.env.MAILGUN_DOMAIN}>`,
      to: email,
      subject: 'Welcome to TerraQuake API Newsletter',
      html
    })

    console.log('✅ Confirmation email sent:', result)
    return true
  } catch (err) {
    console.error('❌ Email sending failed:', err)
    return false
  }
}

// NOTE: Bulk newsletter
export const sendBulkNewsletter = async (
  subscribers,
  subject,
  content,
  generateUnsubscribeLink
) => {
  try {
    for (const subscriber of subscribers) {
      const unsubscribeLink = generateUnsubscribeLink(subscriber.email)

      await client.messages.create(process.env.MAILGUN_DOMAIN, {
        from: `"TerraQuake API" <postmaster@${process.env.MAILGUN_DOMAIN}>`,
        to: subscriber.email,
        subject,
        html: `
          <div style="font-family:Arial, sans-serif; color:#333;">
            ${content}
            <hr style="margin:20px 0; border:0; border-top:1px solid #e0e0e0;">
            <p style="font-size:12px; color:#666;">
              TerraQuake API is free software: you can redistribute it and/or modify 
              it under the terms of the GNU Affero General Public License as published 
              by the Free Software Foundation, either version 3 of the License, or 
              (at your option) any later version.
            </p>
            <p style="font-size:12px; color:#666;">
              If you no longer wish to receive these emails, 
              <a href="${unsubscribeLink}" style="color:red;">unsubscribe here</a>.
            </p>
          </div>
        `
      })
    }

    console.log('✅ Bulk newsletter sent')
    return true
  } catch (err) {
    console.error('❌ Bulk email sending failed:', err)
    return false
  }
}

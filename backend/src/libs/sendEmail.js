import { client } from '../config/mailgunConfig.js'

// NOTE: Function to send a registration confirmation email
export const sendEmailRegister = async (user) => {
  try {
    const response = await client.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `"TerraQuake API" <postmaster@${process.env.MAILGUN_DOMAIN}>`,
      to: user.email,
      subject: '🎉 Welcome to TerraQuake API!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; color: #333;">
          <h2 style="color: #A48DC7; text-align: center;">Registration Successful!</h2>

          <p>Hello <strong>${user.name}</strong>,</p>

          <p>Thank you for registering with <strong>TerraQuake API</strong>! We’re excited to welcome you to our community.</p>

          <p>From now on, you’ll have access to seismic data, updates, and new features designed to support developers, researchers, and enthusiasts.</p>

          <p><strong>We recommend completing your profile</strong> to personalize your experience and make the most out of our platform.</p>

          <p>To stay up to date with news and announcements, consider joining our official channels. It’s the fastest way to receive important updates from us.</p>

          <p>Have questions or need help? Our team is always here to support you.</p>
          Contact our support team at <a href="mailto:terraquakeapi@gmail.com">terraquakeapi@gmail.com</a>.</p>

          <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;" />

          <p style="font-size: 0.9em; color: #666;">Thanks again for your trust,</p>
          <p style="font-weight: bold; font-size: 1.1em; color: #333; text-align: center;">
            The <span style="color: #A48DC7;">TerraQuake API</span> Team
          </p>
        </div>
      `
    })

    console.log('Registration email sent:', response.messageId)
    return response
  } catch (error) {
    console.error('Error sending registration email:', error)
    throw new Error('Failed to send registration email')
  }
}

// NOTE: Function to send a forgot password email
export const sendForgotPassword = async (user, token) => {
  try {
    let resetUrl
    if (process.env.DEV_ENV === 'development') {
      resetUrl = `${process.env.FRONTEND_DEVELOPMENT}/reset-password/${token}`
    } else {
      resetUrl = `${process.env.FRONTEND_PRODUCTION}/reset-password/${token}`
    }

    const response = await client.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `"TerraQuake API" <postmaster@${process.env.MAILGUN_DOMAIN}>`,
      to: user.email,
      subject: '🔑 Reset Your TerraQuake API Password',
      html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Reset your TerraQuake API password</title>
          </head>
          <body style="margin:0; padding:0; background-color:#F4F5FB; font-family:'Helvetica Neue', Arial, sans-serif;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F5FB; padding:24px 0;">
              <tr>
                <td align="center" style="padding:0 16px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 12px 32px rgba(47,69,92,0.12);">
                    <tr>
                      <td style="padding:32px 24px; background:linear-gradient(135deg, #2F455C 0%, #674D8C 60%, #A48DC7 100%); color:#ffffff; text-align:center;">
                        <p style="margin:0; font-size:14px; letter-spacing:1.6px; text-transform:uppercase;">TerraQuake API</p>
                        <h1 style="margin:12px 0 0; font-size:28px; font-weight:700; line-height:1.2;">Reset your password</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:32px 28px 24px; color:#2F455C;">
                        <p style="margin:0 0 16px; font-size:16px; line-height:1.6;">Hello <strong>${user.name}</strong>,</p>
                        <p style="margin:0 0 16px; font-size:16px; line-height:1.6;">
                          We received a request to reset the password for your <strong>TerraQuake API</strong> account. Use the secure link below to create a new password.
                        </p>
                        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:24px 0;">
                          <tr>
                            <td align="center">
                              <a href="${resetUrl}" target="_blank" style="display:inline-block; padding:14px 28px; background-color:#A48DC7; color:#ffffff; border-radius:999px; font-weight:600; font-size:16px; text-decoration:none; letter-spacing:0.3px;">
                                Reset password
                              </a>
                            </td>
                          </tr>
                        </table>
                        <p style="margin:0 0 16px; font-size:15px; line-height:1.6;">
                          This link will expire in <strong>15 minutes</strong> to keep your account secure. If you didn't request a reset, no action is needed.
                        </p>
                        <p style="margin:0 0 12px; font-size:14px; line-height:1.6; color:#5C6B80;">
                          Can't click the button? Copy and paste this link into your browser:
                        </p>
                        <p style="margin:0 0 24px; font-size:14px; line-height:1.5; color:#4A3C7A; word-break:break-all;">
                          ${resetUrl}
                        </p>
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0;">
                          <tr>
                            <td style="border-top:1px solid #E2E6F0; padding-top:20px;">
                              <p style="margin:0 0 12px; font-size:14px; color:#5C6B80; line-height:1.6;">
                                Need help or have a question? Our support team is ready to assist. Reach us at <a href="mailto:terraquakeapi@gmail.com" style="color:#674D8C; font-weight:600; text-decoration:none;">terraquakeapi@gmail.com</a>.
                              </p>
                              <p style="margin:0; font-size:13px; color:#94A3B8; text-transform:uppercase; letter-spacing:1.2px;">
                                Stay safe and stay informed.
                              </p>
                              <p style="margin:8px 0 0; font-size:15px; font-weight:600; color:#2F455C;">
                                — The TerraQuake API Team
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:24px 0 0; font-size:12px; color:#94A3B8; max-width:480px; line-height:1.5;">
                    You are receiving this email because a password reset was requested for your TerraQuake API account. If you didn't initiate this, please ignore this message or contact support so we can investigate.
                  </p>
                </td>
              </tr>
            </table>
          </body>
        </html>`
    })

    console.log('Forgot password email sent:', response.messageId)
    return response
  } catch (error) {
    console.error('Error sending forgot password email:', error)
    throw new Error('Failed to send forgot password email')
  }
}

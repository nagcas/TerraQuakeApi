import { client } from '../config/mailgunConfig.js'
import dotenv from 'dotenv'

dotenv.config()

// NOTE: Send email change password user
export const sendChangePassword = async (user) => {
  try {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Password Changed Successfully</title>
        <style>
          @media only screen and (max-width: 600px) {
            .container {
              width: 100% !important;
              padding: 16px !important;
            }
            .header {
              font-size: 22px !important;
              padding: 20px 16px !important;
            }
            .content {
              padding: 16px !important;
            }
            .button {
              padding: 14px 24px !important;
              font-size: 16px !important;
            }
            .warning-box {
              padding: 12px !important;
            }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f5f5f5; padding: 20px 0;">
          <tr>
            <td align="center">
              <table class="container" role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">

                <!-- Header -->
                <tr>
                  <td class="header" style="background: linear-gradient(135deg, #A48DC7 0%, #8B73B3 100%); color: #ffffff; text-align: center; padding: 32px 24px;">
                    <h1 style="margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">🔒 Password Changed</h1>
                    <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.95;">Your account security has been updated</p>
                  </td>
                </tr>

                <!-- Main Content -->
                <tr>
                  <td class="content" style="padding: 32px 24px;">
                    <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                      Hello <strong style="color: #A48DC7;">${user.name}</strong>,
                    </p>

                    <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                      Your password for <strong>TerraQuake API</strong> has been successfully changed. This change was made on <strong>${new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</strong>.
                    </p>

                    <!-- Warning Box -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 24px 0;">
                      <tr>
                        <td class="warning-box" style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 16px; border-radius: 6px;">
                          <p style="margin: 0; font-size: 15px; line-height: 1.5; color: #856404;">
                            <strong>⚠️ Didn't make this change?</strong><br>
                            If you did not authorize this password change, please secure your account immediately by resetting your password or contact our support team.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 32px 0;">
                      <tr>
                        <td align="center">
                          <a href="${process.env.FRONTEND_PRODUCTION || process.env.FRONTEND_DEVELOPMENT}"
                             class="button"
                             style="display: inline-block; background: linear-gradient(135deg, #A48DC7 0%, #8B73B3 100%); color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 2px 4px rgba(164, 141, 199, 0.3); transition: all 0.3s ease;">
                            Access TerraQuake API
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Security Tips -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 24px 0;">
                      <tr>
                        <td style="background-color: #f8f9fa; padding: 16px; border-radius: 6px;">
                          <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #333333;">
                            🛡️ Security Best Practices
                          </p>
                          <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6; color: #666666;">
                            <li>Use a unique password for each service</li>
                            <li>Enable two-factor authentication when available</li>
                            <li>Never share your password with anyone</li>
                          </ul>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding: 0 24px;">
                    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 0;" />
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="margin: 0 0 12px 0; font-size: 13px; color: #666666;">
                      Need help or have questions?<br>
                      Contact our support team at <a href="mailto:terraquakeapi@gmail.com" style="color: #A48DC7; text-decoration: none; font-weight: 500;">terraquakeapi@gmail.com</a>
                    </p>
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: #333333;">
                      The <span style="color: #A48DC7;">TerraQuake API</span> Team
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
    const result = await client.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `TerraQuake API <support@${process.env.MAILGUN_DOMAIN}>`,
      to: user.email,
      subject: '🔒 Your TerraQuake API Password Has Been Changed',
      html
    })

    console.log('Change password email sent:', result)
    return result
  } catch (error) {
    console.error('Error sending change password email:', error)
    throw error
  }
}

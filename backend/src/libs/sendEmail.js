import { transporter } from '../config/mailerConfig.js'

// NOTE: Function to send a registration confirmation email
export const sendEmailRegister = async (user) => {
  try {
    const response = await transporter.sendMail({
      from: '"TerraQuake API" <terraquakeapi@gmail.com>', // deve corrispondere a USER_MAILER
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
    return response;
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

    const response = await transporter.sendMail({
      from: '"TerraQuake API" <terraquakeapi@gmail.com>', // must match USER_MAILER
      to: user.email,
      subject: '🔑 Reset Your TerraQuake API Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; color: #333;">
          <h2 style="color: #A48DC7; text-align: center;">Password Reset Request</h2>

          <p>Hello <strong>${user.name}</strong>,</p>

          <p>We received a request to reset the password for your <strong>TerraQuake API</strong> account.</p>

          <p>If you made this request, please click the button below to reset your password:</p>

          <div style="text-align: center; margin: 24px 0;">
            <a href="${resetUrl}" target="_blank" 
               style="background: #A48DC7; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Reset Password
            </a>
          </div>

          <p>This link will expire in <strong>15 minutes</strong> for your security.  
          If you did not request a password reset, you can safely ignore this email and your password will remain unchanged.</p>

          <p>If the button above does not work, copy and paste the following link into your browser:</p>
          <p style="word-break: break-all; color: #0066cc;">${resetUrl}</p>

          <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;" />

          <p style="font-size: 0.9em; color: #666;">Need help or have questions?  
          Contact our support team at <a href="mailto:terraquakeapi@gmail.com">terraquakeapi@gmail.com</a>.</p>

          <p style="font-weight: bold; font-size: 1.1em; color: #333; text-align: center;">
            The <span style="color: #A48DC7;">TerraQuake API</span> Team
          </p>
        </div>
      `
    })

    console.log('Forgot password email sent:', response.messageId)
    return response
  } catch (error) {
    console.error('Error sending forgot password email:', error)
    throw new Error('Failed to send forgot password email')
  }
}

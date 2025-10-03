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

export const sendChangePassword = async (user) => {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; color: #333;">
        <h2 style="color: #A48DC7; text-align: center;">Password Changed Successfully</h2>

        <p>Hello <strong>${user.name}</strong>,</p>

        <p>Your password for <strong>TerraQuake API</strong> has been successfully changed.</p>

        <p>If you did not make this change, please reset your password immediately or contact our support team.</p>

        <div style="text-align: center; margin: 24px 0;">
          <a href="${process.env.FRONTEND_PRODUCTION || process.env.FRONTEND_DEVELOPMENT}" 
             style="background: #A48DC7; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Go to TerraQuake API
          </a>
        </div>

        <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;" />

        <p style="font-size: 0.9em; color: #666;">
          Need help or have questions? Contact our support team at 
          <a href="mailto:terraquakeapi@gmail.com">terraquakeapi@gmail.com</a>.
        </p>

        <p style="font-weight: bold; font-size: 1.1em; color: #333; text-align: center;">
          The <span style="color: #A48DC7;">TerraQuake API</span> Team
        </p>
      </div>
    `

    const result = await client.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `TerraQuake API <postmaster@${process.env.MAILGUN_DOMAIN}>`,
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

export const sendDeleteAccountConfirmation = async (user) => {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; color: #333;">
        <h2 style="color: #A48DC7; text-align: center;">Account Deletion Confirmed</h2>
        <p>Hello <strong>${user.name}</strong>,</p>
        <p>Your account associated with <strong>${user.email}</strong> has been successfully deleted from <span style="color: #A48DC7;">TerraQuake API</span>.</p>
        
        <p>We’re sorry to see you go, but we respect your decision.  
        If this was a mistake or you change your mind, you’re always welcome to rejoin us anytime.</p>

        <p style="margin-top: 20px;">Thank you for having been part of our community,  
        and we wish you all the best in your future projects!</p>

        <hr style="margin: 32px 0; border: none; border-top: 1px solid #ddd;" />
        <p style="font-weight: bold; text-align: center;">The <span style="color: #A48DC7;">TerraQuake API</span> Team</p>
      </div>
    `

    const result = await client.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `TerraQuake API <postmaster@${process.env.MAILGUN_DOMAIN}>`,
      to: user.email,
      subject: '👋 Your TerraQuake API Account Has Been Deleted',
      html
    })

    console.log('Delete account confirmation email sent:', result)
    return result
  } catch (error) {
    console.error('Error sending delete account confirmation email:', error)
    throw error
  }
}

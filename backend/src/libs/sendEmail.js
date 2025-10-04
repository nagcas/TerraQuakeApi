import { transporter } from '../config/mailerConfig.js';

// -------------------------------
// Registration Email
// -------------------------------
export const sendEmailRegister = async (user) => {
  try {
    const response = await transporter.sendMail({
      from: `"TerraQuake API" <${process.env.USER_MAILER}}>`, // deve corrispondere a USER_MAILER
      to: user.email,
      subject: '🎉 Welcome to TerraQuake API!',
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto; background: #f7f7f7; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(90deg, #A48DC7, #6A4CA3); padding: 30px; text-align: center; color: #fff;">
            <h1 style="margin: 0; font-size: 28px;">Welcome, ${user.name}!</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">Your journey with TerraQuake API starts now 🚀</p>
          </div>

          <div style="padding: 30px; color: #333; line-height: 1.6;">
            <p>Hello <strong>${user.name}</strong>,</p>
            <p>Thank you for registering with <strong>TerraQuake API</strong>. We’re thrilled to have you on board!</p>
            <p>Now you can access seismic data, updates, and features designed for developers, researchers, and enthusiasts.</p>
            <p><strong>Tip:</strong> Complete your profile to personalize your experience and unlock more features.</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_PRODUCTION || process.env.FRONTEND_DEVELOPMENT}" 
                 style="display: inline-block; background: #A48DC7; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; transition: all 0.3s;">
                 Complete Your Profile
              </a>
            </div>

            <p>Need assistance? Reach out to our support team anytime:</p>
            <p style="text-align: center;">
              <a href="mailto:terraquakeapi@gmail.com" style="color: #6A4CA3; text-decoration: none; font-weight: bold;">terraquakeapi@gmail.com</a>
            </p>
          </div>

          <div style="background: #f0f0f0; text-align: center; padding: 20px; font-size: 0.9em; color: #666;">
            <p>Thanks for trusting us,</p>
            <p style="font-weight: bold; color: #6A4CA3;">The TerraQuake API Team</p>
          </div>
        </div>
      `
    });

    console.log('Registration email sent:', response)
    return response
  } catch (error) {
    console.error('Error sending registration email:', error);
    throw new Error('Failed to send registration email');
  }
};

// -------------------------------
// Forgot Password Email
// -------------------------------
export const sendForgotPassword = async (user, token) => {
  try {
    const resetUrl = (process.env.DEV_ENV === 'development'
      ? `${process.env.FRONTEND_DEVELOPMENT}/reset-password/${token}`
      : `${process.env.FRONTEND_PRODUCTION}/reset-password/${token}`);

    const response = await transporter.sendMail({
      from: `"TerraQuake API" <${process.env.USER_MAILER}}>`, // must match USER_MAILER
      to: user.email,
      subject: '🔑 Reset Your TerraQuake API Password',
      html: `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto; background: #f7f7f7; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(90deg, #A48DC7, #6A4CA3); padding: 30px; text-align: center; color: #fff;">
            <h1 style="margin: 0; font-size: 28px;">Password Reset Request</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px;">Hi ${user.name}, let's get you back in!</p>
          </div>

          <div style="padding: 30px; color: #333; line-height: 1.6;">
            <p>We received a request to reset your <strong>TerraQuake API</strong> password.</p>
            <p>Click the button below to reset your password. This link expires in <strong>15 minutes</strong> for your security.</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" target="_blank"
                 style="display: inline-block; background: #A48DC7; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; transition: all 0.3s;">
                 Reset Password
              </a>
            </div>

            <p>If the button doesn’t work, copy and paste this URL into your browser:</p>
            <p style="word-break: break-all; color: #0066cc;">${resetUrl}</p>

            <p>If you didn’t request a password reset, you can safely ignore this email.</p>

            <p style="text-align: center; margin-top: 30px;">
              Need help? <a href="mailto:terraquakeapi@gmail.com" style="color: #6A4CA3; font-weight: bold;">Contact Support</a>
            </p>
          </div>

          <div style="background: #f0f0f0; text-align: center; padding: 20px; font-size: 0.9em; color: #666;">
            <p>Stay safe,</p>
            <p style="font-weight: bold; color: #6A4CA3;">The TerraQuake API Team</p>
          </div>
        </div>
      `
    });

    console.log('Forgot password email sent:', response.messageId);
    return response;
  } catch (error) {
    console.error('Error sending forgot password email:', error);
    throw new Error('Failed to send forgot password email');
  }
};

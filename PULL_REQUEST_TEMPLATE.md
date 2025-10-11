# Refresh forgot-password email with responsive TerraQuake branding + Mailgun migration

## 🎯 Overview

This PR refactors the forgot password email template to provide a fully responsive, visually appealing design that's consistent with TerraQuake API branding. **Additionally, it migrates the email delivery system from Nodemailer to Mailgun** for improved reliability and performance on Vercel.

## 📝 Changes Made

### Email Template Enhancement
- **Responsive HTML email template**: Implemented table-based layout with max-width 600px for optimal rendering across email clients
- **TerraQuake brand styling**:
  - Gradient header using brand colors (#2F455C → #674D8C → #A48DC7)
  - Consistent typography with Helvetica Neue/Arial fallback
  - Branded color palette throughout
- **Clear CTA button**: Prominent "Reset password" button with pill-shaped design and fallback text link
- **Enhanced user messaging**:
  - Clear 15-minute expiry notice
  - Security reassurance if user didn't request reset
  - Support contact information
  - Professional footer with brand signature
- **Improved accessibility**: Proper semantic HTML structure with `role="presentation"` for layout tables
- **Mobile-responsive**: Viewport meta tag and fluid design that adapts to device width

### Email Service Migration (Nodemailer → Mailgun)
- **Removed Nodemailer dependency**: Eliminates deployment and delivery issues in Vercel environments
- **Added Mailgun.js integration**: More reliable email delivery service
- **New `mailgunConfig.js`**: Centralized Mailgun client configuration
- **Updated `sendEmail.js`**: Refactored to use Mailgun API for both registration and password reset emails
- **Updated environment variables**: Replaced `USER_MAILER` and `PASS_MAILER` with `MAILGUN_API_KEY` and `MAILGUN_DOMAIN`
- **Updated dependencies**: 
  - Removed: `nodemailer`
  - Added: `mailgun.js`, `form-data`

## ✅ Acceptance Criteria Met

- [x] Fully responsive design (max width 600px)
- [x] TerraQuake brand colors and styling applied
- [x] Clear reset link/button leading to frontend reset page
- [x] Consistent TerraQuake style and tone
- [x] Professional email layout with proper fallbacks
- [x] Migrated to Mailgun for Vercel compatibility
- [x] Removed all Nodemailer code

## 🧪 Testing

### Environment Setup
Before testing, ensure you have the following environment variables configured:

```bash
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_mailgun_domain
FRONTEND_DEVELOPMENT=http://localhost:3000
FRONTEND_PRODUCTION=https://your-production-url.com
DEV_ENV=development
```

### Manual Testing

```powershell
cd backend
npm install
npm run tests
```

**Note**: The email sending function is currently commented out in `authControllers.js` (line 111). To test email delivery:
1. Uncomment the line: `await sendForgotPassword(user, token)`
2. Configure your Mailgun credentials in `.env`
3. Test the forgot password endpoint

### Email Client Testing Recommendations

To verify rendering across major email clients, use one of these services:

- [Mailgun Inbox Preview](https://www.mailgun.com/)
- [Litmus](https://www.litmus.com/)
- [Email on Acid](https://www.emailonacid.com/)

**Recommended test clients**:

- Desktop: Gmail, Outlook, Apple Mail, Yahoo Mail
- Mobile: iOS Mail, Gmail App (Android), Outlook Mobile
- Webmail: Gmail Web, Outlook.com, Yahoo Web

## 📸 Screenshots

_Add email preview screenshots here showing desktop and mobile rendering_

## 🔗 Related Issues

Closes #[issue-number]

## 📚 Additional Context

This enhancement improves the user experience during password reset flows by providing:
- Professional, on-brand communication
- Clear call-to-action
- Better mobile experience
- Enhanced trust through polished design

**Migration Rationale**: Nodemailer was causing deployment and email delivery issues in Vercel environments. Mailgun provides a more reliable, scalable solution with better deliverability rates and is optimized for serverless deployments.

## 🔧 Breaking Changes

**Environment Variables**: Projects using this code will need to update their `.env` files:
- ❌ Remove: `USER_MAILER`, `PASS_MAILER`
- ✅ Add: `MAILGUN_API_KEY`, `MAILGUN_DOMAIN`

See `.env-example` for reference.

## 🤝 Contributing

This is an open-source contribution to the TerraQuake API project. The changes follow the project's contribution guidelines and coding standards.

---

**Checklist before merging**:

- [ ] Code follows project style guidelines (StandardJS)
- [ ] Email renders correctly across major clients
- [ ] Reset link correctly points to frontend route
- [ ] Mailgun credentials configured in environment
- [ ] All environment variables updated (removed Nodemailer vars, added Mailgun vars)
- [ ] Dependencies installed (`npm install` in backend)
- [ ] Documentation updated if needed

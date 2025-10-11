# Email Service Migration Guide: Nodemailer → Mailgun

## 📋 Overview

This guide documents the migration from Nodemailer to Mailgun for the TerraQuake API email service.

## 🎯 Why Migrate?

**Issues with Nodemailer on Vercel:**
- Deployment complications in serverless environments
- Unreliable email delivery
- Connection timeout issues
- Gmail SMTP restrictions

**Benefits of Mailgun:**
- ✅ Optimized for serverless/Vercel deployments
- ✅ Better deliverability rates
- ✅ Built-in email tracking and analytics
- ✅ More reliable API-based delivery
- ✅ No SMTP connection management needed

## 🔄 Changes Made

### Files Modified
1. **`backend/src/config/mailgunConfig.js`** (NEW)
   - Mailgun client configuration
   - EU region API endpoint

2. **`backend/src/libs/sendEmail.js`** (MODIFIED)
   - Replaced `transporter.sendMail()` with `client.messages.create()`
   - Updated sender format to use Mailgun domain
   - Maintained responsive email templates

3. **`backend/package.json`** (MODIFIED)
   - Removed: `nodemailer@^7.0.6`
   - Added: `mailgun.js@^10.2.3`, `form-data@^4.0.1`

4. **`backend/.env-example`** (MODIFIED)
   - Removed: `USER_MAILER`, `PASS_MAILER`
   - Added: `MAILGUN_API_KEY`, `MAILGUN_DOMAIN`

5. **`backend/src/config/mailerConfig.js`** (TO BE REMOVED)
   - No longer needed - can be safely deleted

## 📝 Setup Instructions

### 1. Get Mailgun Credentials

1. Sign up at [Mailgun](https://www.mailgun.com/)
2. Verify your domain or use Mailgun sandbox domain
3. Get your API key from Settings → API Keys
4. Note your domain (e.g., `mg.yourdomain.com` or sandbox domain)

### 2. Update Environment Variables

**Old `.env` (Remove these):**
```env
USER_MAILER=your-email@gmail.com
PASS_MAILER=your-app-password
```

**New `.env` (Add these):**
```env
MAILGUN_API_KEY=your-mailgun-api-key-here
MAILGUN_DOMAIN=mg.yourdomain.com
```

### 3. Install Dependencies

```bash
cd backend
npm install
```

This will:
- Install `mailgun.js@^10.2.3`
- Install `form-data@^4.0.1`
- Remove `nodemailer` (if running `npm prune`)

### 4. Test Email Functionality

```bash
# Start the backend server
npm run dev

# Test the forgot password endpoint
curl -X POST http://localhost:5001/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## 📊 API Comparison

### Before (Nodemailer)
```javascript
import { transporter } from '../config/mailerConfig.js'

const response = await transporter.sendMail({
  from: '"TerraQuake API" <terraquakeapi@gmail.com>',
  to: user.email,
  subject: '🔑 Reset Your Password',
  html: emailTemplate
})
```

### After (Mailgun)
```javascript
import { client } from '../config/mailgunConfig.js'

const response = await client.messages.create(process.env.MAILGUN_DOMAIN, {
  from: `"TerraQuake API" <postmaster@${process.env.MAILGUN_DOMAIN}>`,
  to: user.email,
  subject: '🔑 Reset Your Password',
  html: emailTemplate
})
```

## 🔍 Key Differences

| Aspect | Nodemailer | Mailgun |
|--------|-----------|---------|
| **Transport** | SMTP | HTTP API |
| **Authentication** | Email + Password | API Key |
| **Sender Address** | Gmail address | Mailgun domain |
| **Connection** | Persistent pool | Stateless HTTP |
| **Vercel Compatibility** | ⚠️ Issues | ✅ Excellent |

## ⚠️ Important Notes

1. **Sender Address Format**: Mailgun requires using your verified domain:
   ```javascript
   from: `"TerraQuake API" <postmaster@${process.env.MAILGUN_DOMAIN}>`
   ```

2. **Email Templates**: All HTML templates remain unchanged - only the delivery method changed

3. **Response Object**: Mailgun returns different response structure:
   - Nodemailer: `{ messageId: '<...>' }`
   - Mailgun: `{ id: '<...>', message: 'Queued. Thank you.' }`

4. **Error Handling**: Both throw errors similarly, but Mailgun provides more detailed error messages

## 🐛 Troubleshooting

### Issue: "401 Unauthorized"
**Solution**: Check your `MAILGUN_API_KEY` is correct

### Issue: "Domain not found"
**Solution**: Verify `MAILGUN_DOMAIN` matches your Mailgun account

### Issue: "Recipient address rejected"
**Solution**: If using sandbox domain, add recipient to authorized recipients in Mailgun dashboard

### Issue: Emails not arriving
**Solution**: 
1. Check Mailgun logs in dashboard
2. Verify domain DNS records (SPF, DKIM, DMARC)
3. Check spam folder

## 📚 Additional Resources

- [Mailgun Documentation](https://documentation.mailgun.com/)
- [mailgun.js GitHub](https://github.com/mailgun/mailgun.js)
- [Vercel Email Best Practices](https://vercel.com/guides/deploying-emails-with-mailgun)

## 🎉 Migration Complete!

Your email service is now powered by Mailgun and optimized for Vercel deployments. Enjoy improved reliability and deliverability! 🚀

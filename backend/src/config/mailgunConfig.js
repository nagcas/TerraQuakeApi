// Import required dependencies
import formData from 'form-data'
import Mailgun from 'mailgun.js'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

// Initialize a new Mailgun instance with form-data support
const mailgun = new Mailgun(formData)

// Create and export the Mailgun client
// - Uses the API key stored in environment variables
// - Configured for the EU endpoint (api.eu.mailgun.net)
// - The username 'api' is required for authentication
export const client = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
  url: 'https://api.eu.mailgun.net'
})

import {
  sendConfirmationEmail,
  generateUnsubscribeToken,
  sendBulkNewsletter,
  sendUnsubscribeEmail
} from '../libs/sendEmailNewsletter.js'
import dotenv from 'dotenv'

dotenv.config()

const URL = process.env.FRONTEND_DEVELOPMENT

// NOTE: Subscribe
export const subscribe = ({ Newsletter, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const { email } = req.body

      if (!email) return res.status(400).json({ error: 'Email is required' })

      let subscriber = await Newsletter.findOne({ email })

      if (subscriber) {
        if (subscriber.isSubscribed) {
          return res.status(400).json({ error: 'Email is already subscribed' })
        }
        subscriber.isSubscribed = true
        subscriber.subscribedAt = new Date()
        subscriber.unsubscribedAt = null
        await subscriber.save()
      } else {
        subscriber = new Newsletter({ email })
        await subscriber.save()
      }

      const unsubscribeToken = generateUnsubscribeToken(email)
      const unsubscribeLink = `${URL}/newsletter/unsubscribe?token=${unsubscribeToken}&email=${email}`

      const emailSent = await sendConfirmationEmail(email, unsubscribeLink)
      if (!emailSent) {
        return res
          .status(500)
          .json({ error: 'Failed to send confirmation email' })
      }

      res.json(
        buildResponse(req, 'Successfully subscribed to newsletter', subscriber, {})
      )
    } catch (error) {
      console.error('Subscription error:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

// NOTE: Unsubscribe (return HTML page)
export const unsubscribe = ({ Newsletter, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const { token, email } = req.query
      const expectedToken = generateUnsubscribeToken(email)

      if (token !== expectedToken) {
        return res.status(400).send('Invalid unsubscribe link')
      }

      const subscriber = await Newsletter.findOne({ email })
      if (!subscriber) {
        return res.status(404).send('Email not found')
      }

      subscriber.isSubscribed = false
      subscriber.unsubscribedAt = new Date()
      await subscriber.save()

      const emailSent = await sendUnsubscribeEmail(email)
      if (!emailSent) {
        return res
          .status(500)
          .json({ error: 'Failed to send confirmation unsubscribe email' })
      }

      res.json(
        buildResponse(req, 'Successfully unsubscribed from newsletter', subscriber, null, {})
      )
    } catch (error) {
      console.error('Subscription error:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

// NOTE: Send Newsletter
export const sendNewsletter = ({ Newsletter, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const { subject, content } = req.body
      const subscribers = await Newsletter.find({ isSubscribed: true })

      const generateUnsubscribeLink = (email) => {
        const token = generateUnsubscribeToken(email)
        return `${req.protocol}://${req.get(
          'host'
        )}/newsletter/unsubscribe?token=${token}&email=${email}`
      }

      await sendBulkNewsletter(
        subscribers,
        subject,
        content,
        generateUnsubscribeLink
      )

      res.json(
        buildResponse(req, `Newsletter sent to ${subscribers.length} subscribes`, null, {})
      )
    } catch (error) {
      console.error('Send newsletter error:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

// NOTE: Get Subscriber Count
export const getSubscriberCount = ({ Newsletter, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const count = await Newsletter.countDocuments({ isSubscribed: true })

      res.json(
        buildResponse(req, 'Newsletter count', count, null, {})
      )
    } catch (error) {
      console.error('Get subscriber count error:', error)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

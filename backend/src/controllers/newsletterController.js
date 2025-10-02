import Newsletter from '../models/newsletterModel.js'
import {
  sendConfirmationEmail,
  generateUnsubscribeToken,
  sendBulkNewsletter
} from '../services/emailService.js'

// NOTE: Subscribe
export const subscribe = async (req, res) => {
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
    const unsubscribeLink = `${req.protocol}://${req.get(
      'host'
    )}/newsletter/unsubscribe?token=${unsubscribeToken}&email=${email}`

    const emailSent = await sendConfirmationEmail(email, unsubscribeLink)
    if (!emailSent) {
      return res
        .status(500)
        .json({ error: 'Failed to send confirmation email' })
    }

    res.json({ message: 'Successfully subscribed to newsletter' })
  } catch (error) {
    console.error('Subscription error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// NOTE: Unsubscribe (return HTML page)
export const unsubscribe = async (req, res) => {
  try {
    const { token, email } = req.query
    const expectedToken = generateUnsubscribeToken(email)

    if (token !== expectedToken) {
      return res.status(400).send('<h2>❌ Invalid unsubscribe link</h2>')
    }

    const subscriber = await Newsletter.findOne({ email })
    if (!subscriber) {
      return res.status(404).send('<h2>❌ Email not found</h2>')
    }

    subscriber.isSubscribed = false
    subscriber.unsubscribedAt = new Date()
    await subscriber.save()

    res.send('<h2>✅ Successfully unsubscribed from newsletter</h2>')
  } catch (error) {
    console.error('Unsubscribe error:', error)
    res.status(500).send('<h2>❌ Internal server error</h2>')
  }
}

// NOTE: Send Newsletter
export const sendNewsletter = async (req, res) => {
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

    res.json({
      message: `Newsletter sent to ${subscribers.length} subscribers`
    })
  } catch (error) {
    console.error('Send newsletter error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// NOTE: Get Subscriber Count
export const getSubscriberCount = async (req, res) => {
  try {
    const count = await Newsletter.countDocuments({ isSubscribed: true })
    res.json({ count })
  } catch (error) {
    console.error('Get subscriber count error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

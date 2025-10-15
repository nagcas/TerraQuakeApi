import express from 'express'
import {
  subscribe,
  unsubscribe,
  sendNewsletter,
  getSubscriberCount
} from '../controllers/newsletterController.js'
import Newsletter from '../models/newsletterModel.js'
import { buildResponse } from '../utils/buildResponse.js'
import handleHttpError from '../utils/handleHttpError.js'

// Create a new Express router instance for newsletter-related routes
const router = express.Router()

// Route: Subscribe a user to the newsletter
// Expects relevant subscriber data in the request body
router.post('/subscribe', subscribe({ Newsletter, buildResponse, handleHttpError }))

// Route: Unsubscribe a user from the newsletter
// Typically triggered via a link containing unsubscribe parameters
router.get('/unsubscribe', unsubscribe({ Newsletter, buildResponse, handleHttpError }))

// Route: Send the newsletter to all subscribers
// Typically restricted to admin or authenticated users
router.post('/send', sendNewsletter({ Newsletter, buildResponse, handleHttpError }))

// Route: Get the total number of newsletter subscribers
router.get('/count', getSubscriberCount({ Newsletter, buildResponse, handleHttpError }))

// Export the newsletter router to be used in the main app
export default router

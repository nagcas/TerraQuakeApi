// NOTE: Router for test endpoint
// This module exposes a single GET /test endpoint
// Used to verify that the server is running and responding correctly
import express from 'express'
import { getStart } from '../controllers/getStartControllers.js'

// Create a new Express router instance
const router = express.Router()

// NOTE: Test endpoint
// GET /test — calls getStart controller to check server status
router.get('/', getStart)

// Export the test router to be used in the main app
export default router

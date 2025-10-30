import express from 'express'
import {
  createFaq,
  deleteFaq,
  listAllFaq, listOneFaq, updateFaq
} from '../controllers/faqControllers.js'
import Faq from '../models/faqModels.js'
import { adminMiddleware } from '../middleware/adminMiddlewares.js'
import { buildResponse } from '../utils/buildResponse.js'
import handleHttpError from '../utils/handleHttpError.js'
import { invalidateToken } from '../utils/handleJwt.js'

const router = express.Router()

/**
 * @route POST /create-faq
 * @desc Create a new FAQ entry.
 * @access Private (Admin only)
 */
router.post('/create-faq', adminMiddleware, createFaq({ Faq, buildResponse, handleHttpError, invalidateToken }))

/**
 * @route GET /list-all-faq
 * @desc Retrieve all FAQ entries from the database.
 * @access Public
 */
router.get('/list-all-faq', listAllFaq({ Faq }))

/**
 * @route GET /list-one-faq/:id
 * @desc Retrieve a single FAQ entry by its ID.
 * @access Private (Admin only)
 */
router.get('/list-one-faq/:id', adminMiddleware, listOneFaq({ Faq }))

/**
 * @route PATCH /update-faq/:id
 * @desc Update an existing FAQ entry by its ID.
 * @access Private (Admin only)
 */
router.patch('/update-faq/:id', adminMiddleware, updateFaq({ Faq }))

/**
 * @route DELETE /delete-faq/:id
 * @desc Delete an FAQ entry by its ID.
 * @access Private (Admin only)
 */
router.delete('/delete-faq/:id', adminMiddleware, deleteFaq({ Faq }))

export default router

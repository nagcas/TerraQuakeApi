import express from 'express'
import Testimonial from '../models/testimonialModels.js'
import { createTestimonial, listAllTestimonials, listOneTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonialsControlles.js'
import { buildResponse } from '../utils/buildResponse.js'
import handleHttpError from '../utils/handleHttpError.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { adminMiddleware } from '../middleware/adminMiddlewares.js'
import { validatorTestimonial } from '../validators/testimonialValidators.js'

const router = express.Router()

// NOTE: Defining a [POST] route to send a new review
router.post('/', authMiddleware, validatorTestimonial, createTestimonial({ Testimonial, buildResponse, handleHttpError }))

// NOTE: Defining a [GET] route to list all reviews
router.get('/', listAllTestimonials({ Testimonial, buildResponse, handleHttpError }))

// NOTE: Route: Get a review by ID
router.get('/:id', adminMiddleware, listOneTestimonial({ Testimonial, buildResponse, handleHttpError }))

// NOTE: Defining a [PATCH] route to update a review
router.patch('/:id', authMiddleware, updateTestimonial({ Testimonial, buildResponse, handleHttpError }))

// NOTE: Defining a [DELETE] route to delete a review
router.delete('/:id', authMiddleware, deleteTestimonial({ Testimonial, buildResponse, handleHttpError }))

export default router

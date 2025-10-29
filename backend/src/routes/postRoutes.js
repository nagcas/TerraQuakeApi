import express from 'express'
import { createPost, updatePost, deletePost, listAllPosts, listOnePost, listOnePostSlug } from '../controllers/postController.js'
import { validatorCreatePost, validatorUpdatePost } from '../validators/postValidators.js'
import Post from '../models/postModel.js'
import { matchedData } from 'express-validator'
import { buildResponse } from '../utils/buildResponse.js'
import handleHttpError from '../utils/handleHttpError.js'
import { adminMiddleware } from '../middleware/adminMiddlewares.js'

// Create a new Express router instance for post-related routes
const router = express.Router()

// NOTE: Route: Create a new post
// Requires user authentication and request body validation
router.post('/create-post', adminMiddleware, validatorCreatePost, createPost({ Post, buildResponse, handleHttpError, matchedData }))

// NOTE: Route: Update an existing post by ID
// Requires user authentication and request body validation
router.patch('/update-post/:id', adminMiddleware, validatorUpdatePost, updatePost({ Post, buildResponse, handleHttpError, matchedData }))

// NOTE: Route: Delete a post by ID
// Requires user authentication
router.delete('/delete-post/:id', adminMiddleware, deletePost({ Post, buildResponse, handleHttpError }))

// NOTE: Route: Get a all posts
// Defining a route to display all received posts
router.get('/list-all-posts', listAllPosts({ Post, buildResponse, handleHttpError }))

// NOTE: Route: Get a post by ID
// Defining a route to display a single post with a specific id
router.get('/list-postId/:id', adminMiddleware, listOnePost({ Post, buildResponse, handleHttpError }))

// NOTE: Route: Get a post by slug
// Defining a route to display a single post with a specific slug
router.get('/list-postSlug/:slug', listOnePostSlug({ Post, buildResponse, handleHttpError }))

// Export the post router to be used in the main app
export default router

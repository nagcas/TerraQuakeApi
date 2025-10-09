import express from 'express'
import { createPost, updatePost, deletePost } from '../controllers/postController.js'
import { validatorCreatePost, validatorUpdatePost } from '../validators/postValidators.js'
import { authenticateUser } from '../middleware/authMiddleware.js'

// Create a new Express router instance for post-related routes
const router = express.Router()

// Route: Create a new post
// Requires user authentication and request body validation
router.post('/create-post', authenticateUser, validatorCreatePost, createPost())

// Route: Update an existing post by ID
// Requires user authentication and request body validation
router.patch('/update-post/:id', authenticateUser, validatorUpdatePost, updatePost())

// Route: Delete a post by ID
// Requires user authentication
router.delete('/delete-post/:id', authenticateUser, deletePost())

// Export the post router to be used in the main app
export default router

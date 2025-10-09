import express from 'express'
import { createPost, updatePost, deletePost } from '../controllers/postController.js'
import { validatorCreatePost, validatorUpdatePost } from '../validators/postValidators.js'
import { authenticateUser } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/posts', authenticateUser, validatorCreatePost, createPost())
router.patch('/posts/:id', authenticateUser, validatorUpdatePost, updatePost())
router.delete('/posts/:id', authenticateUser, deletePost())

export default router

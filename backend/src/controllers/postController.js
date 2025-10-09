// Import Mongoose model for blog posts
import Post from '../models/postModel.js'
// Custom error handling utility
import handleHttpError from '../utils/handleHttpError.js'
// Extracts only validated data from the request
import { matchedData } from 'express-validator'

/**
 * NOTE: Converts a given string into a URL-friendly slug.
 * Example: "Hello World!" → "hello-world"
 */
function slugify (text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/[^a-z0-9-]/g, '') // Remove invalid characters
    .replace(/-+/g, '-') // Collapse multiple dashes
    .replace(/^-+|-+$/g, '') // Trim dashes from start and end
}

/**
 * NOTE: Ensures that a generated slug is unique by appending an incremental counter
 * if another post with the same slug already exists.
 */
async function getUniqueSlug (baseSlug) {
  let slug = baseSlug
  let count = 1
  while (await Post.findOne({ slug })) {
    slug = `${baseSlug}-${count}`
    count++
  }
  return slug
}

/**
 * NOTE: Controller to create a new post.
 * Automatically generates a unique slug and saves the post in the database.
 */
export const createPost = () => {
  return async (req, res) => {
    try {
      // Extract only validated data from request
      const data = matchedData(req)

      // Generate slug (use title if slug is not provided)
      let slug = data.slug ? slugify(data.slug) : slugify(data.title)
      slug = await getUniqueSlug(slug)

      // Create and save new post
      const post = await Post.create({
        title: data.title,
        excerpt: data.excerpt,
        slug,
        author: data.author,
        categories: data.categories,
        content: data.content,
        tags: data.tags || []
      })

      // Respond with created post
      return res.status(201).json(post)
    } catch (err) {
      handleHttpError(res, err.message || 'Error creating post', 500)
    }
  }
}

/**
 * NOTE: Controller to update an existing post.
 * If the slug is modified, ensures that the new slug remains unique.
 */
export const updatePost = () => {
  return async (req, res) => {
    try {
      const postId = req.params.id
      if (!postId) {
        return handleHttpError(res, 'Post ID is required', 400)
      }

      // Extract validated data
      const data = matchedData(req)
      const updateFields = { ...data }

      // If slug is being updated, regenerate and ensure uniqueness
      if (data.slug) {
        let newSlug = slugify(data.slug)
        let count = 1
        while (await Post.findOne({ slug: newSlug, _id: { $ne: postId } })) {
          newSlug = `${slugify(data.slug)}-${count}`
          count++
        }
        updateFields.slug = newSlug
      }

      // Update modification date
      updateFields.updatedAt = new Date()

      // Perform update in the database
      const updated = await Post.findByIdAndUpdate(postId, updateFields, { new: true })
      if (!updated) {
        return handleHttpError(res, 'Post not found', 404)
      }

      // Respond with updated post
      return res.status(200).json(updated)
    } catch (err) {
      handleHttpError(res, err.message || 'Error updating post', 500)
    }
  }
}

/**
 * NOTE: Controller to delete a post by its ID.
 * Validates the format of the provided ID before deletion.
 */
export const deletePost = () => {
  return async (req, res) => {
    try {
      const postId = req.params.id

      // Validate MongoDB ObjectId format
      if (!postId || !postId.match(/^[a-fA-F0-9]{24}$/)) {
        return handleHttpError(res, 'Invalid post ID format', 400)
      }

      // Delete post by ID
      const deleted = await Post.findByIdAndDelete(postId)
      if (!deleted) {
        return handleHttpError(res, 'Post not found', 404)
      }

      // Respond with success message
      return res.status(200).json({
        success: true,
        message: 'Post deleted successfully',
        postId
      })
    } catch (err) {
      handleHttpError(res, err.message || 'Error deleting post', 500)
    }
  }
}

import Post from '../models/postModel.js'
import handleHttpError from '../utils/handleHttpError.js'
import { matchedData } from 'express-validator'

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function getUniqueSlug(baseSlug) {
  let slug = baseSlug
  let count = 1
  while (await Post.findOne({ slug })) {
    slug = `${baseSlug}-${count}`
    count++
  }
  return slug
}

export const createPost = () => {
  return async (req, res) => {
    try {
      const data = matchedData(req)
      let slug = data.slug ? slugify(data.slug) : slugify(data.title)
      slug = await getUniqueSlug(slug)
      const post = await Post.create({
        title: data.title,
        excerpt: data.excerpt,
        slug,
        author: data.author,
        categories: data.categories,
        content: data.content,
        tags: data.tags || []
      })
      return res.status(201).json(post)
    } catch (err) {
      handleHttpError(res, err.message || 'Error creating post', 500)
    }
  }
}

export const updatePost = () => {
  return async (req, res) => {
    try {
      const postId = req.params.id
      if (!postId) {
        return handleHttpError(res, 'Post ID is required', 400)
      }
      const data = matchedData(req)
      let updateFields = { ...data }
      // If slug is being updated, ensure uniqueness
      if (data.slug) {
        let newSlug = slugify(data.slug)
        let count = 1
        while (await Post.findOne({ slug: newSlug, _id: { $ne: postId } })) {
          newSlug = `${slugify(data.slug)}-${count}`
          count++
        }
        updateFields.slug = newSlug
      }
      updateFields.updatedAt = new Date()
      const updated = await Post.findByIdAndUpdate(postId, updateFields, { new: true })
      if (!updated) {
        return handleHttpError(res, 'Post not found', 404)
      }
      return res.status(200).json(updated)
    } catch (err) {
      handleHttpError(res, err.message || 'Error updating post', 500)
    }
  }
}

export const deletePost = () => {
  return async (req, res) => {
    try {
      const postId = req.params.id
      if (!postId || !postId.match(/^[a-fA-F0-9]{24}$/)) {
        return handleHttpError(res, 'Invalid post ID format', 400)
      }
      const deleted = await Post.findByIdAndDelete(postId)
      if (!deleted) {
        return handleHttpError(res, 'Post not found', 404)
      }
      return res.status(200).json({
        success: true,
        message: 'Post deleted successfully',
        postId: postId
      })
    } catch (err) {
      handleHttpError(res, err.message || 'Error deleting post', 500)
    }
  }
}

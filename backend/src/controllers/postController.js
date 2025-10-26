import mongoose from 'mongoose'

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
async function getUniqueSlug (baseSlug, Post) {
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
export const createPost = ({
  Post,
  buildResponse,
  handleHttpError,
  matchedData
}) => {
  return async (req, res) => {
    try {
      // Extract only validated data from request
      const data = matchedData(req)

      // Generate slug (use title if slug is not provided)
      let slug = data.slug ? slugify(data.slug) : slugify(data.title)
      slug = await getUniqueSlug(slug, Post)

      // Create and save new post
      const post = await Post.create({
        title: data.title,
        excerpt: data.excerpt,
        slug,
        author: data.author,
        categories: data.categories,
        content: data.content,
        tags: data.tags || [],
        readTime: data.readTime
      })

      console.log(post)

      // Respond with created post
      res.json(buildResponse(req, 'Post created successfully', post, null, {}))
    } catch (error) {
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Controller to update an existing post.
 * If the slug is modified, ensures that the new slug remains unique.
 */
export const updatePost = ({
  Post,
  buildResponse,
  handleHttpError,
  matchedData
}) => {
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
      const updated = await Post.findByIdAndUpdate(postId, updateFields, {
        new: true
      })
      if (!updated) {
        return handleHttpError(res, 'Post not found', 404)
      }

      // Respond with updated post
      res.json(
        buildResponse(req, 'Post updated successfully', updated, null, {})
      )
    } catch (error) {
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Controller to delete a post by its ID.
 * Validates the format of the provided ID before deletion.
 */
export const deletePost = ({ Post, handleHttpError }) => {
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

      res.json({
        success: true,
        message: 'Post deleted successfully',
        postId: deleted._id
      })
    } catch (error) {
      handleHttpError(res, error.message)
    }
  }
}

/**
 * NOTE: Controller to retrieve all posts.
 * Fetches and returns a list of all available posts from the database.
 * Supports optional query filters, pagination, and sorting.
 */
export const listAllPosts = ({ Post, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const { title, category, tags } = req.query
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 9
      const sort = req.query.sort || 'createdAt'
      const sortDirection = req.query.sortDirection === 'asc' ? 1 : -1
      const skip = (page - 1) * limit

      // Build filters only if provided
      const filter = {}
      if (title) filter.title = { $regex: title, $options: 'i' }
      if (category) filter.category = { $regex: category, $options: 'i' }
      if (tags) filter.tags = { $regex: tags, $options: 'i' }

      // Count total documents
      const totalPosts = await Post.countDocuments(filter)

      // Fetch filtered or all posts
      const posts = await Post.find(filter)
        .populate('author', 'name')
        .sort({ [sort]: sortDirection })
        .skip(skip)
        .limit(limit)
        .lean()

      const totalPages = Math.ceil(totalPosts / limit)
      const hasMore = page < totalPages

      // Respond with paginated posts
      res.json(
        buildResponse(req, 'Posts retrieved successfully', {
          posts,
          pagination: {
            page,
            totalPages,
            limit,
            hasMore,
            totalResults: totalPosts
          }
        })
      )
    } catch (error) {
      console.error('Error in listAllPosts:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Controller to retrieve a single post by its ID.
 * Fetches and returns the post that matches the provided ID.
 */
export const listOnePost = ({ Post, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const postId = req.params.id

      if (!mongoose.Types.ObjectId.isValid(postId)) {
        return handleHttpError(res, `Invalid post ID: ${postId}`, 400)
      }

      const post = await Post.findById(postId)

      if (!post) {
        return handleHttpError(res, `No post found with ID: ${postId}`, 404)
      }
      res.json(buildResponse(req, 'Get one post', post, null, {}))
    } catch (error) {
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

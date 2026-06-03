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
        categories: data.categories || [],
        content: data.content,
        tags: data.tags || [],
        readTime: data.readTime
      })

      // Respond with created post
      res.json(buildResponse(req, 'Post created successfully', post, null, {}))
    } catch (error) {
      // Log error to the server console
      console.error('Error in createPost controller:', error.message)
      // Handle unexpected errors gracefully
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Controller to update an existing post.
 * Ensures slug uniqueness and returns the updated document populated.
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

      // Validate post ID
      if (!postId) {
        return handleHttpError(res, 'Post ID is required', 400)
      }

      // Extract validated data from request
      const data = matchedData(req)
      console.log(data)

      // Prevent empty updates
      if (!data || Object.keys(data).length === 0) {
        return handleHttpError(res, 'No valid fields to update', 400)
      }

      const updateFields = {
        ...data,
        updatedAt: new Date()
      }

      // Handle slug update and ensure uniqueness
      if (data.slug) {
        let newSlug = slugify(data.slug)
        let count = 1

        while (
          await Post.findOne({
            slug: newSlug,
            _id: { $ne: postId }
          })
        ) {
          newSlug = `${slugify(data.slug)}-${count}`
          count++
        }

        updateFields.slug = newSlug
      }

      // Perform update with $set to avoid accidental replacements
      const updated = await Post.findOneAndUpdate(
        { _id: postId },
        { $set: updateFields },
        { new: true }
      ).populate('author')

      // Handle not found case
      if (!updated) {
        return handleHttpError(res, 'Post not found', 404)
      }

      // Return updated post
      return res.json(
        buildResponse(req, 'Post updated successfully', updated)
      )
    } catch (error) {
      // Log server-side error for debugging
      console.error('Error in updatePost controller:', error.message)

      // Handle HTTP-safe error response
      return handleHttpError(
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
      // Log error to the server console
      console.error('Error in deletePost controller:', error.message)
      // Handle unexpected errors gracefully
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
      if (category) { filter.categories = { $regex: new RegExp(`^${category}$`, 'i') } }
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
          totalPosts,
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
      // Log error to the server console
      console.error('Error in listAllPosts:', error.message)
      // Handle unexpected errors gracefully
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
      // Log error to the server console
      console.error('Error in listOnePost controller:', error.message)
      // Handle unexpected errors gracefully
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * NOTE: Controller to retrieve a single post by slug.
 * Fetches and returns the post that matches the provided slug.
 */
export const listOnePostSlug = ({ Post, buildResponse, handleHttpError }) => {
  return async (req, res) => {
    try {
      const postSlug = req.params.slug

      // Cerca il post per slug
      const post = await Post.findOne({ slug: postSlug })
        .populate('author', 'name')
        .lean()

      if (!post) {
        return handleHttpError(res, `No post found with slug: ${postSlug}`, 404)
      }

      res.json(buildResponse(req, 'Get one post', post, null, {}))
    } catch (error) {
      // Log error to the server console
      console.error('Error in listOnePostSlug controller:', error.message)
      // Handle unexpected errors gracefully
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

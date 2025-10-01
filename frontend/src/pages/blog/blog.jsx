import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import api from '@config/axios' // TODO: Uncomment when backend blog endpoint is ready
import MetaData from '@pages/noPage/metaData'
import { FaCalendarAlt, FaUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './blog.css'

// Mock data generation functions
const generateMockPosts = (page, limit) => {
  const totalMockPosts = 25 // Total mock posts
  const startIndex = (page - 1) * limit
  const endIndex = Math.min(startIndex + limit, totalMockPosts)
  
  const mockPosts = []
  for (let i = startIndex; i < endIndex; i++) {
    mockPosts.push({
      id: i + 1,
      title: getBlogTitle(i),
      excerpt: getBlogExcerpt(i),
      content: getBlogContent(i),
      author: getRandomAuthor(),
      date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      slug: getBlogSlug(i),
      category: getRandomCategory(),
      readTime: Math.floor(Math.random() * 10) + 2
    })
  }

  return {
    data: mockPosts,
    total: totalMockPosts,
    totalPages: Math.ceil(totalMockPosts / limit),
    currentPage: page
  }
}

const getBlogTitle = (index) => {
  const titles = [
    "Understanding Earthquake Magnitude Scales",
    "The Science Behind Seismic Waves",
    "How Earthquake Early Warning Systems Work",
    "Building Earthquake-Resistant Structures",
    "The Ring of Fire: Earth's Most Active Seismic Zone",
    "Predicting Earthquakes: Current Challenges and Future",
    "The Role of Plate Tectonics in Seismic Activity",
    "Italy's Seismic History: Lessons from Major Earthquakes",
    "Modern Seismology: Technology and Innovation",
    "Community Preparedness for Seismic Events"
  ]
  return titles[index % titles.length]
}

const getBlogExcerpt = (index) => {
  const excerpts = [
    "Explore the different scales used to measure earthquake magnitude and understand what the numbers really mean for seismic impact assessment.",
    "Dive deep into the fascinating world of seismic waves, their types, and how they travel through the Earth's layers.",
    "Learn about cutting-edge early warning systems that can provide crucial seconds of advance notice before strong shaking arrives.",
    "Discover the engineering principles and techniques used to construct buildings that can withstand seismic forces.",
    "An in-depth look at the Pacific Ring of Fire and why this region experiences the majority of the world's earthquakes and volcanic activity.",
    "Examining the current state of earthquake prediction science and the technological advances that may change the future.",
    "Understanding how the movement of tectonic plates creates the conditions for earthquakes and shapes our planet's surface.",
    "A comprehensive overview of Italy's most significant earthquakes and the valuable lessons learned from each event.",
    "Exploring the latest technologies and methodologies used by seismologists to monitor and study earthquake activity.",
    "Essential information for communities in seismic zones to prepare for and respond to earthquake emergencies."
  ]
  return excerpts[index % excerpts.length]
}

const getBlogContent = (index) => {
  return `This is the full content for blog post ${index + 1}. In a real implementation, this would contain the complete article content.`
}

const getBlogSlug = (index) => {
  const slugs = [
    "understanding-earthquake-magnitude-scales",
    "science-behind-seismic-waves",
    "earthquake-early-warning-systems",
    "building-earthquake-resistant-structures",
    "ring-of-fire-seismic-zone",
    "predicting-earthquakes-challenges-future",
    "plate-tectonics-seismic-activity",
    "italy-seismic-history-lessons",
    "modern-seismology-technology-innovation",
    "community-preparedness-seismic-events"
  ]
  return slugs[index % slugs.length]
}

const getRandomAuthor = () => {
  const authors = [
    "Dr. Elena Rodriguez",
    "Prof. Marco Antonelli",
    "Dr. Sarah Chen",
    "Dr. Ahmed Hassan",
    "Prof. Lisa Thompson"
  ]
  return authors[Math.floor(Math.random() * authors.length)]
}

const getRandomCategory = () => {
  const categories = [
    "Seismology",
    "Engineering",
    "Safety",
    "Research",
    "Technology"
  ]
  return categories[Math.floor(Math.random() * categories.length)]
}

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalPosts, setTotalPosts] = useState(0)
  const postsPerPage = 6

  const fetchPosts = async (page) => {
    try {
      setLoading(true)
      setError(null)
      
      // Since the backend doesn't have a blog endpoint yet, we'll create mock data
      // TODO: Replace with actual API call when backend blog endpoint is ready
      // const response = await api.get(`/blog?page=${page}&limit=${postsPerPage}`)
      
      // Mock data for demonstration
      const mockResponse = generateMockPosts(page, postsPerPage)
      
      setPosts(mockResponse.data)
      setTotalPages(mockResponse.totalPages)
      setTotalPosts(mockResponse.total)
    } catch (err) {
      setError('Failed to fetch blog posts. Please try again later.')
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts(currentPage)
  }, [currentPage]) // eslint-disable-line react-hooks/exhaustive-deps

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const generatePageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <MetaData title="Blog - Loading" description="Loading blog posts" />
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <MetaData title="Blog - Error" description="Error loading blog posts" />
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
            <p className="text-gray-300 mb-4">{error}</p>
            <button
              onClick={() => fetchPosts(currentPage)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <MetaData 
        title="Blog - TerraQuake API" 
        description="Stay updated with the latest insights on earthquake science, seismology research, and seismic safety from the TerraQuake API blog." 
      />
      
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Seismic Insights Blog
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore the latest research, insights, and developments in earthquake science and seismology
            </p>
            <div className="mt-4 text-sm text-gray-500">
              {totalPosts} articles • Page {currentPage} of {totalPages}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
              <article 
                key={post.id}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                {/* Post Header */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {post.readTime} min read
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-200 line-clamp-2">
                    <Link to={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Post Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-800 pt-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <FaUser className="text-purple-400" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaCalendarAlt className="text-purple-400" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Read More Link */}
                <div className="px-6 pb-6">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-200"
                  >
                    Read More
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === 1
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-800 text-white hover:bg-purple-600 hover:scale-105'
                  }`}
                >
                  <FaChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {generatePageNumbers().map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-lg transition-all duration-200 ${
                        currentPage === pageNum
                          ? 'bg-purple-600 text-white font-bold scale-110'
                          : 'bg-gray-800 text-gray-400 hover:bg-purple-600 hover:text-white hover:scale-105'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === totalPages
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-800 text-white hover:bg-purple-600 hover:scale-105'
                  }`}
                >
                  <span>Next</span>
                  <FaChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Page Info */}
              <div className="text-sm text-gray-500">
                Showing {((currentPage - 1) * postsPerPage) + 1} to {Math.min(currentPage * postsPerPage, totalPosts)} of {totalPosts} posts
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
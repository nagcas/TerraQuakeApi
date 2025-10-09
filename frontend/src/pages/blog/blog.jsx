import './blog.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import api from '@config/axios' // TODO: Uncomment when backend blog endpoint is ready
import MetaData from '@pages/noPage/metaData';
import {
  FaCalendarAlt,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import BackToTopButton from '@/components/utils/backToTopButton';

// Mock data generation functions
const generateMockPosts = (page, limit) => {
  const totalMockPosts = 25; // Total mock posts
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, totalMockPosts);

  const mockPosts = [];
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
      readTime: Math.floor(Math.random() * 10) + 2,
    });
  }

  return {
    data: mockPosts,
    total: totalMockPosts,
    totalPages: Math.ceil(totalMockPosts / limit),
    currentPage: page,
  };
};

const getBlogTitle = (index) => {
  const titles = [
    'Understanding Earthquake Magnitude Scales',
    'The Science Behind Seismic Waves',
    'How Earthquake Early Warning Systems Work',
    'Building Earthquake-Resistant Structures',
    "The Ring of Fire: Earth's Most Active Seismic Zone",
    'Predicting Earthquakes: Current Challenges and Future',
    'The Role of Plate Tectonics in Seismic Activity',
    "Italy's Seismic History: Lessons from Major Earthquakes",
    'Modern Seismology: Technology and Innovation',
    'Community Preparedness for Seismic Events',
  ];
  return titles[index % titles.length];
};

const getBlogExcerpt = (index) => {
  const excerpts = [
    'Explore the different scales used to measure earthquake magnitude and understand what the numbers really mean for seismic impact assessment.',
    "Dive deep into the fascinating world of seismic waves, their types, and how they travel through the Earth's layers.",
    'Learn about cutting-edge early warning systems that can provide crucial seconds of advance notice before strong shaking arrives.',
    'Discover the engineering principles and techniques used to construct buildings that can withstand seismic forces.',
    "An in-depth look at the Pacific Ring of Fire and why this region experiences the majority of the world's earthquakes and volcanic activity.",
    'Examining the current state of earthquake prediction science and the technological advances that may change the future.',
    "Understanding how the movement of tectonic plates creates the conditions for earthquakes and shapes our planet's surface.",
    "A comprehensive overview of Italy's most significant earthquakes and the valuable lessons learned from each event.",
    'Exploring the latest technologies and methodologies used by seismologists to monitor and study earthquake activity.',
    'Essential information for communities in seismic zones to prepare for and respond to earthquake emergencies.',
  ];
  return excerpts[index % excerpts.length];
};

const getBlogContent = (index) => {
  return `This is the full content for blog post ${
    index + 1
  }. In a real implementation, this would contain the complete article content.`;
};

const getBlogSlug = (index) => {
  const slugs = [
    'understanding-earthquake-magnitude-scales',
    'science-behind-seismic-waves',
    'earthquake-early-warning-systems',
    'building-earthquake-resistant-structures',
    'ring-of-fire-seismic-zone',
    'predicting-earthquakes-challenges-future',
    'plate-tectonics-seismic-activity',
    'italy-seismic-history-lessons',
    'modern-seismology-technology-innovation',
    'community-preparedness-seismic-events',
  ];
  return slugs[index % slugs.length];
};

const getRandomAuthor = () => {
  const authors = [
    'Dr. Elena Rodriguez',
    'Prof. Marco Antonelli',
    'Dr. Sarah Chen',
    'Dr. Ahmed Hassan',
    'Prof. Lisa Thompson',
  ];
  return authors[Math.floor(Math.random() * authors.length)];
};

const getRandomCategory = () => {
  const categories = [
    'Seismology',
    'Engineering',
    'Safety',
    'Research',
    'Technology',
  ];
  return categories[Math.floor(Math.random() * categories.length)];
};

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 6;

  const fetchPosts = async (page) => {
    try {
      setLoading(true);
      setError(null);

      // Since the backend doesn't have a blog endpoint yet, we'll create mock data
      // TODO: Replace with actual API call when backend blog endpoint is ready
      // const response = await api.get(`/blog?page=${page}&limit=${postsPerPage}`)

      // Mock data for demonstration
      const mockResponse = generateMockPosts(page, postsPerPage);

      setPosts(mockResponse.data);
      setTotalPages(mockResponse.totalPages);
      setTotalPosts(mockResponse.total);
    } catch (err) {
      setError('Failed to fetch blog posts. Please try again later.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (loading) {
    return (
      <div className='min-h-screen pt-24 pb-16'>
        <MetaData
          title='Blog - Loading'
          description='Loading blog posts'
        />
        <div className='container mx-auto px-4'>
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500'></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen pt-24 pb-16'>
        <MetaData
          title='Blog - Error'
          description='Error loading blog posts'
        />
        <div className='container mx-auto px-4'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-red-500 mb-4'>Error</h2>
            <p className='text-gray-300 mb-4'>{error}</p>
            <button
              onClick={() => fetchPosts(currentPage)}
              className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200'
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Blog | TerraQuake API - Earthquake News, Insights & Research'
        description='Explore the TerraQuake API Blog for expert insights on earthquake science, seismic monitoring, safety tips, and the latest in seismology research.'
        ogTitle='Blog | TerraQuake API - Earthquake News, Insights & Research'
        ogDescription='Stay informed with TerraQuake API’s blog. Discover earthquake science, seismology updates, safety tips, and cutting-edge research for developers and researchers.'
        twitterTitle='Blog | TerraQuake API'
        twitterDescription='Read the TerraQuake API blog for news, research insights, and seismic safety tips. Stay updated on earthquake monitoring and technology.'
        keywords='TerraQuake API blog, earthquake science, seismology research, earthquake monitoring, seismic safety, disaster prevention blog'
      />
      {/* SEO Stuff */}

      <motion.section
        className='relative z-0 w-full min-h-screen pt-24 pb-12 overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Gradient/Mesh (for a classy, dark theme) */}
        <div className='absolute inset-0 z-0'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>

        {/* Content Container */}
        <div className='relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white/70'>
          {/* Header Section */}
          <motion.div
            className='mb-16 text-center lg:text-left'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className='text-3xl text-center md:text-5xl text-white font-extrabold tracking-tighter mb-4'>
              Seismic Insights Blog.
              <div className='h-0.5 w-1/3 md:w-1/4 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-left text-white/70 max-w-7xl'>
              Explore the latest research, insights, and developments in
              earthquake science and seismology.
            </p>
            <div className='mt-4 text-sm text-gray-500'>
              {totalPosts} articles • Page {currentPage} of {totalPages}
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
            {posts.map((post) => (
              <article
                key={post.id}
                className='border border-white/5 bg-white/[0.03] rounded-3xl shadow-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 group'
              >
                {/* Post Header */}
                <div className='p-6'>
                  <div className='flex items-center justify-between mb-3'>
                    <span className='text-xs font-semibold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full'>
                      {post.category}
                    </span>
                    <span className='text-xs text-gray-500'>
                      {post.readTime} min read
                    </span>
                  </div>

                  <h2 className='text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-200 line-clamp-2'>
                    <Link
                      to={`/blog/${post.slug}`}
                      className='hover:underline'
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className='text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3'>
                    {post.excerpt}
                  </p>

                  {/* Post Meta */}
                  <div className='flex items-center justify-between text-xs text-gray-500 border-t border-gray-800 pt-4'>
                    <div className='flex items-center space-x-4'>
                      <div className='flex items-center space-x-1'>
                        <FaUser className='text-purple-400' />
                        <span>{post.author}</span>
                      </div>
                      <div className='flex items-center space-x-1'>
                        <FaCalendarAlt className='text-purple-400' />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Read More Link */}
                <div className='px-6 pb-6'>
                  <Link
                    to={`/blog/${post.slug}`}
                    className='relative z-50 inline-flex items-center text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-200'
                  >
                    Read More
                    <svg
                      className='ml-2 w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div>
              <div className='flex flex-col items-center space-y-4'>
                <div className='flex items-center space-x-2'>
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative z-30 flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      currentPage === 1
                        ? 'border border-white/5 bg-white/[0.03] rounded-3xl shadow-2xl text-white/70 cursor-not-allowed'
                        : 'border border-white/5 bg-white/[0.03] rounded-3xl shadow-2xl text-white/70 hover:bg-purple-600 hover:scale-105 cursor-pointer'
                    }`}
                  >
                    <FaChevronLeft className='w-4 h-4' />
                    <span className='hidden sm:inline'>Previous</span>
                  </button>

                  {/* Page Numbers */}
                  <div className='relative z-30 flex items-center space-x-1'>
                    {generatePageNumbers().map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg transition-all duration-200 ${
                          currentPage === pageNum
                            ? 'bg-purple-600 text-white/70 scale-110'
                            : 'border border-white/5 bg-white/[0.03] rounded-3xl shadow-2xl text-white/70 hover:bg-purple-600 hover:text-white hover:scale-105 cursor-pointer'
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
                    className={`relative z-30 flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      currentPage === totalPages
                        ? 'border border-white/5 bg-white/[0.03] rounded-3xl shadow-2xl text-white/70 cursor-not-allowed'
                        : 'border border-white/5 bg-white/[0.03] rounded-3xl shadow-2xl text-white/70 hover:bg-purple-600 hover:scale-105 cursor-pointer'
                    }`}
                  >
                    <span className='hidden sm:inline'>Next</span>
                    <FaChevronRight className='w-4 h-4' />
                  </button>
                </div>

                {/* Page Info */}
                <div className='text-sm text-gray-500'>
                  Showing {(currentPage - 1) * postsPerPage + 1} to{' '}
                  {Math.min(currentPage * postsPerPage, totalPosts)} of{' '}
                  {totalPosts} posts
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}

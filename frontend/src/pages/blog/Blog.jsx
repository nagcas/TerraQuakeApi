import './Blog.css';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from '@config/Axios.js';
import MetaData from '@pages/noPage/MetaData';
import {
  FaCalendarAlt,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import BackToTopButton from '@/components/utils/BackToTopButton';
import Spinner from '@/components/spinner/Spinner';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(9);

  useEffect(() => {
    listAllPosts();
  }, [currentPage]);

  const listAllPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `/posts/list-all-posts`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            page: currentPage,
            limit: postsPerPage,
          },
        }
      );

      setPosts(response.data.data.posts);
      setTotalPages(response.data.data.pagination.totalPages);
      setTotalPosts(response.data.data.pagination.totalResults);
    } catch (error) {
      setError('Failed to fetch blog posts. Please try again later.');
      console.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Manage page changes
  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages && pageNum !== currentPage) {
      setCurrentPage(pageNum);
    }
  };

  // Generate visible page numbers
  const generatePageNumbers = () => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Loading (show spinner first)
  if (loading) {
    return (
      <section className='z-30 w-full min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6 py-20 bg-gradient-to-b text-white'>
        <MetaData
          title='Blog - Loading'
          description='Loading blog posts'
        />
        <Spinner size='5xl' />
        <p className='text-gray-400 text-sm mt-4'>Loading blog posts...</p>
      </section>
    );
  }

  {
    /* Error */
  }
  if (error) {
    return (
      <section className='z-30 w-full min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6 py-20 bg-gradient-to-b text-white'>
        <MetaData
          title='Blog - Error'
          description='Error loading blog posts'
        />
        <h1 className='text-3xl md:text-4xl mx-auto text-purple-600 font-extrabold leading-tight mt-[50px] select-none'>
          Oops! Something went wrong.
        </h1>
        <p className='text-gray-300 mb-4'>{error}</p>

        <button
          onClick={() => listAllPosts()}
          className='py-2 px-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer'
        >
          Retry
        </button>
      </section>
    );
  }

  // No posts available
  if (!loading && totalPosts === 0) {
    return (
      <section className='z-30 w-full min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6 py-20 bg-gradient-to-b text-white'>
        <MetaData
          title='Blog - No posts available'
          description='Currently there are no posts available in the blog'
        />
        <h1 className='text-3xl md:text-4xl mx-auto text-purple-600 font-extrabold leading-tight mt-[50px] select-none'>
          No posts yet.
        </h1>
        <p className='text-gray-300 mb-4'>
          We are working on adding new articles. Please check back soon!
        </p>
        <NavLink
          to='/'
          className='py-2 px-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer'
          aria-label='Navigate to home page'
        >
          Back To Home
        </NavLink>
      </section>
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
            <p className='text-xl text-center md:text-left text-white/70 max-w-7xl'>
              Explore the latest research, insights, and developments in
              earthquake science and seismology.
            </p>
            <div className='mt-4 text-sm text-gray-500 text-center'>
              {totalPosts} articles • Page {currentPage} of {totalPages}
            </div>
          </motion.div>

          {/* Blog Posts Grid */}

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
            {posts.map((post) => (
              <article
                key={post._id}
                className='border border-white/5 bg-white/[0.03] rounded-3xl shadow-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 group'
              >
                {/* Post Header */}
                <div className='p-6'>
                  <div className='flex justify-center gap-1 mb-3'>
                    {post.categories.map((item, index) => (
                      <span
                        key={index}
                        className='text-xs font-semibold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full'
                      >
                        {item}
                      </span>
                    ))}
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
                        <span>{post.author?.name}</span>
                      </div>
                      <div className='flex items-center space-x-1'>
                        <FaCalendarAlt className='text-purple-400' />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Read More Link */}
                <div className='flex justify-between items-center px-6 pb-6'>
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
                  <span className='text-xs text-gray-500 ml-2'>
                    {post.readTime} min read
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='flex flex-col items-center space-y-4'>
              <div className='flex items-center space-x-2'>
                {/* Prev */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    currentPage === 1
                      ? 'opacity-50 cursor-not-allowed bg-gray-700'
                      : 'bg-purple-600 hover:bg-purple-500'
                  }`}
                >
                  <FaChevronLeft />
                </button>

                {/* Numbers */}
                {generatePageNumbers().map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-lg transition-all duration-200 ${
                      currentPage === pageNum
                        ? 'bg-purple-600 text-white scale-110'
                        : 'bg-white/[0.08] text-white/70 hover:bg-purple-600'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* Next */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    currentPage === totalPages
                      ? 'opacity-50 cursor-not-allowed bg-gray-700'
                      : 'bg-purple-600 hover:bg-purple-500'
                  }`}
                >
                  <FaChevronRight />
                </button>
              </div>

              <div className='text-sm text-gray-400'>
                Showing {(currentPage - 1) * postsPerPage + 1} to{' '}
                {Math.min(currentPage * postsPerPage, totalPosts)} of{' '}
                {totalPosts} posts
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

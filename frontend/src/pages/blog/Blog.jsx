import './Blog.css';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from '@config/Axios.js';
import MetaData from '@pages/noPage/MetaData';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import BackToTopButton from '@/components/utils/BackToTopButton';
import Spinner from '@/components/spinner/Spinner';
import Pagination from '@/components/utils/Pagination';
import Swal from 'sweetalert2';
import { formatDate } from '@/components/utils/FormatDate.js';
import { useTranslation } from 'react-i18next';

export default function Blog() {
  const { t } = useTranslation('translation');

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 9;

  useEffect(() => {
    listAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const listAllPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/posts', {
        headers: { 'Content-Type': 'application/json' },
        params: { page: currentPage, limit: postsPerPage },
      });

      const { payload } = response.data;

      if (!payload || !payload.posts) {
        throw new Error('Invalid response structure.');
      }

      setPosts(payload.posts);
      setTotalPages(payload.pagination.totalPages);
      setTotalPosts(payload.pagination.totalResults);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Unable to load posts. Please check your connection or try again later.';

      Swal.fire({
        title: 'Failed to Load Posts',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK',
      });

      console.error(
        'Error fetching posts:',
        error.response?.data || error.message
      );
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="z-30 w-full min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6 py-20 bg-gradient-to-b text-white">
        <MetaData title="Blog - Loading" description="Loading blog posts" />
        <Spinner size="5xl" />
        <p className="text-gray-400 text-sm mt-4">
          {t('blog.loading')}
        </p>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="z-30 w-full min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6 py-20 bg-gradient-to-b text-white">
        <MetaData title="Blog - Error" description="Error loading blog posts" />
        <h1 className="text-3xl md:text-4xl mx-auto text-purple-600 font-extrabold leading-tight mt-[50px] select-none">
          {t('blog.oops')}
        </h1>
        <p className="text-gray-300 mb-4">{error}</p>

        <button
          onClick={listAllPosts}
          className="py-2 px-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer"
        >
          {t('blog.retry')}
        </button>
      </section>
    );
  }

  // No posts state
  if (totalPosts === 0) {
    return (
      <section className="z-30 w-full min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6 py-20 bg-gradient-to-b text-white">
        <MetaData
          title="Blog - No posts available"
          description="Currently there are no posts available in the blog"
        />
        <h1 className="text-3xl md:text-4xl mx-auto text-purple-600 font-extrabold leading-tight mt-[50px] select-none">
          {t('blog.no_posts')}
        </h1>
        <p className="text-gray-300 mb-4">
          {t('blog.check')}
        </p>
        <NavLink
          to="/"
          className="py-2 px-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer"
          aria-label="Navigate to home page"
        >
          {t('blog.back')}
        </NavLink>
      </section>
    );
  }

  return (
    <>
      {/* SEO MetaData */}
      <MetaData
        title="Blog | TerraQuake API - Earthquake News, Insights & Research"
        description="Explore the TerraQuake API Blog for expert insights on earthquake science, seismic monitoring, safety tips, and the latest in seismology research."
        ogTitle="Blog | TerraQuake API - Earthquake News, Insights & Research"
        ogDescription="Stay informed with TerraQuake API’s blog. Discover earthquake science, seismology updates, safety tips, and cutting-edge research for developers and researchers."
        twitterTitle="Blog | TerraQuake API"
        twitterDescription="Read the TerraQuake API blog for news, research insights, and seismic safety tips. Stay updated on earthquake monitoring and technology."
        keywords="TerraQuake API blog, earthquake science, seismology research, earthquake monitoring, seismic safety, disaster prevention blog"
      />

      <motion.section
        className="relative z-0 w-full min-h-screen pt-24 pb-12 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white/70">
          {/* Header */}
          <motion.div
            className="mb-16 text-center lg:text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="text-3xl md:text-5xl text-white font-extrabold tracking-tighter mb-4 text-center">
              {t('blog.title')}
              <div className="h-0.5 w-1/3 md:w-1/4 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full" />
            </h1>
            <p className="text-xl text-center text-white/70 max-w-7xl">
              {t('blog.description')}
            </p>
            <div className="mt-4 text-sm text-gray-500 text-center">
              {totalPosts} {t('blog.articles')} {currentPage} {t('blog.of')} {totalPages}
            </div>
          </motion.div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
              <article
                key={post._id}
                className="border border-white/5 bg-white/[0.03] rounded-3xl shadow-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:scale-105 group"
              >
                <div className="p-6">
                  <div className="flex justify-center gap-1 mb-3 flex-wrap">
                    {post.categories?.map((item, index) => (
                      <span
                        key={index}
                        className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-200 line-clamp-2">
                    <Link to={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-800 pt-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <FaUser className="text-purple-400" />
                        <span>{post.author?.name || 'Unknown Author'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaCalendarAlt className="text-purple-400" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center px-6 pb-6">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-200"
                  >
                    {t('blog.read')}
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                  <span className="text-xs text-gray-500 ml-2">
                    {post.readTime || 2} {t('blog.min_read')}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalPosts}
            itemsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </motion.section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}


import './Blog.css';
import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '@config/Axios.js';
import MetaData from '@pages/noPage/MetaData';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import BackToTopButton from '@/components/utils/BackToTopButton';
import Spinner from '@/components/spinner/Spinner';
import Pagination from '@/components/utils/Pagination';
import { formatDate } from '@/components/utils/FormatDate.js';
import { useTranslation } from 'react-i18next';

export default function Blog() {
  const { t } = useTranslation('translation');
  const [searchParams, setSearchParams] = useSearchParams();

  // Core State
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  // Filtering & Category State
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || '',
  );
  const [allAvailableCategories, setAllAvailableCategories] = useState(['']);

  // Ref to persist categories even when the current "posts" list is filtered
  const hasLoadedCategories = useRef(false);
  const postsPerPage = 9;

  /**
   * Synchronizes the internal state with the URL.
   * This allows users to share links and use the browser's back button.
   */
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || '';
    if (categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
      setCurrentPage(1);
    }
  }, [searchParams, selectedCategory]);

  /**
   * Fetches posts whenever the page or the selected category changes.
   */
  useEffect(() => {
    listAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedCategory]);

  const listAllPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/posts`, {
        headers: { 'Content-Type': 'application/json' },
        params: {
          page: currentPage,
          limit: postsPerPage,
          category: selectedCategory,
        },
      });

      const { payload } = response.data;

      if (!payload || !payload.posts) {
        throw new Error(
          t('blog.no_articles')
        );
      }

      setPosts(payload.posts);
      setTotalPages(payload.pagination?.totalPages || 1);
      setTotalPosts(payload.pagination?.totalResults || payload.posts.length);

      // Populate categories list if it's the first load or we are in the "All" view
      if (!hasLoadedCategories.current || selectedCategory === '') {
        const uniqueCats = [
          ...new Set(payload.posts.flatMap((p) => p.categories || [])),
        ];
        if (uniqueCats.length > 0) {
          setAllAvailableCategories(['', ...uniqueCats]);
          hasLoadedCategories.current = true;
        }
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        t('blog.verify_connection');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <section className='z-30 w-full min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6 py-20 bg-gradient-to-b text-white'>
        <MetaData
          title='Blog - Loading'
          description='Loading blog posts'
        />
        <Spinner size='5xl' />
        <p className='text-gray-400 text-sm mt-4'>{t('blog.loading')}</p>
      </section>
    );
  }

  return (
    <>
      <MetaData
        title='Blog | TerraQuake API - Earthquake News, Insights & Research'
        description='Explore the TerraQuake API Blog for expert insights on earthquake science, seismic monitoring, safety tips, and the latest in seismology research.'
        ogTitle='Blog | TerraQuake API - Earthquake News, Insights & Research'
        ogDescription='Stay informed with TerraQuake API’s blog. Discover earthquake science, seismology updates, safety tips, and cutting-edge research.'
        twitterTitle='Blog | TerraQuake API'
        twitterDescription='Read the TerraQuake API blog for news, research insights, and seismic safety tips.'
        keywords='TerraQuake API blog, earthquake science, seismology research, earthquake monitoring, seismic safety'
      />

      <motion.section
        className='relative z-0 w-full min-h-screen pt-24 pb-12 overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background Blobs */}
        <div className='absolute inset-0 z-0 pointer-events-none'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>

        <div className='relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white/70'>
          {/* Header Section */}
          <motion.div
            className='mb-16 text-center lg:text-left'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className='text-3xl md:text-5xl text-white font-extrabold tracking-tighter mb-4 text-center'>
              {t('blog.title')}
              <div className='h-0.5 w-1/3 md:w-1/4 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-center text-white/70 max-w-7xl'>
              {t('blog.description')}
            </p>

            {/* Category Filter Navigation */}
            <div className='flex flex-wrap justify-center gap-3 mt-12 mb-8'>
              {allAvailableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-transparent shadow-lg scale-105 cursor-pointer'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:border-purple-500/50 cursor-pointer'
                  }`}
                >
                  {cat === '' ? t('blog.all_articles') : cat}
                </button>
              ))}
            </div>

            <div className='mt-4 text-sm text-gray-500 text-center'>
              {totalPosts} {t('blog.articles')} {currentPage} {t('blog.of')}{' '}
              {totalPages}
            </div>
          </motion.div>

          {/* Conditional Rendering: Grid or Error State */}
          {error ? (
            <div className='text-center py-20'>
              <h2 className='text-2xl text-red-400 font-bold mb-4'>{error}</h2>
              <button
                onClick={listAllPosts}
                className='py-2 px-8 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer'
              >
                {t('blog.retry')}
              </button>
            </div>
          ) : posts.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
              {posts.map((post) => (
                <article
                  key={post._id}
                  className='border border-white/5 bg-white/[0.03] rounded-3xl shadow-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:scale-105 group'
                >
                  <div className='p-6'>
                    <div className='flex justify-center gap-1 mb-3 flex-wrap'>
                      {post.categories?.map((item, index) => (
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

                    <div className='flex items-center justify-between text-xs text-gray-500 border-t border-gray-800 pt-4'>
                      <div className='flex items-center space-x-4'>
                        <div className='flex items-center space-x-1'>
                          <FaUser className='text-purple-400' />
                          <span>
                            {post.author?.name || 'TerraQuake Author'}
                          </span>
                        </div>
                        <div className='flex items-center space-x-1'>
                          <FaCalendarAlt className='text-purple-400' />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-between items-center px-6 pb-6'>
                    <Link
                      to={`/blog/${post.slug}`}
                      className='inline-flex items-center text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-200'
                    >
                      {t('blog.read')}
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
                      {post.readTime || 2} {t('blog.min_read')}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className='text-center py-20'>
              <h2 className='text-2xl text-white font-bold'>
                {t('blog.no_posts')}
              </h2>
              <p className='text-gray-400 mt-2'>
                {t('blog.check_later')}
              </p>
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalPosts}
            itemsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </motion.section>
      <BackToTopButton />
    </>
  );
}

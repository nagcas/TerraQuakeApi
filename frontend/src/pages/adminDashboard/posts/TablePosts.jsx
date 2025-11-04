import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Spinner from '@/components/spinner/Spinner';
import ViewPost from './ViewPost';
import UpdatePost from './UpdatePost';
import DeletePost from './DeletePost';
import SharePost from './SharePost';
import BackToTopButton from '@/components/utils/BackToTopButton';
import { formatDate } from '@/components/utils/FormatDate.js';
import usePosts from '@/hooks/usePosts';
import Pagination from '@/components/utils/Pagination';

export default function TablePosts() {
  const location = useLocation();
  const { page = 1, limit = 20 } = location.state || {};

  const {
    posts,
    totalPagesPosts,
    totalPosts,
    currentPagePost,
    setCurrentPagePost,
    postsPerPage,
    loadingPost,
    errorPost,
  } = usePosts(page, limit);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPagePost]);

  return (
    <>
      <motion.section
        className='relative z-30 w-full min-h-screen pt-24 pb-12 overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Gradient/Mesh (for a classy, dark theme) */}
        <div className='absolute inset-0 z-0'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>
        <div className='relative z-50 w-full max-w-7xl mx-auto px-6 lg:px-12'>
          <div className='mb-8'>
            <Link
              to='/admin'
              className='relative z-50 inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors duration-200 cursor-pointer'
            >
              ← Back to Dashboard
            </Link>
          </div>

          {/* Title */}
          <motion.div
            className='mb-12 text-center'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className='text-3xl md:text-5xl font-extrabold text-white mb-4'>
              Manage Posts - Tabular View.
              <div className='h-0.5 w-1/3 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
          </motion.div>

          {loadingPost && (
            <p className='flex justify-center mt-16 text-center text-2xl'>
              <Spinner size='4xl' />
            </p>
          )}
          {errorPost && <p className='text-red-500'>{errorPost}</p>}

          {!loadingPost && !errorPost && (
            <>
              <div className='flex flex-col lg:flex-row gap-6 justify-between items-center mb-4'>
                <input
                  type='text'
                  placeholder='Search by title...'
                  className='w-2/3 p-2 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500'
                />
                <button className='py-2 px-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer'>
                  New Post
                </button>
              </div>

              <div className='overflow-x-auto border border-white/5 bg-white/[0.03] bg-opacity-50 rounded-lg'>
                <table className='min-w-full divide-y divide-gray-700'>
                  <thead className='bg-gray-800 bg-opacity-70'>
                    <tr className='bg-purple-500/20 text-purple-300 uppercase text-xs tracking-wider'>
                      <th className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                        Id
                      </th>
                      <th className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                        Author
                      </th>
                      <th className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                        Date
                      </th>
                      <th className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                        Title
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                        Deleted
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                        Options
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-800'>
                    {posts.map((item) => (
                      <tr
                        key={item._id}
                        className=' hover:bg-purple-500/10 transition-colors'
                      >
                        <td className='text-sm px-6 py-4 whitespace-nowrap'>
                          {item._id.slice(0, 6)}...
                        </td>
                        <td className='text-sm px-6 py-4 whitespace-nowrap'>
                          {item.author.name}
                        </td>
                        <td className='text-sm px-6 py-4 whitespace-nowrap'>
                          {formatDate(item.createdAt)}
                        </td>
                        <td className='text-sm px-6 py-4 whitespace-nowrap'>
                          {item.title.slice(0, 15)}...
                        </td>
                        <td className='text-sm px-6 py-4 whitespace-nowrap'>
                          {item.deleted === true ? 'Yes' : 'No'}
                        </td>
                        <td className='flex gap-4 text-sm px-6 py-4'>
                          <ViewPost />
                          <UpdatePost />
                          <DeletePost />
                          <SharePost />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPagePost}
          totalPages={totalPagesPosts}
          totalItems={totalPosts}
          itemsPerPage={postsPerPage}
          setCurrentPage={setCurrentPagePost}
        />
      </motion.section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}

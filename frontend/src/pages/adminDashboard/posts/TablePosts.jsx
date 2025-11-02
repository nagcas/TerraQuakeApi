import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '@/components/spinner/Spinner';
import axios from '@/config/Axios.js';
import Swal from 'sweetalert2';
import ViewPost from './ViewPost';
import UpdatePost from './UpdatePost';
import DeletePost from './DeletePost';
import SharePost from './SharePost';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import BackToTopButton from '@/components/utils/BackToTopButton';
import { formatDate } from '@/components/utils/FormatDate.js';

export default function TablePosts() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    listAllPosts();
  }, [currentPage]);

  const listAllPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/posts/list-all-posts`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit: postsPerPage,
        },
      });

      const { payload } = response.data;

      setPosts(payload.posts);
      setTotalPages(payload.pagination.totalPages);
      setTotalPosts(payload.pagination.totalResults);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch posts data. Please ensure the backend server is running.',
        icon: 'error',
        confirmButtonText: 'Ok',
      }).then(() => {
        setLoading(false);
        navigate('/admin', { replace: true });
      });
    } finally {
      setLoading(false);
    }
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

          {loading && (
            <p className='flex justify-center mt-16 text-center text-2xl'>
              <Spinner size='4xl' />
            </p>
          )}
          {error && <p className='text-red-500'>{error}</p>}

          {!loading && !error && (
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
        <div className='relative z-50 my-6'>
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
                      : 'bg-purple-600 hover:bg-purple-500 cursor-pointer'
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
                        ? 'bg-purple-600 text-white scale-110 curspor-pointer'
                        : 'bg-white/[0.08] text-white/70 hover:bg-purple-600 cursor-pointer'
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
                      : 'bg-purple-600 hover:bg-purple-500 cursor-pointer'
                  }`}
                >
                  <FaChevronRight />
                </button>
              </div>

              <div className='text-sm text-gray-400'>
                Showing {(currentPage - 1) * postsPerPage + 1} to{' '}
                {Math.min(currentPage * postsPerPage, totalPosts)} of {totalPosts}{' '}
                posts
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

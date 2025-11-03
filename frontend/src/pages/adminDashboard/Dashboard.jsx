import './Dashboard.css';
import React from 'react';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { Context } from '@components/modules/Context';
import Statistics from './statistics/Statistics';
import ListUsers from './users/ListUsers';
import ListPosts from './posts/ListPosts';
import ListMessages from './messages/ListMessages';
import ListNewsletters from './newsletters/ListNewsletters';
import ListEmailNewsletters from './emailsNewsletters/ListEmailNewsletters';
import ListReviews from './reviews/ListReviews';
import { useNavigate } from 'react-router-dom';
import ListFaqs from './faq/ListFaqs';
import useUsers from '@/hooks/useUsers';
import usePosts from '@/hooks/usePosts';

export default function AdminDashboard() {
  const { userLogin } = useContext(Context);
  const navigate = useNavigate();
  
  // Hooks
  const { users, totalPagesUsers, totalUsers, currentPageUser, setCurrentPageUser, usersPerPage, loadingUser, errorUser } = useUsers();
  const { posts, totalPagesPosts, totalPosts, currentPagePost, setCurrentPagePost, postsPerPage, loadingPost, errorPost } = usePosts();

  const handleProfile = () => {
    navigate('/profile', { replace: true });
  };

  const handleBlog = () => {
    navigate('/blog', { replace: true });
  };

  return (
    <motion.div
      className='relative z-10 min-h-screen pt-24 pb-12'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className='max-w-7xl mx-auto px-6 lg:px-12'>
        {/* Header */}
        <motion.div
          className='mb-12'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h1 className='text-3xl text-center md:text-5xl text-white font-extrabold tracking-tighter mb-4'>
            Admin Dashboard
            <div className='h-0.5 w-1/3 md:w-1/4 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
          </h1>
          <p className='text-xl text-center text-white/70'>
            Welcome back, {userLogin?.name || 'Administrator'}
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
          {/* Statistics Card */}
          <motion.div
            className='p-6 border border-white/5 bg-white/[0.03] rounded-2xl shadow-2xl'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className='text-xl font-bold text-white mb-4'>Statistics</h3>
            <Statistics />
          </motion.div>

          {/* Users Management */}
          <motion.div
            className='p-6 border border-white/5 bg-white/[0.03] rounded-2xl shadow-2xl'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className='text-xl font-bold text-white mb-4'>Users</h3>
            <ListUsers
              users={users}
              totalUsers={totalUsers}
              totalPagesUsers={totalPagesUsers}
              currentPageUser={currentPageUser}
              usersPerPage={usersPerPage}
              loadingUser={loadingUser}
              errorUser={errorUser}
            />
          </motion.div>

          {/* Posts Management */}
          <motion.div
            className='p-6 border border-white/5 bg-white/[0.03] rounded-2xl shadow-2xl'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className='text-xl font-bold text-white mb-4'>Posts</h3>
            <ListPosts 
              posts={posts}
              totalPosts={totalPosts}
              totalPagesPosts={totalPagesPosts}
              currentPagePost={currentPagePost}
              postsPerPage={postsPerPage}
              loadingPost={loadingPost}
              errorPost={errorPost}
            />
          </motion.div>

          {/* Messages Management */}
          <motion.div
            className='p-6 border border-white/5 bg-white/[0.03] rounded-2xl shadow-2xl'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className='text-xl font-bold text-white mb-4'>Messages</h3>
            <ListMessages />
          </motion.div>

          {/* Emails Management */}
          <motion.div
            className='p-6 border border-white/5 bg-white/[0.03] rounded-2xl shadow-2xl'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className='text-xl font-bold text-white mb-4'>
              Registered Emails
            </h3>
            <ListEmailNewsletters />
          </motion.div>

          {/* Newsletter Management */}
          <motion.div
            className='p-6 border border-white/5 bg-white/[0.03] rounded-2xl shadow-2xl'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className='text-xl font-bold text-white mb-4'>Newsletters</h3>
            <ListNewsletters />
          </motion.div>

          {/* Faq Management */}
          <motion.div
            className='p-6 border border-white/5 bg-white/[0.03] rounded-2xl shadow-2xl'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className='text-xl font-bold text-white mb-4'>Faqs</h3>
            <ListFaqs />
          </motion.div>

          {/* Reviews Management */}
          <motion.div
            className='p-6 border border-white/5 bg-white/[0.03] rounded-2xl shadow-2xl'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className='text-xl font-bold text-white mb-4'>Reviews</h3>
            <ListReviews />
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className='p-6 border border-white/5 bg-white/[0.03] rounded-2xl shadow-2xl'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h3 className='text-xl font-bold text-white mb-4'>Quick Actions</h3>
            <div className='space-y-3'>
              <button
                onClick={() => handleProfile()}
                className='w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer'
              >
                Profile
              </button>
              <button
                onClick={() => handleBlog()}
                className='w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer'
              >
                Blog
              </button>
              <button className='w-full bg-gradient-to-r from-green-600 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer'>
                View Reports
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

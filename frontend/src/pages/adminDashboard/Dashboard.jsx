import React from 'react'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { Context } from '@components/modules/Context'
import Statistics from './statistics/Statistics'
import ListUsers from './users/ListUsers'
import ListPosts from './posts/ListPosts'
import ListMessages from './messages/ListMessages'
import ListNewsletters from './newsletters/ListNewsletters'
import './Dashboard.css'

export default function AdminDashboard() {
  const { userLogin } = useContext(Context)

  return (
    <motion.div
      className='min-h-screen pt-24 pb-12'
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
          <h1 className='text-4xl md:text-6xl text-white font-extrabold tracking-tighter mb-4'>
            Admin Dashboard
          </h1>
          <div className='h-0.5 w-1/4 bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500 my-4 rounded-full' />
          <p className='text-xl text-white/70'>
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
            <ListUsers />
          </motion.div>

          {/* Posts Management */}
          <motion.div
            className='p-6 border border-white/5 bg-white/[0.03] rounded-2xl shadow-2xl'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className='text-xl font-bold text-white mb-4'>Posts</h3>
            <ListPosts />
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

          {/* Quick Actions */}
          <motion.div
            className='p-6 border border-white/5 bg-white/[0.03] rounded-2xl shadow-2xl'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h3 className='text-xl font-bold text-white mb-4'>Quick Actions</h3>
            <div className='space-y-3'>
              <button className='w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg hover:scale-[1.02] transition-all duration-300'>
                Create New Post
              </button>
              <button className='w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg hover:scale-[1.02] transition-all duration-300'>
                Send Newsletter
              </button>
              <button className='w-full bg-gradient-to-r from-green-600 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:scale-[1.02] transition-all duration-300'>
                View Reports
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

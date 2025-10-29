import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import MetaData from '@/pages/noPage/MetaData'
import BackToTopButton from '../utils/BackToTopButton'

export default function Unsubscribe() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get('token')
  const email = queryParams.get('email')

  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('Processing your request...')

  useEffect(() => {
    const fetchUnsubscribe = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_URL_BACKEND}/newsletter/unsubscribe`,
          { params: { token, email } }
        )
        // Mostra solo il messaggio stringa
        setMessage(res.data?.message || 'Successfully unsubscribed from newsletter.')
        setStatus('success')
      } catch (error) {
        const backendMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          'An unexpected error occurred while unsubscribing.'
        setMessage(backendMessage)
        setStatus('error')
      }
    }

    fetchUnsubscribe()
  }, [token, email])

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Unsubscribe | TerraQuake Newsletter'
        description='Manage your TerraQuake newsletter subscription status.'
        ogTitle='Unsubscribe | TerraQuake Newsletter'
        ogDescription='Manage your TerraQuake newsletter subscription.'
        twitterTitle='Unsubscribe | TerraQuake Newsletter'
        twitterDescription='Manage your TerraQuake newsletter subscription.'
        keywords='unsubscribe, newsletter, TerraQuake, earthquake updates, seismic insights'
      />
      {/* SEO Stuff */}

      <section className='z-30 w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b text-white relative overflow-hidden'>
        {/* Animated background */}
        <div className='absolute inset-0 z-0'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>

        <motion.div
          className='mb-16 text-center z-10'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h1 className='text-3xl md:text-6xl text-purple-600 mx-auto font-extrabold leading-tight mt-[50px] select-none'>
            Unsubscribe Newsletter
          </h1>

          {status === 'loading' && (
            <p className='mt-6 mx-auto md:text-xl text-gray-300 animate-pulse'>
              {message}
            </p>
          )}

          {status === 'success' && (
            <p className='mt-6 mx-auto md:text-xl text-green-400'>
              {message}
            </p>
          )}

          {status === 'error' && (
            <p className='mt-6 mx-auto md:text-xl text-red-400'>
              {message}
            </p>
          )}
        </motion.div>

        {(status === 'success' || status === 'error') && (
          <button
            onClick={() => navigate('/')}
            className='z-30 mt-6 py-4 px-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer'
            aria-label='Navigate to home page'
          >
            Back To Home
          </button>
        )}
      </section>
      {/* Floating Back-to-Top Button */}
      <BackToTopButton />
    </>
  )
}

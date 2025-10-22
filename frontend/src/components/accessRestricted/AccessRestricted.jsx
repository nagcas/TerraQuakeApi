import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function AccessRestricted() {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='flex flex-col items-center justify-center min-h-[60vh] text-center max-w-lg mx-auto px-4'
    >
      <h1 className='text-3xl sm:text-4xl font-extrabold mb-4 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent'>
        Access Restricted
      </h1>
      <p className='text-gray-300 mb-8 text-sm sm:text-base'>
        You need to be signed in to access this section. Please log in or create a new account to continue.
      </p>
      <div className='z-30 flex justify-center gap-4 flex-wrap'>
        <button
          onClick={() => navigate('/signin')}
          className='py-2 sm:py-3 px-6 sm:px-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full font-bold text-white shadow-lg hover:scale-105 transition-transform text-sm sm:text-base cursor-pointer'
        >
          Log In
        </button>
        <button
          onClick={() => navigate('/signup')}
          className='py-2 sm:py-3 px-6 sm:px-8 bg-gradient-to-r from-pink-600 to-purple-700 rounded-full font-bold text-white shadow-lg hover:scale-105 transition-transform text-sm sm:text-base cursor-pointer'
        >
          Sign Up
        </button>
      </div>
    </motion.section>
  );
}


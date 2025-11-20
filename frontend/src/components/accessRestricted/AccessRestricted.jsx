import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function AccessRestricted() {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='
          relative z-50 pointer-events-auto
          flex flex-col items-center justify-center
          text-center max-w-full mx-auto px-4
        '
      >
        <h1
          className='text-3xl md:text-6xl font-extrabold mb-4 
          bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent'
        >
          Access Restricted
        </h1>

        <p className='text-gray-300 mb-8 text-sm sm:text-base'>
          You need to be signed in to access this section. Please log in or
          create a new account to continue.
        </p>

        <div className='flex justify-center gap-4 flex-wrap'>
          <button
            type='button'
            onClick={() => navigate('/signin')}
            className='
              py-2 sm:py-3 px-6 sm:px-8
              bg-gradient-to-r from-purple-600 to-indigo-600
              rounded-full font-bold text-white
              shadow-lg hover:scale-105 transition-transform
              text-sm sm:text-base cursor-pointer
            '
          >
            Log In
          </button>

          <button
            type='button'
            onClick={() => navigate('/signup')}
            className='
              py-2 sm:py-3 px-6 sm:px-8
              bg-gradient-to-r from-pink-600 to-purple-700
              rounded-full font-bold text-white
              shadow-lg hover:scale-105 transition-transform
              text-sm sm:text-base cursor-pointer
            '
          >
            Sign Up
          </button>
        </div>
      </motion.section>
    </div>
  );
}

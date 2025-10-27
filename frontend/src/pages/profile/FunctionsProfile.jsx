import { useState } from 'react';
import { motion } from 'framer-motion';

export default function FunctionsProfile({ setActiveSection }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='mt-6 flex flex-col gap-3 sm:gap-4'
      >
        <button
          onClick={() => setActiveSection('edit')}
          className='w-48 sm:w-60 border border-pink-400 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 transition-all duration-300 text-white font-semibold py-2 px-6 rounded-full cursor-pointer text-sm sm:text-base'
        >
          Edit Profile
        </button>

        <button
          onClick={() => setActiveSection('delete')}
          className='w-48 sm:w-60 border border-purple-400 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 transition-all duration-300 text-white font-semibold py-2 px-6 rounded-full cursor-pointer text-sm sm:text-base'
        >
          Delete Profile
        </button>
      </motion.div>
    </>
  );
}

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function ViewUser({ users }) {
  const [isOpen, setIsOpen] = useState(false);

  console.log(users);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className='px-4 border border-white/5 bg-white/[0.03] rounded-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer'
      >
        View
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className='fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50'
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.8 }}
              className='bg-black rounded-lg shadow-lg w-11/12 max-w-4xl max-h-screen overflow-y-auto relative'
            >
              <h2 className='p-4 bg-purple-500/20 text-purple-300 uppercase text-xs tracking-wider'>
                User Data
              </h2>
              <pre className='p-6 text-sm bg-white/[0.03] bg-opacity-50 bg-opacity-70'>
                {JSON.stringify(users, null, 2)}
              </pre>
              <button
                onClick={toggleModal}
                className='absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700 cursor-pointer'
              >
                ×
              </button>
              <button
                onClick={toggleModal}
                className='absolute bottom-2 right-2 px-6 py-2 text-md border border-white/5 bg-white/[0.03] rounded-2xl shadow-2xl hover:scale-[1.05] transition-all duration-300 cursor-pointer'
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa6';

export default function BackToTopButton({ threshold = 280 }) {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return (
    <>
      {/* Back to Top Button */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            onClick={scrollToTop}
            className='fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 
                       text-white p-3 rounded-full shadow-lg hover:scale-110 
                       transition-all duration-300 z-50 cursor-pointer flex gap-1 justify-center items-center'
          >
            <FaArrowUp size={20} />
            <span className='hidden sm:inline'>Back to top</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

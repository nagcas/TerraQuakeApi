import React, { useEffect, useRef, useState } from 'react';
import MetaData from '@pages/noPage/metaData';
import { motion, AnimatePresence } from 'framer-motion';
import { useCaseDocs } from '@/data/USE_CASE_DOCS';
import AccordionItem from '@/utils/useCases/AccordionItem';
import { FaArrowUp } from 'react-icons/fa6';

export default function UseCases() {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isSticky, setIsSticky] = useState(true);
  const sectionRef = useRef(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const section = sectionRef.current;
      if (!section) return;

      const sectionBottom = section.offsetTop + section.offsetHeight;
      const viewportHeight = window.innerHeight;

      setShowButton(scrollY > 280);
      setIsSticky(scrollY + viewportHeight < sectionBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showButton]);

  return (
    <>
      {/* SEO Metadata */}
      <MetaData
        title='Use Cases'
        description='Explore practical applications of TerraQuake API for earthquake monitoring, seismic data analysis, early warning systems, and disaster prevention — designed for developers, researchers, and organizations.'
        ogTitle='Use Cases - TerraQuake API'
        ogDescription='Discover how developers, researchers, and organizations use TerraQuake API to monitor earthquakes, analyze seismic data, and improve disaster preparedness.'
        twitterTitle='Use Cases - TerraQuake API'
        twitterDescription='Explore real-world applications of TerraQuake API for earthquake monitoring, seismic data, early warning systems, and disaster prevention.'
        keywords='TerraQuake API, use cases, earthquake monitoring API, seismic data, early warning systems, disaster prevention'
      />

      {/* Main Section */}
      <motion.section
        ref={sectionRef}
        className='relative z-0 w-full min-h-screen pt-24 pb-12 overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Gradient */}
        <div className='absolute inset-0 z-0'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>

        {/* Content Container */}
        <div className='relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12'>
          {/* Header */}
          <motion.div
            className='mb-16'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className='text-3xl md:text-5xl text-white font-extrabold tracking-tighter mb-4'>
              Use Cases for TerraQuake API.
              <div className='h-0.5 w-1/4 md:w-1/5 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-white/70 max-w-3xl'>
              Use Cases describe real-world scenarios where TerraQuake API can be applied.
              By providing fast, reliable access to seismic data, the API enables developers,
              researchers, institutions, and organizations to create applications focused on
              safety, monitoring, education, and disaster prevention.
            </p>
          </motion.div>

          {/* Accordion Section */}
          <motion.div
            initial='hidden'
            animate='visible'
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className='w-full flex flex-col space-y-6'
          >
            {useCaseDocs.map((item, index) => (
              <AccordionItem
                key={item.title}
                item={item}
                index={index}
                expandedIndex={expandedIndex}
                toggleExpand={toggleExpand}
              />
            ))}
          </motion.div>
        </div>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showButton && (
            <motion.button
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: 1,
                y: 0,
                position: isSticky ? 'fixed' : 'absolute',
                bottom: isSticky ? 24 : 0,
                right: 24,
              }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              onClick={scrollToTop}
              className='bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 
              text-white p-3 mb-3 rounded-full shadow-lg hover:scale-110 
              transition-all duration-300 z-50 cursor-pointer flex gap-1 justify-center items-center'
            >
              <FaArrowUp size={20} />
              <span className='hidden sm:inline'>Back to top</span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.section>
    </>
  );
}
import React, { useState } from 'react';
import MetaData from '@pages/noPage/MetaData';
import { motion } from 'framer-motion';
import { useCaseDocs_en } from '@/data/UseCaseDocs_en';
import { useCaseDocs_it } from '@/data/UseCaseDocs_it';
import { useCaseDocs_es } from '@/data/UseCaseDocs_es';
import AccordionItem from '@/utils/useCases/AccordionItem';
import BackToTopButton from '@/components/utils/BackToTopButton';
import { useTranslation } from 'react-i18next';

export default function UseCases() {
  const { t, i18n } = useTranslation('translation');

  const [expandedIndex, setExpandedIndex] = useState([]);

  const toggleExpand = (index) => {
    setExpandedIndex((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

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
          {/* Header Section */}
          <motion.div
            className='mb-16 text-center lg:text-left'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className='text-3xl text-center md:text-5xl text-white font-extrabold tracking-tighter mb-4'>
              {t('use_cases.title')}
              <div className='h-0.5 w-1/3 md:w-1/4 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-center md:text-left text-white/70 max-w-7xl'>
              {t('use_cases.description')}
            </p>
          </motion.div>

          {/* Accordion Section */}
          <motion.div
            initial='hidden'
            animate='visible'
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className='w-full flex flex-col space-y-6'
          >
            {i18n.language === 'en' && (
              useCaseDocs_en.map((item, index) => (
                <AccordionItem
                  key={item.title}
                  item={item}
                  index={index}
                  expandedIndex={expandedIndex}
                  toggleExpand={toggleExpand}
                />
              ))
            )}
            {i18n.language === 'it' && (
              useCaseDocs_it.map((item, index) => (
                <AccordionItem
                  key={item.title}
                  item={item}
                  index={index}
                  expandedIndex={expandedIndex}
                  toggleExpand={toggleExpand}
                />
              ))
            )}
            {i18n.language === 'es' && (
              useCaseDocs_es.map((item, index) => (
                <AccordionItem
                  key={item.title}
                  item={item}
                  index={index}
                  expandedIndex={expandedIndex}
                  toggleExpand={toggleExpand}
                />
              ))
            )}
          </motion.div>
        </div>
      </motion.section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}

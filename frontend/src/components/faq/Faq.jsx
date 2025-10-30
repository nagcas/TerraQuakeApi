import MetaData from '@/pages/noPage/MetaData';
import BackToTopButton from '../utils/BackToTopButton';
import { motion } from 'framer-motion';
import FaqItem from './FaqItem';
import { useEffect, useState } from 'react';
import axios from '@config/Axios.js';
import Spinner from '../spinner/Spinner';
import Pagination from '../utils/Pagination';

export default function Faq() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalFaq, setTotalFaq] = useState(0);
  const [faqPerPage, setFaqPerPage] = useState(10);

  useEffect(() => {
    fetchAllFaq();
  }, [currentPage]);

  const fetchAllFaq = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/faq/list-all-faq', {
        headers: {
          'Content-Type': 'applications/json',
        },
        params: {
          page: currentPage,
          limit: faqPerPage,
        },
      });
      
      const { payload } = response.data;

      setFaqData(payload.faqs);
      setTotalPages(payload.pagination.totalPages);
      setTotalFaq(payload.pagination.totalResults);
    } catch (error) {
      setError('Failed to fetch faq. Please try again later.');
      console.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Show loading screen while fetching token and user data
  if (loading) {
    return (
      <section className='z-30 w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b text-white'>
        <Spinner size='4xl' />
        <p className='mt-6 mx-auto md:text-xl text-gray-300'>Loading faq...</p>
      </section>
    );
  }

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='FAQ'
        description='Find answers to frequently asked questions about TerraQuake API, including data access, endpoints, usage guidelines, and best practices for integrating seismic data into your projects.'
        ogTitle='FAQ - TerraQuake API'
        ogDescription='Explore our comprehensive FAQ for TerraQuake API covering data access, API endpoints, usage guidelines, and tips for developers and researchers.'
        twitterTitle='FAQ - TerraQuake API'
        twitterDescription='Get answers to common questions about TerraQuake API, including how to access data, use endpoints, and follow best practices.'
        keywords='TerraQuake API, FAQ, earthquake API questions, API usage guidelines, seismic data access'
      />
      {/* SEO Stuff */}

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
        <div className='relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-white/70'>
          {/* Header Section */}
          <motion.div
            className='mb-16 text-center lg:text-left'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className='text-3xl text-center md:text-5xl text-white font-extrabold tracking-tighter mb-4'>
              Frequently Asked Questions.
              <div className='h-0.5 w-1/3 md:w-1/4 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-center md:text-left text-white/70 max-w-7xl'>
              Find quick answers to common questions about TerraQuake API.
            </p>
          </motion.div>

          {/* FAQ Content Section */}

          <div className='space-y-6'>
            {faqData.map((faq) => (
              <FaqItem
                key={faq._id}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          totalItems={totalFaq} 
          itemsPerPage={faqPerPage} 
          setCurrentPage={setCurrentPage}
        />
      </motion.section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}

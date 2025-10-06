import BackToTopButton from '@/components/utils/backToTopButton';
import MetaData from '@pages/noPage/metaData';
import { motion } from 'framer-motion';

export default function ApiAccess() {
  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='API Access | TerraQuake API - Real-Time Earthquake Data'
        description='Access TerraQuake API to integrate real-time earthquake monitoring and seismic data into your applications. Explore our documentation and start building earthquake-aware solutions.'
        ogTitle='API Access | TerraQuake API - Real-Time Earthquake Monitoring'
        ogDescription='Get API access to TerraQuake — the real-time earthquake data platform. Integrate seismic monitoring into your projects with our easy-to-use API.'
        twitterTitle='API Access | TerraQuake API - Earthquake Data API'
        twitterDescription='Access TerraQuake API for real-time earthquake data, seismic analysis, and monitoring capabilities. Start your integration today.'
        keywords='TerraQuake API access, earthquake data API, real-time earthquake API, seismic monitoring API, API documentation, earthquake detection'
      />
      {/* SEO Stuff */}

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
              API Access for TerraQuake API.
              <div className='h-0.5 w-1/3 md:w-1/4 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-left mx-auto text-white/70 max-w-7xl'>
              Use Cases describe real-world scenarios where TerraQuake API can
              be applied. By providing fast, reliable access to seismic data,
              the API enables developers, researchers, institutions, and
              organizations to create applications focused on safety,
              monitoring, education, and disaster prevention.
            </p>
          </motion.div>

          {/* Description */}
          <p className='mt-16 text-white text-center text-lg w-[95%] lg:w-6xl'></p>
        </div>

        {/* Floating Back-to-Top Button Component */}
        <BackToTopButton />
      </motion.section>
    </>
  );
}

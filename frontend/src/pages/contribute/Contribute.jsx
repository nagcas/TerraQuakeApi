import { motion } from 'framer-motion';
import { FaCode, FaBug, FaBook, FaDiscord } from 'react-icons/fa';
import { IoIosGitPullRequest } from 'react-icons/io';
import BackToTopButton from '@/components/utils/BackToTopButton';
import MetaData from '@pages/noPage/MetaData';
import {
  API_DOCS,
  CODE_OF_CONDUCT,
  DISCORD_LINK,
  ISSUE_TRACKER,
  PULL_REQUESTS,
} from '@/data/Contribute';
import hacktoberfest from '@images/hacktoberfest.svg';
import { ContributionCard } from './ContributeCard';

export default function Contribute() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Contribute | TerraQuake API - Open Source Earthquake Monitoring'
        description='Join the TerraQuake API community to contribute code, seismic data, or documentation and help advance earthquake monitoring technology.'
        ogTitle='Contribute | TerraQuake API'
        ogDescription='Help improve TerraQuake API by contributing code, seismic data, or documentation. Collaborate with developers and researchers to advance earthquake monitoring.'
        twitterTitle='Contribute | TerraQuake API'
        twitterDescription='Become part of the TerraQuake API community. Contribute code, data, or docs to help enhance global earthquake monitoring and research.'
        keywords='Contribute TerraQuake API, open source earthquake API, contribute seismic data, earthquake monitoring open source, TerraQuake API community'
      />
      {/* SEO Stuff */}

      <motion.section
        className='relative z-0 w-full min-h-screen pt-24 pb-12 overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background */}
        <div className='absolute inset-0 z-0'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>

        <div className='relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12'>
          {/* Header */}
          <motion.div
            className='mb-16 text-center lg:text-left'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className='text-3xl text-center md:text-5xl text-white font-extrabold tracking-tighter mb-4'>
              Build the Future of Seismic Tech.
              <div className='h-0.5 w-1/3 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-center md:text-left text-white/70 max-w-7xl'>
              TerraQuake is built by a global community. Whether you're a
              developer, a seismologist, or a data enthusiast, your contribution
              is vital. Let's make seismic data more accessible together.
            </p>
          </motion.div>

          {/* Cards */}
          <div className='grid grid-cols-1 lg:grid-cols-1 gap-12'>
            <motion.div
              variants={containerVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              className='max-w-6xl mx-auto grid md:grid-cols-3 gap-8'
            >
              <ContributionCard
                icon={<FaCode />}
                title='Contribute Code'
                description='Help us develop the Node.js API and the React frontend. Check the issues list for ways to jump in.'
                link={PULL_REQUESTS}
                linkText='Submit a Pull Request'
              />
              <ContributionCard
                icon={<FaBug />}
                title='Report Bugs'
                description='Found a broken endpoint or a data glitch? Filing a detailed report is one of the most valuable contributions you can make.'
                link={ISSUE_TRACKER}
                linkText='View Open Issues'
              />
              <ContributionCard
                icon={<FaBook />}
                title='Improve Documentation'
                description='Clear guides are essential for a great developer experience. If you spot a typo or can explain something better, we welcome your input.'
                link={`${API_DOCS}`}
                linkText='Update the Docs'
              />
            </motion.div>

            {/* Community Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              id='community'
              className='mt-16 text-center backdrop-blur-sm border border-white/10 p-10 rounded-xl max-w-4xl mx-auto'
            >
              <h2 className='text-3xl font-bold mb-4'>Join the Conversation</h2>
              <p className='max-w-2xl mx-auto mb-8 text-gray-400'>
                Our Discord server is the central hub for collaboration.
                Introduce yourself, ask questions, and chat directly with the
                core team.
              </p>
              <div className='flex flex-col sm:flex-row justify-center items-center gap-4'>
                <a
                  href={DISCORD_LINK}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg flex justify-center items-center gap-3 group'
                >
                  <FaDiscord className='text-2xl icon-bounces' />
                  Join our Discord
                </a>
                <a
                  href={CODE_OF_CONDUCT}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='border border-gray-400 hover:bg-white hover:text-black transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full cursor-pointer'
                >
                  Read Code of Conduct
                </a>
              </div>
            </motion.section>

            {/* Hacktoberfest Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ type: 'spring', stiffness: 120, damping: 15 }}
              className='mt-16 max-w-3xl mx-auto p-6 bg-gradient-to-r from-slate-900 to-slate-800/70 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg'
            >
              <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                <a
                  href='https://hacktoberfest.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-5'
                >
                  <img
                    className='pt-3 w-48 h-25'
                    src={hacktoberfest}
                    alt='Hacktoberfest logo'
                  />
                  <div className='text-center sm:text-left'>
                    <h3 className='text-xl font-bold text-white'>
                      Join us for Hacktoberfest 2025!
                    </h3>
                    <p className='text-gray-400 mt-1'>
                      Help us improve TerraQuake and get your limited edition
                      swag.
                    </p>
                  </div>
                </a>

                <a
                  href={ISSUE_TRACKER}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mt-4 sm:mt-0 whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-full shadow-lg transition-all duration-300 transform group'
                >
                  <div className='flex gap-2 justify-center items-center'>
                    <IoIosGitPullRequest
                      size={25}
                      className='transition-transform duration-500 origin-top dangle-on-hover text-2xl'
                    />
                    <span>Find an Issue</span>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}

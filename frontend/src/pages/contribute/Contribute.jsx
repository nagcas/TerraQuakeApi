import { motion } from 'framer-motion';
import { FaCode, FaBug, FaBook, FaDiscord } from 'react-icons/fa';
import BackToTopButton from '@/components/utils/BackToTopButton';
import MetaData from '@pages/noPage/MetaData';
import {
  API_DOCS,
  CODE_OF_CONDUCT,
  DISCORD_LINK,
  ISSUE_TRACKER,
  PULL_REQUESTS,
} from '@/data/Contribute';
import { ContributionCard } from './ContributeCard';
import { useTranslation } from 'react-i18next';

export default function Contribute() {
  const { t } = useTranslation('translation');

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
              {t('contribute.title')}
              <div className='h-0.5 w-1/3 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-center md:text-left text-white/70 max-w-7xl'>
              {t('contribute.description')}
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
                title={t('contribute.card_title_contribute')}
                description={t('contribute.card_description_contribute')}
                link={PULL_REQUESTS}
                linkText={t('contribute.card_link_contribute')}
              />
              <ContributionCard
                icon={<FaBug />}
                title={t('contribute.card_title_bugs')}
                description={t('contribute.card_description_bugs')}
                link={ISSUE_TRACKER}
                linkText={t('contribute.card_link_bugs')}
              />
              <ContributionCard
                icon={<FaBook />}
                title={t('contribute.card_title_documentation')}
                description={t('contribute.card_description_documentation')}
                link={`${API_DOCS}`}
                linkText={t('contribute.card_link_documentation')}
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
              <h2 className='text-3xl font-bold mb-4'>{t('contribute.title_join')}</h2>
              <p className='max-w-2xl mx-auto mb-8 text-gray-400'>
                {t('contribute.description_join')}
              </p>
              <div className='flex flex-col sm:flex-row justify-center items-center gap-4'>
                <a
                  href={DISCORD_LINK}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg flex justify-center items-center gap-3 group'
                >
                  <FaDiscord className='text-2xl icon-bounces' />
                  {t('contribute.button_join_discord')}
                </a>
                <a
                  href={CODE_OF_CONDUCT}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='border border-gray-400 hover:bg-white hover:text-black transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full cursor-pointer'
                >
                  {t('contribute.button_code_conduct')}
                </a>
              </div>
            </motion.section>
          </div>
        </div>
      </motion.section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}

import { useState } from 'react';
import BackToTopButton from '@/components/utils/BackToTopButton';
import MetaData from '../noPage/MetaData';
import { motion } from 'framer-motion';
import { formatDate } from '@/components/utils/FormatDate.js';
import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
  const { t } = useTranslation('translation');

  const data = import.meta.env.VITE_DATE_UPDATE;
  const [dateUpdate, setDateUpdate] = useState(data);

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Privacy Policy'
        description='Read the Privacy Policy of TerraQuake API to learn how we handle your data and protect your privacy.'
        ogTitle='Privacy Policy - TerraQuake API'
        ogDescription='Learn how TerraQuake API manages your data with transparency and security. Read our Privacy Policy.'
        twitterTitle='Privacy Policy - TerraQuake API'
        twitterDescription='Understand TerraQuake API’s approach to privacy and data protection in our Privacy Policy.'
        keywords='TerraQuake API, privacy policy, data protection, GDPR, seismic data privacy'
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
              {t('privacy_policy.title')}
              <div className='h-0.5 w-1/4 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-md text-center md:text-left text-white/70 max-w-7xl'>
               {t('privacy_policy.updated')} {formatDate(dateUpdate)}.
            </p>
          </motion.div>

          <section className='space-y-6'>
            <p className='text-gray-300 leading-relaxed'>
              {t('privacy_policy.description')}
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('privacy_policy.title_collect')}
            </h2>
            <ul className='list-disc list-inside space-y-2 text-gray-300'>
              <li>
                {t('privacy_policy.description_collect_1')}
              </li>
              <li>
                {t('privacy_policy.description_collect_2')}
              </li>
              <li>
                {t('privacy_policy.description_collect_3')}
              </li>
            </ul>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('privacy_policy.title_data')}
            </h2>
            <ul className='list-disc list-inside space-y-2 text-gray-300'>
              <li>{t('privacy_policy.description_data_1')}</li>
              <li>{t('privacy_policy.description_data_2')}</li>
              <li>{t('privacy_policy.description_data_3')}</li>
              <li>{t('privacy_policy.description_data_4')}</li>
            </ul>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('privacy_policy.title_legal')}
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              {t('privacy_policy.description_legal')}
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('privacy_policy.title_sharing')}
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              {t('privacy_policy.description_sharing')}
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('privacy_policy.title_user')}
            </h2>
            <ul className='list-disc list-inside space-y-2 text-gray-300'>
              <li>{t('privacy_policy.description_user_1')}</li>
              <li>{t('privacy_policy.description_user_2')}</li>
              <li>{t('privacy_policy.description_user_3')}</li>
              <li>{t('privacy_policy.description_user_4')}</li>
              <li>{t('privacy_policy.description_user_5')}</li>
              
            </ul>
            <p className='text-gray-300 leading-relaxed'>
              {t('privacy_policy.title_contact')}{' '}
              <span className='text-pink-400 font-semibold'>
                terraquakeapi@gmail.com
              </span>
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('privacy_policy.title_retention')}
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              {t('privacy_policy.description_retention')}
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('privacy_policy.title_cookies')}
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              {t('privacy_policy.description_cookies')}
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('privacy_policy.title_transfers')}
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              {t('privacy_policy.description_transfers')}
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('privacy_policy.title_security')}
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              {t('privacy_policy.description_security')}
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('privacy_policy.title_changes')}
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              {t('privacy_policy.description_changes')}
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('privacy_policy.title_information')}
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              {t('privacy_policy.description_information')}{' '}
              <span className='text-pink-400 font-semibold'>
                terraquakeapi@gmail.com
              </span>
            </p>
          </section>
        </div>
      </motion.section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../noPage/MetaData';
import BackToTopButton from '@/components/utils/BackToTopButton';
import { motion } from 'framer-motion';
import { formatDate } from '@/components/utils/FormatDate.js';
import { useTranslation } from 'react-i18next';

export default function TermsAndConditions() {
  const { t } = useTranslation('translation');

  const data = import.meta.env.VITE_DATE_UPDATE;
  const [dateUpdate, setDateUpdate] = useState(data);

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Terms and Conditions - TerraQuake API'
        description='Read the Terms and Conditions for using the TerraQuake API, including guidelines, usage rules, and legal information.'
        ogTitle='Terms and Conditions - TerraQuake API'
        ogDescription='Understand the rules, guidelines, and legal terms for using the TerraQuake API.'
        twitterTitle='Terms and Conditions - TerraQuake API'
        twitterDescription='Official Terms and Conditions for the TerraQuake API, including user obligations and legal information.'
        keywords='TerraQuake API terms, API usage policy, legal terms, API guidelines'
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
              {t('terms_and_conditions.title')}
              <div className='h-0.5 w-1/3 md:w-1/4 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-md text-center md:text-left text-white/70 max-w-7xl'>
             {t('terms_and_conditions.updated')} {formatDate(dateUpdate)}.
            </p>
          </motion.div>

          <section className='space-y-6'>
            <p className='text-gray-300 leading-relaxed'>
              {t('terms_and_conditions.description')}{' '}
              <Link
                to='/privacy-policy'
                className='text-pink-400 underline'
              >
                {t('terms_and_conditions.link_privacy')}.
              </Link>
              {t('terms_and_conditions.read_please')}
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('terms_and_conditions.title_general')}
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              {t('terms_and_conditions.description_general')}
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('terms_and_conditions.title_account')}
            </h2>
            <ul className='list-disc list-inside space-y-2 text-gray-300'>
              <li>{t('terms_and_conditions.description_account_1')}</li>
              <li>{t('terms_and_conditions.description_account_2')}</li>
              <li>{t('terms_and_conditions.description_account_3')}</li>
              <li>{t('terms_and_conditions.description_account_4')}</li>
              <li>{t('terms_and_conditions.description_account_5')}</li>
            </ul>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('terms_and_conditions.title_property')}
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              {t('terms_and_conditions.description_property')}
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('terms_and_conditions.title_use')}
            </h2>
            <ul className='list-disc list-inside space-y-2 text-gray-300'>
              <li>{t('terms_and_conditions.description_use_1')}</li>
              <li>{t('terms_and_conditions.description_use_2')}</li>
              <li>{t('terms_and_conditions.description_use_3')}</li>
              <li>{t('terms_and_conditions.description_use_4')}</li>
            </ul>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('terms_and_conditions.title_disclaimers')}
            </h2>
            <ul className='list-disc list-inside space-y-2 text-gray-300'>
              <li>{t('terms_and_conditions.description_disclaimers_1')}</li>
              <li>{t('terms_and_conditions.description_disclaimers_2')}</li>
            </ul>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('terms_and_conditions.title_limitation')}
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              {t('terms_and_conditions.description_limitation')}
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('terms_and_conditions.title_services')}
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              {t('terms_and_conditions.description_services')}
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('terms_and_conditions.title_governing')}
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              {t('terms_and_conditions.description_governing')}
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('terms_and_conditions.title_force')}
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              {t('terms_and_conditions.description_force')}
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('terms_and_conditions.title_modifications')}
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              {t('terms_and_conditions.description_modifications')}
            </p>
          </section>

          <section className='space-y-6 border-t border-white/10 pt-6'>
            <h2 className='text-xl font-semibold text-purple-500'>
              {t('terms_and_conditions.title_contact')}
            </h2>
            <p className='text-gray-300 leading-relaxed'>
              {t('terms_and_conditions.description_contact')}{' '}
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

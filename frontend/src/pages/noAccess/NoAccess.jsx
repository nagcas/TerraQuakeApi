import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MetaData from '@pages/noPage/MetaData';
import BackToTopButton from '@/components/utils/BackToTopButton';
import { useTranslation } from 'react-i18next';

export default function NoAccess() {
  const { t } = useTranslation('translation');

  return (
    <>
      {/* SEO */}
      <MetaData
        title='Access Denied | TerraQuake API'
        description='You do not have permission to access this page. Please contact an administrator if you believe this is an error.'
        ogTitle='Access Denied | TerraQuake API'
        ogDescription='Access denied to TerraQuake API admin area. Contact administrator for assistance.'
        twitterTitle='Access Denied | TerraQuake API'
        twitterDescription='You do not have permission to access this area of TerraQuake API.'
        keywords='access denied, TerraQuake API, admin access, permission denied'
      />

      <motion.section
        className='relative z-0 w-full min-h-screen pt-24 pb-12 overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background */}
        <div className='absolute inset-0 z-0'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>

        <div className='relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-12'>
          {/* Header */}
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className='text-6xl md:text-8xl text-white font-extrabold tracking-tighter mb-4'>
              403
            </h1>
            <div className='h-0.5 w-1/3 mx-auto bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 my-4 rounded-full' />
            <h2 className='text-3xl md:text-5xl text-white font-bold mb-6'>
              Access Denied
            </h2>
            <p className='text-xl text-white/70 max-w-2xl mx-auto'>
              {t('no_access.description')}
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            className='text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className='p-8 md:p-12 border border-white/5 bg-white/[0.03] rounded-3xl shadow-2xl mb-8'>
              <h3 className='text-2xl font-bold text-white mb-4'>
                {t('no_access.insufficient')}
              </h3>
              <p className='text-white/70 mb-6'>
                {t('no_access.description_insufficient')}
              </p>

              <div className='space-y-4'>
                <Link
                  to='/'
                  className='inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 px-8 rounded-full hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] transform transition-all duration-300 ease-in-out'
                >
                  {t('no_access.back_to_home')}
                </Link>

                <div className='text-white/50 text-sm'>
                  {t('no_access.or')}
                </div>

                <Link
                  to='/profile'
                  className='inline-block border-2 border-white/20 text-white font-semibold py-3 px-8 rounded-full hover:border-purple-500 hover:text-purple-400 transition-all duration-300 ease-in-out'
                >
                  {t('no_access.view_profile')}
                </Link>
              </div>
            </div>

            {/* Additional Info */}
            <div className='text-center text-white/50 text-sm'>
              <p>
                {t('no_access.help')}{' '}
                <a
                  href='mailto:support@terraquake.com'
                  className='text-purple-400 hover:text-purple-300 transition-colors'
                >
                  support@terraquake.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}

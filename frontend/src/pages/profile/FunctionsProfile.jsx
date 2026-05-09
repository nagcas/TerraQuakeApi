import { useContext } from 'react';
import { Context } from '@/components/modules/Context';
import useTestimonials from '@/hooks/useTestimonials';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function FunctionsProfile({ setActiveSection }) {
  const { t } = useTranslation('translation');
  const { userLogin } = useContext(Context);
  const { testimonials } = useTestimonials();

  const userReview = testimonials.find(
    (item) => item.userId === userLogin?._id && item.deleted === false
  );

  const hasReview = Boolean(userReview);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='mt-6 flex flex-col gap-3 sm:gap-4'
      >
        <button
          onClick={() => setActiveSection('edit')}
          className='w-48 sm:w-60 border border-pink-400 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 transition-all duration-300 text-white font-semibold py-2 px-6 rounded-full cursor-pointer text-sm sm:text-base'
        >
          {t('functions_profile.edit_profile')}
        </button>

        <button
          onClick={() => setActiveSection('review')}
          disabled={hasReview}
          className='w-48 sm:w-60 border border-pink-400 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 transition-all duration-300 text-white font-semibold py-2 px-6 rounded-full cursor-pointer text-sm sm:text-base'
        >
          {hasReview ? (
            <p className='text-sm text-gray-400 cursor-not-allowed'>
              {t('functions_profile.review')}
            </p>
          ) : (
            <span>{t('functions_profile.leave_review')}</span>
          )}
        </button>

        <button
          onClick={() => setActiveSection('view')}
          className='w-48 sm:w-60 border border-pink-400 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 transition-all duration-300 text-white font-semibold py-2 px-6 rounded-full cursor-pointer text-sm sm:text-base'
        >
          {t('functions_profile.view_review')}
        </button>

        <button
          onClick={() => setActiveSection('delete')}
          className='w-48 sm:w-60 border border-purple-400 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 transition-all duration-300 text-white font-semibold py-2 px-6 rounded-full cursor-pointer text-sm sm:text-base'
        >
          {t('functions_profile.delete_profile')}
        </button>
      </motion.div>
    </>
  );
}

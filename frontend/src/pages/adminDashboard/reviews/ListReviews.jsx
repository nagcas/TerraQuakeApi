import React from 'react'
import { useTranslation } from 'react-i18next';

export default function ListReviews() {
  const { t } = useTranslation('translation');

  return (
    <div className='space-y-3'>
      <div className='text-sm text-white/70'>
        {t('list_reviews.reviews')}{' '} 
        <span className='text-purple-400 font-semibold'>156</span>
      </div>
      <div className='text-sm text-white/70'>
        {t('list_reviews.published')}{' '} 
        <span className='text-green-400 font-semibold'>142</span>
      </div>
      <button className='w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold py-2 px-3 rounded-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer'>
        {t('list_reviews.manage_reviews')}
      </button>
    </div>
  )
}

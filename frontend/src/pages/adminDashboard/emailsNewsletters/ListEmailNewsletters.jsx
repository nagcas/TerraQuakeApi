import React from 'react'
import { useTranslation } from 'react-i18next';

export default function ListEmailNewsletters() {
  const { t } = useTranslation('translation');

  return (
     <div className='space-y-3'>
      <div className='text-sm text-white/70'>
        {t('lists_newsletters.emails')}{' '}
        <span className='text-purple-400 font-semibold'>89</span>
      </div>
      <div className='text-sm text-white/70'>
        {t('lists_newsletters.assets')}{' '} 
        <span className='text-blue-400 font-semibold'>84</span>
      </div>
      <div className='text-sm text-white/70'>
        {t('lists_newsletters.cancelled')}{' '} 
        <span className='text-blue-400 font-semibold'>5</span>
      </div>
      <button className='w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold py-2 px-3 rounded-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer'>
        {t('lists_newsletters.manage_emails')}
      </button>
    </div>
  )
}


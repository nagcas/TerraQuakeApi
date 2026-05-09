import React from 'react'
import { useTranslation } from 'react-i18next';

export default function Statistics() {
  const { t } = useTranslation('translation');

  return (
    <div className='space-y-3'>
      <div className='text-sm text-white/70'>
        {t('statistics.api_calls')}{' '}
        <span className='text-purple-400 font-semibold'>12,456</span>
      </div>
      <div className='text-sm text-white/70'>
        {t('statistics.server')}{' '}
        <span className='text-green-400 font-semibold'>99.9%</span>
      </div>
      <div className='text-sm text-white/70'>
        {t('statistics.active')}{' '}
        <span className='text-blue-400 font-semibold'>234</span>
      </div>
      <div className='text-sm text-white/70'>
        {t('statistics.points')}{' '}
        <span className='text-yellow-400 font-semibold'>2.3M</span>
      </div>
    </div>
  )
}

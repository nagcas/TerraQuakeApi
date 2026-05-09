import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'

export default function ListMessages({
  totalMessages,
  totalPagesMessages,
  currentPageMessage,
  messagePerPage,
}) {
  const { t } = useTranslation('translation');

  const navigate = useNavigate();

  const handleTableMessages = () => {
    navigate('/table-messages', {
      state: {
        page: currentPageMessage,
        limit: messagePerPage,
      },
    });
  };

  return (
    <div className='space-y-3'>
      <div className='text-sm text-white/70'>
        {t('list_messages.messages')}{' '}
        <span className='text-purple-400 font-semibold'>{totalMessages}</span>
      </div>
      <div className='text-sm text-white/70'>
        {t('list_messages.unread')}{' '} 
        <span className='text-red-400 font-semibold'>...</span>
      </div>
      <div className='text-sm text-white/70'>
        {t('list_messages.week')}{' '} 
        <span className='text-blue-400 font-semibold'>...</span>
      </div>
      <button 
        onClick={() => handleTableMessages()}
        className='w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold py-2 px-3 rounded-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer'
      >
        {t('list_messages.manage_messages')}
      </button>
    </div>
  )
}

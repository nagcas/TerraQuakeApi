import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ListFaqs({
  totalFaqs,
  totalPagesFaqs,
  currentPageFaq,
  faqPerPage,
}) {
  const navigate = useNavigate();

  const handleTableFaqs = () => {
    navigate('/table-faqs', { 
      state: {
        page: currentPageFaq,
        limit: faqPerPage,
      },
    });
  };

  return (
    <div className='space-y-3'>
      <div className='text-sm text-white/70'>
        Total Faq:{' '}
        <span className='text-purple-400 font-semibold'>{totalFaqs}</span>
      </div>
      <div className='text-sm text-white/70'>
        Total Faq View: <span className='text-blue-400 font-semibold'>...</span>
      </div>
      <button 
        onClick={() => handleTableFaqs()}
        className='w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold py-2 px-3 rounded-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer'
      >
        Manage Faqs
      </button>
    </div>
  )
}

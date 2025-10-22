import { useState } from 'react';

export default function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border-b border-gray-700'>
      <button
        className='w-full py-5 px-4 flex justify-between items-center hover:bg-purple-900/30 cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='text-lg font-medium text-white'>{question}</span>
        <svg
          className={`w-6 h-6 transform ${
            isOpen ? 'rotate-180' : ''
          } transition-transform text-white`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>
      {isOpen && (
        <div className='px-4 pb-5'>
          <p className='text-base text-purple-300 md:text-xl leading-relaxed'>{answer}</p>
        </div>
      )}
    </div>
  );
}

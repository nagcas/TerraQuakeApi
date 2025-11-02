import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ListUsers() {
  const navigate = useNavigate();

  const handleTableUsers = () => {
    navigate('/table-users', { replace: true });
  };

  return (
    <div className='space-y-3'>
      <div className='text-sm text-white/70'>
        Total Users:{' '}
        <span className='text-purple-400 font-semibold'>1,234</span>
      </div>
      <div className='text-sm text-white/70'>
        Active Today: <span className='text-green-400 font-semibold'>89</span>
      </div>
      <div className='text-sm text-white/70'>
        New This Week: <span className='text-blue-400 font-semibold'>45</span>
      </div>
      <button 
        onClick={() => handleTableUsers()}
        className='w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold py-2 px-3 rounded-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer'
      >
        Manage Users
      </button>
    </div>
  )
}

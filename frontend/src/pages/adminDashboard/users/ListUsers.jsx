import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ListUsers({
  totalUsers,
  totalPagesUsers,
  currentPageUser,
  usersPerPage,
}) {
  const navigate = useNavigate();

  const handleTableUsers = () => {
    navigate('/table-users', {
      state: {
        page: currentPageUser,
        limit: usersPerPage,
      },
    });
  };

  return (
    <div className='space-y-3'>
      <div className='text-sm text-white/70'>
        Total Users:{' '}
        <span className='text-purple-400 font-semibold'>{totalUsers}</span>
      </div>
      <div className='text-sm text-white/70'>
        Active Today: <span className='text-green-400 font-semibold'>...</span>
      </div>
      <div className='text-sm text-white/70'>
        New This Week: <span className='text-blue-400 font-semibold'>...</span>
      </div>
      <button
        onClick={handleTableUsers}
        className='w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold py-2 px-3 rounded-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer'
      >
        Manage Users
      </button>
    </div>
  );
}


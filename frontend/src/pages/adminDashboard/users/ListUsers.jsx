import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function ListUsers({
  allUsers,
  setUsers,
  totalUsers,
  usersMonths,
  totalUsersDeleted,
  totalPagesUsers,
  currentPageUser,
  usersPerPage,
}) {
  const { t } = useTranslation('translation');

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
        {t('list_users.users')}{' '}
        <span className='text-purple-400 font-semibold'>{totalUsers}</span>
      </div>
      <div className='text-sm text-white/70'>
        {t('list_users.deleted')}{' '} 
        <span className='text-green-400 font-semibold'>{totalUsers - totalUsersDeleted}</span>
      </div>
      <div className='text-sm text-white/70'>
        {t('list_users.week')}{' '} 
        <span className='text-blue-400 font-semibold'>...</span>
      </div>
      <button
        onClick={handleTableUsers}
        className='w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold py-2 px-3 rounded-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer'
      >
        {t('list_users.manage_users')}
      </button>
    </div>
  );
}


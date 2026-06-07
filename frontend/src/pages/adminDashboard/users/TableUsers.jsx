import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Spinner from '@/components/spinner/Spinner';
import BackToTopButton from '@/components/utils/BackToTopButton';
import ViewUser from './ViewUser';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';
import Pagination from '@/components/utils/Pagination';
import useUsers from '@/hooks/useUsers';
import { useTranslation } from 'react-i18next';
import StatisticUsers from './StatisticUsers';
import FilterUsers from './FilterUsers';

export default function TableUsers() {
  const { t } = useTranslation('translation');

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  console.log(search);

  const location = useLocation();
  const { page = 1, limit = 20 } = location.state || {};

  const {
    users,
    setUsers,
    totalPagesUsers,
    totalUsers,
    usersMonths,
    currentPageUser,
    setCurrentPageUser,
    usersPerPage,
    loadingUser,
    errorUser,
  } = useUsers(page, limit, debouncedSearch);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPageUser]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <>
      <motion.section
        className='relative z-30 w-full min-h-screen pt-24 pb-12 overflow-hidden-y'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Gradient/Mesh (for a classy, dark theme) */}
        <div className='absolute inset-0 z-0'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>
        <div className='relative z-50 w-full max-w-7xl mx-auto px-6 lg:px-12'>
          <div className='mb-8'>
            <Link
              to='/admin'
              className='relative z-50 inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors duration-200 cursor-pointer'
            >
              ← {t('table_users.back')}
            </Link>
          </div>

          {/* Title */}
          <motion.div
            className='mb-12 text-center'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className='text-3xl md:text-5xl font-extrabold text-white mb-4'>
              {t('table_users.manage_users')}
              <div className='h-0.5 w-1/3 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
          </motion.div>

          {loadingUser && (
            <p className='flex justify-center mt-16 text-center text-2xl'>
              <Spinner size='4xl' />
            </p>
          )}
          {errorUser && <p className='text-red-500'>{errorUser}</p>}

          {!loadingUser && !errorUser && (
            <>
              <div className='flex flex-col lg:flex-row gap-6 justify-between items-center mb-4'>
                <FilterUsers
                  search={search}
                  setSearch={setSearch}
                />
                <button
                  onClick={() => setSearch('')}
                  className='py-2 px-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer'
                >
                  {t('table_users.view_users')}
                </button>
                <StatisticUsers usersMonths={usersMonths} />
                <button className='py-2 px-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer'>
                  {t('table_users.new_users')}
                </button>
              </div>

              <div className='overflow-x-auto border border-white/5 bg-white/[0.03] bg-opacity-50 rounded-lg'>
                <table className='min-w-full divide-y divide-gray-700'>
                  <thead className='bg-gray-800 bg-opacity-70'>
                    <tr className='bg-purple-500/20 text-purple-300 uppercase text-xs tracking-wider'>
                      <th className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                        Id
                      </th>
                      <th className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                        {t('table_users.name')}
                      </th>
                      <th className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                        {t('table_users.email')}
                      </th>
                      <th className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                        {t('table_users.role')}
                      </th>
                      <th className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                        {t('table_users.deleted')}
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                        {t('table_users.terms')}
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'>
                        {t('table_users.options')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-800'>
                    {users.length > 0 ? (
                      users.map((item) => (
                        <tr
                          key={item._id}
                          className='hover:bg-purple-500/10 transition-colors'
                        >
                          <td className='text-sm px-6 py-4 whitespace-nowrap'>
                            {item._id.slice(0, 6)}...
                          </td>
                          <td className='text-sm px-6 py-4 whitespace-nowrap'>
                            {item.name}
                          </td>
                          <td className='text-sm px-6 py-4 whitespace-nowrap'>
                            {item.email}
                          </td>
                          <td className='text-sm px-6 py-4 whitespace-nowrap'>
                            {item.role ?? 'user'}
                          </td>
                          <td className='text-sm px-6 py-4 whitespace-nowrap'>
                            {item.deleted === true ? (
                              <span className='text-red-400'>
                                {t('table_users.yes')}
                              </span>
                            ) : (
                              t('table_users.no')
                            )}
                          </td>
                          <td className='text-sm px-6 py-4 whitespace-nowrap'>
                            {item.terms === true ? 'Yes' : 'No'}
                          </td>
                          <td className='flex gap-4 text-sm px-6 py-4'>
                            <ViewUser users={item} />
                            {item.deleted === false ? (
                              <UpdateUser
                                users={item}
                                setUsers={setUsers}
                              />
                            ) : (
                              <pre className='mx-4'>--</pre>
                            )}
                            {item.deleted === false ? (
                              <DeleteUser
                                users={item}
                                setUsers={setUsers}
                              />
                            ) : (
                              <pre className='mx-4'>--</pre>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan='7'
                          className='text-center py-10 text-gray-400'
                        >
                          <p>{t('table_users.not_found')}</p>
                          <button
                            onClick={() => setSearch('')}
                            className='mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition cursor-pointer'
                          >
                            {t('table_users.view_users')}
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPageUser}
          totalPages={totalPagesUsers}
          totalItems={totalUsers}
          itemsPerPage={usersPerPage}
          setCurrentPage={setCurrentPageUser}
        />
      </motion.section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}

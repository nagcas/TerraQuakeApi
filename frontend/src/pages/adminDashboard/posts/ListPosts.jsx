import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function ListPosts({
  posts,
  setPosts,
  totalPosts,
  totalPostsPublished,
  totalPostsDrafts,
  postsMonths,
  totalPagesPosts,
  currentPagePost,
  postsPerPage,
}) {
  const { t } = useTranslation('translation');

  const navigate = useNavigate();

  const handleTablePosts = () => {
    navigate('/table-posts', {
      state: {
        page: currentPagePost,
        limit: postsPerPage,
      },
    });
  };

  return (
    <div className='space-y-3'>
      <div className='text-sm text-white/70'>
        {t('list_posts.posts')}{' '}
        <span className='text-purple-400 font-semibold'>{totalPosts}</span>
      </div>
      <div className='text-sm text-white/70'>
        {t('list_posts.published')}{' '}
        <span className='text-green-400 font-semibold'>{totalPostsPublished}</span>
      </div>
      <div className='text-sm text-white/70'>
        {t('list_posts.drafts')}{' '}
        <span className='text-yellow-400 font-semibold'>{totalPostsDrafts}</span>
      </div>
      <button
        onClick={() => handleTablePosts()}
        className='w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold py-2 px-3 rounded-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer'
      >
        {t('list_posts.manage_posts')}
      </button>
    </div>
  );
}

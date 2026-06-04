import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaRegEye, FaXmark } from 'react-icons/fa6';
import { formatDate } from '@/components/utils/FormatDate';
import { useTranslation } from 'react-i18next';

export default function ViewPost({ posts }) {
  const { t } = useTranslation('translation');

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);
  return (
    <>
      <button
        onClick={toggleModal}
        className='px-2 py-1 border border-white/5 bg-white/[0.03] rounded-2xl shadow-2xl hover:scale-[1.02] hover:bg-purple-400 transition-all duration-300 cursor-pointer'
        title={t('view_post.view_post')}
      >
        <FaRegEye />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className='fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center'
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.45 }}
              className='bg-black w-11/12 max-w-3xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden relative'
            >
              {/* Header */}
              <header className='p-5 bg-purple-400/20 border-b border-white/10 flex justify-between items-center'>
                <h2 className='text-white uppercase tracking-wider text-sm font-semibold'>
                  {t('view_post.title')} id: {posts._id}
                </h2>

                <button
                  onClick={toggleModal}
                  className='text-white/60 hover:text-white transition duration-300 text-xl cursor-pointer'
                >
                  <FaXmark />
                </button>
              </header>

              {/* Body */}
              <div className='p-8 max-h-[70vh] overflow-y-auto'>
                <pre className='p-6 text-sm mb-6'>
                  <p className='p-4 font-semibold text-white text-2xl'>
                    {t('view_post.json_post')}
                  </p>
                  {JSON.stringify(posts, null, 2)}
                </pre>
                <p className='p-4 font-semibold text-white text-2xl'>
                  {t('view_post.classic_post')}
                </p>
                {[
                  {
                    label: 'Id',
                    value: posts?._id,
                  },
                  {
                    label: t('view_post.label_title'),
                    value: posts?.title,
                  },
                  {
                    label: t('view_post.label_slug'),
                    value: posts?.slug,
                  },
                  {
                    label: t('view_post.label_excerpt'),
                    value: posts?.excerpt,
                  },
                  {
                    label: t('view_post.label_author'),
                    value: posts?.author.name,
                  },
                  {
                    label: t('view_post.label_categories'),
                    value: posts?.categories?.join(', '),
                  },
                  {
                    label: t('view_post.label_content'),
                    value: posts?.content,
                  },
                  {
                    label: t('view_post.label_read_time'),
                    value: posts?.readTime,
                  },
                  {
                    label: t('view_post.label_tags'),
                    value: posts?.tags?.join(', '),
                  },
                  {
                    label: t('view_post.label_date'),
                    value: formatDate(posts.createdAt),
                  },
                  {
                    label: t('view_post.label_deleted'),
                    value: posts.deleted === true ? 'Yes' : 'No',
                  },
                  {
                    label: t('view_post.label_published'),
                    value: posts.published === true ? 'Yes' : 'No',
                  },
                ].map(({ label, value }) => (
                  <p
                    key={label}
                    className='text-white text-md font-normal mb-4 block'
                  >
                    <span>{label}: </span>
                    <span className='text-pink-400'>{value}</span>
                  </p>
                ))}
              </div>

              {/* Footer */}
              <div className='flex justify-end p-6 max-h-auto overflow-y-auto'>
                <button
                  type='button'
                  onClick={toggleModal}
                  className='px-6 py-2 text-md border border-white/5 bg-white/[0.06] 
                    rounded-full shadow-xl transition-all duration-300 cursor-pointer 
                    hover:scale-[1.03] hover:bg-white/[0.12]'
                >
                  {t('view_post.close')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

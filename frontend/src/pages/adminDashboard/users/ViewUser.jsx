import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaRegEye, FaXmark } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

export default function ViewUser({ users }) {
  const { t } = useTranslation('translation');
  console.log(users)

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleModal}
        className='px-4 py-1 border border-white/5 bg-white/[0.03] rounded-2xl shadow-2xl hover:scale-[1.02] hover:bg-purple-400 transition-all duration-300 cursor-pointer'
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
                  {t('view_user.user_info')}
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
                    {t('view_user.json_data')}
                  </p>
                  {JSON.stringify(users, null, 2)}
                </pre>
                <p className='p-4 font-semibold text-white text-2xl'>
                  {t('view_user.classic_data')}
                </p>
                {[
                  { 
                    label: 'Id', 
                    value: users?._id 
                  },
                  { 
                    label: t('view_user.name'), 
                    value: users?.name 
                  },
                  { 
                    label: t('view_user.email'), 
                    value: users?.email 
                  },
                  { 
                    label: t('view_user.experience'), 
                    value: users?.experience 
                  },
                  { 
                    label: t('view_user.student'), 
                    value: users?.student 
                  },
                  { 
                    label: t('view_user.bio'), 
                    value: users?.bio 
                  },
                  { 
                    label: t('view_user.location'), 
                    value: users?.location 
                  },
                  { 
                    label: t('view_user.website'), 
                    value: users?.website 
                  },
                  { 
                    label: t('view_user.portfolio'), 
                    value: users?.portfolio 
                  },
                  { 
                    label: 'GitHub', 
                    value: users?.github 
                  },
                  { 
                    label: 'LinkedIn', 
                    value: users?.linkedin 
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
                  {t('view_user.close')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

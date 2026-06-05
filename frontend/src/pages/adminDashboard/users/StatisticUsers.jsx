import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaXmark } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

export default function StatisticUsers({ usersMonths }) {
  const { t } = useTranslation('translation');

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className='py-2 px-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer'
        title={t('statistics_users.title')}
      >
        {t('statistics_users.title_button')}
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
                  {t('statistics_users.title')}
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
                <div className='space-y-4'>
                  {Object.entries(usersMonths).map(([month, count]) => {
                    const maxValue = Math.max(...Object.values(usersMonths));

                    return (
                      <div key={month}>
                        <div className='flex justify-between text-sm text-white mb-1'>
                          <span>{month}</span>
                          <span>{count}</span>
                        </div>

                        <div className='w-full h-4 bg-white/10 rounded-full overflow-hidden'>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(count / maxValue) * 100}%`,
                            }}
                            transition={{ duration: 0.8 }}
                            className='h-full bg-gradient-to-r from-pink-500 to-purple-600'
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className='flex justify-end gap-4 pt-4 p-4'>
                <button
                  type='button'
                  onClick={toggleModal}
                  className='px-6 py-2 text-md border border-white/5 bg-white/[0.06] 
                                       rounded-full shadow-xl transition-all duration-300 cursor-pointer 
                                       hover:scale-[1.03] hover:bg-white/[0.12]'
                >
                  {t('statistics_users.close')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

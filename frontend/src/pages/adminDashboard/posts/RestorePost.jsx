import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import api from '@/config/Axios.js';
import Swal from 'sweetalert2';
import Spinner from '@/components/spinner/Spinner';
import { FaRotateLeft, FaXmark } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

export default function RestorePost({ posts, setPosts }) {
  const { t } = useTranslation('translation');

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const handleRestore = async () => {
    try {
      setLoading(true);

      // Retrieve token from localStorage
      const token = localStorage.getItem('token');

      // If no token is found, show an error alert
      if (!token) {
        Swal.fire({
          title: t('restore_post.error'),
          text: t('restore_post.text_error'),
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        setLoading(false);
        return;
      }

      // Ask for confirmation before performing the delete request
      const result = await Swal.fire({
        title: t('restore_post.you_sure'),
        text: t('restore_post.revert'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: t('restore_post.confirm_deleted'),
      });

      // If the user cancels, stop the process
      if (!result.isConfirmed) {
        setLoading(false);
        return;
      }

      const response = await api.patch(
        `/posts/${posts._id}/restore`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Show success message after post deletion
      await Swal.fire({
        title: t('restore_post.deleted'),
        text: response.data.message,
        icon: 'success',
        confirmButtonText: t('restore_post.tabular_view'),
      });

      const restore = response.data.payload || response.data;

      setPosts((prev) =>
        prev.map((p) => (p._id === restore._id ? restore : p)),
      );
    } catch (error) {
      // Handle possible errors and display them
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.error ||
        error?.message ||
        t('restore_post.try_again');
      Swal.fire({
        title: t('restore_post.error'),
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } finally {
      // Always stop loading, regardless of the result
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className='px-2 py-1 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30 transition cursor-pointer'
        title={t('restore_post.button_confirm')}
      >
        <FaRotateLeft />
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
                  {t('restore_post.title')} {posts?._id}
                </h2>

                <button
                  onClick={toggleModal}
                  className='text-white/60 hover:text-white transition duration-300 text-xl cursor-pointer'
                >
                  <FaXmark />
                </button>
              </header>

              {/* Body */}
              <div className='flex flex-col items-center gap-4 mt-20'>
                <p className='text-2xl text-center p-2 pt-5 text-gray-300'>
                  {t('restore_post.text_deleted')}
                </p>
                <p className='text-xl text-center p-2 text-gray-300'>
                  {t('restore_post.text_confirm')}
                </p>
              </div>

              {/* Footer */}
              <div className='flex justify-end p-6 gap-4 pt-4'>
                <button
                  onClick={handleRestore}
                  disabled={loading}
                  className={`px-6 py-2 text-md font-semibold  rounded-full border border-white/5 
                              bg-gradient-to-r from-purple-600 to-pink-500 text-white 
                              transition-all duration-300 cursor-pointer 
                              ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.03]'}`}
                  aria-label='Delete post'
                >
                  {loading ? <Spinner /> : t('restore_post.button_confirm')}
                </button>

                <button
                  type='button'
                  onClick={toggleModal}
                  className='px-6 py-2 text-md border border-white/5 bg-white/[0.06] 
                          rounded-full shadow-xl transition-all duration-300 cursor-pointer 
                          hover:scale-[1.03] hover:bg-white/[0.12]'
                >
                  {t('restore_post.close')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaXmark } from 'react-icons/fa6';
import Spinner from '@/components/spinner/Spinner';
import api from '@config/Axios.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { Context } from '@/components/modules/Context';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function CreatePost({ setPosts }) {
  const { t } = useTranslation('translation');

  const { userLogin } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Validation schema with translations
  const postSchema = useMemo(
    () =>
      yup.object({
        title: yup.string().required(t('update_user.name_required')),
        excerpt: yup.string().required(t('email_required')),
        author: yup.string().required(t('experience_required')),
       categories: yup.string().required(t('student_required')),
        content: yup.string().required(t('student_required')),
        readTime: yup.string().required(t('student_required')),
        tags: yup.string(),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postSchema),
  });

  useEffect(() => {
    reset({
      title: '',
      excerpt: '',
      author: userLogin?._id || '',
      categories: [],
      content: '',
      readTime: '',
      tags: [],
    });
  }, [reset]);

  const handlePost = async (data) => {
    setLoading(true);

    const payload = {
      ...data,

      categories:
        typeof data.categories === 'string'
          ? data.categories.split(',').map((c) => c.trim())
          : data.categories,
      tags:
        typeof data.tags === 'string'
          ? data.tags.split(',').map((t) => t.trim())
          : data.tags,
    };

    try {
      const token = localStorage.getItem('token');

      const response = await api.post(`/posts`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const createPost = response.data.payload || response.data;

      Swal.fire({
        title: t('contact.success'),
        text: response.data.message || t('contact.message_sent'),
        icon: 'success',
        confirmButtonText: t('contact.great'),
        customClass: {
          container: 'z-50', // Ensure Swal is above other elements
        },
      }).then(() => {
        reset();
      });

      // Update the list
      setPosts((prev) => [createPost, ...prev]);

      // Closed modal
      setIsOpen(false);
    } catch (err) {
      console.log(err.response?.status);
      console.log(err.response?.data);
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.[0]?.msg ||
        err?.response?.data?.error ||
        err?.message ||
        t('contact.try_again');

      Swal.fire({
        title: t('contact.error'),
        text: errorMessage,
        icon: 'error',
        confirmButtonText: t('contact.confirm_button'),
        customClass: {
          container: 'z-50',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => {
    if (isOpen) {
      reset({
        title: '',
        author: userLogin?._id || '',
        excerpt: '',
        categories: '',
        content: '',
        readTime: '',
        tags: '',
      });
    }

    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className='py-2 px-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-colors cursor-pointer'
      >
        {t('table_posts.new_post')}
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
                  {t('update_user.update_user')}
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
                <form
                  className='space-y-8'
                  onSubmit={handleSubmit(handlePost)}
                >
                  {/* Input component */}
                  {[
                    {
                      label: 'Title',
                      field: 'title',
                    },
                    {
                      label: 'Excerpt',
                      field: 'excerpt',
                    },
                    {
                      label: 'Author',
                      field: 'author',
                      value: userLogin?._id,
                    },
                    {
                      label: 'Categories',
                      field: 'categories',
                    },
                    {
                      label: 'Content',
                      field: 'content',
                    },
                    {
                      label: 'Read Time',
                      field: 'readTime',
                    },
                    {
                      label: 'Tags',
                      field: 'tags',
                    },
                  ].map(({ label, value, field }) => (
                    <div key={field}>
                      <label className='text-white text-sm font-semibold mb-2 block'>
                        {label}
                      </label>

                      {field === 'content' ? (
                        <textarea
                          {...register(field)}
                          rows={6}
                          className='w-full px-5 py-3 border rounded-xl text-white bg-white/5 border-white/20 focus:border-purple-500 focus:ring-purple-500 transition-all placeholder-white/40'
                        />
                      ) : (
                        <input
                          {...register(field)}
                          className='w-full px-5 py-3 border rounded-xl text-white bg-white/5 border-white/20 focus:border-purple-500 focus:ring-purple-500 transition-all placeholder-white/40'
                        />
                      )}

                      <p className='text-red-400 text-xs pt-1'>
                        {errors[field]?.message}
                      </p>
                    </div>
                  ))}

                  {/* Footer */}
                  <div className='flex justify-end gap-4 pt-4'>
                    <button
                      type='submit'
                      disabled={loading}
                      className={`px-6 py-2 text-md font-semibold rounded-full border border-white/5 
                         bg-gradient-to-r from-purple-600 to-pink-500 text-white 
                         transition-all duration-300 cursor-pointer 
                         ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.03]'}`}
                    >
                      {loading ? <Spinner /> : t('update_user.save')}
                    </button>

                    <button
                      type='button'
                      onClick={toggleModal}
                      className='px-6 py-2 text-md border border-white/5 bg-white/[0.06] 
                         rounded-full shadow-xl transition-all duration-300 cursor-pointer 
                         hover:scale-[1.03] hover:bg-white/[0.12]'
                    >
                      {t('update_user.close')}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaRotate, FaXmark } from 'react-icons/fa6';
import Spinner from '@/components/spinner/Spinner';
import api from '@config/Axios.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { Context } from '@/components/modules/Context';
import { useTranslation } from 'react-i18next';

export default function UpdatePost({ posts, setPosts }) {
  const { t } = useTranslation('translation');

  const { userLogin } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const updatePostSchema = yup.object({
    title: yup.string().required(t('update_post.title_required')),
    excerpt: yup.string().required(t('update_post.excerpt_required')),
    author: yup.string().required(t('update_post.author_required')),
    categories: yup
      .array()
      .of(yup.string())
      .required(t('update_post.categories_required')),
    content: yup.string().required(t('update_post.content_required')),
    readTime: yup.string().required(t('update_post.read_time_required')),
    tags: yup.array().of(yup.string()).required(t('update_post.tags_required')),
    published: yup.boolean().required(t('update_post.published_required')),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updatePostSchema),
  });

  useEffect(() => {
    reset({
      title: posts?.title || '',
      excerpt: posts?.excerpt || '',
      author: posts?.author?._id || '',
      categories: posts?.categories || [],
      content: posts?.content || '',
      readTime: posts?.readTime || '',
      tags: posts?.tags || [],
      published: posts?.published || '',
    });
  }, [posts, reset]);

  const handleUpdatePost = async (data) => {
    if (!posts?._id) {
      Swal.fire({
        title: t('update_post.error'),
        text: t('update_post.text_error'),
        icon: 'error',
      });
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem('token');

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

      const response = await api.patch(`/posts/${posts._id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedPost = response.data.payload || response.data;

      Swal.fire({
        title: t('update_post.success'),
        text: t('update_post.text_success'),
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      // Update the list
      setPosts((prev) =>
        prev.map((p) => (p._id === updatedPost._id ? updatedPost : p)),
      );

      // Reset form
      reset(updatedPost);

      // Closed modal
      setIsOpen(false);
    } catch (error) {
      Swal.fire({
        title: t('update_post.error'),
        text:
          error?.response?.data?.message ||
          error?.response?.data?.errors?.[0]?.msg ||
          t('update_post.error_occurred'),
        icon: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleModal}
        className='px-2 py-1 border border-white/5 bg-white/[0.03] rounded-2xl shadow-2xl hover:scale-[1.03] hover:bg-purple-500/20 transition-all duration-300 cursor-pointer'
        title={t('update_post.update_post')}
      >
        <FaRotate />
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
                  {t('update_post.update_post')} id: {posts._id}
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
                  onSubmit={handleSubmit(handleUpdatePost)}
                >
                  {/* Input component */}
                  {[
                    {
                      label: t('update_post.label_title'),
                      field: 'title',
                      value: posts?.title,
                    },
                    {
                      label: t('update_post.label_excerpt'),
                      field: 'excerpt',
                      value: posts?.excerpt,
                    },
                    {
                      label: t('update_post.label_author'),
                      field: 'author',
                      value: posts?.author?._id,
                    },
                    {
                      label: t('update_post.label_categories'),
                      field: 'categories',
                      value: posts?.categories,
                    },
                    {
                      label: t('update_post.label_content'),
                      field: 'content',
                      value: posts?.content,
                    },
                    {
                      label: t('update_post.label_read_time'),
                      field: 'readTime',
                      value: posts?.readTime,
                    },
                    {
                      label: t('update_post.label_tags'),
                      field: 'tags',
                      value: posts?.tags,
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

                  {/* Published */}
                  <div>
                    <label className='text-white text-sm font-semibold mb-2 block'>
                      {t('update_post.published')}
                    </label>
                    <select
                      {...register('published', {
                        setValueAs: (value) => value === 'true',
                      })}
                      className='w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-purple-500'
                    >
                      <option
                        value='true'
                        className='bg-gray-900 text-gray-400'
                      >
                        {t('update_post.yes')}
                      </option>

                      <option
                        value='false'
                        className='bg-gray-900 text-gray-400'
                      >
                        {t('update_post.no')}
                      </option>
                    </select>
                    <p className='text-red-400 text-xs pt-1'>
                      {errors.published?.message}
                    </p>
                  </div>

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
                      {loading ? <Spinner /> : t('update_post.save')}
                    </button>

                    <button
                      type='button'
                      onClick={toggleModal}
                      className='px-6 py-2 text-md border border-white/5 bg-white/[0.06] 
                        rounded-full shadow-xl transition-all duration-300 cursor-pointer 
                        hover:scale-[1.03] hover:bg-white/[0.12]'
                    >
                      {t('update_post.close')}
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

import { useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaRotate, FaXmark } from 'react-icons/fa6';
import Spinner from '@/components/spinner/Spinner';
import axios from '@config/Axios.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { Context } from '@/components/modules/Context';
import { useTranslation } from 'react-i18next';

export default function UpdateUser({ users, setUsers }) {
  const { t } = useTranslation('translation');

  const { userLogin } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const updateUserSchema = yup.object({
    name: yup.string().required(t('update_user.name_required')),
    email: yup.string().email(t('email_invalid')).required(t('email_required')),
    experience: yup.string().required(t('experience_required')),
    student: yup.string().required(t('student_required')),
    deleted: yup.string().required(t('deleted_required')),
    bio: yup.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateUserSchema),
  });

  useEffect(() => {
    reset({
      name: users?.name || '',
      email: users?.email || '',
      experience: users?.experience || '',
      student: users?.student || 'No',
      bio: users?.bio || '',
      location: users?.location || '',
      website: users?.website || '',
      portfolio: users?.portfolio || '',
      github: users?.github || '',
      linkedin: users?.linkedin || '',
      deleted: users?.deleted || false
    });
  }, [users, reset]);

  const handleUpdateUser = async (data) => {
    if (!users?._id) {
      Swal.fire({
        title: t('update_user.error'),
        text: t('update_user.text_error'),
        icon: 'error',
      });
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem('token');

      const response = await axios.patch(`/users/${users._id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedUser = response.data.payload || response.data;

      Swal.fire({
        title: t('update_user.success'),
        text: t('update_user.text_success'),
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      // Update the list
      setUsers((prev) =>
        prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
      );

      // Reset form con i nuovi valori
      reset(updatedUser);

      // Closed modal
      setIsOpen(false);
    } catch (error) {
      Swal.fire({
        title: t('update_user.error'),
        text:
          error?.response?.data?.message ||
          error?.response?.data?.errors?.[0]?.msg ||
          t('update_user.error_occurred'),
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
        className='px-4 py-1 border border-white/5 bg-white/[0.03] rounded-2xl shadow-2xl hover:scale-[1.03] hover:bg-purple-500/20 transition-all duration-300 cursor-pointer'
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
                  onSubmit={handleSubmit(handleUpdateUser)}
                >
                  {/* Input component */}
                  {[
                    { 
                      label: t('update_user.label_name'), 
                      field: 'name' 
                    },
                    { 
                      label: t('update_user.label_email'), 
                      field: 'email' 
                    },
                    { 
                      label: t('update_user.label_location'),
                      field: 'location' 
                    },
                    { 
                      label: t('update_user.label_website'), 
                      field: 'website' 
                    },
                    {
                      label: t('update_user.label_portfolio'),
                      field: 'portfolio',
                    },
                    { 
                      label: t('update_user.label_github'), 
                      field: 'github' 
                    },
                    { 
                      label: t('update_user.label_linkedin'), 
                      field: 'linkedin' 
                    },
                  ].map(({ label, field }) => (
                    <div key={field}>
                      <label className='text-white text-sm font-semibold mb-2 block'>
                        {label}
                      </label>
                      <input
                        {...register(field)}
                        className='w-full px-5 py-3 border rounded-xl text-white bg-white/5 border-white/20 focus:border-purple-500 focus:ring-purple-500 transition-all placeholder-white/40'
                      />
                      <p className='text-red-400 text-xs pt-1'>
                        {errors[field]?.message}
                      </p>
                    </div>
                  ))}

                  {/* Experience */}
                  <div>
                    <label className='text-white text-sm font-semibold mb-2 block'>
                      {t('update_user.experience')}
                    </label>
                    <select
                      {...register('experience')}
                      className='w-full px-5 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:ring-purple-500'
                    >
                      <option
                        value=''
                        className='bg-gray-900 text-gray-400'
                      >
                        {t('update_user.select')}
                      </option>
                      <option
                        value='Beginner'
                        className='bg-gray-900 text-gray-400'
                      >
                        {t('update_user.beginner')}
                      </option>
                      <option
                        value='Intermediate'
                        className='bg-gray-900 text-gray-400'
                      >
                        {t('update_user.intermediate')}
                      </option>
                      <option
                        value='Expert'
                        className='bg-gray-900 text-gray-400'
                      >
                        {t('update_user.expert')}
                      </option>
                    </select>
                    <p className='text-red-400 text-xs pt-1'>
                      {errors.experience?.message}
                    </p>
                  </div>

                  {/* Student */}
                  <div>
                    <label className='text-white text-sm font-semibold mb-2 block'>
                      {t('update_user.student')}
                    </label>
                    <select
                      {...register('student')}
                      className='w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-purple-500'
                    >
                      <option
                        value=''
                        className='bg-gray-900 text-gray-400'
                      >
                        {t('update_user.select')}
                      </option>
                      <option
                        value='Yes'
                        className='bg-gray-900 text-gray-400'
                      >
                        {t('update_user.yes')}
                      </option>
                      <option
                        value='No'
                        className='bg-gray-900 text-gray-400'
                      >
                        {t('update_user.no')}
                      </option>
                    </select>
                    <p className='text-red-400 text-xs pt-1'>
                      {errors.student?.message}
                    </p>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className='text-white text-sm font-semibold mb-2 block'>
                      {t('update_user.update_bio')}
                    </label>
                    <textarea
                      {...register('bio')}
                      rows={4}
                      className='w-full px-5 py-3 border rounded-xl text-white bg-white/5 border-white/20 focus:ring-purple-500 resize-none'
                    />
                  </div>

                  {/* Deleted */}
                  <div>
                    <label className='text-white text-sm font-semibold mb-2 block'>
                      {t('update_user.deleted')}
                    </label>
                    <select
                      {...register('deleted')}
                      className='w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-purple-500'
                    >
                      <option
                        
                        className='bg-gray-900 text-gray-400'
                      >
                        {t('update_user.select')}
                      </option>
                      <option
                        value={true}
                        className='bg-gray-900 text-gray-400'
                      >
                        {t('update_user.yes')}
                      </option>
                      <option
                        value={false}
                        className='bg-gray-900 text-gray-400'
                      >
                        {t('update_user.no')}
                      </option>
                    </select>
                    <p className='text-red-400 text-xs pt-1'>
                      {errors.deleted?.message}
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

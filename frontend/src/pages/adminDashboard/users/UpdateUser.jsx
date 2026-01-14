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

export default function UpdateUser({ users, setUsers }) {
  const { userLogin } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const updateUserSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    experience: yup.string().required('Experience is required'),
    student: yup.string().required('Student field is required'),
    deleted: yup.string().required('Deleted field is required'),
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
        title: 'Error',
        text: 'User data is not defined',
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
        title: 'Success',
        text: 'User updated successfully',
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
        title: 'Error',
        text:
          error?.response?.data?.message ||
          error?.response?.data?.errors?.[0]?.msg ||
          'An error occurred',
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
                  Update User
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
                    { label: 'Update Name', field: 'name' },
                    { label: 'Update Email', field: 'email' },
                    { label: 'Update Location (optional)', field: 'location' },
                    { label: 'Update Website (optional)', field: 'website' },
                    {
                      label: 'Update Portfolio (optional)',
                      field: 'portfolio',
                    },
                    { label: 'Update GitHub (optional)', field: 'github' },
                    { label: 'Update LinkedIn (optional)', field: 'linkedin' },
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
                      Experience
                    </label>
                    <select
                      {...register('experience')}
                      className='w-full px-5 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:ring-purple-500'
                    >
                      <option
                        value=''
                        className='bg-gray-900 text-gray-400'
                      >
                        Select
                      </option>
                      <option
                        value='Beginner'
                        className='bg-gray-900 text-gray-400'
                      >
                        Beginner
                      </option>
                      <option
                        value='Intermediate'
                        className='bg-gray-900 text-gray-400'
                      >
                        Intermediate
                      </option>
                      <option
                        value='Expert'
                        className='bg-gray-900 text-gray-400'
                      >
                        Expert
                      </option>
                    </select>
                    <p className='text-red-400 text-xs pt-1'>
                      {errors.experience?.message}
                    </p>
                  </div>

                  {/* Student */}
                  <div>
                    <label className='text-white text-sm font-semibold mb-2 block'>
                      Student
                    </label>
                    <select
                      {...register('student')}
                      className='w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-purple-500'
                    >
                      <option
                        value=''
                        className='bg-gray-900 text-gray-400'
                      >
                        Select
                      </option>
                      <option
                        value='Yes'
                        className='bg-gray-900 text-gray-400'
                      >
                        Yes
                      </option>
                      <option
                        value='No'
                        className='bg-gray-900 text-gray-400'
                      >
                        No
                      </option>
                    </select>
                    <p className='text-red-400 text-xs pt-1'>
                      {errors.student?.message}
                    </p>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className='text-white text-sm font-semibold mb-2 block'>
                      Update Bio (optional)
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
                      Deleted
                    </label>
                    <select
                      {...register('deleted')}
                      className='w-full px-5 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-purple-500'
                    >
                      <option
                        
                        className='bg-gray-900 text-gray-400'
                      >
                        Select
                      </option>
                      <option
                        value={true}
                        className='bg-gray-900 text-gray-400'
                      >
                        Yes
                      </option>
                      <option
                        value={false}
                        className='bg-gray-900 text-gray-400'
                      >
                        No
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
                      {loading ? <Spinner /> : 'Save'}
                    </button>

                    <button
                      type='button'
                      onClick={toggleModal}
                      className='px-6 py-2 text-md border border-white/5 bg-white/[0.06] 
                        rounded-full shadow-xl transition-all duration-300 cursor-pointer 
                        hover:scale-[1.03] hover:bg-white/[0.12]'
                    >
                      Close
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

import { Context } from '@/components/modules/Context';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../noPage/MetaData';
import { motion } from 'framer-motion';
import api from '@config/Axios.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import Spinner from '@/components/spinner/Spinner';
import { useTranslation } from 'react-i18next';

export default function EditProfile({ setEditProfile }) {
  const { t } = useTranslation('translation');
  // Get user context and login state
  const { userLogin, setUserLogin, isLoggedIn, setIsLoggedIn } =
    useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Validation schema using Yup
  const updateUserSchema = yup.object({
    name: yup.string().required(t('edit_profile.name_required')),
    email: yup.string().email(t('edit_profile.email_invalid')).required(t('edit_profile.email_required')),
    experience: yup.string().required(t('edit_profile.experience_required')),
    student: yup.string().required(t('edit_profile.select_student')),
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateUserSchema),
  });

  // Reset form values whenever userLogin changes
  useEffect(() => {
    if (userLogin) {
      reset({
        name: userLogin?.name || '',
        email: userLogin?.email || '',
        experience: userLogin?.experience || '',
        student: userLogin?.student || 'No',
        bio: userLogin?.bio || '',
        location: userLogin?.location || '',
        website: userLogin?.website || '',
        portfolio: userLogin?.portfolio || '',
        github: userLogin?.github || '',
        linkedin: userLogin?.linkedin || '',
      });
    }
  }, [userLogin, reset]);

  // Handle form submission to update user data
  const handleUpdateUser = async (data) => {
    try {
      setLoading(true);

      // Retrieve token (e.g. from localStorage or context)
      const token = localStorage.getItem('token');

      // Send update request to backend
      const response = await api.patch(`/users/me`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // send token in header
        },
      });

      const { payload } = response.data;
      const updatedUser = payload?.user || payload;

      // Update Context and localStorage
      setUserLogin(updatedUser);
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsLoggedIn(true);

      Swal.fire({
        title: t('edit_profile.success'),
        text: t('edit_profile.updated_success'),
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      // Re-sync the form with new data
      reset(updatedUser);
      setEditProfile(false);
    } catch (error) {
      // Extract and display error message from backend or network
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.error ||
        error?.message ||
        t('edit_profile.error_occurred');

      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return <AccessRestricted />;
  }

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Update Profile | TerraQuake API - Manage Your Account'
        description='Update your TerraQuake API profile information including username, experience, and account details to keep your developer profile up to date.'
        ogTitle='Update Profile | TerraQuake API'
        ogDescription='Manage and update your TerraQuake API account information. Keep your developer profile current for seamless access to earthquake data and API tools.'
        twitterTitle='Update Profile | TerraQuake API'
        twitterDescription='Edit your TerraQuake API profile to stay updated with your latest information and maintain access to real-time earthquake monitoring tools.'
        keywords='update profile TerraQuake API, edit account earthquake API, manage user profile TerraQuake, update developer account TerraQuake API'
      />
      {/* SEO Stuff */}

      {/* Main animated container */}
      <motion.section
        className='col-span-1 lg:col-span-2 bg-black/30 border border-pink-500/10 rounded-2xl shadow-lg p-6 sm:p-8 mt-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className='w-full max-w-5xl mx-auto'>
          {/* Title */}
          <motion.div
            className='mb-12 text-center'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className='text-3xl md:text-5xl font-extrabold text-white mb-4'>
              {t('edit_profile.title_edit')}
            </h2>
            <div className='h-0.5 w-1/3 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            <p className='text-xl text-left text-white/70 max-w-7xl'>
              {t('edit_profile.text_edit')}
            </p>
          </motion.div>

          {/* Form container */}
          <motion.div
            className='p-6 sm:p-10 lg:p-14 border border-white/10 bg-white/[0.03] rounded-3xl shadow-2xl backdrop-blur-sm'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form
              className='space-y-8'
              onSubmit={handleSubmit(handleUpdateUser)}
            >
              {[
                { 
                  label: t('edit_profile.label_name'), 
                  field: 'name', 
                  text: t('edit_profile.text_name') 
                },
                {
                  label: t('edit_profile.label_email'),
                  field: 'email',
                  text: 'name@company.com',
                },
                {
                  label: t('edit_profile.label_location'),
                  field: 'location',
                  text: t('edit_profile.text_location'),
                },
                {
                  label: t('edit_profile.label_website'),
                  field: 'website',
                  text: t('edit_profile.text_website'),
                },
                {
                  label: t('edit_profile.label_portfolio'),
                  field: 'portfolio',
                  text: 'portfolio',
                },
                {
                  label: t('edit_profile.label_github'),
                  field: 'github',
                  text: 'github',
                },
                {
                  label: t('edit_profile.label_linkedin'),
                  field: 'linkedin',
                  text: 'linkedin',
                },
              ].map(({ label, field, text }) => (
                <div key={label}>
                  <label className='block text-white text-sm font-semibold mb-2'>
                    {label}
                  </label>
                  <input
                    type={
                      field === 'password'
                        ? showPassword
                          ? 'text'
                          : 'password'
                        : 'text'
                    }
                    className='w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50'
                    placeholder={text}
                    autoComplete='off'
                    {...register(field)}
                  />
                  <p className='text-red-400 text-xs pt-1'>
                    {errors[field]?.message}
                  </p>
                </div>
              ))}

              {/* Experience field */}
              <div>
                <label className='block text-white text-sm font-semibold mb-2'>
                  {t('edit_profile.experience')}
                </label>
                <select
                  className='w-full px-5 py-3 border-2 rounded-xl bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50'
                  {...register('experience')}
                >
                  <option
                    value=''
                    disabled
                    className='bg-gray-900 text-gray-400'
                  >
                    {t('edit_profile.select_option')}
                  </option>
                  <option
                    value='Beginner'
                    className='bg-gray-900 text-gray-400'
                  >
                    {t('edit_profile.beginner')}
                  </option>
                  <option
                    value='Intermediate'
                    className='bg-gray-900 text-gray-400'
                  >
                    {t('edit_profile.intermediate')}
                  </option>
                  <option
                    value='Expert'
                    className='bg-gray-900 text-gray-400'
                  >
                    {t('edit_profile.expert')}
                  </option>
                </select>
                <p className='text-red-400 text-xs pt-1'>
                  {errors.experience?.message}
                </p>
              </div>

              {/* Student field */}
              <div>
                <label className='block text-white text-sm font-semibold mb-2'>
                  {t('edit_profile.student')}
                </label>
                <select
                  className='w-full px-5 py-3 border-2 rounded-xl bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50'
                  {...register('student')}
                >
                  <option
                    value=''
                    disabled
                    className='bg-gray-900 text-gray-400'
                  >
                    {t('edit_profile.select_option')}
                  </option>
                  <option
                    value='Yes'
                    className='bg-gray-900 text-gray-400'
                  >
                    {t('edit_profile.yes')}
                  </option>
                  <option
                    value='No'
                    className='bg-gray-900 text-gray-400'
                  >
                    {t('edit_profile.no')}
                  </option>
                </select>
                <p className='text-red-400 text-xs pt-1'>
                  {errors.student?.message}
                </p>
              </div>

              {/* Bio field */}
              <div>
                <label className='block text-white text-sm font-semibold mb-2'>
                  {t('edit_profile.update_bio')}
                </label>
                <textarea
                  className='w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50'
                  placeholder='Bio'
                  autoComplete='off'
                  rows={4}
                  {...register('bio')}
                />
              </div>

              {/* Submit button */}
              <button
                type='submit'
                disabled={loading}
                aria-label='Save Changes'
                className='w-full mt-10 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-4 px-6 rounded-full hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-transform duration-300 ease-in-out cursor-pointer disabled:opacity-60'
              >
                {loading ? <Spinner /> : t('edit_profile.save_changes')}
              </button>
            </form>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}

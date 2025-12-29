import { Context } from '@/components/modules/Context';
import React, { useContext, useState, useEffect } from 'react';
import axios from '@config/Axios.js';
import MetaData from '../noPage/MetaData';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import BackToTopButton from '@/components/utils/BackToTopButton';
import { motion } from 'framer-motion';
import Spinner from '@/components/spinner/Spinner';
import AccessRestricted from '@/components/accessRestricted/AccessRestricted';
import { useTranslation } from 'react-i18next';

export default function ChangePassword() {
  const { t } = useTranslation('translation');

  const { isLoggedIn } = useContext(Context);
  const token = localStorage.getItem('token'); // JWT token from localStorage
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false); // toggle password visibility
  const togglePassword = () => setShowPassword((prev) => !prev);

  // Validation schema using Yup
  const changePasswordSchema = yup
    .object()
    .shape({
      passwordOld: yup
        .string()
        .required('Old password is required!')
        .min(8, 'Password must be at least 8 characters!')
        .matches(/[A-Z]/, 'Must contain an uppercase letter!')
        .matches(/\d/, 'Must contain a number!')
        .matches(/[^A-Za-z0-9]/),

      passwordNew: yup
        .string()
        .required('New password is required!')
        .min(8, 'Password must be at least 8 characters!')
        .matches(/[A-Z]/, 'Must contain an uppercase letter!')
        .matches(/\d/, 'Must contain a number!')
        .matches(/[^A-Za-z0-9]/),

      confirmPassword: yup
        .string()
        .oneOf([yup.ref('passwordNew'), null], 'Passwords must match!')
        .required('Confirm new password is required!'),
    })
    .required();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    reset, // used to reset form fields
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      passwordOld: '',
      passwordNew: '',
      confirmPassword: '',
    },
  });

  // Reset form fields whenever the component mounts
  useEffect(() => {
    reset({
      passwordOld: '',
      passwordNew: '',
      confirmPassword: '',
    });
  }, [reset]);

  // Handle password change submission
  const handleChangePassword = async (data) => {
    setLoading(true);
    const formData = {
      passwordOld: data.passwordOld,
      passwordNew: data.passwordNew,
      confirmPassword: data.confirmPassword,
    };

    axios
      .post('/auth/change-password', formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        Swal.fire({
          title: 'Success!',
          text: 'Your password has been successfully changed! Please sign in again.',
          icon: 'success',
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonText: 'Ok',
        }).then(() => {
          reset(); // clear the form
          navigate('/profile', { replace: true });
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text:
            error.response?.data?.message ||
            'Something went wrong. Please try again.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        reset(); // clear the form
      })
      .finally(setLoading(false));
  };

  if (!isLoggedIn) {
    return <AccessRestricted />;
  }

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Change Password | TerraQuake API - Secure Account Management'
        description='Change your TerraQuake API account password securely. Protect your account and manage your access to real-time earthquake data.'
        ogTitle='Change Password | TerraQuake API'
        ogDescription='Securely change your TerraQuake API account password to protect access to your earthquake data and API keys.'
        twitterTitle='Change Password | TerraQuake API'
        twitterDescription='Manage your TerraQuake API account securely by updating your password. Keep your earthquake monitoring data safe.'
        keywords='change password TerraQuake API, account security, update password, earthquake data API security'
      />
      {/* SEO Stuff */}

      <motion.section
        className='relative z-0 w-full min-h-screen pt-24 pb-12 overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background */}
        <div className='absolute inset-0 z-0'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>

        <>
          <div className='relative z-10 w-full max-w-3xl mx-auto px-6 lg:px-12'>
            {/* Header */}
            <motion.div
              className='mb-16 text-center lg:text-left'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1 className='text-3xl text-center md:text-5xl text-white font-extrabold tracking-tighter mb-4'>
                {t('change_password.title')}
                <div className='h-0.5 w-1/3 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
              </h1>
              <p className='text-xl text-center md:text-left text-white/70 max-w-7xl'>
                {t('change_password.description')}
              </p>
            </motion.div>

            <motion.div
              className='lg:col-span-2 p-8 md:p-12 border border-white/5 bg-white/[0.03] rounded-3xl shadow-2xl'
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <form onSubmit={handleSubmit(handleChangePassword)}>
                {/* Old Password */}
                <div className='relative mb-6'>
                  <label className='block text-white text-sm font-semibold mb-2'>
                    {t('change_password.old_password')}
                  </label>
                  <input
                    className='w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none'
                    {...register('passwordOld')}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='off'
                    placeholder={t('change_password.old_placeholder')}
                  />
                  <button
                    type='button'
                    onClick={togglePassword}
                    className='absolute top-10 right-3 text-gray-300 hover:text-purple-400 cursor-pointer'
                    aria-label='Toggle password view'
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  <p className='text-red-400 pt-1'>
                    {errors.passwordOld?.message}
                  </p>
                </div>

                {/* New Password */}
                <div className='relative mb-6'>
                  <label className='block text-white text-sm font-semibold mb-2'>
                    {t('change_password.new_password')}
                  </label>
                  <input
                    className='w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none'
                    {...register('passwordNew')}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='off'
                    placeholder={t('change_password.new_placeholder')}
                  />
                  <button
                    type='button'
                    onClick={togglePassword}
                    className='absolute top-10 right-3 text-gray-300 hover:text-purple-400 cursor-pointer'
                    aria-label='Toggle password view'
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  <p className='text-red-400 pt-1'>
                    {errors.passwordNew?.message}
                  </p>
                </div>

                {/* Confirm New Password */}
                <div className='relative mb-6'>
                  <label className='block text-white text-sm font-semibold mb-2'>
                    {t('change_password.confirm_password')}
                  </label>
                  <input
                    className='w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none'
                    {...register('confirmPassword')}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='off'
                    placeholder={t('change_password.confirm_placeholder')}
                  />
                  <button
                    type='button'
                    onClick={togglePassword}
                    className='absolute top-10 right-3 text-gray-300 hover:text-purple-400 cursor-pointer'
                    aria-label='Toggle password view'
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  <p className='text-red-400 pt-1'>
                    {errors.confirmPassword?.message}
                  </p>
                </div>

                {/* Submit */}
                <button
                  type='submit'
                  className='mt-8 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-4 px-6 rounded-full hover:scale-[1.01] hover:shadow-xl active:scale-[0.99] transform transition-all duration-300 ease-in-out flex items-center justify-center gap-2 cursor-pointer'
                  aria-label='Confirm new password'
                  disabled={loading}
                >
                  {loading ? <Spinner /> : 
                    <span>
                      {t('change_password.button_confirm')}
                    </span>}
                </button>
              </form>

              {/* Divider */}
              <div className='flex items-center my-6'>
                <div className='flex-grow border-t border-gray-600 opacity-50'></div>
                <span className='mx-3 text-gray-300 text-sm font-medium'>
                  {t('change_password.back_account')}
                </span>
                <div className='flex-grow border-t border-gray-600 opacity-50'></div>
              </div>

              <Link
                className='block mt-4 text-center text-purple-400 hover:text-purple-600 font-semibold transition duration-300'
                to='/profile'
                aria-label='Navigate back to profile page'
              >
                {t('change_password.back_profile')}
              </Link>
            </motion.div>
          </div>
        </>
      </motion.section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}

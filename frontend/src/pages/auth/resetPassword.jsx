import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from '@config/axios.js';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams } from 'react-router';
import MetaData from '../noPage/MetaData';
import BackToTopButton from '@/components/utils/BackToTopButton';
import { motion } from 'framer-motion';

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const { token } = useParams();

  const resetPasswordSchema = yup
    .object()
    .shape({
      password: yup
        .string()
        .required('Password is required!')
        .min(8, 'Password must be at least 8 characters!')
        .matches(/[A-Z]/, 'Must contain an uppercase letter!')
        .matches(/\d/, 'Must contain a number!')
        .matches(/[^A-Za-z0-9]/),

      confirmPassword: yup
        .string()
        .required('Please confirm your password!')
        .oneOf([yup.ref('password')], 'Passwords must match!'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetPasswordSchema) });

  let navigate = useNavigate();

  const handleForgotPassword = (data) => {
    const formData = {
      password1: data.password,
      password2: data.confirmPassword,
    };

    axios
      .post(`/auth/reset-password/${token}`, formData)
      .then((res) => {
        Swal.fire({
          title: 'Success!',
          text: 'Your password has been successfully reset! Please sign in again!',
          icon: 'success',
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonText: 'Ok',
        }).then(() => {
          navigate('/signin');
        });
      })
      .catch((err) => {
        Swal.fire({
          title: 'Error!',
          text: err.response?.data?.message || 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      });
  };

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Reset Password | TerraQuake API - Secure Account Access'
        description='Reset your TerraQuake API password securely to regain access to your earthquake monitoring dashboard. Easy, fast, and safe.'
        ogTitle='Reset Password | TerraQuake API'
        ogDescription='Securely reset your TerraQuake API password and continue accessing earthquake monitoring data without interruptions.'
        twitterTitle='Reset Password | TerraQuake API'
        twitterDescription='Reset your password for TerraQuake API to restore access to earthquake monitoring features.'
        keywords='reset password TerraQuake API, password reset, account recovery, earthquake API'
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

        <div className='relative z-10 w-full max-w-3xl mx-auto px-6 lg:px-12'>
          {/* Header */}
          <motion.div
            className='mb-16 text-center lg:text-left'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className='text-3xl text-center md:text-5xl text-white font-extrabold tracking-tighter mb-4'>
              Reset Password.
              <div className='h-0.5 w-1/3 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-center md:text-left text-white/70 max-w-7xl'>
              Enter your new password below to securely reset your account
              access.
            </p>
          </motion.div>

          <motion.div
            className='lg:col-span-2 p-8 md:p-12 border border-white/5 bg-white/[0.03] rounded-3xl shadow-2xl'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit(handleForgotPassword)}>
              {/* New Password */}
              <div className='relative mb-6'>
                <label className='block text-white text-sm font-semibold mb-2'>
                  New Password
                </label>
                <input
                  className='w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none'
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='off'
                  placeholder='New password'
                />
                <button
                  type='button'
                  onClick={togglePassword}
                  className='absolute top-10 right-3 text-gray-300 hover:text-purple-400 cursor-pointer'
                  aria-label='Toggle password view'
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <p className='text-red-600 pt-1'>{errors.password?.message}</p>
              </div>

              {/* Confirm Password */}
              <div className='relative mb-6'>
                <label className='block text-white text-sm font-semibold mb-2'>
                  Confirm Password
                </label>
                <input
                  className='w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none'
                  {...register('confirmPassword')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='off'
                  placeholder='Confirm password'
                />
                <button
                  type='button'
                  onClick={togglePassword}
                  className='absolute top-10 right-3 text-gray-300 hover:text-purple-400 cursor-pointer'
                  aria-label='Toggle password view'
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <p className='text-red-600 pt-1'>
                  {errors.confirmPassword?.message}
                </p>
              </div>

              <button
                type='submit'
                className='mt-8 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-4 px-6 rounded-full hover:scale-[1.01] hover:shadow-xl active:scale-[0.99] transform transition-all duration-300 ease-in-out flex items-center justify-center gap-2 cursor-pointer'
                aria-label='Reset your account password'
              >
                Reset
              </button>
            </form>
            {/* Divider */}
            <div className='flex items-center my-6'>
              <div className='flex-grow border-t border-gray-600 opacity-50'></div>
              <span className='mx-3 text-gray-300 text-sm font-medium'>
                Or go back to your account
              </span>
              <div className='flex-grow border-t border-gray-600 opacity-50'></div>
            </div>

            <Link
              className='block mt-4 text-center text-purple-400 hover:text-purple-600 font-semibold transition duration-300'
              to='/signin'
              aria-label='Navigate back to sign in page'
            >
              Back to Sign In
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}

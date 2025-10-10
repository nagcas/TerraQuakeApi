import { Context } from '@/components/modules/context';
import React, { useContext, useState, useEffect } from 'react';
import axios from '@config/axios.js';
import MetaData from '../noPage/metaData';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import BackToTopButton from '@/components/utils/backToTopButton';

export default function ChangePassword() {
  const { isLoggedIn } = useContext(Context);
  const token = localStorage.getItem('token'); // JWT token from localStorage
  const navigate = useNavigate();

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
          navigate('/profile');
        });
      })
      .catch((err) => {
        Swal.fire({
          title: 'Error!',
          text:
            err.response?.data?.message ||
            'Something went wrong. Please try again.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        reset(); // clear the form
      });
  };

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

      <section className='relative z-30 min-h-screen flex items-center justify-center p-6 rounded-lg'>
        {/* Background Gradient/Mesh (for a classy, dark theme) */}
        <div className='absolute inset-0 z-0 pointer-events-none'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>
        {isLoggedIn ? (
          <div className='rounded-lg w-full max-w-md'>
            <div className='flex flex-col justify-center items-center mb-16'>
              <h1 className='text-3xl md:text-5xl text-white/80 font-extrabold text-center tracking-tight mb-4 animate-fade-in mt-12'>
                Change Password
                <div className='h-1 w-2/4 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 mx-auto my-2 rounded-full' />
              </h1>
            </div>

            <form onSubmit={handleSubmit(handleChangePassword)}>
              {/* Old Password */}
              <div className='relative mb-6'>
                <label className='block text-white text-sm font-semibold mb-2'>
                  Old Password
                </label>
                <input
                  className='w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none'
                  {...register('passwordOld')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='off'
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
                  {errors.passwordOld?.message}
                </p>
              </div>

              {/* New Password */}
              <div className='relative mb-6'>
                <label className='block text-white text-sm font-semibold mb-2'>
                  New Password
                </label>
                <input
                  className='w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none'
                  {...register('passwordNew')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='off'
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
                  {errors.passwordNew?.message}
                </p>
              </div>

              {/* Confirm New Password */}
              <div className='relative mb-6'>
                <label className='block text-white text-sm font-semibold mb-2'>
                  Confirm New Password
                </label>
                <input
                  className='w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none'
                  {...register('confirmPassword')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete='off'
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

              {/* Submit */}
              <button
                type='submit'
                className='w-full bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-2xl transition duration-300 cursor-pointer'
                aria-label='Confirm new password'
              >
                Confirm
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
              to='/profile'
              aria-label='Navigate back to profile page'
            >
              Back to Profile
            </Link>
          </div>
        ) : (
          <div className='flex flex-col items-center gap-4'>
            <p className='text-2xl text-center text-gray-300 max-w-lg'>
              To change your password, you need to be logged in. Please sign in
              or create a new account to continue.
            </p>
            <div className='flex gap-4 mt-4'>
              <button
                onClick={() => navigate('/signin')}
                className='py-3 px-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer'
                aria-label='Navigate to sign in page'
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className='py-3 px-8 rounded-full bg-gradient-to-r from-pink-600 to-purple-700 text-white font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer'
                aria-label='Navigate to sign up page'
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}

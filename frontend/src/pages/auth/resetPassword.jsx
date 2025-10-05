import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from '@config/axios.js';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams } from 'react-router';
import MetaData from '../noPage/metaData';

export default function resetPassword() {
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

      {/* Background Gradient/Mesh (for a classy, dark theme) */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
        <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
      </div>

      <section className='min-h-screen flex items-center justify-center p-6 rounded-lg'>
        <div className='rounded-lg w-full max-w-md'>
          <div className='flex flex-col justify-center items-center mb-16'>
            <h1 className='text-3xl md:text-5xl text-white/80 font-extrabold text-center tracking-tight mb-4 animate-fade-in mt-12'>
              Reset Password
              <div className='h-1 w-2/4 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 mx-auto my-2 rounded-full' />
            </h1>
          </div>

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
              className='w-full bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-2xl transition duration-300 cursor-pointer'
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
        </div>
      </section>
    </>
  );
}

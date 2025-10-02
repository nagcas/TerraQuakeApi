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
        .matches(/[^A-Za-z0-9]/)
        .withMessage('Password must contain at least one special character.'),

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
        }).then(() => {
          navigate('/signup');
        });
      });
  };

  return (
    <>
      <MetaData
        title='Reset Password'
        description='Reset Password Page of TerraQuake'
      />
      <section className='min-h-screen flex items-center justify-center p-6 rounded-lg'>
        <div className='p-8 rounded-lg w-full max-w-md'>
          <h2 className='text-3xl text-center text-white font-bold'>
            Reset Password
          </h2>
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

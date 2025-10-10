import { useState } from 'react';
import axios from '@config/axios.js';
import Swal from 'sweetalert2';
import { ImSpinner9 } from 'react-icons/im';
import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MetaData from '@pages/noPage/metaData';
import BackToTopButton from '@/components/utils/backToTopButton';

export default function forgotPassword() {
  const [loading, setLoading] = useState(false);
  const forgotPasswordSchema = yup
    .object({
      email: yup.string().email().required('Email is required !'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotPasswordSchema) });

  let navigate = useNavigate();

  const handleForgotPassword = (data) => {
    setLoading(true);

    const formData = {
      email: data.email,
    };
    axios
      .post('/auth/forgot-password', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        localStorage.setItem(
          'passwordChangeRequestingEmail',
          res.data.user.email
        );
        Swal.fire({
          title: 'Success!',
          text: 'If the email exists in our system, a password reset link has been sent.',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          navigate('/');
          setLoading(false);
        });
      })
      .catch((err) => {
        // Build a reliable error message from several possible shapes
        const errorMessage =
          err?.response?.data?.message || // your handleHttpError -> message
          err?.response?.data?.errors?.[0]?.msg || // express-validator array
          err?.response?.data?.error || // fallback
          err?.message || // axios/node error message
          'An error occurred. Please try again.';
        Swal.fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Ok',
        }).then(() => {
          navigate('/signup');
          setLoading(false);
        });
      });
  };

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Forgot Password | TerraQuake API - Account Recovery'
        description='Reset your TerraQuake API account password securely. Recover access to your earthquake monitoring data with our easy password recovery process.'
        ogTitle='Forgot Password | TerraQuake API'
        ogDescription='Securely reset your TerraQuake API password to regain access to your earthquake monitoring tools and data.'
        twitterTitle='Forgot Password | TerraQuake API'
        twitterDescription='Recover your TerraQuake API account by securely resetting your password. Keep your earthquake data access safe.'
        keywords='forgot password TerraQuake API, password recovery, account reset, earthquake data API'
      />
      {/* SEO Stuff */}

      <section className='relative z-30 min-h-screen flex items-center justify-center p-6 rounded-lg'>
        {/* Background Gradient/Mesh (for a classy, dark theme) */}
        <div className='absolute inset-0 z-0 pointer-events-none'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>
        <div className='rounded-lg w-full max-w-md'>
          <div className='flex flex-col justify-center items-center mb-16'>
            <h1 className='text-3xl md:text-5xl text-white/80 font-extrabold text-center tracking-tight mb-4 animate-fade-in mt-12'>
              Forgot Password ?
              <div className='h-1 w-2/4 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 mx-auto my-2 rounded-full' />
            </h1>
          </div>

          <form onSubmit={handleSubmit(handleForgotPassword)}>
            <div className='mb-6'>
              <label className='block text-white text-sm font-semibold mb-2'>
                Enter your email
              </label>
              <input
                className='w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none'
                name='email'
                autoComplete='off'
                {...register('email')}
              />
              <p className='text-red-600 pt-1'>{errors.email?.message}</p>
            </div>
            <button
              className='w-full bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-2xl transition duration-300 cursor-pointer'
              type='submit'
              aria-label='Recover your account password'
            >
              {loading ? (
                <p className='text-white'>
                  <ImSpinner9 className='text-2xl mx-auto spinner' />
                </p>
              ) : (
                <span>Send reset link</span>
              )}
            </button>
          </form>
          {/* Divider */}
          <div className='flex items-center my-8'>
            <div className='flex-grow border-t border-gray-500'></div>
            <span className='mx-4 text-gray-200 text-sm font-medium'>
              Or return to your account
            </span>
            <div className='flex-grow border-t border-gray-500'></div>
          </div>

          <p className='text-gray-400 text-sm text-center mb-4'>
            Enter your email and we’ll send you a password reset link if it
            matches an existing account.
          </p>

          <Link
            to='/signin'
            className='block text-center mt-2 text-purple-400 hover:text-purple-600 font-semibold transition duration-300'
            aria-label='Navigate to sign in page'
          >
            Back to Sign In
          </Link>
        </div>
      </section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}

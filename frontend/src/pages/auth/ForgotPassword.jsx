import { useState } from 'react';
import axios from '@config/Axios.js';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MetaData from '@pages/noPage/MetaData';
import BackToTopButton from '@/components/utils/BackToTopButton';
import { motion } from 'framer-motion';
import Spinner from '@/components/spinner/Spinner';

export default function forgotPassword() {
  const [loading, setLoading] = useState(false);
  const forgotPasswordSchema = yup
    .object({
      email: yup.string().email().required('Email is required!'),
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
          res.data.data.email
        );
        Swal.fire({
          title: 'Success!',
          text: 'If the email exists in our system, a password reset link has been sent.',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          navigate('/', { replace: true });
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
          navigate('/signup', { replace: true });
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
              Forgot Password?
              <div className='h-0.5 w-1/3 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-center md:text-left text-white/70 max-w-7xl'>
              Enter your email and we’ll send you a password reset link if it
              matches an existing account.
            </p>
          </motion.div>

          <motion.div
            className='lg:col-span-2 p-8 md:p-12 border border-white/5 bg-white/[0.03] rounded-3xl shadow-2xl'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit(handleForgotPassword)}>
              <div className='mb-8'>
                <label className='block text-white text-sm font-semibold mb-2'>
                  Enter your email
                </label>
                <input
                  className='w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50'
                  placeholder='name@company.com'
                  name='email'
                  autoComplete='off'
                  {...register('email')}
                />
                <p className='text-red-400 pt-1'>{errors.email?.message}</p>
              </div>
              <button
                className='mt-8 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-4 px-6 rounded-full hover:scale-[1.01] hover:shadow-xl active:scale-[0.99] transform transition-all duration-300 ease-in-out flex items-center justify-center gap-2 cursor-pointer'
                type='submit'
                aria-label='Recover your account password'
              >
                {loading ? (
                  <Spinner />
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

            <Link
              to='/signin'
              className='block text-center mt-2 text-purple-400 hover:text-purple-600 font-semibold transition duration-300'
              aria-label='Navigate to sign in page'
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

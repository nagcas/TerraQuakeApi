import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ImSpinner9 } from 'react-icons/im';
import axios from '@config/axios.js';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MetaData from '@pages/noPage/metaData';
import BackToTopButton from '@/components/utils/backToTopButton';

export default function SignUp() {
  const [loading, setLoading] = useState(false);

  const signUpSchema = yup
    .object({
      name: yup.string().required('Name is required!'),

      email: yup
        .string()
        .email('Invalid email!')
        .required('Email is required!'),

      password: yup
        .string()
        .required('Password is required!')
        .min(8, 'Password must be at least 8 characters!')
        .matches(/[A-Z]/, 'Must contain an uppercase letter!')
        .matches(/\d/, 'Must contain a number!')
        .matches(
          /[^A-Za-z0-9]/,
          'Password must contain at least one special character!'
        ),

      confirmPassword: yup
        .string()
        .required('Please confirm your password!')
        .oneOf([yup.ref('password')], 'Passwords must match!'),

      terms: yup
        .bool()
        .oneOf([true], 'You must accept the Terms and Conditions!'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });

  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSignUp = (data) => {
    setLoading(true);

    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'user',
      terms: data.terms,
    };
    axios
      .post('auth/signup', formData)
      .then((res) => {
        Swal.fire({
          title: 'Success!',
          text: `${res.data.message}`,
          icon: 'success',
          confirmButtonText: 'Log In',
        }).then(() => {
          navigate('/signin', { replace: true });
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
          setLoading(false);
          navigate('/signup', { replace: true });
        });
      });
  };

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Sign Up | TerraQuake API - Create Your Account'
        description='Sign up for TerraQuake API to start accessing real-time earthquake monitoring, seismic data, and powerful API tools for developers and researchers.'
        ogTitle='Sign Up | TerraQuake API'
        ogDescription='Create your TerraQuake API account to access earthquake data, API integrations, and advanced monitoring tools.'
        twitterTitle='Sign Up | TerraQuake API'
        twitterDescription='Join TerraQuake API today and gain access to earthquake monitoring data, API tools, and developer resources.'
        keywords='Sign up TerraQuake API, register earthquake API, create account earthquake monitoring, earthquake API access'
      />
      {/* SEO Stuff */}

      {/* Background Gradient/Mesh (for a classy, dark theme) */}
      <div className='absolute inset-0 z-0'>
        <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
        <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
      </div>

      <section className='relative z-30 min-h-screen flex items-center justify-center p-6 rounded-lg'>
        <div className='rounded-lg w-full max-w-md'>
          <div className='flex flex-col justify-center items-center mb-16'>
            <h1 className='text-3xl md:text-5xl text-white/80 font-extrabold text-center tracking-tight mb-4 animate-fade-in mt-12'>
              Create account
              <div className='h-1 w-2/4 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 mx-auto my-2 rounded-full' />
            </h1>

            {/* Description */}
            <p className='mt-16 text-white text-center text-lg w-[95%] lg:w-2xl'>
              Create your TerraQuake account to start exploring real seismic
              events, customize your experience, and join our interactive
              training platform.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className='mb-8'>
              <label className='block text-white text-sm font-semibold mb-2'>
                Name
              </label>
              <input
                className='w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none'
                name='name'
                autoComplete='off'
                {...register('name')}
              />
              <p className='text-red-600 pt-1'>{errors.name?.message}</p>
            </div>
            <div className='mb-6'>
              <label className='block text-white text-sm font-semibold mb-2'>
                Email
              </label>
              <input
                className='w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none'
                name='email'
                autoComplete='off'
                {...register('email')}
              />
              <p className='text-red-600 pt-1'>{errors.email?.message}</p>
            </div>
            <div className='relative mb-6'>
              <label className='block text-white text-sm font-semibold mb-2'>
                Password
              </label>
              <input
                className='w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none'
                name='password'
                autoComplete='off'
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
              />
              <p className='text-red-600 pt-1'>{errors.password?.message}</p>
              <button
                type='button'
                onClick={togglePassword}
                className='absolute top-10 right-3 text-gray-300 hover:text-purple-400 cursor-pointer'
                aria-label='Toggle password view'
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

              <div className='relative my-6'>
                <label className='block text-white text-sm font-semibold mb-2'>
                  Confirm Password
                </label>
                <input
                  className='w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none'
                  name='password'
                  autoComplete='off'
                  {...register('confirmPassword')}
                  type={showPassword ? 'text' : 'password'}
                />
                <p className='text-red-600 pt-1'>
                  {errors.confirmPassword?.message}
                </p>
                <button
                  type='button'
                  onClick={togglePassword}
                  className='absolute top-10 right-3 text-gray-300 hover:text-purple-400 cursor-pointer'
                  aria-label='Toggle password view'
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className='relative my-6 flex items-start'>
                <input
                  type='checkbox'
                  id='terms'
                  {...register('terms', {
                    required: 'You must accept the Terms and Conditions!',
                  })}
                  className='mt-1 w-5 h-5 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500'
                />
                <label
                  htmlFor='terms'
                  className='mt-1 ml-4 text-sm text-white cursor-pointer select-none'
                >
                  I accept the{' '}
                  <Link
                    to='/terms-and-conditions'
                    className='text-purple-400 hover:underline'
                    aria-label='Navigate to terms and conditions page'
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              <p className='text-red-600 pt-1'>{errors.terms?.message}</p>
            </div>
            <button
              className='w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 px-4 rounded-2xl hover:scale-105 transform transition duration-300 cursor-pointer'
              type='submit'
              aria-label='Click to create a new account'
            >
              {loading ? (
                <p className='text-white'>
                  <ImSpinner9 className='text-2xl mx-auto spinner' />
                </p>
              ) : (
                <span>Create your account</span>
              )}
            </button>
            <div className='mt-6 flex flex-col items-center'>
              <p className='text-gray-200 text-sm cursor-default'>
                Already have an account?
              </p>
              <Link
                to='/signin'
                className='mt-2 text-purple-400 hover:text-purple-600 font-semibold transition duration-300'
                aria-label='Navigate to sign in page'
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}

import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import { ImSpinner9 } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '@components/modules/context';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from '@config/axios.js';
import MetaData from '@pages/noPage/metaData';
import BackToTopButton from '@/components/utils/backToTopButton';

export default function SignIn() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginSchema = yup
    .object({
      email: yup
        .string()
        .email('Invalid email !')
        .required('Email is required !'),

      password: yup.string().required('Password is required !'),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const [showPassword, setShowPassword] = useState(false);
  const { userLogin, setUserLogin, isLoggedIn, setIsLoggedIn } =
    useContext(Context);

  const handleLoginSubmit = (data) => {
    setLoading(true);

    const formData = {
      email: data.email,
      password: data.password,
    };

    axios
      .post('/auth/signin', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setUserLogin(res.data.user);
        setIsLoggedIn(true);

        // optional: store user data in localStorage. Will change it later to cookies
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        //optional: store user data in localStorage. Will change it later to cookies

        Swal.fire({
          title: 'Success!',
          text: `${res.data.message}`,
          icon: 'success',
          confirmButtonText: 'Profile',
        }).then(() => {
          setLoading(false);
          navigate('/profile', { replace: true }); // navigate to profile page
        });
      })
      .catch((err) => {
        const errorMessage =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          'Login failed. Please try again.';

        Swal.fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Ok',
        }).then(() => {
          navigate('/signin');
          setLoading(false);
        });
      });
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSocialLogin = (type) => {
    if (type === 'github') {
      window.location.href = `${import.meta.env.VITE_URL_BACKEND}/auth/github`;
    }
  };

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Sign In | TerraQuake API - Secure Access to Earthquake Data'
        description='Sign in to your TerraQuake API account to access real-time earthquake monitoring, seismic data, and powerful API tools.'
        ogTitle='Sign In | TerraQuake API'
        ogDescription='Log in securely to TerraQuake API and gain access to earthquake monitoring data and API tools for developers, researchers, and organizations.'
        twitterTitle='Sign In | TerraQuake API'
        twitterDescription='Access your TerraQuake API account to manage earthquake data and API settings securely.'
        keywords='Sign in TerraQuake API, login earthquake API, secure API access, earthquake monitoring'
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
              Sign In
              <div className='h-1 w-2/4 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 mx-auto my-2 rounded-full' />
            </h1>

            {/* Description */}
            <p className='mt-16 text-white text-center text-lg w-[95%] lg:w-2xl'>
              Access your TerraQuake account to explore real seismic data,
              manage your preferences, and engage with our training environment.
            </p>
          </div>
          <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <div className='mb-8'>
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
            <div className='relative mb-8'>
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
                className='absolute top-10 right-3 text-gray-800 hover:text-purple-600 cursor-pointer'
                aria-label='Toggle password view'
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {/* Forgot Password link immediately below the password input */}
              <div className='mt-2 text-right'>
                <Link
                  to='/forgot-password'
                  className='text-sm text-purple-400 hover:text-purple-600 transition duration-300'
                  aria-label='Navigate to forgot password page'
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button
              className='w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 px-4 rounded-2xl hover:scale-105 transform transition duration-300 cursor-pointer'
              type='submit'
              aria-label='Login button'
            >
              {loading ? (
                <p className='text-white'>
                  <ImSpinner9 className='text-2xl mx-auto spinner' />
                </p>
              ) : (
                <span>Login</span>
              )}
            </button>
            {/* Divider */}
            <div className='flex items-center my-8'>
              <div className='flex-grow border-t border-gray-400'></div>
              <span className='mx-4 text-white text-sm'>
                Or sign in through
              </span>
              <div className='flex-grow border-t border-gray-400'></div>
            </div>

            <div className='flex justify-center gap-4 mb-9'>
              <button
                type='button'
                className='text-white bg-purple-600 hover:bg-purple-800 p-2 rounded-full cursor-pointer'
                onClick={() => handleSocialLogin('google')}
                aria-label='Login google button'
              >
                <FaGoogle className='w-5 h-5' />
              </button>

              <button
                type='button'
                className='text-white bg-purple-600 hover:bg-purple-800 p-2 rounded-full cursor-pointer'
                onClick={() => handleSocialLogin('github')}
                aria-label='Login github button'
              >
                <FaGithub className='w-5 h-5' />
              </button>
            </div>
            <div className='mt-6 flex flex-col items-center'>
              <p className='text-gray-200 text-sm cursor-default'>
                Don’t have an account yet?
              </p>
              <Link
                to='/signup'
                className='mt-2 text-purple-400 hover:text-purple-600 font-semibold transition duration-300'
                aria-label='Navigate to sign up page'
              >
                Create Account
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

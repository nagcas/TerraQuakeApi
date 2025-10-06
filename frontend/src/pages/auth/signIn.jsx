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
import { motion } from 'framer-motion';
import { FaDiscord } from 'react-icons/fa6';

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

  const contactInfo = [
    {
      icon: <FaDiscord className='text-2xl' />,
      title: 'Discord',
      detail: 'Chat with developers and contribute to TerraQuake API together!',
      href: 'https://discord.gg/RDBp8KJB',
      target: '_blanck',
    },
  ];

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

      <motion.section
        className='relative z-0 w-full min-h-screen pt-24 pb-12 overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Gradient/Mesh (for a classy, dark theme) */}
        <div className='absolute inset-0 z-0'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>

        <div className='relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12'>
          {/* Header Section */}
          <motion.div
            className='mb-16 text-center lg:text-left'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className='text-3xl md:text-5xl text-white font-extrabold tracking-tighter mb-4'>
              Sign In.
              <div className='h-0.5 w-1/5 md:w-1/10 mx-auto md:mx-0 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-white/70 max-w-3xl lg:mx-0 mx-auto'>
              Access your TerraQuake account to explore real seismic data,
              manage your preferences, and engage with our training environment.
            </p>
          </motion.div>

          {/* Main Content: Split Layout */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
            {/* Left Column: Form Section */}
            <motion.div
              className='lg:col-span-2 p-8 md:p-12 border border-white/5 bg-white/[0.03] rounded-3xl shadow-2xl'
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className='text-3xl font-bold text-white mb-8 border-b border-purple-500/50 pb-3'>
                Login
              </h2>

              <form onSubmit={handleSubmit(handleLoginSubmit)}>
                <div className='mb-8'>
                  <label className='block text-white text-sm font-semibold mb-2'>
                    Email
                  </label>
                  <input
                    className='w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50'
                    name='email'
                    placeholder='name@company.com'
                    autoComplete='off'
                    {...register('email')}
                  />
                  <p className='text-red-400 text-xs pt-1'>
                    {errors.email?.message}
                  </p>
                </div>
                <div className='relative mb-8'>
                  <label className='block text-white text-sm font-semibold mb-2'>
                    Password
                  </label>
                  <input
                    className='w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50'
                    name='password'
                    autoComplete='off'
                    placeholder='Your password'
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <p className='text-red-400 text-xs pt-1'>
                    {errors.password?.message}
                  </p>
                  <button
                    type='button'
                    onClick={togglePassword}
                    className='absolute top-11 right-5 text-gray-800 hover:text-purple-600 cursor-pointer'
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

                {/* Submit Button */}
                <button
                  className='
                    mt-8
                    w-full
                    bg-gradient-to-r from-purple-600 to-pink-500 
                  text-white font-semibold 
                    py-4 px-6 rounded-full
                    hover:scale-[1.01] hover:shadow-xl
                    active:scale-[0.99]
                    transform transition-all duration-300 ease-in-out
                    flex items-center justify-center gap-2
                    cursor-pointer
                  '
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
            </motion.div>

            {/* Right Column: Other Ways to Connect */}
            <motion.div
              className='lg:col-span-1 p-8 md:p-12 bg-purple-600/10 border-2 border-purple-500/30 rounded-3xl shadow-inner-xl flex flex-col justify-between'
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div>
                <h2 className='text-3xl font-bold text-purple-400 mb-6'>
                  Other Channels
                </h2>
                <p className='text-white/80 mb-8'>
                  For immediate support or specific inquiries, you might find
                  these direct channels more suitable.
                </p>

                <div className='space-y-6'>
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      target={item.target}
                      className='flex items-start p-4 bg-gray-900/40 rounded-xl hover:bg-gray-700/50 transition duration-200 group'
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    >
                      <div className='text-purple-400 group-hover:text-pink-400 transition-colors mr-4 mt-1'>
                        {item.icon}
                      </div>
                      <div>
                        <p className='text-lg font-semibold text-white group-hover:underline'>
                          {item.title}
                        </p>
                        <p className='text-sm text-white/60'>{item.detail}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Optional: Add a subtle logo or API tagline here */}
              <div className='mt-10 pt-6 border-t border-purple-500/50'>
                <p className='text-sm text-white/50 italic'>
                  Powered by TerraQuake API
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Floating Back-to-Top Button Component */}
        <BackToTopButton />
      </motion.section>
    </>
  );
}

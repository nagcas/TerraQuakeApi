import { useContext, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from '@config/Axios.js';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MetaData from '@pages/noPage/MetaData';
import BackToTopButton from '@/components/utils/BackToTopButton';
import { motion } from 'framer-motion';
import Channels from '@/components/channels/Channels';
import Spinner from '@/components/spinner/Spinner';
import { Context } from '@components/modules/Context';
import LoginSocial from '@/components/utils/LoginSocial';

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const { setUserLogin, isLoggedIn, setIsLoggedIn } = useContext(Context);

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

      experience: yup.string().required('Experience is required!'),

      student: yup.string().required('Please select if you are a student!'),

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
      experience: data.experience,
      student: data.student,
      terms: data.terms,
    };

    axios
      .post('auth/signup', formData)
      .then(async (res) => {
        // After successful sign-up, automatically sign the user in
        try {
          const response = await axios.post('/auth/signin', {
            email: data.email,
            password: data.password,
          }, {
            headers: { 'Content-Type': 'application/json' },
          });

          const { payload } = response.data;

          setUserLogin(payload);
          setIsLoggedIn(true);
          localStorage.setItem('user', JSON.stringify(payload));
          localStorage.setItem('token', response.data.token);

          Swal.fire({
            title: 'Welcome!',
            text: 'Your account was created and you are now logged in.',
            icon: 'success',
            confirmButtonText: 'Go to Profile',
          }).then(() => {
            setLoading(false);
            navigate('/profile', { replace: true });
          });
        } catch (loginErr) {
          // If auto-login fails, fall back to manual login screen with message
          const errorMessage =
            loginErr?.response?.data?.message ||
            loginErr?.response?.data?.error ||
            'Account created, but automatic login failed. Please sign in.';

          Swal.fire({
            title: 'Almost there!',
            text: errorMessage,
            icon: 'warning',
            confirmButtonText: 'Sign In',
          }).then(() => {
            setLoading(false);
            navigate('/signin', { replace: true });
          });
        }
      })
      .catch((error) => {
        // Build a reliable error message from several possible shapes
        const errorMessage =
          error?.response?.data?.message || // your handleHttpError -> message
          error?.response?.data?.errors?.[0]?.msg || // express-validator array
          error?.response?.data?.error || // fallback
          error?.message || // axios/node error message
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

  // If the user is already logged in, redirect them to their profile page
  // This prevents authenticated users from accessing the Sign In or Sign Up pages
  // The "replace: true" option removes the current route from the history stack
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile', { replace: true });
    }
  }, [isLoggedIn, navigate]);

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
            <h1 className='text-3xl text-center md:text-5xl text-white font-extrabold tracking-tighter mb-4'>
              Create account.
              <div className='h-0.5 w-1/3 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-center md:text-left text-white/70 max-w-7xl'>
              Create your TerraQuake account to start exploring real seismic
              events, customize your experience, and join our interactive
              training platform.
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
                Register
              </h2>

              <form onSubmit={handleSubmit(handleSignUp)}>
                <div className='mb-8'>
                  <label className='block text-white text-sm font-semibold mb-2'>
                    Name
                  </label>
                  <input
                    className='w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50'
                    name='name'
                    placeholder='Your name'
                    autoComplete='off'
                    {...register('name')}
                  />
                  <p className='text-red-400 text-xs pt-1'>
                    {errors.name?.message}
                  </p>
                </div>
                <div className='mb-6'>
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
                <div className='relative mb-6'>
                  <label className='block text-white text-sm font-semibold mb-2'>
                    Password
                  </label>
                  <input
                    className='w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50'
                    name='password'
                    placeholder='Your password'
                    autoComplete='off'
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <p className='text-red-400 text-xs pt-1'>
                    {errors.password?.message}
                  </p>
                  <button
                    type='button'
                    onClick={togglePassword}
                    className='absolute top-12 right-3 text-gray-300 hover:text-purple-400 cursor-pointer'
                    aria-label='Toggle password view'
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>

                  <div className='relative my-6'>
                    <label className='block text-white text-sm font-semibold mb-2'>
                      Confirm Password
                    </label>
                    <input
                      className='w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50'
                      name='password'
                      placeholder='Confirm your password'
                      autoComplete='off'
                      {...register('confirmPassword')}
                      type={showPassword ? 'text' : 'password'}
                    />
                    <p className='text-red-400 text-xs pt-1'>
                      {errors.confirmPassword?.message}
                    </p>
                    <button
                      type='button'
                      onClick={togglePassword}
                      className='absolute top-12 right-3 text-gray-300 hover:text-purple-400 cursor-pointer'
                      aria-label='Toggle password view'
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  <div className='relative my-6'>
                    <label className='block text-white text-sm font-semibold mb-2'>
                      Experience
                    </label>
                    <select
                      defaultValue=''
                      className='w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50 cursor-pointer'
                      {...register('experience')}
                    >
                      <option
                        value=''
                        disabled
                        className='bg-gray-900 text-gray-400'
                      >
                        Select an option
                      </option>
                      <option
                        value='Beginner'
                        className='bg-gray-900 text-gray-400'
                      >
                        Beginner
                      </option>
                      <option
                        value='Intermediate'
                        className='bg-gray-900 text-gray-400'
                      >
                        Intermediate
                      </option>
                      <option
                        value='Expert'
                        className='bg-gray-900 text-gray-400'
                      >
                        Expert
                      </option>
                    </select>
                  </div>

                  <div className='relative my-6'>
                    <label className='block text-white text-sm font-semibold mb-2'>
                      Student
                    </label>
                    <select
                      defaultValue=''
                      className='w-full px-5 py-3 border-2 rounded-xl  bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50 cursor-pointer'
                      {...register('student')}
                    >
                      <option
                        value=''
                        disabled
                        className='bg-gray-900 text-gray-400'
                      >
                        Select an option
                      </option>
                      <option
                        value='Yes'
                        className='bg-gray-900 text-gray-400'
                      >
                        Yes
                      </option>
                      <option
                        value='No'
                        className='bg-gray-900 text-gray-400'
                      >
                        No
                      </option>
                    </select>
                  </div>

                  <div className='relative my-6 flex items-start'>
                    <input
                      type='checkbox'
                      id='terms'
                      {...register('terms', {
                        required: 'You must accept the Terms and Conditions!',
                      })}
                      className='mt-1 w-6 h-6 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 cursor-pointer'
                    />
                    <label
                      htmlFor='terms'
                      className='mt-1.5 ml-4 text-sm text-white cursor-pointer select-none'
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
                  <p className='text-red-400 text-xs pt-1'>
                    {errors.terms?.message}
                  </p>
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
                  aria-label='Click to create a new account'
                  disabled={loading}
                >
                  {loading ? (
                    <p className='text-white'>
                      <Spinner />
                    </p>
                  ) : (
                    <span>Create your account</span>
                  )}
                </button>
            
                {/* Social Buttons */}
                <LoginSocial setLoading={setLoading} />
            
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
            </motion.div>

            

            {/* Right Column: Other channels */}
            <Channels />
          </div>
        </div>
      </motion.section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}

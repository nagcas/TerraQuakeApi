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
        .required('Password is required !')
        .min(8, 'Password must be at least 8 characters !')
        .matches(/[A-Z]/, 'Must contain an uppercase letter !')
        .matches(/\d/, 'Must contain a number !'),

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
          navigate('/signin');
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
      <MetaData
        title='Sign Up'
        description='Sign Up Page of TerraQuake'
      />
      <section className='min-h-screen flex items-center justify-center p-6 rounded-lg'>
        <div className='p-8 rounded-lg w-full max-w-md'>
          <h2 className='text-3xl text-center text-white font-bold mb-6'>
            Create account
          </h2>
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
    </>
  );
}
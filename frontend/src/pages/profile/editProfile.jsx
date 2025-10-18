import { Context } from '@/components/modules/context';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../noPage/metaData';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ImSpinner9 } from 'react-icons/im';
import Swal from 'sweetalert2';

export default function EditProfile({ setEditProfile }) {
  // Get user context and login state
  const { userLogin, setUserLogin, isLoggedIn, setIsLoggedIn } =
    useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const BACKEND_URL =
    import.meta.env.VITE_URL_BACKEND || 'http://localhost:5001';

  // Validation schema using Yup
  const updateUserSchema = yup.object({
    name: yup.string().required('Name is required!'),
    email: yup.string().email('Invalid email!').required('Email is required!'),
    experience: yup.string().required('Experience is required!'),
    student: yup.string().required('Please select if you are a student!'),
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateUserSchema),
  });

  // Reset form values whenever userLogin changes
  useEffect(() => {
    if (userLogin) {
      reset({
        name: userLogin.name || '',
        email: userLogin.email || '',
        experience: userLogin.experience || '',
        student: userLogin.student || 'No',
      });
    }
  }, [userLogin, reset]);

  // Handle form submission to update user data
  const handleUpdateUser = async (data) => {
    try {
      setLoading(true);

      // Retrieve token (e.g. from localStorage or context)
      const token = localStorage.getItem('token');

      // Send update request to backend
      const res = await axios.patch(`${BACKEND_URL}/users/me/update`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // send token in header
        },
      });

      const updatedUser = res.data.data;

      // Update Context and localStorage
      setUserLogin(updatedUser);
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsLoggedIn(true);

      Swal.fire({
        title: 'Success!',
        text: 'Profile updated successfully.',
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      // Re-sync the form with new data
      reset(updatedUser);
      setEditProfile(false);
    } catch (err) {
      // Extract and display error message from backend or network
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.[0]?.msg ||
        err?.response?.data?.error ||
        err?.message ||
        'An error occurred. Please try again.';

      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Update Profile | TerraQuake API - Manage Your Account'
        description='Update your TerraQuake API profile information including username, experience, and account details to keep your developer profile up to date.'
        ogTitle='Update Profile | TerraQuake API'
        ogDescription='Manage and update your TerraQuake API account information. Keep your developer profile current for seamless access to earthquake data and API tools.'
        twitterTitle='Update Profile | TerraQuake API'
        twitterDescription='Edit your TerraQuake API profile to stay updated with your latest information and maintain access to real-time earthquake monitoring tools.'
        keywords='update profile TerraQuake API, edit account earthquake API, manage user profile TerraQuake, update developer account TerraQuake API'
      />
      {/* SEO Stuff */}

      {/* Main animated container */}
      <motion.section
        className='col-span-1 lg:col-span-2 bg-black/30 backdrop-blur-xl border border-pink-500/10 rounded-2xl shadow-lg p-6 sm:p-8 mt-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {isLoggedIn ? (
          // User is logged in → Show profile form
          <div className='w-full max-w-5xl mx-auto'>
            {/* Title */}
            <motion.div
              className='mb-12 text-center'
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1 className='text-3xl md:text-5xl font-extrabold text-white mb-4'>
                Edit your Profile
              </h1>
              <div className='h-0.5 w-1/3 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
              <p className='text-xl text-left text-white/70 max-w-7xl'>
                In the Edit Profile section, you can update your personal
                information such as your name, email, experience, and whether
                you’re a student.
              </p>
            </motion.div>

            {/* Form container */}
            <motion.div
              className='p-6 sm:p-10 lg:p-14 border border-white/10 bg-white/[0.03] rounded-3xl shadow-2xl backdrop-blur-sm'
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form
                className='space-y-8'
                onSubmit={handleSubmit(handleUpdateUser)}
              >
                {/* Name field */}
                <div>
                  <label className='block text-white text-sm font-semibold mb-2'>
                    Update Name
                  </label>
                  <input
                    className='w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50'
                    placeholder='Your name'
                    autoComplete='off'
                    {...register('name')}
                  />
                  <p className='text-red-400 text-xs pt-1'>
                    {errors.name?.message}
                  </p>
                </div>

                {/* Email field */}
                <div>
                  <label className='block text-white text-sm font-semibold mb-2'>
                    Update Email
                  </label>
                  <input
                    className='w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50'
                    placeholder='name@company.com'
                    autoComplete='off'
                    {...register('email')}
                  />
                  <p className='text-red-400 text-xs pt-1'>
                    {errors.email?.message}
                  </p>
                </div>

                {/* Experience field */}
                <div>
                  <label className='block text-white text-sm font-semibold mb-2'>
                    Experience
                  </label>
                  <select
                    className='w-full px-5 py-3 border-2 rounded-xl bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50'
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
                  <p className='text-red-400 text-xs pt-1'>
                    {errors.experience?.message}
                  </p>
                </div>

                {/* Student field */}
                <div>
                  <label className='block text-white text-sm font-semibold mb-2'>
                    Student
                  </label>
                  <select
                    className='w-full px-5 py-3 border-2 rounded-xl bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50'
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
                  <p className='text-red-400 text-xs pt-1'>
                    {errors.student?.message}
                  </p>
                </div>

                {/* Submit button */}
                <button
                  type='submit'
                  disabled={loading}
                  aria-label='Save Changes'
                  className='w-full mt-10 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-4 px-6 rounded-full hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-transform duration-300 ease-in-out cursor-pointer disabled:opacity-60'
                >
                  {loading ? (
                    <ImSpinner9 className='text-2xl mx-auto animate-spin' />
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        ) : (
          // If user is not logged in → show sign-in/sign-up options
          <div className='flex flex-col items-center gap-6 max-w-2xl text-center'>
            <p className='text-lg md:text-xl text-gray-300'>
              To edit your profile page, you need to be registered.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 mt-4'>
              <button
                onClick={() => navigate('/signin')}
                className='py-3 px-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer'
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className='py-3 px-8 rounded-full bg-gradient-to-r from-pink-600 to-purple-700 text-white font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer'
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </motion.section>
    </>
  );
}

import { Context } from '@/components/modules/Context';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../noPage/MetaData';
import { motion } from 'framer-motion';
import axios from '@config/Axios.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import Spinner from '@/components/spinner/Spinner';
import AccessRestricted from '@/components/accessRestricted/AccessRestricted';

export default function UpdateReview({
  reviewId,
  review,
  setUpdateReview,
  setReview,
  refetchTestimonials,
}) {
  // Get user context and login state
  const { userLogin, isLoggedIn } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Validation schema using Yup
  const updateReviewSchema = yup.object({
    name: yup.string().required('Name is required!'),
    email: yup.string().email('Invalid email!').required('Email is required!'),
    role: yup.string().required('Role is required!'),
    message: yup.string().required('Message is required!'),
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateReviewSchema),
  });

  // Reset form values whenever userLogin changes
  useEffect(() => {
    if (userLogin) {
      reset({
        name: review.name || '',
        email: review.email || '',
        role: review.role || '',
        message: review.message || '',
      });
    }
  }, [userLogin, reset]);

  // Handle form submission to update user data
  const handleUpdateReview = async (data) => {
    try {
      setLoading(true);

      // Retrieve token (e.g. from localStorage or context)
      const token = localStorage.getItem('token');

      const payloadReview = {
        ...data,
        userId: userLogin?._id || null,
        avatar: userLogin?.avatar || null,
      };

      // Send update request to backend
      const response = await axios.patch(
        `/testimonials/update-review/${reviewId}`,
        payloadReview,
        {
          headers: {
            Authorization: `Bearer ${token}`, // send token in header
          },
        }
      );

      const { payload } = response.data;
      const updateReview = payload?.testimonials || payload;

      Swal.fire({
        title: 'Success!',
        text: 'Your review has been updated successfully. Thank you for your contribution!',
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      // Re-sync the form with new data
      reset(updateReview);
      setUpdateReview(false);
      setReview((prev) => ({ ...prev, ...updateReview }));
      await refetchTestimonials();
    } catch (error) {
      // Extract and display error message from backend or network
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.error ||
        error?.message ||
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

  if (!isLoggedIn) {
    return <AccessRestricted />;
  }

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Update Review | TerraQuake API - Edit Your Testimonial'
        description='Update your existing review about TerraQuake API. Share refined insights on performance, reliability, and integration based on your experience.'
        ogTitle='Update Review | TerraQuake API'
        ogDescription='Edit your TerraQuake API testimonial and help developers, researchers, and professionals understand your updated experience.'
        twitterTitle='Update Review | TerraQuake API'
        twitterDescription='Refine and update your feedback on TerraQuake API to reflect your latest experience with seismic data tools and API integration.'
        keywords='TerraQuake API review update, edit review TerraQuake API, update testimonial TerraQuake, seismic API feedback, developer experience TerraQuake'
      />
      {/* SEO Stuff */}

      {/* Main animated container */}
      <motion.section
        className='col-span-1 lg:col-span-2 bg-black/30 border border-pink-500/10 rounded-2xl shadow-lg p-6 sm:p-8 mt-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* User is logged in → Show profile form */}
        <div className='w-full max-w-5xl mx-auto'>
          {/* Title */}
          <motion.div
            className='mb-12 text-center'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className='text-3xl md:text-5xl font-extrabold text-white mb-4'>
              Update a Review
            </h2>
            <div className='h-0.5 w-1/3 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            <p className='text-xl text-left text-white/70 max-w-7xl'>
              Share your experience with TerraQuake API. Your feedback helps
              developers, researchers, and professionals understand the real
              value of the platform.
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
              onSubmit={handleSubmit(handleUpdateReview)}
            >
              {[
                {
                  label: 'Your full name',
                  field: 'name',
                  text: 'Your full name',
                },
                { label: 'Email', field: 'email', text: 'name@company.com' },
                {
                  label: 'Your professional role',
                  field: 'role',
                  text: 'Your professional role (e.g. Researcher, Developer, Geologist)',
                },
              ].map(({ label, field, text }) => (
                <div key={label}>
                  <label className='block text-white text-sm font-semibold mb-2'>
                    {label}
                  </label>
                  <input
                    className='w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50'
                    placeholder={text}
                    autoComplete='off'
                    {...register(field)}
                  />
                  <p className='text-red-400 text-xs pt-1'>
                    {errors[field]?.message}
                  </p>
                </div>
              ))}

              {/* Review field */}
              <div>
                <label className='block text-white text-sm font-semibold mb-2'>
                  Review
                </label>
                <textarea
                  className='w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50'
                  placeholder='Write your review here...'
                  autoComplete='off'
                  rows={4}
                  {...register('message')}
                />
                <p className='text-red-400 text-xs pt-1'>
                    {errors.message?.message}
                  </p>
              </div>

              {/* Submit button */}
              <button
                type='submit'
                disabled={loading}
                aria-label='Save Changes'
                className='w-full mt-10 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-4 px-6 rounded-full hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-transform duration-300 ease-in-out cursor-pointer disabled:opacity-60'
              >
                {loading ? <Spinner /> : 'Update Review'}
              </button>
            </form>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}

import { Context } from '@/components/modules/Context';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../noPage/MetaData';
import { motion } from 'framer-motion';
import api from '@config/Axios.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import Spinner from '@/components/spinner/Spinner';
import AccessRestricted from '@/components/accessRestricted/AccessRestricted';
import { useTranslation } from 'react-i18next';

export default function CreateReview({ setCreateReview }) {
  const { t } = useTranslation('translation');

  // Get user context and login state
  const { userLogin, isLoggedIn } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Validation schema using Yup
  const createReviewSchema = yup.object({
    name: yup.string().required(t('create_review.name')),
    email: yup.string().email(t('create_review.email')).required(t('create_review.email_required')),
    role: yup.string().required(t('create_review.role_required')),
    message: yup.string().required(t('create_review.message_required')),
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createReviewSchema),
  });

  // Reset form values whenever userLogin changes
  useEffect(() => {
    if (userLogin) {
      reset({
        name: userLogin?.name || '',
        email: userLogin?.email || '',
      });
    }
  }, [userLogin, reset]);

  // Handle form submission to update user data
  const handleCreateReview = async (data) => {
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
      const response = await api.post(
        `/testimonials`,
        payloadReview,
        {
          headers: {
            Authorization: `Bearer ${token}`, // send token in header
          },
        }
      );

      const { payload } = response.data;
      const createReview = payload?.testimonials || payload;

      Swal.fire({
        title: t('create_review.success'),
        text: t('create_review.text_review_success'),
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      // Re-sync the form with new data
      reset(createReview);
      setCreateReview(false);
    } catch (error) {
      // Extract and display error message from backend or network
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.error ||
        error?.message ||
        t('create_review.error_review');

      Swal.fire({
        title: t('create_review.error'),
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
        title='Leave a Review | TerraQuake API - User Feedback'
        description='Share your experience with TerraQuake API. Help developers, researchers, and professionals understand performance, reliability, and integration in real-world projects.'
        ogTitle='Leave a Review | TerraQuake API'
        ogDescription='Submit your testimonial and contribute to the community of developers and researchers using TerraQuake API for seismic monitoring and analysis.'
        twitterTitle='Leave a Review | TerraQuake API'
        twitterDescription='Share your feedback and tell others about your experience using TerraQuake API in research, development, or professional workflows.'
        keywords='TerraQuake API review, submit testimonial TerraQuake, seismic data API feedback, developer experience TerraQuake, professional experience TerraQuake API'
      />
      {/* SEO Stuff */}

      {/* Main animated container */}
      <motion.section
        className='col-span-1 lg:col-span-2 bg-black/30 border border-pink-500/10 rounded-2xl shadow-lg p-6 sm:p-8 mt-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <>
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
                {t('create_review.title_review')}
              </h2>
              <div className='h-0.5 w-1/3 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
              <p className='text-xl text-left text-white/70 max-w-7xl'>
                {t('create_review.content_review')}
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
                onSubmit={handleSubmit(handleCreateReview)}
              >
                {[
                  { 
                    label: t('create_review.label_full_name'), 
                    field: 'name', 
                    text: t('create_review.text_name') 
                  },
                  { 
                    label: t('create_review.label_email'), 
                    field: 'email', 
                    text: 'name@company.com' },
                  { 
                    label: t('create_review.label_role'), 
                    field: 'role', 
                    text: t('create_review.text_role') 
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
                    {t('create_review.review')}
                  </label>
                  <textarea
                    className='w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50'
                    placeholder={t('create_review.write_review')}
                    autoComplete='off'
                    rows={4}
                    {...register('message')}
                  />
                  <p className='text-red-400 text-xs pt-1'>
                    {errors['message']?.message}
                  </p>
                </div>

                {/* Submit button */}
                <button
                  type='submit'
                  disabled={loading}
                  aria-label='Save Changes'
                  className='w-full mt-10 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-4 px-6 rounded-full hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] transition-transform duration-300 ease-in-out cursor-pointer disabled:opacity-60'
                >
                  {loading ? <Spinner /> : t('create_review.submit_review')}
                </button>
              </form>
            </motion.div>
          </div>
        </>
      </motion.section>
    </>
  );
}

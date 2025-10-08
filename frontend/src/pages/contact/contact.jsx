import React, { useState } from 'react';
import MetaData from '@pages/noPage/metaData';
import { ImSpinner9 } from 'react-icons/im';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import axios from '@config/axios.js';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// Import new icons for the 'Connect' section
import { FiGithub } from 'react-icons/fi';
import BackToTopButton from '@/components/utils/backToTopButton';

const contactSchema = yup.object({
  name: yup.string().required('Name is required!'),
  lastname: yup.string().required('Lastname is required!'),
  email: yup.string().email('Invalid email!').required('Email is required!'),
  subject: yup.string().required('Subject is required!'),
  message: yup.string().required('Message is required!'),
});

const InputField = ({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  errors,
  rows,
}) => {
  const isTextarea = rows > 0;
  const commonClasses =
    'w-full px-5 py-3 border-2 rounded-xl text-white bg-white/5 backdrop-blur-sm border-white/20 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 focus:outline-none transition-all duration-300 placeholder-white/50';

  return (
    <div className='relative z-10'>
      <label className='block text-white/90 text-sm font-medium mb-2 pl-1'>
        {label}
      </label>
      {isTextarea ? (
        <textarea
          placeholder={placeholder}
          {...register(name)}
          className={`${commonClasses} resize-none`}
          rows={rows}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className={commonClasses}
        />
      )}
      {errors[name] && (
        <motion.p
          className='text-red-400 text-xs mt-1 absolute -bottom-4 right-0 font-medium'
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {errors[name].message}
        </motion.p>
      )}
    </div>
  );
};

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const handleContact = async (data) => {
    setLoading(true);

    try {
      const res = await axios.post('/contact/create-contact', data);

      Swal.fire({
        title: 'Success!',
        text:
          res.data.message || "Message sent successfully! We'll be in touch.",
        icon: 'success',
        confirmButtonText: 'Great!',
        customClass: {
          container: 'z-50', // Ensure Swal is above other elements
        },
      }).then(() => {
        reset();
      });
    } catch (err) {
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
        confirmButtonText: 'Try Again',
        customClass: {
          container: 'z-50',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiGithub className='w-6 h-6' />,
      title: 'Open an Issue',
      detail: 'github.com/terraquake-api',
      href: 'https://github.com/nagcas/TerraQuakeApi',
      target: '_blank',
    },
  ];

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Contact | TerraQuake API - Professional Support'
        description='Connect with the TerraQuake API engineering and support teams. Dedicated channels for technical inquiries, partnerships, and seismic data collaboration.'
        ogTitle='Professional Contact | TerraQuake API'
        ogDescription='Dedicated support and contact channels for TerraQuake API users and partners.'
        twitterTitle='Contact TerraQuake API'
        twitterDescription='Get in touch for inquiries and support related to earthquake data and seismic safety.'
        keywords='TerraQuake API contact, professional support, seismic data inquiries, API collaboration'
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
              Let's Connect.
              <div className='h-0.5 w-1/3 md:w-1/5 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 my-2 rounded-full' />
            </h1>
            <p className='text-xl text-left text-white/70 max-w-7xl'>
              At TerraQuake API, we’re committed to making seismic data
              accessible and insightful. Whether you’re a researcher, developer,
              or enthusiast, your ideas and feedback help us improve the
              platform every day.
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
                Send a Direct Message
              </h2>

              <form
                onSubmit={handleSubmit(handleContact)}
                noValidate
                className='space-y-6'
              >
                {/* Name + Lastname */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  <InputField
                    label='First Name'
                    name='name'
                    placeholder='Your first name'
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label='Last Name'
                    name='lastname'
                    placeholder='Your last name'
                    register={register}
                    errors={errors}
                  />
                </div>

                {/* Email + Subject */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  <InputField
                    label='Work Email'
                    name='email'
                    type='email'
                    placeholder='name@company.com'
                    register={register}
                    errors={errors}
                  />
                  <InputField
                    label='Subject'
                    name='subject'
                    placeholder='Brief purpose of your message'
                    register={register}
                    errors={errors}
                  />
                </div>

                {/* Message */}
                <InputField
                  label='Message'
                  name='message'
                  placeholder='Detailed message...'
                  register={register}
                  errors={errors}
                  rows={6}
                />

                {/* Submit Button */}
                <motion.button
                  type='submit'
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
                  disabled={loading}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <>
                      <ImSpinner9 className='animate-spin' />
                      Processing Request...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
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
      </motion.section>
      {/* Floating Back-to-Top Button Component */}
      <BackToTopButton />
    </>
  );
}

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

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const contactSchema = yup.object({
    name: yup.string().required('Name is required!'),
    lastname: yup.string().required('Lastname is required!'),
    email: yup.string().email('Invalid email!').required('Email is required!'),
    subject: yup.string().required('Subject is required!'),
    message: yup.string().required('Message is required!'),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const handleContact = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post('/contact/create-contact', data);
      Swal.fire({
        title: '✅ Message Sent!',
        text: res.data.message || 'Your message has been delivered successfully!',
        icon: 'success',
        confirmButtonText: 'Awesome!',
      }).then(() => {
        reset();
        navigate('/');
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
        confirmButtonText: 'Ok',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex flex-col min-h-screen justify-center overflow-hidden bg-gradient-to-br from-black via-violet-950 to-purple-900">
      <MetaData
        title="Contact Us - TerraQuake API"
        description="Get in touch with the TerraQuake API team for support or inquiries."
        ogTitle="Contact Us - TerraQuake API"
        twitterTitle="Contact Us - TerraQuake API"
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Contact Us | TerraQuake API - Earthquake Monitoring Support'
        description='Reach out to the TerraQuake API team for inquiries, support, and collaboration opportunities. Your gateway to advanced earthquake monitoring and seismic data.'
        ogTitle='Contact Us | TerraQuake API - Earthquake Monitoring Support'
        ogDescription='Connect with TerraQuake API for support, questions, and collaboration on earthquake monitoring and seismic research.'
        twitterTitle='Contact Us | TerraQuake API - Earthquake Monitoring Support'
        twitterDescription='Get in touch with TerraQuake API for inquiries and support related to earthquake data and seismic safety.'
        keywords='TerraQuake API contact, earthquake monitoring support, seismic data inquiries, earthquake research collaboration'
      />
      {/* SEO Stuff */}

      {/* Decorative gradient blur effects */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600/30 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-600/20 blur-[100px] rounded-full animate-pulse delay-300" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="z-20 max-w-5xl mx-auto px-6 py-20"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 drop-shadow-lg">
          Get in Touch 💌
        </h1>
        <p className="text-gray-300 text-center mt-4 max-w-2xl mx-auto">
          Have a question, idea, or feedback? We’d love to hear from you!  
          Let’s build something amazing together with <span className="text-purple-400 font-semibold">TerraQuake API</span>.
        </p>

        {/* Contact Info Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl hover:shadow-purple-500/20 transition"
          >
            <h2 className="text-xl text-purple-300 font-semibold mb-4">Reach Us</h2>
            <p className="text-gray-300 mb-3">
              Email:{' '}
              <a
                href="mailto:support@terraquakeapi.com"
                className="text-indigo-400 hover:text-pink-400 transition"
              >
                support@terraquakeapi.com
              </a>
            </p>
            <p className="text-gray-300 mb-3">
              Twitter:{' '}
              <a
                href="https://twitter.com/terraquakeapi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-pink-400 transition"
              >
                @TerraQuakeAPI
              </a>
            </p>
            <p className="text-gray-300 mb-3">
              GitHub:{' '}
              <a
                href="https://github.com/nagcas/TerraQuakeApi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-pink-400 transition"
              >
                TerraQuakeApi Repo
              </a>
            </p>
            <p className="text-gray-400 mt-4 text-sm">
              We respect your privacy. Your info will never be shared. Read our{' '}
              <a href="/privacyPolicy" className="text-indigo-400 hover:text-pink-400 underline">
                Privacy Policy
              </a>
              .
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-xl hover:shadow-pink-500/20 transition"
          >
            <form onSubmit={handleSubmit(handleContact)} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {[{ label: 'Name', name: 'name' }, { label: 'Lastname', name: 'lastname' }].map(field => (
                  <div key={field.name}>
                    <label className="block text-gray-200 font-semibold mb-2">{field.label}</label>
                    <input
                      type="text"
                      {...register(field.name)}
                      className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                    {errors[field.name] && (
                      <p className="text-red-400 text-sm mt-1">{errors[field.name].message}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {[{ label: 'Email', name: 'email', type: 'email' }, { label: 'Subject', name: 'subject' }].map(field => (
                  <div key={field.name}>
                    <label className="block text-gray-200 font-semibold mb-2">{field.label}</label>
                    <input
                      type={field.type || 'text'}
                      {...register(field.name)}
                      className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                    />
                    {errors[field.name] && (
                      <p className="text-red-400 text-sm mt-1">{errors[field.name].message}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <label className="block text-gray-200 font-semibold mb-2">Message</label>
                <textarea
                  {...register('message')}
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                />
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:opacity-90 text-white font-bold py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <ImSpinner9 className="animate-spin" />
                    Sending...
                  </div>
                ) : (
                  'Send Message ✨'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
      <section className='relative z-30 w-full min-h-screen px-6 py-20'>
        {/* Header Section */}
        <div className='flex flex-col justify-center items-center mb-16'>
          <h1 className='text-3xl md:text-5xl text-white/80 font-extrabold text-center tracking-tight mb-4 animate-fade-in mt-12'>
            Contact Us
            <div className='h-1 w-2/4 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 mx-auto my-2 rounded-full' />
          </h1>

          {/* Description */}
          <p className='mt-16 text-white text-center text-lg w-[95%] lg:w-6xl'>
            We’re here to help you make the most of the TerraQuake API. Whether
            you have a question about our endpoints, need technical support, or
            want to share feedback, our team is ready to assist.
          </p>
        </div>

        <div className='w-full max-w-4xl mx-auto'>
          <form
            onSubmit={handleSubmit(handleContact)}
            noValidate
          >
            {/* Name + Lastname */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              {[
                { label: 'Name', name: 'name' },
                { label: 'Lastname', name: 'lastname' },
              ].map((field) => (
                <div key={field.name}>
                  <label className='block text-white text-sm font-semibold mb-2'>
                    {field.label}
                  </label>
                  <input
                    type='text'
                    {...register(field.name)}
                    className='w-full px-4 py-3 border rounded-2xl text-white bg-transparent focus:border-purple-600 focus:outline-none transition'
                  />
                  {errors[field.name] && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Email + Subject */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              {[
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Subject', name: 'subject' },
              ].map((field) => (
                <div key={field.name}>
                  <label className='block text-white text-sm font-semibold mb-2'>
                    {field.label}
                  </label>
                  <input
                    type={field.type || 'text'}
                    {...register(field.name)}
                    className='w-full px-4 py-3 border rounded-2xl text-white bg-transparent focus:border-purple-600 focus:outline-none transition'
                  />
                  {errors[field.name] && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors[field.name].message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Message */}
            <div className='mb-6'>
              <label className='block text-white text-sm font-semibold mb-2'>
                Message
              </label>
              <textarea
                {...register('message')}
                className='w-full px-4 py-3 border rounded-2xl text-white bg-transparent focus:border-purple-600 focus:outline-none transition'
                rows='6'
              />
              {errors.message && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='
                block 
                w-[200px]          /* base: mobile */
                sm:w-[250px]       /* small devices */
                md:w-[300px]       /* medium devices */
                lg:w-[350px]       /* large devices */
                xl:w-[400px]       /* extra large */
                mx-auto 
                bg-gradient-to-r from-pink-500 to-purple-600 
                text-white font-bold 
                py-3 px-4 
                rounded-full 
                hover:scale-105 
                transform transition duration-300 
                cursor-pointer
              '
              disabled={loading}
            >
              {loading ? (
                <div className='flex items-center justify-center gap-2'>
                  <ImSpinner9 className='animate-spin' />
                  Sending...
                </div>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

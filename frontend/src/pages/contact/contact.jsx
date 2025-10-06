import React, { useState } from 'react';
import MetaData from '@pages/noPage/metaData';
import { ImSpinner9 } from 'react-icons/im';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import axios from '@config/axios.js';
import { useNavigate } from 'react-router-dom';

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
        text: res.data.message || 'Message sent successfully!',
        icon: 'success',
        confirmButtonText: 'Ok',
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
    <section className='flex flex-col min-h-screen px-6 py-16 overflow-hidden justify-center'>
      <MetaData
        title='Contact Us - TerraQuake API'
        description='Get in touch with the TerraQuake API team for support or inquiries.'
        ogTitle='Contact Us - TerraQuake API'
        twitterTitle='Contact Us - TerraQuake API'
      />


      <section className='relative z-30 w-full min-h-screen px-6 py-20'>
        <h1 className='text-2xl md:text-4xl text-white font-extrabold text-center my-25 tracking-tight'>
          Contact TerraQuake API
        </h1>
        <div className='max-w-2xl mx-auto mt-10 bg-gradient-to-br from-white/5 to-violet-950/10 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg'>
          <p className='text-gray-300 text-lg mb-6'>
            We welcome your feedback, questions, and collaboration proposals! Reach out for support, to report issues, or to suggest new features for TerraQuake API.
          </p>
          <div className='mb-6'>
            <span className='block text-purple-400 font-semibold mb-2'>Email:</span>
            <a href='mailto:support@terraquakeapi.com' className='text-indigo-400 hover:text-purple-300 underline'>support@terraquakeapi.com</a>
          </div>
          <div className='mb-6'>
            <span className='block text-purple-400 font-semibold mb-2'>Social:</span>
            <a href='https://twitter.com/terraquakeapi' target='_blank' rel='noopener noreferrer' className='text-indigo-400 hover:text-purple-300 underline mr-4'>Twitter/X</a>
            <a href='https://github.com/nagcas/TerraQuakeApi' target='_blank' rel='noopener noreferrer' className='text-indigo-400 hover:text-purple-300 underline'>GitHub</a>
          </div>
          <div className='mb-6'>
            <span className='block text-purple-400 font-semibold mb-2'>Privacy:</span>
            <p className='text-gray-300'>Your contact information will be used solely for support and will not be shared. For details, see our <a href='/privacyPolicy' className='text-indigo-400 hover:text-purple-300 underline'>Privacy Policy</a>.</p>
          </div>
          <div>
            <span className='block text-purple-400 font-semibold mb-2'>Contribute:</span>
            <p className='text-gray-300'>Want to help improve TerraQuake API? Visit our <a href='https://github.com/nagcas/TerraQuakeApi' target='_blank' rel='noopener noreferrer' className='text-indigo-400 hover:text-purple-300 underline'>GitHub repository</a> to report issues or submit pull requests.</p>
          </div>
        </div>
      </section>
    </>

     
      <div className="h-28"></div>

      <div className='relative max-w-4xl mx-auto mb-20 text-center'>
        <h1 className='text-3xl md:text-5xl text-white font-extrabold tracking-tight mb-6 animate-fade-in mt-12'>
          Contact Us
        </h1>
        <div className='h-1 w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 mx-auto rounded-full' />
        <p className='mt-6 text-gray-300 max-w-2xl mx-auto text-base md:text-lg'>
          We’re here to help you make the most of the TerraQuake API. Whether
          you have a question about our endpoints, need technical support, or
          want to share feedback, our team is ready to assist.
        </p>
      </div>


      <div className='p-8 w-full max-w-4xl mx-auto'>
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
  );
}

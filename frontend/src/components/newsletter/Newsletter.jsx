import React, { useState } from 'react';
import axios from '@config/Axios.js';
import Spinner from '../spinner/Spinner';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post(`/newsletter/subscribe`, {
        email,
      });
      setMessage(response.data.message);
      setIsSuccess(true);
      setEmail('');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Something went wrong');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
      if (window.clearMessageTimeout) clearTimeout(window.clearMessageTimeout);
        window.clearMessageTimeout = setTimeout(() => setMessage(''), 3000);
      }
  };

  return (
    <div className='flex flex-col items-center justify-center relative overflow-hidden p-6'>
      <div className='w-full max-w-6xl mx-4 mt-16 bg-gradient-to-br from-[#1e0341] via-[#180726] to-[#000000] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-purple-500/30 relative z-10 md:mt-0'>
        {/* Left Panel - Enhanced */}
        <div className='md:w-1/2 p-12 flex flex-col justify-center relative'>
          {/* Decorative Element */}
          <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-600/20 to-transparent rounded-bl-full'></div>

          <div className='mb-8 text-center md:text-left'>
            <div className='flex flex-col md:flex-row items-center justify-center gap-4 md:justify-start mb-4'>
              <div className='w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <h2 className='text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent'>
                TerraQuake API
              </h2>
            </div>
            <p className='text-purple-200 text-xl leading-relaxed'>
              Stay ahead with real-time updates, exclusive insights, and
              cutting-edge features from the TerraQuake ecosystem.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className='space-y-6'
          >
            <div className='relative'>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email address'
                required
                className='w-full px-6 py-4 rounded-2xl border-2 border-purple-600/50 bg-[#2a0d5b]/80 backdrop-blur-sm text-white placeholder-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300 text-lg'
                disabled={isLoading}
              />
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className={`w-full py-4 rounded-full font-bold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                isLoading
                  ? 'bg-purple-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:ring-purple-500/30 shadow-lg cursor-pointer'
              }`}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <div className='flex items-center justify-center space-x-2'>
                  <span className='text-lg'>Get Updates</span>
                </div>
              )}
            </button>
          </form>

          {message && (
            <div
              className={`mt-6 p-4 rounded-xl border-2 backdrop-blur-sm ${
                isSuccess
                  ? 'bg-green-500/10 border-green-400/50 text-green-200'
                  : 'bg-red-500/10 border-red-400/50 text-red-200'
              } transition-all duration-300 animate-fade-in`}
            >
              <div className='flex items-center'>
                {isSuccess ? (
                  <svg
                    className='w-6 h-6 mr-3 flex-shrink-0'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : (
                  <svg
                    className='w-6 h-6 mr-3 flex-shrink-0'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
                <span className='text-sm font-medium'>{message}</span>
              </div>
            </div>
          )}

          <p className='mt-8 text-sm text-purple-300/80 text-center md:text-left leading-relaxed'>
            We respect your privacy. No spam, just value. Unsubscribe at any
            time with one click.
          </p>
        </div>

        {/* Right Panel - Enhanced */}
        <div className='md:w-1/2 p-12 text-white flex flex-col justify-center bg-gradient-to-br from-purple-900/20 to-pink-900/10 backdrop-blur-sm relative'>
          {/* Decorative Element */}
          <div className='absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-600/20 to-transparent rounded-tr-full'></div>

          <div className='relative z-10'>
            <div className='flex flex-col md:flex-row items-center gap-4 mb-8'>
              <div className='w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-400 rounded-xl flex items-center justify-center mr-4 shadow-lg'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h3 className='text-3xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent'>
                Why Join Us?
              </h3>
            </div>

            <ul className='space-y-6'>
              {[
                {
                  title: 'Real-time Alerts',
                  description:
                    'Instant notifications about seismic activities and API updates',
                },
                {
                  title: 'Exclusive Access',
                  description:
                    'Early beta features and premium content before public release',
                },
                {
                  title: 'Expert Insights',
                  description:
                    'Weekly analysis and tips from geoscience professionals',
                },
                {
                  title: 'Community Perks',
                  description:
                    'Special discounts and priority support for subscribers',
                },
              ].map((item, index) => (
                <li
                  key={index}
                  className='flex items-start p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group'
                >
                  <div className='w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300'>
                    <svg
                      className='w-4 h-4 text-white'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className='font-semibold text-white text-lg mb-1'>
                      {item.title}
                    </h4>
                    <p className='text-purple-200 text-sm leading-relaxed'>
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

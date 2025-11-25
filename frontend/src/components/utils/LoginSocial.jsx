import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa6';
import Spinner from '../spinner/Spinner';

export default function LoginSocial({ loading, setLoading, text }) {
  // Social login (Google & GitHub unified)
  const handleSocialLogin = (provider) => {
    setLoading(true);

    const backendBaseUrl =
      import.meta.env.VITE_URL_BACKEND || 'http://localhost:5001';

    if (provider === 'google') {
      window.location.href = `${backendBaseUrl}/auth/google`;
      setLoading(false);
    } else if (provider === 'github') {
      // GitHub OAuth
      window.location.href = `${backendBaseUrl}/auth/github`;
      setLoading(false);
    }
  };

  return (
    <>
      {/* Divider */}
      <div className='flex items-center my-8'>
        <div className='flex-grow border-t border-gray-400'></div>
        <span className='mx-4 text-white text-sm'>Or sign in through</span>
        <div className='flex-grow border-t border-gray-400'></div>
      </div>

      <div className='flex flex-col md:flex-row justify-center items-center gap-4 mb-9'>
        <button
          type='button'
          className='px-6 text-white bg-purple-600 hover:bg-purple-800 p-2 rounded-full cursor-pointer'
          onClick={() => handleSocialLogin('google')}
        >
          <span className='flex gap-2'>
            <p className='mx-auto'>{text}</p>
            {loading 
              ? <Spinner /> 
              : <FaGoogle className='w-5 h-5' />
            }
          </span>
        </button>
        <span>OR</span>
        <button
          type='button'
          className='px-6 text-white bg-purple-600 hover:bg-purple-800 p-2 rounded-full cursor-pointer'
          onClick={() => handleSocialLogin('github')}
        >
          <span className='flex gap-2'>
          <p className='mx-auto'>{text}</p>
          {loading 
            ? <Spinner /> 
            : <FaGithub className='w-5 h-5' />
          }
          <FaGithub className='w-5 h-5' />
          </span>
        </button>
      </div>
    </>
  );
}

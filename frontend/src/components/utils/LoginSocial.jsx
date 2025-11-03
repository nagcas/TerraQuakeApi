import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa6';

export default function LoginSocial() {
  // Social login (Google & GitHub unified)
  const handleSocialLogin = (provider) => {
    const backendBaseUrl =
      import.meta.env.VITE_URL_BACKEND || 'http://localhost:5001';

    if (provider === 'google') {
      window.location.href = `${backendBaseUrl}/auth/google`;
    } else if (provider === 'github') {
      // GitHub OAuth
      window.location.href = `${backendBaseUrl}/auth/github`;
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

      <div className='flex justify-center gap-4 mb-9'>
        <button
          type='button'
          className='text-white bg-purple-600 hover:bg-purple-800 p-2 rounded-full cursor-pointer'
          onClick={() => handleSocialLogin('google')}
        >
          <FaGoogle className='w-5 h-5' />
        </button>

        <button
          type='button'
          className='text-white bg-purple-600 hover:bg-purple-800 p-2 rounded-full cursor-pointer'
          onClick={() => handleSocialLogin('github')}
        >
          <FaGithub className='w-5 h-5' />
        </button>
      </div>
    </>
  );
}

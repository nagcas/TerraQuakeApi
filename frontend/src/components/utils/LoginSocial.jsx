import React, { useState } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa6';
import Spinner from '../spinner/Spinner';
import { useTranslation } from 'react-i18next';

export default function LoginSocial({ text }) {
  const { t } = useTranslation('translation');

  // Social login (Google & GitHub unified)
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingGit, setLoadingGit] = useState(false);
  
  
  const handleSocialLogin = (provider) => {
    const backendBaseUrl = import.meta.env.VITE_URL_BACKEND || 'http://localhost:5001';  
    
    if (provider === 'google') {
      // Google OAuth
      setLoadingGoogle(true);
      setTimeout(() => {
        window.location.href = `${backendBaseUrl}/auth/google`;
        setLoadingGoogle(false);
      }, 1000);
    } else if (provider === 'github') {
      // GitHub OAuth
      setLoadingGit(true);
      setTimeout(() => {
        window.location.href = `${backendBaseUrl}/auth/github`;
        setLoadingGit(false);
      }, 1000);
    }
  };

  return (
    <>
      {/* Divider */}
      <div className='flex items-center my-8'>
        <div className='flex-grow border-t border-gray-400'></div>
        <span className='mx-4 text-white text-sm'>
          {t('login_socials.sign_through')}
        </span>
        <div className='flex-grow border-t border-gray-400'></div>
      </div>

      <div className='flex flex-col md:flex-row justify-center items-center gap-4 mb-9'>
        <button
          type='button'
          className='px-6 text-white bg-purple-600 hover:bg-purple-800 p-2 rounded-full cursor-pointer'
          onClick={() => handleSocialLogin('google')}
          disabled={loadingGoogle || loadingGit}
        >
          <span className='flex gap-2'>
            <p className='mx-auto'>{text}</p>
            {loadingGoogle 
              ? <Spinner /> 
              : <FaGoogle className='w-5 h-5' />
            }
          </span>
        </button>
        <span>{t('login_socials.or')}</span>
        <button
          type='button'
          className='px-6 text-white bg-purple-600 hover:bg-purple-800 p-2 rounded-full cursor-pointer'
          onClick={() => handleSocialLogin('github')}
          disabled={loadingGit || loadingGoogle}
        >
          <span className='flex gap-2'>
          <p className='mx-auto'>{text}</p>
          {loadingGit 
            ? <Spinner /> 
            : <FaGithub className='w-5 h-5' />
          }
          </span>
        </button>
      </div>
    </>
  );
}

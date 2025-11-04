import { useContext } from 'react';
import { Context } from '@/components/modules/Context';

export default function DetailProfile() {
  const { userLogin, isLoggedIn, setIsLoggedIn, setUserLogin, updateUser } =
    useContext(Context);

  return (
    <section>
      <h2 className='pointer-events-none text-xl sm:text-2xl font-semibold text-pink-400 mb-4'>
        Account Details
      </h2>
      <div className='grid sm:grid-cols-2 gap-4 sm:gap-6 text-gray-300 text-sm sm:text-base'>
        <p className='flex flex-col'>
          <span className='font-bold text-purple-400'>Name:</span> 
          <span>{userLogin?.name}</span>
        </p>
        <p className='flex flex-col'>
          <span className='font-bold text-purple-400'>Email:</span>
          <span>{userLogin?.email}</span>
        </p>
        <p className='flex flex-col'>
          <span className='font-bold text-purple-400'>Role:</span> 
          <span>{userLogin?.role}</span>
        </p>
        <p className='flex flex-col'>
          <span className='font-bold text-purple-400'>Experience:</span>
          <span>{userLogin?.experience || 'N/A'}</span>
        </p>
        <p className='flex flex-col'>
          <span className='font-bold text-purple-400'>Student:</span>
          <span>{userLogin?.student || 'No'}</span>
        </p>
        <p className='flex flex-col'>
          <span className='font-bold text-purple-400'>Location (optional):</span>
          <span>{userLogin?.location || ''}</span>
        </p>
        <p className='flex flex-col'>
          <span className='font-bold text-purple-400'>Website (optional):</span>
          <a 
            href={userLogin?.website || ''}
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-pink-400'
          >
            {userLogin?.website || ''}
          </a>
          
        </p>
        <p className='flex flex-col'>
          <span className='font-bold text-purple-400'>Portfolio (optional):</span>
          <a 
            href={userLogin?.portfolio || ''} 
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-pink-400'
          >
            {userLogin?.portfolio || ''}
          </a>
        </p>
        <p className='flex flex-col'>
          <span className='font-bold text-purple-400'>GitHub (optional):</span>
          <a 
            href={userLogin?.github || ''} 
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-pink-400'
          >
            {userLogin?.github || ''}
          </a>
        </p>
        <p className='flex flex-col'>
          <span className='font-bold text-purple-400'>LinkedIn (optional):</span>
          <a 
            href={userLogin?.linkedin || ''} 
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-pink-400'
          >
            {userLogin?.linkedin || ''}
          </a>
        </p>
      </div>
      <div className='mt-6'>
        <p className='flex flex-col'>
          <span className='font-bold text-purple-400'>Bio (optional):</span>
          <span>{userLogin?.bio || ''}</span>
        </p>
      </div>
    </section>
  );
}

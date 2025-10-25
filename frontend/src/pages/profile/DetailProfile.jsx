import { useContext } from 'react';
import { Context } from '@/components/modules/Context';

export default function DetailProfile() {
  const { userLogin, isLoggedIn, setIsLoggedIn, setUserLogin, updateUser } =
    useContext(Context);

  return (
    <>
      <h2 className='text-xl sm:text-2xl font-semibold text-pink-400 mb-4'>
        Account Details
      </h2>
      <div className='grid sm:grid-cols-2 gap-4 sm:gap-6 text-gray-300 text-sm sm:text-base'>
        <p>
          <span className='font-bold text-white'>Name:</span> {userLogin?.name}
        </p>
        <p>
          <span className='font-bold text-white'>Email:</span>{' '}
          {userLogin?.email}
        </p>
        <p>
          <span className='font-bold text-white'>Role:</span> {userLogin?.role}
        </p>
        <p>
          <span className='font-bold text-white'>Experience:</span>{' '}
          {userLogin?.experience || 'N/A'}
        </p>
        <p>
          <span className='font-bold text-white'>Student:</span>{' '}
          {userLogin?.student || 'No'}
        </p>
        <p>
          <span className='font-bold text-white'>Location:</span>{' '}
          {userLogin?.location || ''}
        </p>
        <p>
          <span className='font-bold text-white'>Website:</span>{' '}
          {userLogin?.website || ''}
        </p>
        <p>
          <span className='font-bold text-white'>Portfolio:</span>{' '}
          {userLogin?.portfolio || ''}
        </p>
        <p>
          <span className='font-bold text-white'>GitHub:</span>{' '}
          {userLogin?.github || ''}
        </p>
      </div>
      <div className='mt-6'>
        <p>
          <span className='font-bold text-white'>Bio:</span>{' '}
          {userLogin?.bio || ''}
        </p>
      </div>
    </>
  );
}

import { Context } from '@/components/modules/context';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../noPage/metaData';

export default function EditProfile() {
  const { userLogin, isLoggedIn, setIsLoggedIn, setUserLogin } =
    useContext(Context);

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Edit Profile'
        description='Edit your TerraQuake API profile details, including personal information and preferences.'
        ogTitle='Edit Profile - TerraQuake API'
        ogDescription='Update and customize your TerraQuake API profile to keep your information accurate and up-to-date.'
        twitterTitle='Edit Profile - TerraQuake API'
        twitterDescription='Manage and update your TerraQuake API profile with ease.'
        keywords='TerraQuake API, edit profile, update account, user settings'
      />
      {/* SEO Stuff */}

      <div className='text-left py-4'>
        <p className='text-xl text-red-400'>⚠️ Edit profile in progress...</p>
      </div>
    </>
  );
}

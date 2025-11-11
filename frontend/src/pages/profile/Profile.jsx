import React, { useContext, useEffect, useState } from 'react';
import MetaData from '../noPage/MetaData';
import { Context } from '@/components/modules/Context';
import EditProfile from './EditProfile';
import DeleteProfile from './DeleteProfile';
import { motion } from 'framer-motion';
import BackToTopButton from '@/components/utils/BackToTopButton';
import AvatarUser from '@/components/utils/AvatarUser';
import AccessRestricted from '@/components/accessRestricted/AccessRestricted';
import Logout from '../auth/Logout';
import DetailProfile from './DetailProfile';
import GenerateTokenAPI from './GenerateTokenAPI';
import FunctionsProfile from './FunctionsProfile';
import CreateReview from './CreateReview';
import ViewReview from './ViewReview';

export default function Profile() {
  const { userLogin, isLoggedIn } = useContext(Context);
  const [activeSection, setActiveSection] = useState(null);

  // Scroll to top when updated user datachanges
  useEffect(() => {
    if (userLogin || activeSection) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [userLogin, activeSection]);

  return (
    <>
      {/* SEO Meta Data */}
      <MetaData
        title='User Profile'
        description='View your TerraQuake API profile, including your activity, settings, and preferences.'
        ogTitle='User Profile - TerraQuake API'
        ogDescription='Access and manage your TerraQuake API account information and preferences.'
        twitterTitle='User Profile - TerraQuake API'
        twitterDescription='Manage your account and view your profile details on TerraQuake API.'
        keywords='TerraQuake API, user profile, account settings, seismic data'
      />

      <section className='relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-8 py-20 text-white overflow-hidden'>
        {/* Background */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className='absolute inset-0 z-0'>
          <div className='absolute top-0 left-0 w-72 sm:w-80 h-72 sm:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-80 sm:w-96 h-80 sm:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>

        {isLoggedIn ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className='grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl relative z-10 mt-6'
          >
            {/* Left Column */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className='bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center transition duration-300'
            >
              <AvatarUser />

              <h1 className='text-2xl sm:text-3xl font-extrabold mt-5 tracking-tight'>
                Hello,{' '}
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400'>
                  {userLogin?.name || 'Anonymous'}
                </span>
              </h1>

              <p className='text-gray-300 text-xs sm:text-sm mt-2 uppercase tracking-widest'>
                {userLogin?.role || 'User'} • TerraQuake
              </p>

              {/* Button Logout */}
              <Logout />
            </motion.div>

            {/* Right Column */}
            <div className='flex flex-col justify-center items-center bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm rounded-2xl shadow-lg border border-purple-500/20 p-6 sm:p-8'>
              <h1 className='text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent'>
                Profile Dashboard
              </h1>
              <p className='text-gray-400 mt-2 max-w-md text-center text-sm sm:text-base'>
                Manage your TerraQuake account, update details, or generate API
                tokens.
              </p>

              {/* Functions profile users */}
              {activeSection === null && (
                <FunctionsProfile setActiveSection={setActiveSection} />
              )}

              {activeSection !== null && (
                <motion.button
                  onClick={() => setActiveSection(null)}
                  className='mt-6 w-48 sm:w-60 py-2 sm:py-3 px-6 sm:px-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-semibold text-sm sm:text-base shadow-lg hover:scale-105 transition duration-300 cursor-pointer'
                >
                  Back to Profile
                </motion.button>
              )}
            </div>

            {/* Bottom Section */}
            {activeSection === 'edit' && (
              <EditProfile setEditProfile={() => setActiveSection(null)} />
            )}

            {activeSection === 'delete' && <DeleteProfile />}

            {activeSection === 'review' && (
              <CreateReview setCreateReview={() => setActiveSection(null)} />
            )}

            {activeSection === 'view' && (
              <ViewReview
                userId={userLogin?._id}
                setUpdateReview={() => setActiveSection(null)}
              />
            )}

            {activeSection === null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='col-span-1 lg:col-span-2 bg-black/10 border border-pink-500/10 rounded-2xl p-6 sm:p-8 mt-6'
              >
                {/* Detail Profile */}
                <DetailProfile />

                {/* Generate Token API */}
                <GenerateTokenAPI />
              </motion.div>
            )}
          </motion.div>
        ) : (
          <>
            {/* Not Logged In */}
            <AccessRestricted />
          </>
        )}
        {/* Floating Button */}
        <BackToTopButton />
      </section>
    </>
  );
}

import React, { useContext, useState } from 'react';
import MetaData from '../noPage/metaData';
import { Context } from '@/components/modules/context';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import EditProfile from './editProfile';
import DeleteProfile from './deleteProfile';
import { motion } from 'framer-motion';
import BackToTopButton from '@/components/utils/backToTopButton';

export default function Profile() {
  const { userLogin, isLoggedIn, setIsLoggedIn, setUserLogin } =
    useContext(Context);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const handleLogout = () => {
    setUserLogin({});
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    Swal.fire({
      title: 'Logged Out!',
      text: 'You have successfully logged out of TerraQuake.',
      icon: 'success',
      confirmButtonColor: '#9333ea',
    }).then(() => {
      navigate('/', { replace: true });
    });
  };

  const handleGenerateToken = () => {
    Swal.fire({
      title: 'Coming Soon!',
      text: 'API Token generation feature will be available soon.',
      icon: 'info',
      confirmButtonColor: '#ec4899',
    });
  };

  return (
    <>
      {/* SEO Meta Data */}
      <MetaData
        title="User Profile"
        description="View your TerraQuake API profile, including your activity, settings, and preferences."
        ogTitle="User Profile - TerraQuake API"
        ogDescription="Access and manage your TerraQuake API account information and preferences."
        twitterTitle="User Profile - TerraQuake API"
        twitterDescription="Manage your account and view your profile details on TerraQuake API."
        keywords="TerraQuake API, user profile, account settings, seismic data"
      />

      <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-8 py-20 text-white overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-72 sm:w-80 h-72 sm:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute bottom-10 right-10 w-80 sm:w-96 h-80 sm:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        </div>

        {isLoggedIn ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl relative z-10 mt-6"
          >
            {/* Left Column */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center transition duration-300"
            >
              <img
                src={
                  userLogin?.avatar ||
                  'https://wallpapers.com/images/hd/default-user-profile-icon-0udyg8f0x3b3qqbw.png'
                }
                alt="avatar"
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.6)] object-cover"
              />

              <h1 className="text-2xl sm:text-3xl font-extrabold mt-5 tracking-tight">
                Hello,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  {userLogin.name || 'Anonymous'}
                </span>
              </h1>

              <p className="text-gray-300 text-xs sm:text-sm mt-2 uppercase tracking-widest">
                {userLogin.role || 'User'} • TerraQuake
              </p>

              <button
                onClick={handleLogout}
                className="mt-6 py-2 sm:py-3 px-6 sm:px-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-semibold text-sm sm:text-base shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
              >
                Logout
              </button>
            </motion.div>

            {/* Right Column */}
            <div className="flex flex-col justify-center items-center bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm rounded-2xl shadow-lg border border-purple-500/20 p-6 sm:p-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Profile Dashboard
              </h1>
              <p className="text-gray-400 mt-2 max-w-md text-center text-sm sm:text-base">
                Manage your TerraQuake account, update details, or generate API tokens.
              </p>

              {activeSection === null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex flex-col gap-3 sm:gap-4"
                >
                  <button
                    onClick={() => setActiveSection('edit')}
                    className="w-48 sm:w-60 border border-pink-400 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 transition-all duration-300 text-white font-semibold py-2 px-6 rounded-full cursor-pointer text-sm sm:text-base"
                  >
                    Edit Profile
                  </button>

                  <button
                    onClick={() => setActiveSection('delete')}
                    className="w-48 sm:w-60 border border-purple-400 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 transition-all duration-300 text-white font-semibold py-2 px-6 rounded-full cursor-pointer text-sm sm:text-base"
                  >
                    Delete Profile
                  </button>
                </motion.div>
              )}

              {activeSection !== null && (
                <motion.button
                  onClick={() => setActiveSection(null)}
                  className="mt-6 w-48 sm:w-60 py-2 sm:py-3 px-6 sm:px-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-semibold text-sm sm:text-base shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
                >
                  Back to Profile
                </motion.button>
              )}
            </div>

            {/* Bottom Section */}
            {activeSection === 'edit' ? (
              <EditProfile setEditProfile={() => setActiveSection(null)} />
            ) : activeSection === 'delete' ? (
              <DeleteProfile />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="col-span-1 lg:col-span-2 bg-black/30 backdrop-blur-xl border border-pink-500/10 rounded-2xl shadow-lg p-6 sm:p-8 mt-6"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-pink-400 mb-4">
                  Account Details
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 text-gray-300 text-sm sm:text-base">
                  <p><span className="font-bold text-white">Name:</span> {userLogin.name}</p>
                  <p><span className="font-bold text-white">Email:</span> {userLogin.email}</p>
                  <p><span className="font-bold text-white">Role:</span> {userLogin.role}</p>
                  <p><span className="font-bold text-white">Experience:</span> {userLogin.experience || 'N/A'}</p>
                  <p><span className="font-bold text-white">Student:</span> {userLogin.student || 'No'}</p>
                </div>

                <div className="text-center mt-10">
                  <h2 className="text-lg sm:text-xl font-semibold text-purple-400">
                    Generate API Token
                  </h2>
                  <button
                    onClick={handleGenerateToken}
                    className="mt-4 py-2 sm:py-3 px-8 sm:px-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-semibold text-sm sm:text-base shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
                  >
                    Generate Token
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          // Not Logged In
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-lg z-10"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              Access Denied
            </h1>
            <p className="text-gray-300 mb-8 text-sm sm:text-base">
              Please sign in or create an account to view your profile.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => navigate('/signin')}
                className="py-2 sm:py-3 px-6 sm:px-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full font-bold text-white shadow-lg hover:scale-105 transition-transform text-sm sm:text-base"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="py-2 sm:py-3 px-6 sm:px-8 bg-gradient-to-r from-pink-600 to-purple-700 rounded-full font-bold text-white shadow-lg hover:scale-105 transition-transform text-sm sm:text-base"
              >
                Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </section>

      {/* Floating Button */}
      <BackToTopButton />
    </>
  );
}

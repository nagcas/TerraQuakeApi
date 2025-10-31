import React, { useState, useContext, useEffect, useRef } from 'react';
import Sismic from '@images/tracciato.png';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Context } from '@components/modules/Context';
import AvatarUser from '../utils/AvatarUser';
import Logout from '@/pages/auth/Logout';
import StarsGitHub from '../utils/StarsGitHub';

export default function NavbarMenu() {
  const navigate = useNavigate();
  const { userLogin, isLoggedIn, setIsLoggedIn, setUserLogin } =
    useContext(Context);

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const resourcesRef = useRef(null);
  const profileRef = useRef(null);
  const mobileRef = useRef(null);

  const primaryNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Explore Data', path: '/explore-data' },
    { name: 'Use Cases', path: '/use-cases' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const resourcesNavItems = [
    { name: 'API Access', path: '/api-access' },
    { name: 'Docs', path: '/docs' },
    { name: 'Faq', path: '/faq' },
  ];

  const profileItems = [
    { name: 'Profile', path: '/profile' },
    { name: 'Admin Dashboard', path: '/admin' },
    { name: 'Change Password', path: '/change-password' },
    { name: 'Messages', path: '/contact' },
    { name: 'Documentation', path: '/docs' },
    { name: 'Information', path: '/info' },
  ];

  // Automatically close the profile menu when the login status changes
  useEffect(() => {
    setIsProfileOpen(false);
  }, [isLoggedIn]);

  useEffect(() => {
    function onDocClick(e) {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target))
        setIsResourcesOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target))
        setIsProfileOpen(false);
      if (mobileRef.current && !mobileRef.current.contains(e.target))
        setIsMobileOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <header className='fixed top-0 left-0 w-full backdrop-blur-2xl bg-black/60 text-white shadow-lg py-4 px-4 flex items-center justify-between lg:justify-around z-50'>
      {/* Logo */}
      <Link
        to='/'
        aria-label='TerraQuake home'
      >
        <div className='flex items-center text-2xl font-bold w-fit h-12 relative'>
          <img
            src={Sismic}
            alt='Logo'
            className='absolute z-10 w-36 h-20 opacity-80 object-cover'
          />
          <span className='text-white z-20'>TerraQuake</span>
        </div>
      </Link>

      {/* Desktop Menu */}
      <nav className='hidden lg:flex justify-center gap-4 text-[12px] xl:text-[14px] relative'>
        {primaryNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `hover:text-purple-400 ${
                isActive
                  ? 'text-purple-400 font-semibold border-b-2 border-purple-500'
                  : 'text-gray-300'
              }`
            }
            onClick={() => {
              setIsResourcesOpen(false);
              setIsProfileOpen(false);
            }}
          >
            {item.name}
          </NavLink>
        ))}

        {/* Resources dropdown */}
        <div
          ref={resourcesRef}
          className='relative'
        >
          <button
            onClick={() => setIsResourcesOpen((s) => !s)}
            className={`flex items-center gap-1 hover:text-purple-400 transition-colors duration-200 cursor-pointer ${
              resourcesNavItems.some(
                (item) => window.location.pathname === item.path
              )
                ? 'text-purple-400 font-semibold'
                : 'text-gray-300'
            }`}
            aria-expanded={isResourcesOpen}
          >
            Resources{' '}
            <FaChevronDown
              className={`text-xs transition-transform ${
                isResourcesOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>

          {isResourcesOpen && (
            <div
              className='absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-purple-500/50 rounded-2xl shadow-lg z-50 py-2 animate-fade-in'
              onClick={(e) => e.stopPropagation()}
            >
              {resourcesNavItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsResourcesOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm hover:text-purple-400 hover:bg-purple-500/10 transition-colors duration-200 ${
                      isActive
                        ? 'text-purple-400 font-semibold bg-purple-500/20'
                        : 'text-gray-300'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Auth / profile area */}
      <div className='lg:flex items-center ml-2 gap-2 text-[12px] lg:text-[14px] relative'>
        {/* Stars GitHub TerraQuake API*/}
        <StarsGitHub />

        {isLoggedIn ? (
          <div
            ref={profileRef}
            className='relative'
          >
            <button
              onClick={() => setIsProfileOpen((s) => !s)}
              className='flex items-center gap-2 hover:bg-gray-800/50 rounded-lg px-2 py-1 transition-colors duration-200 cursor-pointer'
              aria-label='User menu'
              aria-expanded={isProfileOpen}
            >
              <AvatarUser use='navbar' />
              <span className='text-white/80 font-medium text-sm'>
                {userLogin?.name ? userLogin.name.split(' ')[0].trim() : 'User'}
              </span>
              <FaChevronDown
                className={`text-xs transition-transform ${
                  isProfileOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>

            {isProfileOpen && (
              <div
                className='absolute top-full right-0 mt-2 w-52 bg-black/95 backdrop-blur-xl border border-purple-500/50 rounded-2xl shadow-lg z-50 py-2 animate-fade-in'
                onClick={(e) => e.stopPropagation()}
              >
                {profileItems.map((item) => {
                  // If the item is Admin Dashboard but the user is NOT admin, we don't show it
                  if (
                    item.name === 'Admin Dashboard' &&
                    userLogin.role.toString() !== 'admin'
                  ) {
                    return null;
                  }

                  // Hide Change Password when logging in via Google or GitHub
                  if (
                    item.name === 'Change Password' &&
                    (userLogin.githubId || userLogin.googleId)
                  ) {
                    return null;
                  }

                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsProfileOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm hover:text-purple-400 hover:bg-purple-500/10 transition-colors duration-200 ${
                          isActive
                            ? 'text-purple-400 font-semibold bg-purple-500/20'
                            : 'text-gray-300'
                        }`
                      }
                    >
                      {item.name === 'Admin Dashboard' ? (
                        <span className='text-purple-400 mr-2 font-semibold'>
                          {item.name}
                        </span>
                      ) : (
                        item.name
                      )}
                    </NavLink>
                  );
                })}

                <hr className='border-t border-purple-500/40 my-2' />
                <div className='flex justify-center mb-2'>
                  <Logout />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className='hidden lg:flex gap-3'>
            <button
              className='border border-gray-400 hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-gray-300 font-medium py-1.5 px-4 rounded-full cursor-pointer text-sm'
              onClick={() => navigate('/signin')}
            >
              Sign In
            </button>
            <button
              className='bg-gradient-to-r from-pink-500 to-purple-600 py-1.5 px-4 rounded-full hover:scale-105 transform transition-all duration-300 cursor-pointer text-sm font-medium'
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>

      {/* Mobile hamburger */}
      <div className='lg:hidden'>
        <button
          onClick={() => setIsMobileOpen((s) => !s)}
          aria-label='Toggle menu'
          className='p-2'
        >
          {isMobileOpen ? (
            <FaTimes className='w-6 h-6' />
          ) : (
            <FaBars className='w-6 h-6' />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileRef}
        className={`lg:hidden fixed top-[64px] left-0 right-0 bg-[#090414] text-white z-40 transform transition-all duration-300 ${
          isMobileOpen
            ? 'max-h-[80vh] opacity-100 py-6'
            : 'max-h-0 opacity-0 py-0 overflow-hidden pointer-events-none'
        }`}
      >
        <div className='flex flex-col items-center gap-4 text-xl mb-4 px-6'>
          {[...primaryNavItems, ...resourcesNavItems].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `hover:text-purple-400 ${
                  isActive
                    ? 'text-purple-400 font-semibold border-b-2 border-purple-500'
                    : 'text-gray-300'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className='px-6'>
          {!isLoggedIn && (
            <div className='flex flex-col gap-3 items-center'>
              <button
                className='border border-gray-400 text-gray-300 font-medium py-2 px-6 rounded-full w-full max-w-[260px]'
                onClick={() => {
                  navigate('/signin');
                  setIsMobileOpen(false);
                }}
              >
                Sign In
              </button>
              <button
                className='bg-gradient-to-r from-pink-500 to-purple-600 py-2 px-6 rounded-full w-full max-w-[260px]'
                onClick={() => {
                  navigate('/signup');
                  setIsMobileOpen(false);
                }}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

import { useState, useContext, useEffect } from 'react';
import Sismic from '@images/tracciato.png';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { FiGithub } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '@components/modules/context';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function NavbarMenu() {
  const navigate = useNavigate();
  const [star, setStar] = useState('');
  const [isOpen, setIsOpen] = useState(false); // hamburger mobile
  const [isOpenDropdown, setIsOpenDropdown] = useState(false); // user dropdown desktop
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false); // more dropdown desktop
  const { userLogin, isLoggedIn, setIsLoggedIn, setUserLogin } =
    useContext(Context);

  // Reset dropdowns on login state change
  useEffect(() => {
    setIsOpenDropdown(false);
    setIsMoreDropdownOpen(false);
  }, [isLoggedIn]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMoreDropdownOpen && !event.target.closest('.more-dropdown')) {
        setIsMoreDropdownOpen(false);
      }
      if (isOpenDropdown && !event.target.closest('.user-dropdown')) {
        setIsOpenDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMoreDropdownOpen, isOpenDropdown]);

  // Primary navigation items (always visible)
  const primaryNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Explore Data', path: '/explore-data' },
    { name: 'Use Cases', path: '/use-cases' },
    { name: 'About', path: '/about' },
  ];

  // Secondary navigation items (in More dropdown)
  const moreNavItems = [
    { name: 'API Access', path: '/api-access' },
    { name: 'Docs', path: '/docs' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  // All items for mobile menu (unchanged structure)
  const listItems = [...primaryNavItems, ...moreNavItems];

  const handleLogout = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Logged Out Successfully!',
      icon: 'success',
      confirmButtonText: 'Home page',
    }).then(() => {
      setIsOpen(false);
      setUserLogin({});
      setIsLoggedIn(false);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/', { replace: true });
    });
  };

  // Api github
  const urlGitHub = 'https://api.github.com/repos/nagcas/TerraQuakeApi';

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const { data } = await axios.get(urlGitHub);
        setStar(data.stargazers_count);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error Axios:', error.response?.status, error.message);
        } else {
          console.error('Error server:', error);
        }
      }
    };

    fetchGitHub();
  }, []);

  return (
    <header className='fixed top-0 left-0 w-full backdrop-blur-2xl bg-black/60 text-white shadow-lg py-4 px-4 flex items-center justify-between lg:justify-around z-50'>
      {/* Logo */}
      <a href='https://terraquakeapi.com/'>
        <div className='flex items-center text-2xl font-bold w-fit h-12 relative'>
          <img
            src={Sismic}
            alt='Logo'
            className='absolute z-10 w-36 h-20 opacity-80 object-cover'
          />
          <span className='text-white z-20'>TerraQuake</span>
        </div>
      </a>
      {/* Menu Desktop */}
      <nav className='hidden lg:flex justify-center gap-6 gap-lg-8 text-[14px] xl:text-[16px] relative'>
        {/* Primary Navigation Items */}
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
          >
            {item.name}
          </NavLink>
        ))}

        {/* More Dropdown */}
        <div className='relative more-dropdown'>
          <button
            onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
            className={`flex items-center gap-1 hover:text-purple-400 transition-colors duration-200 ${
              moreNavItems.some(
                (item) => window.location.pathname === item.path
              )
                ? 'text-purple-400 font-semibold'
                : 'text-gray-300'
            }`}
            onMouseEnter={() => setIsMoreDropdownOpen(true)}
          >
            More
            <FaChevronDown
              className={`text-xs transition-transform duration-200 ${
                isMoreDropdownOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>

          {/* More Dropdown Menu */}
          {isMoreDropdownOpen && (
            <div
              className='absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-purple-500/50 rounded-2xl shadow-lg z-50 py-2'
              onMouseEnter={() => setIsMoreDropdownOpen(true)}
              onMouseLeave={() => setIsMoreDropdownOpen(false)}
            >
              {moreNavItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm hover:text-purple-400 hover:bg-purple-500/10 transition-colors duration-200 ${
                      isActive
                        ? 'text-purple-400 font-semibold bg-purple-500/20'
                        : 'text-gray-300'
                    }`
                  }
                  onClick={() => setIsMoreDropdownOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Auth Desktop */}
      <div className='lg:flex items-center ml-2 gap-3 text-[14px] lg:text-[16px] relative user-dropdown'>
        {/* Star GitHub */}
        <a
          href='https://github.com/nagcas/TerraQuakeApi'
          target='_blank'
          rel='noopener noreferrer'
          className='hidden lg:flex items-center gap-2 bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-600/50 rounded-full px-3 py-1.5 shadow-lg transition-all hover:scale-105 hover:border-purple-500/50 transform duration-200'
        >
          <span className='flex items-center gap-1.5 text-gray-300 font-medium text-sm'>
            <FiGithub className='text-purple-400 text-lg' /> Stars
          </span>
          <span className='bg-purple-600 text-white font-semibold px-2 py-0.5 rounded-md shadow-md text-xs'>
            {star}
          </span>
        </a>

        {isLoggedIn ? (
          <>
            <button
              onClick={() => setIsOpenDropdown(!isOpenDropdown)}
              className='flex items-center gap-2 hover:bg-gray-800/50 rounded-lg px-2 py-1 transition-colors duration-200'
              aria-label='User menu'
            >
              <img
                src={
                  userLogin.avatarUrl ||
                  'https://wallpapers.com/images/hd/default-user-profile-icon-0udyg8f0x3b3qqbw.png'
                }
                alt='avatar'
                className='w-7 h-7 rounded-full cursor-pointer border border-purple-500/30'
              />
              <span className='text-purple-400 font-medium text-sm'>
                {userLogin.name.split(' ')[0].trim()}
              </span>
            </button>

            {isOpenDropdown && (
              <div className='flex flex-col gap-3 bg-black/95 backdrop-blur-xl border border-purple-500/50 rounded-2xl absolute w-[200px] top-full right-0 p-3 mt-2 shadow-md z-50'>
                <button
                  onClick={() => {
                    setIsOpenDropdown(false);
                    navigate('/profile');
                  }}
                  className='text-left hover:text-purple-500 cursor-pointer'
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    setIsOpenDropdown(false);
                    navigate('/change-password');
                  }}
                  className='text-left hover:text-purple-500 cursor-pointer'
                >
                  Change Password
                </button>
                <button
                  onClick={() => {
                    setIsOpenDropdown(false);
                    navigate('/contact');
                  }}
                  className='text-left hover:text-purple-500 cursor-pointer'
                >
                  Messages
                </button>
                <button
                  onClick={() => {
                    setIsOpenDropdown(false);
                    navigate('/docs');
                  }}
                  className='text-left hover:text-purple-500 cursor-pointer'
                >
                  Documentacion
                </button>
                <button
                  onClick={() => {
                    setIsOpenDropdown(false);
                    navigate('/info');
                  }}
                  className='text-left hover:text-purple-500 cursor-pointer'
                >
                  Information
                </button>
                <hr className='border-t border-purple-200 my-2' />
                <button
                  onClick={handleLogout}
                  className='text-left hover:text-purple-500 cursor-pointer'
                >
                  Log Out
                </button>
              </div>
            )}
          </>
        ) : (
          <div className='hidden lg:flex gap-3'>
            <button
              className='border border-gray-400 hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-gray-300 font-medium py-1.5 px-4 rounded-full cursor-pointer text-sm'
              onClick={() => navigate('/signin')}
              aria-label='Navigate to sign in page'
            >
              Sign In
            </button>
            <button
              className='bg-gradient-to-r from-pink-500 to-purple-600 py-1.5 px-4 rounded-full hover:scale-105 transform transition-all duration-300 cursor-pointer text-sm font-medium'
              onClick={() => navigate('/signup')}
              aria-label='Navigate to sign up page'
            >
              Sign Up
            </button>
          </div>
        )}
      </div>

      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='lg:hidden flex items-center relative w-6 h-6'
        aria-label='Toggle menu'
      >
        <div
          className={`w-full h-full transition-transform duration-500 ease-in-out ${
            isOpen ? 'rotate-[360deg]' : 'rotate-0'
          }`}
        >
          <FaBars
            className={`absolute inset-0 w-full h-full transition-opacity duration-200 ease-in-out ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <FaTimes
            className={`absolute inset-0 w-full h-full transition-opacity duration-200 ease-in-out ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </button>

      {/* Mobile Dropdown */}
      <div
        className={`lg:hidden absolute top-full left-0 min-h-screen w-full bg-[#090414] text-white overflow-hidden transition-all duration-500 ease-in-out z-40 rounded-b-xl ${
          isOpen
            ? 'max-h-[500px] opacity-100 pointer-events-auto py-6 px-6'
            : 'max-h-0 opacity-0 pointer-events-none py-0 px-0'
        }`}
      >
        {/* Mobile Links */}
        <div className='flex flex-col items-center gap-4 text-xl mb-4'>
          {listItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
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

        {/* Mobile Auth */}
        {isLoggedIn ? (
          <div className='flex flex-col gap-2 items-center'>
            <hr className='border-t border-purple-200 my-2' />
            <button
              onClick={handleLogout}
              className='text-left hover:text-purple-500 border px-8 py-3 hover:bg-white rounded-full'
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className='flex flex-col gap-3 items-center'>
            <button
              className='border border-gray-400 hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-gray-300 font-medium py-2 px-6 rounded-full w-full max-w-[200px]'
              onClick={() => {
                navigate('/signin');
                setIsOpen(false);
              }}
              aria-label='Navigate to sign in page'
            >
              Sign In
            </button>
            <button
              className='bg-gradient-to-r from-pink-500 to-purple-600 py-2 px-6 rounded-full transition-all duration-300 w-full max-w-[200px] font-medium'
              onClick={() => {
                navigate('/signup');
                setIsOpen(false);
              }}
              aria-label='Navigate to sign up page'
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

import { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '@components/modules/Context';
import Swal from 'sweetalert2';
import { ImSpinner9 } from 'react-icons/im';
import { motion } from 'framer-motion';

export default function HandleOAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUserLogin, setIsLoggedIn } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const message = params.get('message');
    const token = params.get('token');
    const userId = params.get('user_id');
    const name = params.get('name');
    const email = params.get('email');
    const avatar = params.get('avatar');
    const role = params.get('role');
    const experience = params.get('experience');
    const student = params.get('student');
    const bio = params.get('bio');
    const userLocation = params.get('location');
    const website = params.get('website');
    const portfolio = params.get('portfolio');
    const github = params.get('github');
    const linkedin = params.get('linkedin');

    if (token && userId) {
      // Save token and user data in localStorage
      const userData = {
        _id: userId,
        name: name || 'Anonymous',
        email: email || '',
        avatar: avatar || '',
        role: role || 'user',
        experience: experience || '',
        student: student || 'No',
        bio: bio || '',
        location: userLocation || '',
        website: website || '',
        portfolio: portfolio || '',
        github: github || '',
        linkedin: linkedin || '',
      };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      // Update context state
      setUserLogin(userData);
      setIsLoggedIn(true);

      // Redirect after success
      Swal.fire({
        title: 'Login Successful!',
        text: message || 'Login with Google successful!',
        icon: 'success',
        confirmButtonText: 'Profile',
      }).then(() => {
        navigate('/profile', { replace: true });
      });
    } else if (params.get('error')) {
      const errorMessage = params.get('error') || 'Authentication failed.';
      Swal.fire({
        title: 'Authentication Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Try Again',
      }).then(() => {
        navigate('/signin', { replace: true });
      });
    } else {
      navigate('/signin', { replace: true });
    }

    setIsLoading(false);
  }, [location.search, navigate, setIsLoggedIn, setUserLogin]);

  if (isLoading) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white'>
        <motion.div
          className='flex flex-col items-center gap-4'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <ImSpinner9 className='text-5xl animate-spin text-purple-500' />
          <motion.span
            className='text-lg font-medium tracking-wide text-gray-300'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.3,
              duration: 1.2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            Authenticating your account...
          </motion.span>
        </motion.div>
      </div>
    );
  }

  return null;
}

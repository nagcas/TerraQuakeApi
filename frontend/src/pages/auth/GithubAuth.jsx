import { Context } from '@/components/modules/Context';
import { useEffect, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

export default function GithubAuth() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { setIsLoggedIn } = useContext(Context);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(search);
    const token = params.get('token');
    const message = params.get('message');
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

      Swal.fire({
        title: 'Success!',
        text: message || 'Login with GitHub successful!',
        icon: 'success',
        confirmButtonText: 'Profile',
      }).then(() => {
        setLoading(false);
        navigate('/profile', { replace: true });
      });
    } else {
      setLoading(false);
      Swal.fire({
        title: 'Error!',
        text: 'No token received. Please try signing in again.',
        icon: 'error',
        confirmButtonText: 'Ok',
      }).then(() => navigate('/signin'));
    }
  }, [search, navigate, setIsLoggedIn]);

  if (loading) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='fixed inset-0 flex flex-col items-center justify-center
        bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2d2d2d] z-50'
      >
        <div className='absolute inset-0 z-0'>
          <div className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob' />
          <div className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000' />
        </div>
        <div className='w-16 h-16 border-4 border-t-transparent border-pink-500 rounded-full animate-spin'></div>
        <p className='mt-6 text-lg text-gray-300 font-semibold tracking-wide'>
          Logging in with GitHub...
        </p>
      </motion.section>
    );
  }

  return null;
}

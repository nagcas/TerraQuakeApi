import { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '@components/modules/Context';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import Spinner from '@/components/spinner/Spinner';

export default function HandleOAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUserLogin, setIsLoggedIn } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const message = params.get('message');
    const token = params.get('token');
    const userId = params.get('user_id');
    const googleId = params.get('googleId');
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
        googleId: googleId || '',
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

    setLoading(false);
  }, [location.search, navigate, setIsLoggedIn, setUserLogin]);

  if (loading) {
    return (
      <section className='z-30 w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b text-white'>
        <Spinner />
        <p className='mt-6 mx-auto md:text-xl text-gray-300'>
          Logging in with Google...
        </p>
      </section>
    );
  }

  return (
     <section className='z-30 w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b text-white'>
      <h1 className='text-2xl md:text-4xl mx-auto font-extrabold leading-tight mt-[50px] select-none'>
        Login with Google successful!
      </h1>
    </section>
  );
}

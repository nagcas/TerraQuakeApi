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
      <section>
        <div className='w-full h-min-screen absolute inset-0 z-0'>
          <Spinner />
          <div
            className='absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full
                                mix-blend-multiply filter blur-3xl opacity-30 animate-blob'
          />
          <div
            className='absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full
                                mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000'
          />
        </div>
        <div className='w-16 h-16 border-4 border-t-transparent border-pink-500 rounded-full animate-spin'></div>
        <p className='mt-6 text-lg text-gray-300 font-semibold tracking-wide'>
          Logging in with Google...
        </p>
      </section>
    );
  }

  return null;
}

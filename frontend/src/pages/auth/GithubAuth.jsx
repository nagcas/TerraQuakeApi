import { Context } from '@/components/modules/Context';
import { useEffect, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import axios from 'axios';
import Spinner from '@/components/spinner/Spinner';

export default function GithubAuth() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { setIsLoggedIn, setUserLogin } = useContext(Context);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams(search);
    const token = params.get('token');
    const message = params.get('message');

    // Handle cases where token is missing
    if (!token) {
      setLoading(false);

      if (message) {
        // Backend returned an error message
        Swal.fire({
          title: 'Error!',
          text: message,
          icon: 'error',
          confirmButtonText: 'Ok',
        }).then(() => navigate('/signin'));
      } else {
        // Token is missing without a backend message
        Swal.fire({
          title: 'Error!',
          text: 'No token received. Please try signing in again.',
          icon: 'error',
          confirmButtonText: 'Ok',
        }).then(() => navigate('/signin'));
      }
      return;
    }

    // Save JWT token in localStorage
    localStorage.setItem('token', token);

    // Fetch user data from backend using the token
    axios
      .get(`${import.meta.env.VITE_URL_BACKEND}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        const data = response.data;
        if (data?.data) {
          // Save user info in localStorage and update context
          localStorage.setItem('user', JSON.stringify(data.data));
          setUserLogin(data.data);
          setIsLoggedIn(true);

          Swal.fire({
            title: 'Success!',
            text: message || 'Login with GitHub successful!',
            icon: 'success',
            confirmButtonText: 'Profile',
          }).then(() => navigate('/profile', { replace: true }));
        } else {
          throw new Error('User data missing');
        }
      })
      .catch(err => {
        console.error('Axios fetch user error:', err);
        Swal.fire({
          title: 'Error!',
          text: message || 'Failed to fetch user data',
          icon: 'error',
          confirmButtonText: 'Ok',
        }).then(() => navigate('/signin'));
      })
      .finally(() => setLoading(false));
  }, [search, navigate, setIsLoggedIn, setUserLogin]);

  // Show loading screen while fetching token and user data
  if (loading) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 flex flex-col items-center justify-center
                   bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2d2d2d] z-50"
      >
        <div className="absolute inset-0 z-0">
          <Spinner />
          <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full
                          mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500 rounded-full
                          mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        </div>
        <div className="w-16 h-16 border-4 border-t-transparent border-pink-500 rounded-full animate-spin"></div>
        <p className="mt-6 text-lg text-gray-300 font-semibold tracking-wide">
          Logging in with GitHub...
        </p>
      </motion.section>
    );
  }

  return null;
}


import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Context } from '@/components/modules/Context';
import MetaData from '../noPage/MetaData';
import Spinner from '@/components/spinner/Spinner';

export default function DeleteProfile() {
  const BACKEND_URL = import.meta.env.VITE_URL_BACKEND;

  const { userLogin, isLoggedIn, setIsLoggedIn, setUserLogin } =
    useContext(Context);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setLoading(true);

      // Retrieve token (e.g. from localStorage or context)
      const token = localStorage.getItem('token');

      if (!token) {
        Swal.fire({
          title: 'Error!',
          text: 'You must be logged in to delete your account.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        setLoading(false);
        return;
      }

      const res = await axios.delete(`${BACKEND_URL}/users/me/delete`, {
        headers: {
          Authorization: `Bearer ${token}`, // send token in header
        },
      });

      Swal.fire({
        title: 'Success!',
        text: res.data.message || 'Your account has been deleted successfully.',
        icon: 'success',
        confirmButtonText: 'Home page',
      }).then(() => {
        setUserLogin({});
        setIsLoggedIn(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        navigate('/', { replace: true });
      });
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.errors?.[0]?.msg ||
        err?.response?.data?.error ||
        err?.message ||
        'An error occurred. Please try again.';

      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Ok',
      });

      setLoading(false);
    }
  };

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Use Cases'
        description='Explore practical applications of TerraQuake API for earthquake monitoring, seismic data analysis, early warning systems, and disaster prevention — designed for developers, researchers, and organizations.'
        ogTitle='Use Cases - TerraQuake API'
        ogDescription='Discover how developers, researchers, and organizations use TerraQuake API to monitor earthquakes, analyze seismic data, and improve disaster preparedness.'
        twitterTitle='Use Cases - TerraQuake API'
        twitterDescription='Explore real-world applications of TerraQuake API for earthquake monitoring, seismic data, early warning systems, and disaster prevention.'
        keywords='TerraQuake API, use cases, earthquake monitoring API, seismic data, early warning systems, disaster prevention'
      />
      {/* SEO Stuff */}

      <section className='text-left py-4'>
        {isLoggedIn ? (
          <div className='flex flex-col items-center gap-4 mt-20'>
            <p className='text-2xl text-center pt-5 text-gray-300 max-w-max'>
              We’re truly sorry to see you go. Deleting your account is a
              permanent action and will remove all of your data.
            </p>
            <p className='text-xl text-center text-gray-300 max-w-max'>
              If there’s anything we can do to improve your experience, we’d
              love to hear your feedback before you leave.
            </p>
            <button
              onClick={handleDelete}
              disabled={loading}
              className='mt-6 w-auto py-3 px-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-semibold text-lg shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer disabled:opacity-50'
              aria-label='Delete your account'
            >
              {loading ? <Spinner /> : 'Delete account'}
            </button>
          </div>
        ) : (
          <div className='flex flex-col items-center gap-4 mt-20'>
            <p className='text-2xl text-center text-gray-300 max-w-lg'>
              To delete your profile page, you need to be registered. If you
              already have an account, please sign in. Otherwise, create a new
              account to get started.
            </p>
            <div className='flex gap-4 mt-4'>
              <button
                onClick={() => navigate('/signin')}
                className='py-3 px-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer'
                aria-label='Navigate to sign in page'
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className='py-3 px-8 rounded-full bg-gradient-to-r from-pink-600 to-purple-700 text-white font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer'
                aria-label='Navigate to sign up page'
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Context } from '@/components/modules/Context';
import MetaData from '../noPage/MetaData';
import Spinner from '@/components/spinner/Spinner';
import axios from '@/config/Axios.js';

export default function DeleteProfile() {
  const { userLogin, isLoggedIn, setIsLoggedIn, setUserLogin } =
    useContext(Context);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setLoading(true);

      // Retrieve token from localStorage
      const token = localStorage.getItem('token');

      // If no token is found, show an error alert
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

      // Ask for confirmation before performing the delete request
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      // If the user cancels, stop the process
      if (!result.isConfirmed) {
        setLoading(false);
        return;
      }

      // Perform account deletion request
      const response = await axios.delete(`/users/me/delete`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in authorization header
        },
      });

      // Show success message after account deletion
      await Swal.fire({
        title: 'Deleted!',
        text:
          response.data.message ||
          'Your account has been deleted successfully.',
        icon: 'success',
        confirmButtonText: 'Home page',
      });

      // Clear user session and redirect to home
      setUserLogin({});
      setIsLoggedIn(false);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/', { replace: true });
    } catch (error) {
      // Handle possible errors and display them
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.error ||
        error?.message ||
        'An error occurred. Please try again.';
      console.log(errorMessage);
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } finally {
      // Always stop loading, regardless of the result
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return <AccessRestricted />;
  }

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

      <section className='col-span-1 lg:col-span-2 bg-black/30 backdrop-blur-xl border border-pink-500/10 rounded-2xl shadow-lg p-6 sm:p-8 mt-6'>
        <div className='flex flex-col items-center gap-4 mt-20'>
          <p className='text-2xl text-center pt-5 text-gray-300'>
            We’re truly sorry to see you go. Deleting your account is a
            permanent action and will remove all of your data.
          </p>
          <p className='text-xl text-center text-gray-300'>
            If there’s anything we can do to improve your experience, we’d love
            to hear your feedback before you leave.
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
      </section>
    </>
  );
}

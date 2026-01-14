import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import MetaData from '../noPage/MetaData';
import axios from '@/config/Axios.js';

export default function DeleteReview({ reviewId, refetchTestimonials }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteReview = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('token');

      if (!token) {
        Swal.fire({
          title: 'Authentication Required',
          text: 'You need to be logged in to delete your review.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        setLoading(false);
        return;
      }

      const result = await Swal.fire({
        title: 'Delete Review?',
        text: 'This action is permanent and cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#555',
        confirmButtonText: 'Yes, delete review',
      });

      if (!result.isConfirmed) {
        setLoading(false);
        return;
      }

      const response = await axios.delete(
        `/testimonials/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await Swal.fire({
        title: 'Review Deleted',
        text:
          response.data.message || 'Your review has been removed successfully.',
        icon: 'success',
        confirmButtonText: 'Return to Profile',
      });

      navigate('/profile', { replace: true });
      await refetchTestimonials();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.error ||
        error?.message ||
        'Something went wrong. Please try again.';

      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } finally {
      setLoading(false);
    }
  };

  // Scroll to top when review changes
  useEffect(() => {
    if (loading) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [loading]);

  return (
    <>
      {/* SEO Stuff */}
      <MetaData
        title='Delete Review | TerraQuake API'
        description='Remove your submitted review from TerraQuake API. Your feedback is always appreciated, and you can update or submit a new one anytime.'
        ogTitle='Delete Review - TerraQuake API'
        ogDescription='Remove your TerraQuake API testimonial from your profile.'
        twitterTitle='Delete Review - TerraQuake API'
        twitterDescription='Delete your review from TerraQuake API safely and easily.'
        keywords='delete review TerraQuake, remove testimonial, TerraQuake profile review'
      />
      {/* SEO Stuff */}

      <button
        onClick={() => handleDeleteReview()}
        className='w-26 border border-pink-400 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 transition-all duration-300 text-white font-semibold py-2 px-6 rounded-full cursor-pointer text-sm sm:text-base'
      >
        Delete
      </button>
    </>
  );
}

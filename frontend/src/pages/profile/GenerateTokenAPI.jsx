import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function GenerateTokenAPI() {
  const [loading, setLoading] = useState(false);

  const handleGenerateToken = () => {
    setLoading(true);
    Swal.fire({
      title: 'Coming Soon!',
      text: 'API Token generation feature will be available soon.',
      icon: 'info',
      confirmButtonColor: '#ec4899',
    });
    setLoading(false);
  };

  return (
    <div className='text-center mt-10'>
      <h2 className='text-lg sm:text-xl font-semibold text-purple-400'>
        Generate API Token
      </h2>
      <button
        onClick={handleGenerateToken}
        className='mt-4 py-2 sm:py-3 px-8 sm:px-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-semibold text-sm sm:text-base shadow-lg hover:scale-105 transition duration-300 cursor-pointer'
      >
        {loading ? <Spinner /> : <span>Generate Token</span>}
      </button>
    </div>
  );
}

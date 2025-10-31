import axios from '@config/Axios.js';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Context } from '@components/modules/Context';
import Spinner from '@/components/spinner/Spinner';

export default function Logout() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserLogin, setIsLoggedIn } = useContext(Context);
  const token = localStorage.getItem('token');
  
  const handleLogoutSubmit = async () => {
    try {
      setLoading(true);

      if (!token) {
        throw new Error('No token found. Please log in again.');
      }

      const res = await axios.post(
        `/auth/logout`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Rimuove i dati utente e token dal client
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUserLogin({});
      setIsLoggedIn(false);

      Swal.fire({
        title: 'Logged Out!',
        text: res.data.message || 'You have been logged out successfully.',
        icon: 'success',
        confirmButtonColor: '#9333ea',
      }).then(() => {
        navigate('/', { replace: true });
      });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        'Logout failed. Please try again.';

      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogoutSubmit}
      disabled={loading}
      className='mt-6 py-2 sm:py-3 px-6 sm:px-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-semibold text-sm sm:text-base shadow-lg hover:scale-105 transition duration-300 cursor-pointer disabled:opacity-60'
    >
      {loading ? (
        <Spinner />
      ) : (
        <span className='text-white'>Logout</span>
      )}
    </button>
  );
}

import api from '@config/Axios.js';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Context } from '@components/modules/Context';
import Spinner from '@/components/spinner/Spinner';
import { useTranslation } from 'react-i18next';

export default function Logout() {
  const { t } = useTranslation('translation');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserLogin, setIsLoggedIn, isLoggedIn } = useContext(Context);
  const token = localStorage.getItem('token');
  
  const handleLogoutSubmit = async () => {
    try {
      setLoading(true);

      if (!token) {
        throw new Error(t('logout.error_token'));
      }

      const res = await api.post(
        `/auth/logout`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: t('logout.title_logout'),
        text: res.data.message || t('logout.logout_successfully'),
        icon: 'success',
        confirmButtonColor: '#9333ea',
      }).then(() => {
        // Rimuove i dati utente e token dal client
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setTimeout(() => {
          navigate('/', { replace: true });
          setUserLogin({});
          setIsLoggedIn(false);
        }, 500);
      });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        t('logout.logout_failure');

      Swal.fire({
        title: t('logout.logout_error'),
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
        <span className='text-white'>
          {t('logout.button_logout')}
        </span>
      )}
    </button>
  );
}

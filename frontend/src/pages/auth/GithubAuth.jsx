import { Context } from '@/components/modules/Context';
import { useEffect, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '@config/Axios.js';
import Spinner from '@/components/spinner/Spinner';
import { useTranslation } from 'react-i18next';

export default function GithubAuth() {
  const { t } = useTranslation('translation');

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
        }).then(() => navigate('/signin', { replace: true }));
      } else {
        // Token is missing without a backend message
        Swal.fire({
          title: 'Error!',
          text: 'No token received. Please try signing in again.',
          icon: 'error',
          confirmButtonText: 'Ok',
        }).then(() => navigate('/signin', { replace: true }));
      }
      return;
    }

    // Save JWT token in localStorage
    localStorage.setItem('token', token);

    // Fetch user data from backend using the token
    axios
      .get(`/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const { payload } = response.data;
        if (payload) {
          // Save user info in localStorage and update context
          localStorage.setItem('user', JSON.stringify(payload));
          setUserLogin(payload);
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
      .catch((error) => {
        console.error('Axios fetch user error:', error);
        Swal.fire({
          title: 'Error!',
          text: message || 'Failed to fetch user data',
          icon: 'error',
          confirmButtonText: 'Ok',
        }).then(() => navigate('/signin', { replace: true }));
      })
      .finally(() => setLoading(false));
  }, [search, navigate, setIsLoggedIn, setUserLogin]);

  // Show loading screen while fetching token and user data
  if (loading) {
    return (
      <section className='z-30 w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b text-white'>
        <Spinner />
        <p className='mt-6 mx-auto md:text-xl text-gray-300'>
          {t('github_auth.logging')}
        </p>
      </section>
    );
  }

  return (
    <section className='z-30 w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b text-white'>
      <h1 className='text-2xl md:text-4xl mx-auto font-extrabold leading-tight mt-[50px] select-none'>
        {t('github_auth.login_github')}
      </h1>
    </section>
  );
}

import { Context } from '@/components/modules/context';
import { useEffect, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function GithubAuth() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { setUserLogin, setIsLoggedIn } = useContext(Context);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_URL_BACKEND;

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(search);
    const token = params.get('token');
    const message = params.get('message');

    if (token) {
      localStorage.setItem('token', token);

      fetch(`${BACKEND_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.user) {
            localStorage.setItem('user', JSON.stringify(data.user));

            setUserLogin(data.user);
            setIsLoggedIn(true);

            Swal.fire({
              title: 'Success!',
              text: message || 'Login with GitHub successful!',
              icon: 'success',
              confirmButtonText: 'Profile',
            }).then(() => {
              setLoading(false);
              navigate('/profile', { replace: true });
            });
          } else {
            throw new Error('Invalid user data');
          }
        })
        .catch((err) => {
          const errorMessage =
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            err.message ||
            'Login failed. Please try again.';

          Swal.fire({
            title: 'Error!',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'Ok',
          }).then(() => {
            navigate('/signin');
            setLoading(false);
          });
        });
    } else {
      setLoading(false);
      navigate('/signin');
    }
  }, [search, navigate, BACKEND_URL, setUserLogin, setIsLoggedIn]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2d2d2d] z-50">
        <div className="w-16 h-16 border-4 border-t-transparent border-pink-500 rounded-full animate-spin"></div>
        <p className="mt-6 text-lg text-gray-300 font-semibold tracking-wide">
          Logging in with GitHub...
        </p>
      </div>
    );
  }

  return null; 
}

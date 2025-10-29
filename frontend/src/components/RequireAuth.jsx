import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '@components/modules/Context';

export default function RequireAuth({ children, requiredRole = null }) {
  const { userLogin, isLoggedIn } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    // Transform role into array if it isn't already
    const roles = userLogin
      ? Array.isArray(userLogin.role)
        ? userLogin.role
        : [userLogin.role]
      : [];

    // Authentication check
    if (!userLogin || !isLoggedIn) {
      navigate('/signin', { replace: true });
      return;
    }

    // No user logged in → redirects to the home page
    if (!userLogin || !userLogin.role) {
      navigate('/', { replace: true });
      return;
    }

    // Role control
    if (requiredRole && !roles.includes(requiredRole)) {
      navigate('/no-access', { replace: true });
      return;
    }
  }, [isLoggedIn, userLogin, navigate, requiredRole]);

  return children;
}

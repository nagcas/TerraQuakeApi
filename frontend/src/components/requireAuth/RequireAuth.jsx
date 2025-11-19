import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '@components/modules/Context';
import Spinner from '../spinner/Spinner';

export default function RequireAuth({ children, requiredRole = null }) {
  const { userLogin, isLoggedIn, isLoadingUser } = useContext(Context);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isLoadingUser) return;

    if (!isLoggedIn || !userLogin) {
      navigate('/signin', { replace: true });
      return;
    }

    const roles = Array.isArray(userLogin.role)
      ? userLogin.role
      : [userLogin.role];

    if (requiredRole && !roles.includes(requiredRole)) {
      navigate('/no-access', { replace: true });
      return;
    }

    setChecked(true);
  }, [isLoggedIn, userLogin, requiredRole, navigate, isLoadingUser]);

  if (isLoadingUser || !checked) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <Spinner size='4xl'/>
        Loading...
      </div>
    );
  }

  return children;
}

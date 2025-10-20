import { useState, useEffect } from 'react';
import { Context } from './Context';

export const AuthProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Al primo render recupera user e token da localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === 'object') {
          setUserLogin(parsedUser);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.warn('Invalid user in localStorage:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <Context.Provider
      value={{
        userLogin,
        setUserLogin,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </Context.Provider>
  );
};

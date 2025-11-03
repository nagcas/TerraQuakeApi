import React, { useEffect, useState } from 'react';
import axios from '@/config/Axios.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function useUsers(initialPage = 1, initialLimit = 20) {
  const navigate = useNavigate();

  const [loadingUser, setLoadingUser] = useState(false);
  const [errorUser, setErrorUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentPageUser, setCurrentPageUser] = useState(initialPage);
  const [totalPagesUsers, setTotalPagesUsers] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(initialLimit);

  const token = localStorage.getItem('token');

   useEffect(() => {
    listAllUsers();
  }, [currentPageUser, usersPerPage]);

  const listAllUsers = async () => {
    setLoadingUser(true);
    setErrorUser(null);
    try {
      const response = await axios.get(`/users/list-all-users`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPageUser,
          limit: usersPerPage,
        },
      });

      const { payload } = response.data;

      setUsers(payload.users);
      setTotalPagesUsers(payload.pagination.totalPages);
      setTotalUsers(payload.pagination.totalResults);
    } catch (error) {
      setErrorUser(error);
      setLoadingUser(false);

      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch users data. Please ensure the backend server is running.',
        icon: 'error',
        confirmButtonText: 'Ok',
      }).then(() => {
        setTimeout(() => navigate('/admin', { replace: true }), 0);
      });
    } finally {
      setLoadingUser(false);
    }
  };

  return {
    users,
    totalUsers,
    totalPagesUsers,
    currentPageUser,
    setCurrentPageUser,
    usersPerPage,
    loadingUser,
    errorUser,
  };
}

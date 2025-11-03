import React, { useEffect, useState } from 'react';
import axios from '@/config/Axios.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function useUsers(initialPage = 1, initialLimit = 20) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(initialLimit);

  const token = localStorage.getItem('token');

   useEffect(() => {
    listAllUsers();
  }, [currentPage, usersPerPage]);

  const listAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/users/list-all-users`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit: usersPerPage,
        },
      });

      const { payload } = response.data;

      setUsers(payload.users);
      setTotalPages(payload.pagination.totalPages);
      setTotalUsers(payload.pagination.totalResults);
    } catch (error) {
      setError(error);
      setLoading(false);

      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch users data. Please ensure the backend server is running.',
        icon: 'error',
        confirmButtonText: 'Ok',
      }).then(() => {
        setTimeout(() => navigate('/admin', { replace: true }), 0);
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    totalUsers,
    totalPages,
    currentPage,
    setCurrentPage,
    usersPerPage,
    loading,
    error,
  };
}

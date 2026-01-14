import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from '@/config/Axios.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Context } from '@/components/modules/Context';

export default function useMessages(initialPage = 1, initialLimit = 5) {
  const { isLoggedIn } = useContext(Context);

  const navigate = useNavigate();

  const [loadingMessage, setLoadingMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentPageMessage, setCurrentPageMessage] = useState(initialPage);
  const [totalPagesMessages, setTotalPagesMessages] = useState(null);
  const [totalMessages, setTotalMessages] = useState(0);
  const [messagesPerPage, setMessagesPerPage] = useState(initialLimit);

  const token = localStorage.getItem('token');

  const listAllMessages = useCallback(async () => {
    if (!isLoggedIn || !token) {
      setMessages([]);
      setLoadingMessage(false);
      setErrorMessage(null);
      return;
    }

    setLoadingMessage(true);
    setErrorMessage(null);
    try {
      const response = await axios.get(`/contact`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPageMessage,
          limit: messagesPerPage,
        },
      });

      const { payload } = response.data;

      setMessages(payload.contacts);
      setTotalPagesMessages(payload.pagination.totalPages);
      setTotalMessages(payload.pagination.totalResults);
    } catch (error) {
      setErrorMessage(error);

      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch messages data. Please ensure the backend server is running.',
        icon: 'error',
        confirmButtonText: 'Ok',
      }).then(() => {
        setTimeout(() => navigate('/admin', { replace: true }), 0);
      });
    } finally {
      setLoadingMessage(false);
    }
  }, [currentPageMessage, messagesPerPage, token, navigate]);

  useEffect(() => {
    listAllMessages();
  }, [listAllMessages]);

  return {
    messages,
    totalMessages,
    totalPagesMessages,
    currentPageMessage,
    setCurrentPageMessage,
    messagesPerPage,
    loadingMessage,
    errorMessage,
  };
}

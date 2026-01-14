import React, { useCallback, useEffect, useState } from 'react';
import axios from '@/config/Axios.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function useMessages(initialPage = 1, initialLimit = 5) {
  const navigate = useNavigate();

  const [loadingFaq, setLoadingFaq] = useState(false);
  const [errorFaq, setErrorFaq] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [currentPageFaq, setCurrentPageFaq] = useState(initialPage);
  const [totalPagesFaqs, setTotalPagesFaqs] = useState(null);
  const [totalFaqs, setTotalFaqs] = useState(0);
  const [faqsPerPage, setFaqsPerPage] = useState(initialLimit);

  const token = localStorage.getItem('token');

  const listAllFaqs = useCallback(async () => {
    setLoadingFaq(true);
    setErrorFaq(null);
    try {
      const response = await axios.get(`/faqs`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPageFaq,
          limit: faqsPerPage,
        },
      });

      const { payload } = response.data;

      setFaqs(payload.faqs);
      setTotalPagesFaqs(payload.pagination.totalPages);
      setTotalFaqs(payload.pagination.totalResults);
    } catch (error) {
      setErrorFaq(error);

      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch faqs data. Please ensure the backend server is running.',
        icon: 'error',
        confirmButtonText: 'Ok',
      }).then(() => {
        setTimeout(() => navigate('/admin', { replace: true }), 0);
      });
    } finally {
      setLoadingFaq(false);
    }
  }, [currentPageFaq, faqsPerPage, token, navigate]);

  useEffect(() => {
    listAllFaqs();
  }, [listAllFaqs]);

  return {
    faqs,
    totalFaqs,
    totalPagesFaqs,
    currentPageFaq,
    setCurrentPageFaq,
    faqsPerPage,
    loadingFaq,
    errorFaq,
  };
}
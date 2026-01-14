import React, { useCallback, useEffect, useState } from 'react';
import axios from '@/config/Axios.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function useTestimonials(initialPage = 1, initialLimit = 20) {
  const navigate = useNavigate();

  const [loadingTestimonial, setLoadingTestimonial] = useState(false);
  const [errorTestimonial, setErrorTestimonial] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [currentPageTestimonial, setCurrentPageTestimonial] =
    useState(initialPage);
  const [totalPagesTestimonials, setTotalPagesTestimonials] = useState(null);
  const [totalTestimonials, setTotalTestimonials] = useState(0);
  const [testimonialsPerPage, setTestimonialsPerPage] = useState(initialLimit);

  const listAllTestimonials = useCallback(async () => {
    setLoadingTestimonial(true);
    setErrorTestimonial(null);
    try {
      const response = await axios.get(`/testimonials`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          page: currentPageTestimonial,
          limit: testimonialsPerPage,
        },
      });

      const { payload } = response.data;

      setTestimonials(payload.testimonials);
      setTotalPagesTestimonials(payload.pagination.totalPages);
      setTotalTestimonials(payload.pagination.totalResults);
    } catch (error) {
      setErrorTestimonial(error);

      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch testimonials data. Please ensure the backend server is running.',
        icon: 'error',
        confirmButtonText: 'Ok',
      }).then(() => {
        setTimeout(() => navigate('/', { replace: true }), 0);
      });
    } finally {
      setLoadingTestimonial(false);
    }
  }, [currentPageTestimonial, testimonialsPerPage, navigate]);

  useEffect(() => {
    listAllTestimonials();
  }, [listAllTestimonials]);

  return {
    testimonials,
    totalTestimonials,
    totalPagesTestimonials,
    currentPageTestimonial,
    setCurrentPageTestimonial,
    testimonialsPerPage,
    loadingTestimonial,
    errorTestimonial,
    listAllTestimonials,
  };
}

import React, { useEffect, useState } from 'react';
import axios from '@/config/Axios.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function usePosts(initialPage = 1, initialLimit = 20) {
  const navigate = useNavigate();

  const [loadingPost, setLoadingPost] = useState(false);
  const [errorPost, setErrorPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [currentPagePost, setCurrentPagePost] = useState(initialPage);
  const [totalPagesPosts, setTotalPagesPosts] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(initialLimit);

  const token = localStorage.getItem('token');

   useEffect(() => {
    listAllPosts();
  }, [currentPagePost, postsPerPage]);

  const listAllPosts = async () => {
    setLoadingPost(true);
    setErrorPost(null);
    try {
      const response = await axios.get(`/posts/list-all-posts`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPagePost,
          limit: postsPerPage,
        },
      });

      const { payload } = response.data;

      setPosts(payload.posts);
      setTotalPagesPosts(payload.pagination.totalPages);
      setTotalPosts(payload.pagination.totalResults);
    } catch (error) {
      setErrorPost(error);
      setLoadingPost(false);

      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch posts data. Please ensure the backend server is running.',
        icon: 'error',
        confirmButtonText: 'Ok',
      }).then(() => {
        setTimeout(() => navigate('/admin', { replace: true }), 0);
      });
    } finally {
      setLoadingPost(false);
    }
  };

  return {
    posts,
    totalPosts,
    totalPagesPosts,
    currentPagePost,
    setCurrentPagePost,
    postsPerPage,
    loadingPost,
    errorPost,
  };
}
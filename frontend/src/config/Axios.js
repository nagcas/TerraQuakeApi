import axios from 'axios';

const BASE_URL = import.meta.env.VITE_URL_BACKEND;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Alter defaults after instance has been created
// api.defaults.headers.common["Authorization"] = AUTH_TOKEN;

export default api;

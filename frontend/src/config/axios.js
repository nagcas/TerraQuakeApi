import axios from "axios";
import { emitLoadingInc, emitLoadingDec, toastError, toastSuccess } from "@components/modules/notifyBus";

const BASE_URL = import.meta.env.VITE_URL_BACKEND;

const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true
});

// Request interceptor: bump global loading counter and attach auth token if any
api.interceptors.request.use((config) => {
	// Request-level flags
	const disableLoading = config?.meta?.disableLoading === true;
	if (!disableLoading) emitLoadingInc();
	try {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers = config.headers || {};
			config.headers['Authorization'] = `Bearer ${token}`;
		}
	} catch {
		console.error('Error in request interceptor');
	}
	return config;
}, (error) => {
	emitLoadingDec();
	console.error('Error in request interceptor');
	return Promise.reject(error);
});

// Response interceptor: lower loading counter and handle errors centrally
api.interceptors.response.use((response) => {
	const disableLoading = response?.config?.meta?.disableLoading === true;
	if (!disableLoading) emitLoadingDec();
	// Success message if requested
	const successMessage = response?.config?.meta?.successMessage;
	if (successMessage) {
		toastSuccess(successMessage);
	}
 	return response;
}, (error) => {
	const disableLoading = error?.config?.meta?.disableLoading === true;
	if (!disableLoading) emitLoadingDec();
	// Derive a user-friendly message
	const message = error?.response?.data?.message
		|| error?.response?.data?.errors?.[0]?.msg
		|| error?.response?.data?.error
		|| error?.message
		|| 'Request failed. Please try again.';

	// 401 handling: optional sign-out behavior can be added by pages
	if (error?.response?.status === 401) {
		toastError('Your session has expired. Please sign in again.');
	}
	else if (error?.response?.status >= 500) {
		toastError('Server error. Please try again later.');
	}
	else {
		const disableToast = error?.config?.meta?.disableToast === true;
		if (!disableToast) toastError(message);
	}

	return Promise.reject(error);
});

export default api;
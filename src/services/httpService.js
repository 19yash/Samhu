// src/services/httpService.js
import axios from 'axios';
import { toast } from 'react-toastify';

// baseURL: `${process.env.REACT_APP_BASE_URL}`, // Replace with your base API URL
// Configure the base URL
const axiosInstance = axios.create({
  baseURL:
    'https://c638-2401-4900-5f1a-cecf-eaa9-4865-1d12-cdea.ngrok-free.app/api/v1', // Replace with your base API URL
  timeout: 30000, // Optional: Set a timeout for requests
  withCredentials: true, // Include credentials with requests
  headers: {
    'ngrok-skip-browser-warning': true, // Include this header to bypass ngrok's browser warning
  },
});

const httpService = {
  get: async (endpoint, params = {}) => {
    try {
      const response = await axiosInstance.get(endpoint, { params });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  post: async (endpoint, body = {}, config = {}) => {
    try {
      const response = await axiosInstance.post(endpoint, body, config);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ post: ~ error:', error);
      handleError(error);
    }
  },

  put: async (endpoint, body = {}, config = {}) => {
    try {
      const response = await axiosInstance.put(endpoint, body, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  delete: async (endpoint, config = {}) => {
    try {
      const response = await axiosInstance.delete(endpoint, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

// Error handling function
const handleError = (error) => {
  console.log('🚀 ~ handleError ~ error:', error);
  if (error.code === 'ERR_NETWORK') {
    toast.error('Please check your internet connection');
  } else {
    toast.error(error?.response?.data?.error);
  }
  // if (error.response) {
  //   console.error('Error Response:', error.response.data);
  // } else if (error.request) {
  //   console.error('No Response:', error.request);
  // } else {
  //   console.error('Error', error.message);
  // }
  // toast;
  return { message: 'error' };
};

export default httpService;

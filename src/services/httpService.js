// src/services/httpService.js
import axios from 'axios';
import { toast } from 'react-toastify';
import { globalClearAuth } from '../screens/GlobalFunction';

// baseURL: `${process.env.REACT_APP_BASE_URL}`, // Replace with your base API URL
// Configure the base URL
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`, // Replace with your base API URL
  timeout: 30000, // Optional: Set a timeout for requests
  withCredentials: true, // Include credentials with requests
  headers: {
    'ngrok-skip-browser-warning': true, // Include this header to bypass ngrok's browser warning
  },
});

export default class httpService {
  static async handleError(error) {
    console.log('🚀 ~ handleError ~ error:', error);
    if (error?.response?.status === 401) {
      console.log('401', globalClearAuth);
      globalClearAuth();
    }
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
  }
  static async get(endpoint, params = {}) {
    try {
      const response = await axiosInstance.get(endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  static async post(endpoint, body = {}, config = {}) {
    try {
      const isFormData = body instanceof FormData;

      // Merge headers for FormData if necessary
      const updatedConfig = {
        ...config,
        headers: {
          ...config.headers,
          ...(isFormData ? { 'Content-Type': 'multipart/form-data' } : {}),
        },
      };
      const response = await axiosInstance.post(endpoint, body, updatedConfig);
      return response.data;
    } catch (error) {
      console.log('🚀 ~ post: ~ error:', error);
      this.handleError(error);
    }
  }

  static async put(endpoint, body = {}, config = {}) {
    try {
      const response = await axiosInstance.put(endpoint, body, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  static async delete(endpoint, config = {}) {
    try {
      const response = await axiosInstance.delete(endpoint, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

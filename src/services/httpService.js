// src/services/httpService.js
import axios from 'axios';

// Configure the base URL
const axiosInstance = axios.create({
  baseURL: 'https://404a-43-204-148-133.ngrok-free.app/api/v1', // Replace with your base API URL
  // baseURL: `${process.env.REACT_APP_BASE_URL}`, // Replace with your base API URL
  timeout: 30000, // Optional: Set a timeout for requests
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
  // if (error.response) {
  //   console.error('Error Response:', error.response.data);
  // } else if (error.request) {
  //   console.error('No Response:', error.request);
  // } else {
  //   console.error('Error', error.message);
  // }
  return error;
};

export default httpService;

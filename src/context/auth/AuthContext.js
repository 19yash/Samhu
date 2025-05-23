import { createContext } from 'react';

// Define the initial state
export const initialState = JSON.parse(localStorage.getItem('auth')) || {
  user: null,
  loading: true,
  isAuthenticated: false,
};

// Actions
export const SET_AUTH = 'SET_AUTH';
export const CLEAR_AUTH = 'CLEAR_AUTH';
export const SET_LOADING = 'SET_LOADING';
export const SESSION_TIME_OUT = 'SESSION_TIMEOUT';

// Define the reducer function
export const authReducer = (state, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload,
        loading: false,
      };
    case CLEAR_AUTH:
      localStorage.removeItem('auth');
      return {
        ...initialState,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload, // Set loading state
      };
    case SESSION_TIME_OUT:
      return {
        ...initialState,
        loading: false,
        isSessionTimeOut: true,
      };
    default:
      return state;
  }
};

// Create the context
export const AuthContext = createContext();

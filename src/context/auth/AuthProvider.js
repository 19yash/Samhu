import React, { useReducer } from 'react';
import {
  AuthContext,
  CLEAR_AUTH,
  SESSION_TIME_OUT,
  SET_AUTH,
  SET_LOADING,
  authReducer,
  initialState,
} from './AuthContext';

export const AuthProvider = (props) => {
  const { children } = props || {};
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setAuth = (payload) => {
    console.log('payload', payload);
    localStorage.setItem(
      'auth',
      JSON.stringify({ ...payload, isAuthenticated: true })
    );
    dispatch({ type: SET_AUTH, payload });
  };

  const clearAuth = () => {
    localStorage.removeItem('auth');
    dispatch({ type: CLEAR_AUTH });
  };

  const setLoading = (isLoading) => {
    dispatch({ type: SET_LOADING, payload: isLoading });
  };

  const sessionTimeOut = () => {
    dispatch({ type: SESSION_TIME_OUT });
  };

  const authContextValue = {
    state,
    dispatch,
    setAuth,
    clearAuth,
    setLoading,
    sessionTimeOut,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

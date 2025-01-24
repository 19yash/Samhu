import React, { useContext, useEffect } from 'react';
import AppSideBar from '../modules/components/sidebar/AppSideBar';
import { Content, DefaultLayoutStyle } from './DefaultLayout.style';
import AppContent from './AppContent';
import AppHeader from './AppHeader';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../modules/auth/hooks/useAuth';
import { AuthContext } from '../context/auth/AuthContext';
import { setGlobalClearAuth } from './GlobalFunction';

export const DefaultLayout = (props) => {
  const { user } = useAuth();
  const { clearAuth } = useContext(AuthContext);
  useEffect(() => {
    setGlobalClearAuth(clearAuth);
  });
  if (!user) {
    console.log('returning');
    return <Navigate to="/login" />;
  }
  return (
    <DefaultLayoutStyle>
      <AppSideBar />
      <Content>
        <AppHeader />
        <AppContent />
      </Content>
    </DefaultLayoutStyle>
  );
};

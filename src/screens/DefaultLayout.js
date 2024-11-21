import React from 'react';
import AppSideBar from '../modules/components/sidebar/AppSideBar';
import { Content, DefaultLayoutStyle } from './DefaultLayout.style';
import AppContent from './AppContent';
import AppHeader from './AppHeader';
import { Navigate } from 'react-router-dom';

export const DefaultLayout = (props) => {
  // later pick from context
  console.log('DEfault ###');
  const isAuthenticated = true;
  if (!isAuthenticated) {
    console.log('returning');
    return <Navigate to="/" />;
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

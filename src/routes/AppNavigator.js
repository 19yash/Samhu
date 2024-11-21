import React from 'react';
import { DefaultLayout } from '../screens/DefaultLayout.js';
import { Home } from '../screens/Home.js';
import LoginForm from '../modules/auth/screens/login.js';
import SignUpForm from '../modules/auth/screens/singup.js';
import { useRoutes } from 'react-router-dom';

export const AppNavigator = () => {
  const routes = useRoutes([
    {
      path: '/Home',
      element: <Home />,
    },
    {
      path: '/login',
      element: <LoginForm />,
    },
    {
      path: '/singup',
      element: <SignUpForm />,
    },
    {
      path: '/app/*',
      element: <DefaultLayout />,
    },
  ]);
  return routes;
};

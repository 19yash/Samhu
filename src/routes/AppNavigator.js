import React from 'react';
import { DefaultLayout } from '../screens/DefaultLayout.js';
import LoginForm from '../modules/auth/screens/login.js';
import SignUpForm from '../modules/auth/screens/singup.js';
import { useRoutes } from 'react-router-dom';
import ForgotPassword from '../modules/auth/screens/ForgotPassword.js';
import ConfirmOtp from '../modules/auth/screens/ConfirmOtp.js';
import { Home } from '../screens/Home/Home.js';
import About from '../screens/About/About.js';
import EventPage from '../screens/Event/Event.js';
import ContactUs from '../screens/Contact/Contact.js';
import ResetPassword from '../modules/auth/screens/ResetPassword.js';

export const AppNavigator = () => {
  const routes = useRoutes([
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/events',
      element: <EventPage />,
    },
    {
      path: '/contactUs',
      element: <ContactUs />,
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
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/confirm-otp',
      element: <ConfirmOtp />,
    },
    {
      path: '/reset-password',
      element: <ResetPassword />,
    },
    {
      path: '/*',
      element: <Home />,
    },
    {
      path: '/app/*',
      element: <DefaultLayout />,
    },
  ]);
  return routes;
};

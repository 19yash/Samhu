import Event from '../../event/Event';
import Sports from '../../sports/screens/Sports';
import React from 'react';
import Dashboard from '../Dashboard';
import Settings from '../Settings';
import SportsForm from '../../sports/screens/SportsForm';
import PaymentSuccess from '../../../screens/PaymentSuccess';
import Users from '../../../screens/Users';
import UserDetails from '../../../screens/UserDetails';

const DasboardRoutes = [
  {
    name: 'Events',
    path: '/events',
    element: <Event />,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    name: 'Sports',
    path: '/sports',
    element: <Sports />,
    children: [
      {
        name: 'Add Sports',
        path: 'add-sports',
        element: <SportsForm />,
      },
      {
        name: 'Edit Sports',
        path: '/sports/:sportsId/edit',
        element: <SportsForm />,
      },
    ],
  },
  {
    name: 'Settings',
    path: '/settings',
    element: <Settings />,
  },
  {
    name: 'payment',
    path: '/paymentSuccess',
    element: <PaymentSuccess />,
  },
  {
    name: 'Users',
    path: '/users',
    element: <Users />,
    children: [
      {
        name: 'User Details',
        path: 'users-details/:userId',
        element: <UserDetails />,
      },
    ],
  },
];

export default DasboardRoutes;

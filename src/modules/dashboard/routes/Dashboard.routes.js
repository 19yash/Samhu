import Event from '../../event/Event';
import Sports from '../../sports/screens/Sports';
import React from 'react';
import Dashboard from '../Dashboard';
import SportsForm from '../../sports/screens/SportsForm';

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
    ],
  },
];

export default DasboardRoutes;

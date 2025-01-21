import Event from '../../event/Event';
import Sports from '../../sports/screens/Sports';
import React from 'react';
import Dashboard from '../Dashboard';

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
  },
];

export default DasboardRoutes;

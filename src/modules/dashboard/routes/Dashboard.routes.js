import Event from '../../event/Event';
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
];

export default DasboardRoutes;

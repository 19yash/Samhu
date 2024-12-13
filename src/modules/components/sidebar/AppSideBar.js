import { cilSpeedometer, cilPuzzle, cilSettings, cilUser } from '@coreui/icons';
import Sidenav from './Sidenav';

const navItems = [
  {
    name: 'Dashboard',
    icon: cilSpeedometer,
    path: '/app/dashboard',
  },
  {
    name: 'Events',
    icon: cilSettings,
    path: '/app/events',
    // children: [
    //   {
    //     name: 'Users',
    //     icon: cilUser,
    //     path: '/management/users',
    //   },
    //   {
    //     name: 'Settings',
    //     icon: cilSettings,
    //     children: [
    //       {
    //         name: 'Preferences',
    //         icon: cilPuzzle,
    //         path: '/management/settings/preferences',
    //       },
    //       {
    //         name: 'Security',
    //         icon: cilPuzzle,
    //         path: '/management/settings/security',
    //       },
    //     ],
    //   },
    // ],
  },
  {
    name: 'Sports',
    icon: cilPuzzle,
    path: '/app/sports',
  },
];

function AppSideBar() {
  return <Sidenav navItems={navItems} brandName="Samuh" />;
}

export default AppSideBar;

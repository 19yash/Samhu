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
  return (
    <div className="App" style={{ backgroundColor: '#ffdbbb' }}>
      <Sidenav navItems={navItems} brandName="MyApp" />
      {/* Other components like main content */}
    </div>
  );
}

export default AppSideBar;

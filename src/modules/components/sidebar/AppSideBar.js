import { cilSpeedometer, cilPuzzle, cilSettings, cilUser } from '@coreui/icons';
import Sidenav from './Sidenav';
import checkAuthorization from '../../../services/checkAuthorization';
import { useAuth } from '../../auth/hooks/useAuth';
import { action, entity } from '../../../constants/authorization';

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
  const { user } = useAuth();
  const navItemsToShow = navItems.filter((navItem) => {
    return checkAuthorization(user, entity[navItem.name], action.view);
  });
  return <Sidenav navItems={navItemsToShow} brandName="Samuh" />;
}

export default AppSideBar;

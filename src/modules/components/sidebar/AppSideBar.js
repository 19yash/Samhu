import { cilSpeedometer, cilPuzzle, cilSettings, cilUser } from '@coreui/icons';
import Sidenav from './Sidenav';
import checkAuthorization from '../../../services/checkAuthorization';
import { useAuth } from '../../auth/hooks/useAuth';
import { action, entity } from '../../../constants/authorization';
import React from 'react';
import { Container } from './AppSideBar.style';

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
  return (
    <Container>
      <Sidenav
        navItems={[
          ...navItemsToShow,
          {
            name: 'Home',
            icon: cilUser,
            path: '/home',
          },
        ]}
        brandName="Samuh"
      />
    </Container>
  );
}

export default AppSideBar;

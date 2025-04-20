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
  {
    name: 'Users',
    icon: cilUser,
    path: '/app/users',
  },
];

function AppSideBar() {
  const { user } = useAuth();
  const navItemsToShow = navItems.filter((navItem) => {
    return checkAuthorization(user, entity[navItem.name], action.view);
  });
  return (
    <Container>
      <Sidenav navItems={[...navItemsToShow]} brandName="Udaansport" />
    </Container>
  );
}

export default AppSideBar;

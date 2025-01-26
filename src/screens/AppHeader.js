import React, { useState, useEffect, useRef } from 'react';
import images from '../images';
import {
  Action,
  AppHeaderStyle,
  DropDown,
  Img,
  NavItems,
  Row,
} from './AppHeader.style';
import { useAuth } from '../modules/auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ItemsContainer } from './NavBar.style';

const AppHeader = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null); // Ref to track dropdown
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Profile',
      icon: images.settings,
      onClick: (e) => {
        e.stopPropagation();
        navigate('/app/settings', {});
        setShowDropDown(false);
      },
    },
    {
      label: 'Logout',
      icon: images.logout,
      onClick: (e) => {
        // Add your logout logic here
        logout();
        e.stopPropagation(); // Correct method name
        setShowDropDown(false);
      },
    },
  ];
  const items = [
    {
      name: 'Home',
      path: '/home',
    },
    {
      name: 'About Us',
      path: '/about',
    },
    {
      name: 'Events',
      path: '/events',
    },
    {
      name: 'Contact Us',
      path: '/contactUs',
    },
  ];
  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };

    if (showDropDown) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showDropDown]);

  return (
    <AppHeaderStyle>
      <ItemsContainer>
        {items.map((item) => {
          return (
            <NavItems onClick={() => navigate(item.path)}>{item.name}</NavItems>
          );
        })}
      </ItemsContainer>
      <Row>
        <Img src={images.user} style={{ width: '30px', height: '30px' }} />
        {user?.user_name}
        <Img
          src={images.arrowDown}
          style={{ width: '20x', height: '20px' }}
          onClick={() => setShowDropDown(!showDropDown)}
        />
      </Row>
      {showDropDown && (
        <DropDown ref={dropdownRef}>
          {actions.map((action) => (
            <Action key={action.label} onClick={action.onClick}>
              <Img src={action.icon} /> {action.label}
            </Action>
          ))}
        </DropDown>
      )}
    </AppHeaderStyle>
  );
};

export default AppHeader;

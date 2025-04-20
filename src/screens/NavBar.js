import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import images from '../images';
import React from 'react';
import { Menu, X } from 'lucide-react';
import {
  Container,
  IconContainer,
  Img,
  Item,
  ItemsContainer,
  SelectedItem,
  HamburgerMenu,
  HamburgerContainer,
} from './NavBar.style';
import { useAuth } from '../modules/auth/hooks/useAuth';
import Button from '../modules/components/button/Button';
import { Action, DropDown, Row } from './AppHeader.style';

const NavBar = (props) => {
  const { showIcon } = props;
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null); // Ref to track dropdown

  let items = [
    { name: 'Home', path: '/home' },
    { name: 'About Us', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Contact Us', path: '/contactUs' },
  ];

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

  if (user) {
    items.push({ name: 'Dashboard', path: '/app/dashboard' });
  }

  const { pathname } = useLocation();
  const elementPathName = pathname.split('/');
  if (elementPathName?.[1] === 'app') {
    items = [];
  }
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false); // Close menu on navigation
  };

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
    <Container showIcon={showIcon}>
      <HamburgerContainer>
        {showIcon && (
          <IconContainer>
            <Img src={images.fullBrandLogo} alt="Brand Logo" />
          </IconContainer>
        )}

        {/* Hamburger Icon */}
        <HamburgerMenu onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </HamburgerMenu>
      </HamburgerContainer>
      <ItemsContainer menuOpen={menuOpen}>
        {items.map((item) =>
          item.path === pathname ? (
            <SelectedItem
              key={item.path}
              onClick={() => {
                item.path ? handleNavigation(item.path) : item.handleClick();
              }}
            >
              {item.name}
            </SelectedItem>
          ) : (
            <Item key={item.path} onClick={() => handleNavigation(item.path)}>
              {item.name}
            </Item>
          )
        )}
        {user ? (
          <Item>
            <Row style={{ alignItems: 'center' }}>
              <Img
                src={images.user}
                style={{ width: '40px', height: '40px' }}
              />
              {user?.user_name}
              <Img
                src={images.arrowDown}
                style={{ width: '20x', height: '20px' }}
                onClick={() => setShowDropDown(!showDropDown)}
              />
              {showDropDown && (
                <DropDown ref={dropdownRef}>
                  {actions.map((action) => (
                    <Action key={action.label} onClick={action.onClick}>
                      <Img
                        style={{ width: '20px', height: '20px' }}
                        src={action.icon}
                      />{' '}
                      {action.label}
                    </Action>
                  ))}
                </DropDown>
              )}
            </Row>
          </Item>
        ) : (
          <Button onClick={() => navigate('/login')} text={'Login'} />
        )}
      </ItemsContainer>
    </Container>
  );
};

export default NavBar;

// import React, { useState, useEffect, useRef } from 'react';
// import images from '../images';
// import {
//   Action,
//   AppHeaderStyle,
//   DropDown,
//   Img,
//   NavItems,
//   Row,
// } from './AppHeader.style';
// import { useAuth } from '../modules/auth/hooks/useAuth';
// import { useNavigate } from 'react-router-dom';
// import { ItemsContainer } from './NavBar.style';

// const AppHeader = () => {
//   const [showDropDown, setShowDropDown] = useState(false);
//   const dropdownRef = useRef(null); // Ref to track dropdown
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const actions = [
//     {
//       label: 'Profile',
//       icon: images.settings,
//       onClick: (e) => {
//         e.stopPropagation();
//         navigate('/app/settings', {});
//         setShowDropDown(false);
//       },
//     },
//     {
//       label: 'Logout',
//       icon: images.logout,
//       onClick: (e) => {
//         // Add your logout logic here
//         logout();
//         e.stopPropagation(); // Correct method name
//         setShowDropDown(false);
//       },
//     },
//   ];
//   const items = [
//     {
//       name: 'Home',
//       path: '/home',
//     },
//     {
//       name: 'About Us',
//       path: '/about',
//     },
//     {
//       name: 'Events',
//       path: '/events',
//     },
//     {
//       name: 'Contact Us',
//       path: '/contactUs',
//     },
//   ];
//   // Handle clicks outside the dropdown
//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropDown(false);
//       }
//     };

//     if (showDropDown) {
//       document.addEventListener('mousedown', handleOutsideClick);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     };
//   }, [showDropDown]);

//   return (
//     <AppHeaderStyle>
//       <ItemsContainer>
//         {items.map((item) => {
//           return (
//             <NavItems onClick={() => navigate(item.path)}>{item.name}</NavItems>
//           );
//         })}
//       </ItemsContainer>
//       <Row>
//         <Img src={images.user} style={{ width: '30px', height: '30px' }} />
//         {user?.user_name}
//         <Img
//           src={images.arrowDown}
//           style={{ width: '20x', height: '20px' }}
//           onClick={() => setShowDropDown(!showDropDown)}
//         />
//       </Row>
//       {showDropDown && (
//         <DropDown ref={dropdownRef}>
//           {actions.map((action) => (
//             <Action key={action.label} onClick={action.onClick}>
//               <Img src={action.icon} /> {action.label}
//             </Action>
//           ))}
//         </DropDown>
//       )}
//     </AppHeaderStyle>
//   );
// };

// export default AppHeader;

import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import images from '../images';
import React from 'react';
import { Menu, X } from 'lucide-react';
import {
  Img,
  Item,
  ItemsContainer,
  SelectedItem,
  HamburgerMenu,
  HamburgerContainer,
} from './NavBar.style';
import { useAuth } from '../modules/auth/hooks/useAuth';
import Button from '../modules/components/button/Button';
import {
  IconContainer,
  Container,
  Action,
  DropDown,
  Row,
} from './AppHeader.style';
import checkAuthorization from '../services/checkAuthorization';
import { action, entity } from '../constants/authorization';

const NavBar = () => {
  const { user, logout } = useAuth();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null); // Ref to track dropdown
  const { pathname } = useLocation();

  const items = [
    { name: 'Dashboard', path: '/app/dashboard' },
    { name: 'Events', path: '/app/events' },
    { name: 'Sports', path: '/app/sports' },
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
  let navItemsToShow = items.filter((navItem) => {
    return checkAuthorization(user, entity[navItem.name], action.view);
  });
  navItemsToShow.push({ name: 'Home', path: '/home' });
  if (windowSize.width > 768) {
    console.log('setting to empty');
    navItemsToShow = [];
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

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container>
      <HamburgerContainer>
        {
          <IconContainer>
            <Img src={images.fullLogotransparent} alt="Brand Logo" />
          </IconContainer>
        }

        {/* Hamburger Icon */}
        <HamburgerMenu onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </HamburgerMenu>
      </HamburgerContainer>
      <ItemsContainer menuOpen={menuOpen}>
        {navItemsToShow.map((item) =>
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
        <Item>
          <Row style={{ alignItems: 'center' }}>
            <Img src={images.user} style={{ width: '40px', height: '40px' }} />
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
      </ItemsContainer>
    </Container>
  );
};

export default NavBar;

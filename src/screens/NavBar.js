import { useLocation, useNavigate } from 'react-router-dom';
import images from '../images';
import React from 'react';
import Button from '../modules/components/button/Button';
import {
  Container,
  IconContainer,
  Img,
  Item,
  ItemsContainer,
  SelectedItem,
} from './NavBar.style';
import { useAuth } from '../modules/auth/hooks/useAuth';
import { Row } from './AppHeader.style';

const NavBar = () => {
  const { user } = useAuth();
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
  if (user) {
    items.push({
      name: 'Dashboard',
      path: '/app/dashboard',
    });
  }
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Container>
      <IconContainer>
        <Img src={images.fullBrandLogo} />
      </IconContainer>
      <ItemsContainer>
        {items.map((item) => {
          if (item.path === pathname) {
            return (
              <SelectedItem
                onClick={() => {
                  navigate(item.path);
                }}
              >
                {item.name}
              </SelectedItem>
            );
          }
          return (
            <Item
              onClick={() => {
                navigate(item.path);
              }}
            >
              {item.name}
            </Item>
          );
        })}
      </ItemsContainer>
      {user ? (
        <Row>
          <Img src={images.user} style={{ width: '30px', height: '30px' }} />
          {user?.user_name}
        </Row>
      ) : (
        <Button
          onClick={() => {
            navigate('/login');
          }}
          text={'Login'}
        />
      )}
    </Container>
  );
};

export default NavBar;

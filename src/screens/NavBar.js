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

const NavBar = () => {
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
      <Button
        onClick={() => {
          navigate('/login');
        }}
        text={'Login'}
      />
    </Container>
  );
};

export default NavBar;

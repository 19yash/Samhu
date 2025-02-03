// import styled from 'styled-components';
// import theme from '../theme/Theme';

// export const SelectedItem = styled.div`
//   color: ${theme.palette.primary.main};
// `;

// export const Item = styled.div`
//   color: ${theme.palette.text.primary};
// `;

// export const Container = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   gap: 8px;
//   background-color: #fff;
//   padding: 1.5rem;
//   @media (max-width: 425px) {
//     flex-direction: column;
//     gap: 2rem;
//   }
// `;

// export const ItemsContainer = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 2rem;
// `;

// export const IconContainer = styled.div`
//   width: 200px;
// `;
// export const Img = styled.img`
//   width: 100%;
//   cursor: pointer;
//   ${({ style }) => style && style};
// `;

import styled from 'styled-components';
import theme from '../theme/Theme';

export const SelectedItem = styled.div`
  color: ${theme.palette.primary.main};
  font-weight: bold;
  cursor: pointer;
`;
export const IconContainer = styled.div`
  width: 200px;
`;

export const Item = styled.div`
  color: ${theme.palette.text.primary};
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;
  &:hover {
    color: ${theme.palette.primary.dark};
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  background-color: ${(props) => (props.showIcon ? '#fff' : 'transparent')};
  padding: 12px 24px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  position: relative;
`;

export const Img = styled.img`
  width: 100%;
  cursor: pointer;
  ${({ style }) => style && style};
`;

export const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 10;
`;

export const ItemsContainer = styled.div`
  position: relative;

  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  align-items: center;
  @media (max-width: 768px) {
    display: ${({ menuOpen }) => (menuOpen ? 'flex' : 'none')};
    flex-direction: column;
  }
`;

export const HamburgerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

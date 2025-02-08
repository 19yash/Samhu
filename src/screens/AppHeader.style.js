import styled from 'styled-components';
import theme from '../theme/Theme';

export const AppHeaderStyle = styled.div`
  position: relative;
  display: flex;
  height: 50px;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  gap: 3rem;
  padding: 8px;
`;

export const NavItems = styled.div`
  &:hover {
    color: ${theme.palette.primary.main};
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  position: relative;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  padding: 12px 24px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  position: relative;
`;
export const IconContainer = styled.div`
  width: 200px;
  @media (min-width: 769px) {
    display: none;
  }
`;

export const DropDown = styled.div`
  width: 150px;
  position: absolute;
  bottom: -100px;
  right: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 1px solid ${theme.palette.background.greyPrimary};
  border-radius: 8px;
  min-height: 100px;
  z-index: 10;
  background-color: white;
`;

export const Action = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 16px;
  border-bottom: 1px solid ${theme.palette.background.greyPrimary};
  padding: 8px;
  &:hover {
    color: ${theme.palette.primary.main};
  }
  flex: 1;
`;
export const Img = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  ${({ style }) => style && style};
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

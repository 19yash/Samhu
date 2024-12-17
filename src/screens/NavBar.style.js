import styled from 'styled-components';
import theme from '../theme/Theme';

export const SelectedItem = styled.div`
  color: ${theme.palette.primary.main};
`;

export const Item = styled.div`
  color: ${theme.palette.text.primary};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  background-color: #fff;
  padding: 1.5rem;
`;

export const ItemsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const IconContainer = styled.div`
  width: 200px;
`;
export const Img = styled.img`
  width: 100%;
  cursor: pointer;
  ${({ style }) => style && style};
`;

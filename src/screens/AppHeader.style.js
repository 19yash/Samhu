import styled from 'styled-components';
import theme from '../theme/Theme';

export const AppHeaderStyle = styled.div`
  position: relative;
  display: flex;
  height: 50px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  padding: 8px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const DropDown = styled.div`
  position: absolute;
  bottom: -90px;
  right: 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 1px solid ${theme.palette.background.greyPrimary};
  border-radius: 8px;
  padding: 16px;
  min-height: 100px;
  z-index: 10;
  background-color: white;
`;

export const Action = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;

  &:hover {
    color: ${theme.palette.primary.main};
  }
`;
export const Img = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  ${({ style }) => style && style};
`;
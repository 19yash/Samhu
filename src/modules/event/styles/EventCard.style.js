import styled from 'styled-components';
import theme from '../../../theme/Theme';

export const CardStyle = styled.div`
min-width:"350px",
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  gap: '12px';
  flex: 1;
`;

export const Img = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  position: absolute;
  top: 4px;
  right: 10px;
  height: 40px;
  widht: 40px;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.palette.primary.main};
`;

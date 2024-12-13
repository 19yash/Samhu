import styled from 'styled-components';
import theme from '../../../theme/Theme';

export const EventContainer = styled.div`
  width: 100%;
  display: flex;
  border-radius: 8px;
`;

export const Img = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  ${({ style }) => style && style};
`;

export const ImageContainer = styled.div`
  width: 70%;
`;

export const EventDetailsStyles = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
`;

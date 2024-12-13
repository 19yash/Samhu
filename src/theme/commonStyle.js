import styled from 'styled-components';

export const Img = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  ${({ style }) => style && style};
`;

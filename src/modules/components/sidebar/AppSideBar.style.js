import styled from 'styled-components';

export const Img = styled.img`
  width: 100%;
  height:"50px"
  cursor: pointer;
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  ${({ style }) => style && style};
`;

import styled from 'styled-components';

export const Icon = styled.img`
  height: 20px;
  width: 20px;
  cursor: pointer;
  ${({ style }) => style && style};
`;

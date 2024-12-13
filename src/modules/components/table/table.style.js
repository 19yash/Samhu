import styled from 'styled-components';

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  flex: 1;
  ${({ style }) => style && style};
`;

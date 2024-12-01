import styled from 'styled-components';

export const DefaultLayoutStyle = styled.div`
  overflow: hidden;
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  flex: 1;
  overflow-x: auto;
  background-color: #f5f2f2;
`;

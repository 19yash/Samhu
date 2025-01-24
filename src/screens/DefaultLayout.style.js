import styled from 'styled-components';
import theme from '../theme/Theme';

export const DefaultLayoutStyle = styled.div`
  overflow: hidden;
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  background-color: ${theme.palette.background.greyPrimary};
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

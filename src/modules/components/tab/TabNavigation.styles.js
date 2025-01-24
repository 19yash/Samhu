import styled from 'styled-components';
export const TabNavigationStyle = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  flex: 1;
  background-color: #fff;
  gap:0.5rem;
  overflow: hidden;
  ${({ style }) => style && { ...style }}
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  cursor: pointer;
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  ${({ style }) => style && { ...style }}
`;

export const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  font-size: 14px;
  color: #52525b;
  line-height: 24px;
  @media (max-width: 425px) {
    font-size: 12px;
    padding: 18px;
    line-height: 16px;
  }
`;

export const SelectedTab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #121e2d;
  font-weight: 600;
  font-size: 14px;
  padding: 8px;
  @media (max-width: 425px) {
    font-size: 12px;
    padding: 18px;
    line-height: 16px;
  }
`;

export const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  // padding: 6px;
  flex-grow: 1;
  // border: 1px solid #e4e4e7;
  // border-radius: 8px;
  height: 100%;
  ${({ style }) => style && { ...style }}
`;

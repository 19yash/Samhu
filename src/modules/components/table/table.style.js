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

export const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
`;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 16px;
  flex: 1;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  @media (max-width: 425px) {
    flex-direction: column;
  }
  ${({ style }) => style && style};
`;

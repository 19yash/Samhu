import styled from 'styled-components';

export const EventContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 32px;
  padding: 1rem;
  flex: 1;
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;
export const EventHeader = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  flex-wrap: wrap;
  gap: 16px;
  flex: 1;
`;

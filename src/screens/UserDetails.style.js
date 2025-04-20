import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    max-height: 70vh; /* or adjust as needed */
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 8px; /* to avoid scroll bar overlaying content */
  }
`;

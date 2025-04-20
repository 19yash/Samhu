import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #fff;
  // padding: 2rem;
  @media (max-width: 425px) {
    padding: 0.5rem;
  }
  @media (min-width: 425px) and (max-width: 768px) {
    padding: 1rem;
  }
`;

export const EventContainer = styled.div`
  width: 100%;
  max-width: 95vw;
  overflow-x: hidden;
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  padding: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0.5rem;
  }
`;

export const Img = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  ${({ style }) => style && style};
`;
export const Image = styled.img`
  max-width: 100%;
  ${({ style }) => style && style};
`;
export const ImageContainer = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const EventDetailsStyles = styled.div`
  width: 50%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const BasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const Information = styled.div`
  background-color: #d9edf7;
  color: #3a87ad;
  padding: 8px;
`;
export const Heading = styled.div`
  font-size: 1.5rem;
`;
export const Heading1 = styled.div`
  font-size: 1.75rem;
  color: rgb(255, 145, 77);
`;

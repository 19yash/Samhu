import styled from 'styled-components';

export const EventContainer = styled.div`
  width: 100%;
  display: flex;
  border-radius: 8px;
  gap: 1rem;
`;

export const Img = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  ${({ style }) => style && style};
`;

export const ImageContainer = styled.div`
  width: 70%;
  height: 70%;
`;

export const EventDetailsStyles = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
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

import styled from 'styled-components';
import images from '../../images';

export const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  height: 100vh;
  color: #fff;
  background-image: url(${images.heroSection});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  @media (max-width: 425px) {
    align-items: center;
  }
`;

export const HeroContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-item: space-between;
  gap: 26px;
  width: 70%;
  @media (max-width: 425px) {
    width: 100%;
  }
`;

export const Heading = styled.div`
  font-size: 40px;
  text-transform: capitalize;
  @media (max-width: 425px) {
    text-align: center;
  }
`;
export const heroStyle = {
  title: {
    fontSize: '4.2rem',
    fontWeight: 'bold',
    color: '#fff',
    margin: '0',
    overflow: 'hidden',
  },
  content: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'space-between',
    gap: '26px',
    width: '70%',
  },
};

export const SectionSubHeading = styled.div`
  font-size: 19px;
  font-weight: 400;
  line-height: 28px;
  width: 40%;
  text-align: center;
  @media (max-width: 425px) {
    width: 100%;
  }
`;
export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: #fff;
  padding: 2rem;
  @media (max-width: 425px) {
    padding: 1rem 0.5rem;
  }
`;
export const SectionContainerDark = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background-color: #fff;
  padding: 2rem;
  background-color: rgb(235, 235, 235);
  @media (max-width: 425px) {
    padding: 1rem 0.5rem;
  }
`;
export const Section = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    backgroundColor: '#fff',
    padding: '2rem',
  },
  heading: {
    fontSize: '40px',
    textTransform: 'capitalize',
    // textAlign: 'center',
  },
  subHeading: {
    fontSize: '19px',
    fontWeight: '400',
    lineHeight: '28px',
    width: '40%',
    textAlign: 'center',
  },
  backgroundColor: {
    backgroundColor: 'rgb(235, 235, 235)',
  },
};

export const TestimonoialsContainers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  @media (max-width: 425px) {
    flex-direction: column;
  }
`;
export const TestimonalItemBorder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
  flex: 1;
  @media (min-width: 425px) {
    border-right: 2px solid #000;
  }
`;

export const Testimonoials = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '20px',
    flex: 1,
  },
  border: {
    borderRight: '2px solid #000',
  },
  number: {
    fontSize: '48px',
    fontWeight: '700px',
  },
  icon: {
    width: '60px',
    height: '60px',
  },
  text: {
    fontSize: '16px',
  },
};
export const PromotionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-image: url(${images.homeGetInTouch});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  @media (max-width: 425px) {
    flex-direction: column;
    padding: 1rem;
  }
  @media (min-width: 425px) {
    gap: 200px;
    height: 60vh;
  }
`;

export const PromotionHeading = styled.div`
  font-size: 40px;
  text-transform: capitalize;
  width: 40%;
  color: #fff;
  @media (max-width: 425px) {
    width: 100%;
    padding: 1rem;
  }
`;

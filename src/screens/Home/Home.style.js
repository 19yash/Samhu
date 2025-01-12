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
`;

export const heroStyle = {
  title: {
    fontSize: '4.2rem',
    fontWeight: 'bold',
    color: '#fff',
    margin: '0',
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

export const Section = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
    gap: '20px',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: '40px',
    textTransform: 'capitalize',
  },
  subHeading: {
    fontSize: '19px',
    fontWeight: '400',
    lineHeight: '28px',
    width: '40%',
    textAlign: 'center',
  },
};

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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
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
export const Promotion = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
    gap: '200px',
    backgroundImage: `url(${images.homeGetInTouch})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },

  heading: {
    fontSize: '40px',
    textTransform: 'capitalize',
    width: '40%',
    color: '#fff',
  },
};

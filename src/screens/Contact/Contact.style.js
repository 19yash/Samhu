import styled from 'styled-components';
import theme from '../../theme/Theme';
import images from '../../images';

export const heading = {
  fontSize: '40px',
  fontWeight: '700',
};
export const heroSection = {
  backgroundImage: `url(${images.about})`,
  height: '50vh',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  fontSize: '4rem',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};
export const subHeading = {
  fontSize: '16px',
  fontWeight: '700',
  color: theme.palette.primary.main,
};

export const contactSection = {
  padding: '20px',
  display: 'flex',
  gap: '20px',
  justifyContent: 'space-around',
};

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Card = styled.div`
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem 1.2rem;
  display: flex;
  // justify-content: center;
  max-width: 350px;
  align-items: center;
  gap: 30px;
`;

export const IconWrapper = styled.div`
  font-size: 1.8rem;
  color: #f68534;
`;
export const Icon = styled.img`
  width: 40px;
  height: 40px;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 1rem;
    margin: 0 0 5px 0;
    color: black;
    font-weight: bold;
  }

  p {
    font-size: 0.9rem;
    margin: 0;
    color: #555;
    width: 70%;
  }
`;

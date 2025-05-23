import theme from '../theme/Theme';
import styled from 'styled-components';
import images from '../images';

export const copyright = {
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  display: ' flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40px',
};

export const Container = styled.div`
  position: relative;
`;

export const Icons = {
  footerOne: {
    backgroundImage: `url(${images.footer1})`,
    position: 'absolute',
    right: '30px',
    bottom: '180px',
    width: '26px',
    height: '26px',
    backgroundRepeat: 'no-repeat',
    zIndex: 1,
  },
  footerTwo: {
    backgroundImage: `url(${images.footer1})`,
    position: 'absolute',
    left: '30px',
    bottom: '180px',
    width: '26px',
    height: '26px',
    backgroundRepeat: 'no-repeat',
    zIndex: 1,
  },
  footerThree: {
    backgroundImage: `url(${images.footer2})`,
    position: 'absolute',
    right: '60px',
    bottom: '80px',
    width: '37px',
    height: '37px',
    backgroundRepeat: 'no-repeat',
    zIndex: 1,
  },
  footerFour: {
    backgroundImage: `url(${images.footer2})`,
    position: 'absolute',
    right: '160px',
    bottom: '120px',
    width: '37px',
    height: '37px',
    backgroundRepeat: 'no-repeat',
    zIndex: 1,
  },
  footerFive: {
    backgroundImage: `url(${images.footer3})`,
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: '501px',
    height: '211px',
    backgroundRepeat: 'no-repeat',
    zIndex: 1,
  },
  footerSix: {
    backgroundImage: `url(${images.footer4})`,
    position: 'absolute',
    right: '0px',
    bottom: '0px',
    width: '657px',
    height: '182px',
    backgroundRepeat: 'no-repeat',
    zIndex: 1,
  },
  footerSeven: {
    backgroundImage: `url(${images.footer5})`,
    position: 'absolute',
    right: '0px',
    top: '0px',
    width: '562px',
    height: '343px',
    backgroundRepeat: 'no-repeat',
    zIndex: 1,
  },
  footerEight: {
    backgroundImage: `url(${images.footer6})`,
    position: 'absolute',
    right: '0px',
    top: '-80px',
    width: '239px',
    height: '372px',
    backgroundRepeat: 'no-repeat',
    zIndex: 1,
  },
};
export const FooterContainer = styled.footer`
  background-color: #000;
  color: #fff;
  padding: 2rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  @media (max-width: 425px) {
    flex-direction: column;
    padding: 1rem 2rem;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Logo = styled.img`
  width: 250px;
`;
export const Description = styled.p`
  font-size: 1rem;
  max-width: 300px;
  line-height: 1.5;
`;

export const QuickLinks = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 10px;
    font-size: 0.9rem;

    a {
      display: flex;
      flex-direction: row;
      align-items: center;
      color: white;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: #f68534;
      }
    }
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;

  svg {
    color: #f68534;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 10px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: black;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transition:
      transform 0.3s,
      background-color 0.3s;

    &:hover {
      background-color: #f68534;
      color: white;
      transform: scale(1.1);
    }
  }
`;

export const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

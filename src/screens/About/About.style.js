import styled from 'styled-components';
import theme from '../../theme/Theme';
import images from '../../images';
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
export const Section = {
  container: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    padding: '2rem',
  },
  introImage: {
    width: '400px',
    borderRadius: '16px',
  },
  circleLayerOne: {
    position: 'absolute',
    left: '-100px',
    top: '-100px',
    width: '312px',
    height: '307px',
    zIndex: '-1',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${images.objective1})`,
  },
  circleLayerTwo: {
    position: 'absolute',
    left: '55%',
    top: '50%',
    width: '270px',
    height: '260px',
    zIndex: '-1',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${images.objective2})`,
  },
  circleLayerThree: {
    position: 'absolute',
    right: '1%',
    top: '0%',
    width: '270px',
    height: '430px',
    zIndex: '1',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${images.objective3})`,
  },
  circleLayerFour: {
    backgroundImage:
      'url(https://smuh.in/wp-content/uploads/2023/04/pattern-6.png)',
    position: 'absolute',
    left: '-40px',
    top: '64%',
    width: '112px',
    height: '115px',
    backgroundRepeat: 'no-repeat',
  },
  heading: {
    fontSize: '40px',
    fontWeight: '700',
  },
  subHeading: {
    fontSize: '16px',
    fontWeight: '700',
    color: theme.palette.primary.main,
  },

  content: {
    icon: {
      height: '30px',
      width: '30px',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'space-between',
      alignItems: 'stretch' /* Ensures children take the full height */,
      padding: '20px',
    },
    card: {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '26px',
        border: '1px solid rgb(235,235,235)',
        padding: '2rem',
        maxWidth: '350px',
      },
      icon: {
        width: '60px',
        height: '60px',
      },
      Headinng: {
        fontSize: '24px',
        fontWeight: '700',
        lineHeight: '1.4rem',
        textAlign: 'center',
      },
      text: {
        fontSize: '16px',
        color: 'rgb(116,106,111)',
        textAlign: 'center',
      },
    },
  },
};

export const IntroCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  // align-items: stretch;
`;
export const IntroBackGround = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(https://smuh.in/wp-content/uploads/2024/04/pattern-1.png);
`;
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  position: absolute;
  left: -25px;
  top: 30px;
  width: 50px;
  height: 50px;
  line-height: 75px;
  text-align: center;
  border-radius: 10px;
  color: #fff;
  font-size: 30px;
  background-color: #ff914d;
`;

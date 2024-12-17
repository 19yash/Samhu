import theme from '../../theme/Theme';
export const heroSection = {
  backgroundImage:
    'url(https://wp.themerange.net/conat/wp-content/uploads/2023/04/11.jpg)',
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
  circleLayerOne: {
    position: 'absolute',
    left: '-100px',
    top: '-100px',
    width: '312px',
    height: '307px',
    zIndex: '-1',
    backgroundRepeat: 'no-repeat',
    backgroundImage:
      'url(https://smuh.in/wp-content/uploads/2024/04/circle-pink.png)',
  },
  circleLayerTwo: {
    position: 'absolute',
    left: '55%',
    top: '50%',
    width: '270px',
    height: '260px',
    zIndex: '-1',
    backgroundRepeat: 'no-repeat',
    backgroundImage:
      'url(https://smuh.in/wp-content/uploads/2024/04/circle-icon-one.png)',
  },
  circleLayerThree: {
    position: 'absolute',
    right: '1%',
    top: '0%',
    width: '270px',
    height: '430px',
    zIndex: '1',
    backgroundRepeat: 'no-repeat',
    backgroundImage:
      'url(https://smuh.in/wp-content/uploads/2024/04/events-bg.png)',
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
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '80%',
      justifyContent: 'space-between',
      alignItems: 'stretch' /* Ensures children take the full height */,
      gap: '20px',
      padding: '20px',
    },
    card: {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '26px',
        border: '1px solid black',
        padding: '2rem',
        flex: '1',
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

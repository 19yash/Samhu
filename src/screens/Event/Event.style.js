import images from '../../images';

export const heroSection = {
  backgroundImage: `url(${images.eventsHero})`,
  height: '70vh',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  fontSize: '4rem',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
};

export const heading = {
  fontSize: '55px',
  textTransform: 'capitalize',
  fontWeight: '700',
};

export const subHeading = {
  fontSize: '19px',
  fontWeight: '400',
  lineHeight: '28px',
};

export const section = {
  padding: '2rem',
  gap: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const EventContainer = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '16px',
  flex: '1',
};

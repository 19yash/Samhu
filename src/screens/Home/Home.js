import React, { useContext, useEffect } from 'react';
import NavBar from '../NavBar';
import Button from '../../modules/components/button/Button';
import { ButtonType } from '../../modules/components/button/buttonTypeConst';
import {
  Heading,
  HeroContent,
  HeroSection,
  HeroSection2,
  HeroSection2Content,
  HeroSection2Image,
  heroStyle,
  Overlay,
  PromotionContainer,
  PromotionHeading,
  Section,
  SectionContainer,
  SectionContainerDark,
  SectionSubHeading,
  TestimonalItemBorder,
  Testimonoials,
  TestimonoialsContainers,
} from './Home.style';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import images from '../../images';
import HomeEvents from './HomeEvents';
import { setGlobalClearAuth } from '../GlobalFunction';
import { AuthContext } from '../../context/auth/AuthContext';
import { Typography } from '@mui/material';
import config from '../../config';

export const Home = () => {
  const navigate = useNavigate();
  const { clearAuth } = useContext(AuthContext);
  const handleWhatsAppRedirect = () => {
    const phoneNumber = config.phoneNumber; // Replace with your phone number (without + or spaces)
    const message = 'Hello! I need a referee.'; // Replace with your message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    setGlobalClearAuth(clearAuth);
  }, []);
  return (
    <div>
      <NavBar showIcon={true} />
      <HeroSection>
        <HeroContent>
          <h1 style={heroStyle.title}>Discover Your Sport</h1>
          <p style={heroStyle.description}>
            Empowering athletes, academies, and referees to connect, compete,
            and thrive.
          </p>
          <Button
            onClick={() => {
              navigate('/login');
            }}
            text={'Expolre More'}
            type={ButtonType.backgroundWithBorder}
            style={{ width: 'fit-content' }}
          />
        </HeroContent>
      </HeroSection>
      <HeroSection2>
        <HeroSection2Image>
          <img
            src={images.refree}
            alt="Placeholder"
            style={{
              width: '80%',
              maxWidth: '400px',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '12px',
            }}
          />
        </HeroSection2Image>
        <HeroSection2Content>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '3rem' },
              textAlign: { xs: 'center' },
              fontWeight: 'bold',
            }}
          >
            Find a Referee Near You!!
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Need a certified referee for your match? Click below to connect with
            us on WhatsApp and book a referee instantly!
          </Typography>
          <Button
            onClick={() => {
              handleWhatsAppRedirect();
            }}
            text={'Message Us on WhatsApp'}
            type={ButtonType.backgroundWithBorder}
            style={{ width: 'fit-content', borderRadius: '10px' }}
          />
        </HeroSection2Content>
      </HeroSection2>
      <SectionContainer>
        <Heading>Featured Events</Heading>
        <SectionSubHeading>
          Explore Our Featured Sports: Where Passion Meets Performance!
        </SectionSubHeading>
        <HomeEvents />
        <Button
          onClick={() => {
            navigate('/events');
          }}
          text={'View All'}
          type={ButtonType.backgroundWithBorder}
        />
      </SectionContainer>
      {/* section2 */}
      <SectionContainerDark>
        <Heading>Upcoming Events</Heading>
        <SectionSubHeading>
          Explore Our Upcoming Sports: Where Passion Meets Performance!
        </SectionSubHeading>
        <HomeEvents upcoming={true} />
        <Button
          onClick={() => {
            navigate('/events');
          }}
          text={'View All'}
          type={ButtonType.backgroundWithBorder}
        />
      </SectionContainerDark>
      {/* Testimonoials */}
      <div style={Section.container}>
        <div style={Section.heading}>Our Numbers</div>
        <TestimonoialsContainers>
          <TestimonalItemBorder>
            <img
              src={images.handshakeThick}
              alt=""
              style={Testimonoials.icon}
            />
            <div style={Testimonoials.number}>100+</div>
            <div style={Testimonoials.text}>Users</div>
          </TestimonalItemBorder>
          <TestimonalItemBorder>
            <img src={images.microphone} alt="" style={Testimonoials.icon} />
            <div style={Testimonoials.number}>3</div>
            <div style={Testimonoials.text}>Organizaers</div>
          </TestimonalItemBorder>
          <div style={Testimonoials.item}>
            <img src={images.training} alt="" style={Testimonoials.icon} />
            <div style={Testimonoials.number}>5</div>
            <div style={Testimonoials.text}>Sports Events</div>
          </div>
        </TestimonoialsContainers>
      </div>
      {/* Promotion */}
      <PromotionContainer>
        <Overlay>
          <PromotionHeading>
            Become a Valued Sponsor and Showcase Your Brand to a Wider Audience
          </PromotionHeading>
          <Button
            onClick={() => {
              navigate('/contactUs');
            }}
            type={ButtonType.backgroundWithBorder}
            text={'Get In Touch'}
          />
        </Overlay>
      </PromotionContainer>
      <Footer></Footer>
    </div>
  );
};

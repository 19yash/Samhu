import React, { useContext, useEffect } from 'react';
import NavBar from '../NavBar';
import Button from '../../modules/components/button/Button';
import { ButtonType } from '../../modules/components/button/buttonTypeConst';
import {
  Heading,
  HeroContent,
  HeroSection,
  heroStyle,
  Promotion,
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

export const Home = () => {
  const navigate = useNavigate();
  const { clearAuth } = useContext(AuthContext);

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
            Whether it football, basketball, tennis, or cricket —dive into a
            diverse selection of sports and find the perfect fit for you.
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
      {/* section 1 */}
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
        <HomeEvents />
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
      </PromotionContainer>
      <Footer></Footer>
    </div>
  );
};

import React from 'react';
import NavBar from '../NavBar';
import Button from '../../modules/components/button/Button';
import { ButtonType } from '../../modules/components/button/buttonTypeConst';
import {
  HeroSection,
  heroStyle,
  Promotion,
  Section,
  Testimonoials,
} from './Home.style';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import images from '../../images';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NavBar />
      <HeroSection>
        <div style={heroStyle.content}>
          <h1 style={heroStyle.title}>Discover Your Sport</h1>
          <p>
            Whether it's football, basketball, tennis, or cricket —dive into a
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
        </div>
      </HeroSection>
      {/* section 1 */}
      <div style={Section.container}>
        <div style={Section.heading}>Featured Events</div>
        <div style={Section.subHeading}>
          Explore Our Featured Sports: Where Passion Meets Performance!
        </div>
        <div></div>
        <Button
          onClick={() => {
            navigate('/events');
          }}
          text={'View All'}
          type={ButtonType.backgroundWithBorder}
        />
      </div>
      {/* section2 */}
      <div style={Section.container}>
        <div style={Section.heading}>Upcoming Events</div>
        <div style={Section.subHeading}>
          Explore Our Upcoming Sports: Where Passion Meets Performance!
        </div>
        <div></div>
        <Button
          onClick={() => {
            navigate('/events');
          }}
          text={'View All'}
          type={ButtonType.backgroundWithBorder}
        />
      </div>
      {/* Testimonoials */}
      <div style={Section.container}>
        <div style={Section.heading}>Our Numbers</div>
        <div style={Testimonoials.container}>
          <div style={{ ...Testimonoials.item, ...Testimonoials.border }}>
            <img
              src={images.handshakeThick}
              alt=""
              style={Testimonoials.icon}
            />
            <div style={Testimonoials.number}>100+</div>
            <div style={Testimonoials.text}>Users</div>
          </div>
          <div style={{ ...Testimonoials.item, ...Testimonoials.border }}>
            <img src={images.microphone} alt="" style={Testimonoials.icon} />
            <div style={Testimonoials.number}>3</div>
            <div style={Testimonoials.text}>Organizaers</div>
          </div>
          <div style={Testimonoials.item}>
            <img src={images.training} alt="" style={Testimonoials.icon} />
            <div style={Testimonoials.number}>5</div>
            <div style={Testimonoials.text}>Sports Events</div>
          </div>
        </div>
      </div>
      {/* Promotion */}
      <div style={Promotion.container}>
        <div style={Promotion.heading}>
          Become a Valued Sponsor and Showcase Your Brand to a Wider Audience
        </div>
        <Button
          onClick={() => {
            navigate('/contactUs');
          }}
          type={ButtonType.backgroundWithBorder}
          text={'Get In Touch'}
        />
      </div>
      <Footer></Footer>
    </div>
  );
};

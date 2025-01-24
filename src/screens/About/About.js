import React from 'react';
import NavBar from '../NavBar';
import {
  heroSection,
  IconContainer,
  IntroBackGround,
  IntroCardContainer,
  Section,
} from './About.style';
import Footer from '../Footer';
import images from '../../images';

const objective = [
  {
    image: images.booking,
    title: 'Ease of Booking',
    description:
      "SMUH provided collaborative platform that's meet the requirements of both sports person and sports tournament organizers.",
  },
  {
    image: images.smoothProcess,
    title: 'Smooth Process',
    description:
      'SMUH offers simple user registration for sports and also provided dashboard for users to keep eyes over their previous and upcoming participations in sports.',
  },
  {
    image: images.interface,
    title: 'Interective Interface',
    description:
      'SMUH bring simplified platform to list sports event by different event organizers with simple Verification process and easy to use interface.',
  },
];

const Introduction = [
  {
    title: 'Introduction',
    description:
      'Our startup aims to bridge the gap between sports players and organizers by providing an online platform for them to connect and fulfil their requirements. This policy outlines the guidelines for usage, responsibilities, and compliance to ensure a safe and efficient environment for all users.',
    icon: images.users,
  },
  {
    title: 'Definitions',
    description: `- Platform: The online service provided by the company.
                  - User: Any individual or organization using the platform.
                  - Player: An individual seeking sports opportunities.
                  - Organizer: An entity offering sports opportunities.`,
    icon: images.trophyWhite,
  },
  {
    title: 'Simple User Registration and Verification',
    description: `- provided Simple user Registration for sports and reflect it on their dashboard
                  -simple registration and Verification process for event host / organizers`,
    icon: images.message,
  },
  {
    title: 'Privacy and Data Protection',
    description: `- User data will be collected and processed in accordance with privacy laws.
- Personal information will not be shared with third parties without consent.`,
    icon: images.security,
  },
  {
    title: 'Payments and Transactions',
    description:
      '- All financial transactions must be conducted through the platform’s secure payment gateway.',
    icon: images.moneyBag,
  },
  {
    title: 'Support service',
    description:
      'For any questions or concerns regarding issues smuh team is available for 24*7 for their users.',
    icon: images.support,
  },
];
const About = () => {
  return (
    <div>
      <NavBar />
      {/* Intoduction */}
      <div style={heroSection}>About Us</div>

      <div style={{ ...Section.container, backgroundColor: '#fff' }}>
        <div style={Section.subHeading}>Introduction</div>
        <div style={Section.heading}>About SMUH Tech Pvt. Ltd.</div>
        <div
          style={{
            ...Section.content.container,
            width: '100%',
            flexWrap: 'nowrap',
          }}
        >
          <IntroBackGround>
            <img style={Section.introImage} src={images.about1} alt="image" />
          </IntroBackGround>
          <IntroCardContainer>
            {Introduction.map((item, index) => {
              return (
                <div
                  style={{
                    ...Section.content.card.container,
                    backgroundColor: '#fff',
                    position: 'relative',
                  }}
                >
                  <IconContainer>
                    <img
                      src={item.icon}
                      alt="icon"
                      style={Section.content.icon}
                    />
                  </IconContainer>
                  <div
                    style={{
                      ...Section.content.card.Headinng,
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{ ...Section.content.card.text, fontSize: '14px' }}
                  >
                    {item.description}
                  </div>
                </div>
              );
            })}
          </IntroCardContainer>
        </div>
      </div>
      {/* Objective */}
      <div style={Section.container}>
        <div style={Section.circleLayerOne}></div>
        <div style={Section.circleLayerTwo}></div>
        <div style={Section.circleLayerThree}></div>
        <div style={Section.subHeading}>KNOW OUR</div>
        <div style={Section.heading}>Samuh Objective</div>
        <div style={Section.content.container}>
          {objective.map((item, index) => {
            return (
              <div
                style={{
                  ...Section.content.card.container,
                  backgroundColor: '#fff',
                }}
              >
                <img
                  src={item.image}
                  alt="icon"
                  style={Section.content.card.icon}
                />
                <div style={Section.content.card.Headinng}>{item.title}</div>
                <div style={Section.content.card.text}>{item.description}</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Why Join Us */}
      <div style={{ ...Section.container, backgroundColor: '#fff' }}>
        <div style={Section.subHeading}>CHOOSE THE BEST</div>
        <div style={Section.heading}>Why Join Us</div>
        <div style={Section.content.container}>
          <div style={Section.circleLayerFour}></div>
          <div style={Section.content.card.container}>
            <img
              src={images.connection}
              alt=""
              style={Section.content.card.icon}
            />
            <div style={Section.content.card.Headinng}>
              Seamless Event Hosting
            </div>
            <div style={Section.content.card.text}>
              Effortlessly create and manage sports events with our intuitive
              interface, designed for organizers to streamline every aspect.
            </div>
          </div>
          <div style={Section.content.card.container}>
            <img src={images.mail} alt="" style={Section.content.card.icon} />
            <div style={Section.content.card.Headinng}>
              Simple Athlete Registration
            </div>
            <div style={Section.content.card.text}>
              Effortlessly create and manage sports events with our intuitive
              interface, designed for organizers to streamline every aspect.
            </div>
          </div>
          <div style={Section.content.card.container}>
            <img src={images.trophy} alt="" style={Section.content.card.icon} />
            <div style={Section.content.card.Headinng}>
              Explore Sports Opportunities
            </div>
            <div style={Section.content.card.text}>
              Discover and engage with various sports categories, opening doors
              to new competitions and growth opportunities on our platform.
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default About;

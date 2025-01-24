import React from 'react';
import {
  Container,
  copyright,
  Description,
  FooterContainer,
  Icon,
  Icons,
  InfoItem,
  Logo,
  QuickLinks,
  Section,
  SocialIcons,
} from './Footer.style';
import images from '../images';
const Footer = () => {
  return (
    <Container>
      <div style={Icons.footerOne}></div>
      <div style={Icons.footerTwo}></div>
      <div style={Icons.footerThree}></div>
      <div style={Icons.footerFour}></div>
      <div style={Icons.footerFive}></div>
      <div style={Icons.footerSix}></div>
      <div style={Icons.footerSeven}></div>
      <div style={Icons.footerEight}></div>
      <FooterContainer>
        {/* Left Section */}
        <Section>
          <Logo src={images.transparentLogo}></Logo>
          <Description>
            We aim to bridge the gap between sports players and organizers by
            providing an online platform for them to connect and fulfill their
            requirements.
          </Description>
        </Section>

        {/* Middle Section */}
        <Section>
          <h3>Quick Links</h3>
          <QuickLinks>
            <li>
              <a href="/home">
                <Icon src={images.rightArrow} />
                Home
              </a>
            </li>
            <li>
              <a href="/about">
                {' '}
                <Icon src={images.rightArrow} />
                About Us
              </a>
            </li>
            <li>
              <a href="/events">
                {' '}
                <Icon src={images.rightArrow} />
                Events
              </a>
            </li>
            <li>
              <a href="/contactUs">
                {' '}
                <Icon src={images.rightArrow} />
                Contact Us
              </a>
            </li>
            <li>
              <a href="#refund">
                {' '}
                <Icon src={images.rightArrow} />
                Refund Policy
              </a>
            </li>
            <li>
              <a href="#terms">
                {' '}
                <Icon src={images.rightArrow} />
                Terms and Conditions
              </a>
            </li>
          </QuickLinks>
        </Section>

        {/* Right Section */}
        <Section>
          <h3>Information</h3>
          <InfoItem>📞 +91 9671875065</InfoItem>
          <InfoItem>📧 support@smuh.in</InfoItem>
          <InfoItem>
            📍 648, Gali Kailash Pandit Wali, Chattar Garh Patti, Sirsa.
          </InfoItem>

          <SocialIcons>
            <a href="#facebook">
              <Icon src={images.facebookLogo} />
            </a>
            <a href="#instagram">
              <Icon src={images.instagramLogo} />
            </a>
            <a href="#twitter">
              <Icon src={images.twitterLogo} />
            </a>
          </SocialIcons>
        </Section>
      </FooterContainer>
      <div style={copyright}>© Copyright 2025 SMUH. All Rights Reserved.</div>
    </Container>
  );
};

export default Footer;

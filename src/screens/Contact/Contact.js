import React from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import {
  Card,
  CardContent,
  contactSection,
  heading,
  heroSection,
  Icon,
  IconWrapper,
  SectionContainer,
  subHeading,
} from './Contact.style';
import GenericForm from '../../modules/components/form/Form';
import images from '../../images';

const layoutFields = [
  {
    fields: [
      {
        label: 'Your Name',
        type: 'text',
        field: 'name',
        size: 'medium',
      },
      {
        label: 'Email',
        type: 'text',
        field: 'email',
        size: 'medium',
      },
      {
        label: 'Phone Number',
        type: 'text',
        field: 'subject',
        size: 'medium',
      },
      {
        label: 'Are You',
        type: 'autocomplete',
        field: 'category',
        options: [
          {
            label: 'Player',
            value: 'Player',
          },
          {
            label: 'Event Organizer',
            value: 'Event Organizer',
          },
          {
            label: 'Academy Owner',
            value: 'Academy Owner',
          },
        ],
        size: 'medium',
      },
    ],
  },
];
const ContactUs = () => {
  return (
    <div>
      <NavBar />
      <div style={heroSection}>Contact Us</div>
      <div style={contactSection}>
        <div>
          <div style={subHeading}>GET IN TOUCH</div>
          <div style={heading}>If Contact With Us Send Detail</div>
          <SectionContainer>
            <GenericForm
              layout={layoutFields}
              mode={'create'}
              showCancelButton={false}
            ></GenericForm>
          </SectionContainer>
        </div>
        <div>
          <div style={subHeading}>CONTACT</div>
          <div style={heading}>Information</div>
          <SectionContainer>
            <Card>
              <IconWrapper>
                <Icon src={images.address} />
              </IconWrapper>
              <CardContent>
                <h3>ADDRESS</h3>
                <p>648, Gali Kailash Pandit Wali, Chattar Garh Patti, Sirsa.</p>
              </CardContent>
            </Card>

            <Card>
              <Icon src={images.mail} />
              <CardContent>
                <h3>MAIL TO US</h3>
                <p>support@smuh.in</p>
              </CardContent>
            </Card>

            <Card>
              <Icon src={images.call} />
              <CardContent>
                <h3>CONTACT VIA CALL</h3>
                <p>9671875065</p>
              </CardContent>
            </Card>
          </SectionContainer>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ContactUs;

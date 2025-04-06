import React from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import {
  AddressIconWrapper,
  Card,
  CardContent,
  ContactSection,
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
        field: 'phoneNumber',
        size: 'medium',
      },
      {
        label: 'Are You',
        type: 'autocomplete',
        field: 'role',
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
      {
        label: 'Message',
        type: 'textarea',
        field: 'message',
        size: 'large',
      },
    ],
  },
];
const ContactUs = () => {
  const handleSubmit = (formData) => {
    const subject = `Contact Request from ${formData?.name}`;
    const body = `
      Name: ${formData?.name},
      Email: ${formData?.email},
      Phone Number: ${formData?.phoneNumber},
      Role: ${formData?.role},
      Message: ${formData?.message},
    `;

    const mailtoLink = `mailto:support@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open user's default email client
    window.location.href = mailtoLink;
  };
  return (
    <div>
      <NavBar showIcon={true} />
      <div style={heroSection}>Contact Us</div>
      <ContactSection>
        <div>
          <div style={subHeading}>GET IN TOUCH</div>
          <div style={heading}>If Contact With Us Send Detail</div>
          <SectionContainer>
            <GenericForm
              _onSubmit={(formData) => {
                handleSubmit(formData);
              }}
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
              <AddressIconWrapper src={images.address} />
              <CardContent>
                <h3>ADDRESS</h3>
                <p>648, Gali Kailash Pandit Wali, Chattar Garh Patti, Sirsa.</p>
              </CardContent>
            </Card>

            <Card>
              <Icon src={images.mail} />
              <CardContent>
                <h3>MAIL TO US</h3>
                <p>udaansport@gmail.com</p>
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
      </ContactSection>
      <Footer></Footer>
    </div>
  );
};

export default ContactUs;

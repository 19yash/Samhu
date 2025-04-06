import React from 'react';
import { styles, Container, Logo } from '../styles/singup.style';
import { useNavigate } from 'react-router-dom';
import images from '../../../images';
import routeLink from '../../../constants/routeLink';
import GenericForm from '../../components/form/Form';
import { modes } from '../../../constants/formConstants';

const SignUpForm = () => {
  const navigate = useNavigate();

  const layoutFields = [
    {
      fields: [
        {
          label: 'Role',
          type: 'autocomplete',
          field: 'role',
          required: true,
          size: 'large',
          options: [
            { label: 'Host', value: 'Host' },
            { label: 'Participant', value: 'Participant' },
          ],
        },
        {
          label: 'Name',
          type: 'text',
          field: 'name',
          required: true,
          size: 'medium',
        },
        {
          label: 'Email',
          type: 'text',
          field: 'email',
          required: true,
          size: 'medium',
        },
        {
          label: 'Organization Name',
          type: 'text',
          field: 'organisation_name',
          // required: true,
          size: 'medium',
          visible: (data) => {
            return data.role === 'Host';
          },
        },
        {
          label: 'Academic Institute Name',
          type: 'text',
          field: 'school_or_college',
          size: 'medium',
          visible: (data) => {
            return data.role === 'Participant';
          },
        },

        {
          label: 'Phone Number',
          type: 'text',
          field: 'phone_number',
          required: true,
          size: 'medium',
        },
        {
          label: 'Age',
          type: 'text',
          field: 'age',
          required: true,
          size: 'medium',
        },
        {
          label: 'Height',
          type: 'text',
          field: 'height',
          size: 'medium',
          visible: (data) => {
            console.log('🚀 ~ SignUpForm ~ data:', data);
            return data.role === 'Participant';
          },
        },
        {
          label: 'Address',
          type: 'text',
          field: 'address',
          required: true,
          size: 'medium',
        },
        {
          label: 'Password',
          type: 'password',
          field: 'password',
          required: true,
          size: 'large',
          pattern:
            '^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])[A-Za-z\\d\\S]+$',
        },
        {
          label: 'Confirm Password',
          type: 'password',
          field: 'confirm_password',
          required: true,
          size: 'large',
          pattern:
            '^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])[A-Za-z\\d\\S]+$',
        },
      ],
    },
  ];
  return (
    <>
      <Container>
        {/* Dummy Logo - This will always stay visible */}
        <div style={styles.form}>
          <div style={styles.logoContainer}>
            <Logo src={images.fullBrandLogo} alt="Logo" />
          </div>

          <GenericForm
            beforeSubmit={(formData) => {
              return {
                ...formData,
                age: Number(formData?.age),
                height: Number(formData?.height),
              };
            }}
            afterSubmit={(response) => {
              navigate('/login');
            }}
            mode={modes.create}
            apiPath={routeLink.signup}
            layout={layoutFields}
            buttonContainerStyles={{
              flexDirection: 'column-reverse', // Ensure buttons stack vertically
              gap: 2, // Gap between buttons
              width: '100%', // Make the buttons container take full width
              alignItems: 'stretch',
            }}
            saveButtonText={'Submit'}
            cancelButtonText="Log In"
            onCancel={() => navigate('/login')}
          />
        </div>
      </Container>
    </>
  );
};

export default SignUpForm;

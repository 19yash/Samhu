import React from 'react';
import GenericForm from '../components/form/Form';
import httpService from '../../services/httpService';
import routeLink from '../../constants/routeLink';
import { useLocation } from 'react-router-dom';
import { modes } from '../../constants/formConstants';
import { useAuth } from '../auth/hooks/useAuth';

const event = {};

const layoutFields = [
  {
    label: 'Participant Details',
    fields: [
      {
        label: 'Name',
        type: 'text',
        field: 'name',
        required: true,
        size: 'medium',
      },
      {
        label: 'Email',
        type: 'email',
        field: 'email',
        required: true,
        size: 'medium',
      },
      {
        label: 'Phone Number',
        type: 'text',
        field: 'phone_number',
        required: true,
        size: 'medium',
      },
      {
        label: 'Registration Fees',
        type: 'number',
        field: 'fees',
        required: true,
        size: 'medium',
      },
      {
        label: 'Reward',
        type: 'text',
        field: 'reward',
        required: true,
      },
      {
        label: 'Poster',
        type: 'file',
        field: 'poster',
        required: true,
      },
    ],
  },
];

const ParticipantForm = () => {
  const { state } = useLocation();
  const { mode = modes.create, event } = state || {};
  const { user } = useAuth();
  console.log('🚀 ~ ParticipantForm ~ user:', user);

  return (
    <GenericForm
      mode={mode}
      apiPath={
        mode === modes.create
          ? routeLink.events
          : `${routeLink.events}/${event?._id}`
      }
      layout={layoutFields}
      styles={{
        container: {
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
      }}
      defaultValues={{ name: 'yash', email: 'yashgupta19082000@gmail.com' }}
    />
  );
};

export default ParticipantForm;

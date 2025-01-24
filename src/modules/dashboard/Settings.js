import React from 'react';
import GenericForm from '../components/form/Form';
import { modes } from '../../constants/formConstants';
import routeLink from '../../constants/routeLink';
import { useAuth } from '../auth/hooks/useAuth';
import { userRole } from '../../constants/userRole';

const Settings = () => {
  const { user } = useAuth();
  const layoutFields = [
    {
      label: 'Profile Details',
      fields: [
        {
          type: 'text',
          label: 'Name',
          field: 'name',
          required: true,
          size: 'medium',
        },
        {
          type: 'text',
          label: 'Email',
          field: 'email',
          required: true,
          size: 'medium',
        },
        {
          type: 'text',
          label: 'Phone',
          field: 'phone_number',
          required: true,
          size: 'medium',
        },
        {
          type: 'text',
          label: 'Address',
          field: 'address',
          required: true,
          size: 'medium',
        },
        {
          type: 'text',
          label: 'Organization',
          field: 'organisation_name',
          required: true,
          size: 'medium',
          visible: user.role === userRole.host,
        },
        {
          type: 'text',
          label: 'Academic Institute Name',
          field: 'school_or_college',
          required: true,
          size: 'medium',
          visible: user.role === userRole.participant,
        },
      ],
    },
  ];
  return (
    <GenericForm
      layout={layoutFields}
      mode={modes.edit}
      apiPath={routeLink.user}
    />
  );
};

export default Settings;

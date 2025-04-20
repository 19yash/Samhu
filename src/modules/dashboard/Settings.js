import React from 'react';
import GenericForm from '../components/form/Form';
import { modes } from '../../constants/formConstants';
import routeLink from '../../constants/routeLink';
import { useAuth } from '../auth/hooks/useAuth';
import { userRole } from '../../constants/userRole';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
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
        ...(user.role === userRole.host
          ? [
              {
                type: 'text',
                label: 'Organization',
                field: 'organisation_name',
                required: true,
                size: 'medium',
              },
            ]
          : []),

        ...(user.role === userRole.participant
          ? [
              {
                type: 'text',
                label: 'Academic Institute Name',
                field: 'school_or_college',
                required: true,
                size: 'medium',
              },
            ]
          : []),
      ],

      ...(user.role === userRole.host
        ? [
            {
              type: 'text',
              label: 'Account Number',
              field: 'account_number',
              required: true,
              size: 'medium',
            },
            {
              type: 'text',
              label: 'Bank Name',
              field: 'bank_name',
              required: true,
              size: 'medium',
            },
            {
              type: 'text',
              label: 'IFSC Code',
              field: 'ifsc_code',
              required: true,
              size: 'medium',
            },
            {
              type: 'text',
              label: 'Account Holder Name',
              field: 'account_holder_name',
              required: true,
              size: 'medium',
            },
          ]
        : []),
    },
  ];
  return (
    <GenericForm
      afterSubmit={() => {
        navigate(-1);
      }}
      layout={layoutFields}
      mode={modes.edit}
      apiPath={`${routeLink.user}${user.id}`}
      submitApiPath={`${routeLink.user}`}
    />
  );
};

export default Settings;

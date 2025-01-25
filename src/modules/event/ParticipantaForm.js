import React from 'react';
import GenericForm from '../components/form/Form';
import httpService from '../../services/httpService';
import routeLink from '../../constants/routeLink';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { modes } from '../../constants/formConstants';
import { useAuth } from '../auth/hooks/useAuth';

const ParticipantForm = () => {
  const navigate = useNavigate();
  const { participantId } = useParams();
  const { state } = useLocation();
  const { mode = modes.create, event } = state || {};
  const { user } = useAuth();
  const categoryOptions = event?.categories?.map((category) => {
    return {
      label: category?.category_details?.name,
      value: category?.category_details,
    };
  });
  const computeParticipantLayout = async ({
    formData,
    formLayout,
    setFormLayout,
  }) => {
    const filteredField = formLayout?.[0]?.fields?.filter(
      (section) => section.field === 'category_id'
    );
    const processedLayout = [
      {
        label: '',
        fields: [...filteredField],
      },
      // ...formLayout?.[0]?.fields?.filter(
      //   (section) => section.field === 'category_id'
      // ),
    ];

    try {
      const { category_id } = formData;
      if (category_id?.is_team_sport) {
        const participants = category_id?.participants_in_team;
        processedLayout.push({
          label: 'Team Details',
          fields: [
            {
              type: 'text',
              label: 'Team Name',
              field: 'team_name',
              required: true,
              size: 'medium',
            },
          ],
        });
        for (let i = 0; i < participants; i++) {
          processedLayout.push({
            label: `Participant ${i + 1} Details`,
            fields: [
              {
                type: 'text',
                label: `name`,
                field: `members_${i}_name`,
                required: true,
                size: 'medium',
              },
              {
                type: 'text',
                label: `email`,
                field: `members_${i}_email`,
                required: true,
                size: 'medium',
              },
              {
                label: 'Phone Number',
                type: 'text',
                field: `members_${i}_phone_number`,
                required: true,
                size: 'medium',
              },
              {
                label: 'Role',
                type: 'autocomplete',
                field: `members_${i}_role`,
                options: [
                  { label: 'Captain', value: 'Captain' },
                  { label: 'Vice Captain', value: 'Vice Captain' },
                ],
                size: 'medium',
              },
            ],
          });
        }
      } else {
        processedLayout.push({
          label: 'Participant Details',
          fields: [
            {
              type: 'text',
              label: 'name',
              field: 'name',
              size: 'medium',
              readOnly: true,
              value: user?.user_name,
            },
            {
              type: 'text',
              label: 'email',
              field: 'email',
              size: 'medium',
              readOnly: true,
              value: user?.email,
            },
            {
              label: 'Phone Number',
              type: 'text',
              field: 'PhoneNumber',
              size: 'medium',
              readOnly: true,
              value: user?.PhoneNumber,
            },
          ],
        });
      }
      setFormLayout(processedLayout);
    } catch (error) {
      console.error('Error in compute function:', error);
    }
  };
  const layoutFields = [
    {
      label: '',
      fields: [
        {
          label: 'Select Category In Which You want to Participate',
          type: 'autocomplete',
          field: 'category_id',
          options: categoryOptions,
          required: true,
          size: 'medium',
        },
      ],
    },
  ];

  return (
    <GenericForm
      afterSubmit={() => {
        navigate(-1);
      }}
      mode={mode}
      beforeSubmit={(formData) => {
        const newFormData = {
          ...formData,
          members: [],
        };
        const participant = formData['category_id']?.participants_in_team;
        let isCaptainSelected = false;
        let isViceCaptainSelected = false;
        for (let i = 0; i < participant; i++) {
          if (formData[`members_${i}_role`] === 'Captain') {
            if (isCaptainSelected) {
              throw new Error('Only one Captain is allowed');
            }
            isCaptainSelected = true;
          }
          if (formData[`members_${i}_role`] === 'Vice Captain') {
            if (isViceCaptainSelected) {
              throw new Error('Only one Vice Captain is allowed');
            }
            isViceCaptainSelected = true;
          }
          newFormData['members'].push({
            name: formData[`members_${i}_name`],
            email: formData[`members_${i}_email`],
            phone_number: formData[`members_${i}_phone_number`],
          });
        }

        newFormData['category_id'] = formData['category_id'].id;
        newFormData['event_id'] = event?.id;
        newFormData['participant_id'] = user?.id;
        return newFormData;
      }}
      computations={[
        {
          fields: ['category_id'],
          condition: (formData) => {
            return formData?.category_id;
          },
          compute: computeParticipantLayout,
        },
      ]}
      apiPath={
        mode === modes.create
          ? '/event/participate'
          : `/event/participate/${participantId}`
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
    />
  );
};

export default ParticipantForm;

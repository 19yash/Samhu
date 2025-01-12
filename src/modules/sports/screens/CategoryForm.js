import React from 'react';
import GenericForm from '../../components/form/Form';
import routeLink from '../../../constants/routeLink';
import { modes } from '../../../constants/formConstants';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const CategoryForm = () => {
  const { state } = useLocation();
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { mode = modes.create } = state || {};

  const layout = [
    {
      fields: [
        {
          type: 'autocomplete',
          label: 'Sport',
          field: 'sports_id',
          api: routeLink.sports,
          required: true,
          size: 'medium',
          keyField: 'id',
          suggestionField: 'sports_name',
        },
        {
          label: 'Category',
          field: 'name',
          type: 'text',
          required: true,
        },
        {
          label: 'Min Age',
          field: 'min_age',
          type: 'number',
        },
        {
          label: 'Max Age',
          field: 'max_age',
          type: 'number',
        },
        {
          label: 'Max weight',
          field: 'max_weight_allowed',
          type: 'number',
        },
        {
          label: 'Min weight',
          field: 'min_weight_allowed',
          type: 'number',
        },
        {
          label: 'Number of Participant',
          field: 'participants_in_team',
          type: 'number',
          required: true,
        },
        // {
        //   label: 'Gender',
        //   field: 'gender',
        //   type: 'autocomplete',
        //   options: [
        //     { label: 'Male', value: 'male' },
        //     { label: 'Female', value: 'female' },
        //   ],
        // },
      ],
    },
  ];
  return (
    <GenericForm
      afterSubmit={(response) => {
        navigate(-1);
      }}
      beforeSubmit={(formData) => {
        return {
          ...formData,
          is_team_sport: formData.Participants_in_team > 1,
          participants_in_team: Number(formData.Participants_in_team),
          min_age: Number(formData.min_age),
          max_age: Number(formData.max_age),
          min_weight_allowed: Number(formData.min_weight_allowed),
          max_weight_allowed: Number(formData.max_weight_allowed),
        };
      }}
      mode={mode}
      apiPath={
        mode === modes.create
          ? `${routeLink.category}/`
          : `${routeLink.category}/${categoryId}`
      }
      layout={layout}
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

export default CategoryForm;

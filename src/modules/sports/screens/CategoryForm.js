import React from 'react';
import GenericForm from '../../components/form/Form';
import routeLink from '../../../constants/routeLink';
import { modes } from '../../../constants/formConstants';
import { useLocation } from 'react-router-dom';

const CategoryForm = () => {
  const { state } = useLocation();
  const { category, mode = modes.create } = state || {};

  const layout = [
    {
      fields: [
        {
          type: 'autocomplete',
          label: 'Sport',
          field: 'sport',
          api: routeLink.sport,
          required: true,
          size: 'medium',
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
          label: 'weight',
          field: 'weight',
          type: 'number',
        },
        {
          label: 'Number of Participant',
          field: 'paticipants',
          type: 'number',
          required: true,
        },
        {
          label: 'Gender',
          field: 'gender',
          type: 'autocomplete',
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ],
        },
      ],
    },
  ];
  return (
    <GenericForm
      mode={mode}
      apiPath={
        mode === modes.create
          ? routeLink.category
          : `${routeLink.category}/${category?._id}`
      }
      layout={layout}
      onSubmit=""
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

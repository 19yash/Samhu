import React from 'react';
import GenericForm from '../../components/form/Form';

const fields = [
  {
    label: 'Tounament Details',
    fields: [
      {
        label: 'Tornament Name',
        type: 'text',
        field: 'name',
        required: true,
        size: 'medium',
      },
      {
        label: 'Sports',
        type: 'autocomplete',
        field: 'sport',
        options: [
          {
            label: 'Cricket',
            value: 'Cricket',
          },
          {
            label: 'Football',
            value: 'Football',
          },
          {
            label: 'Archery',
            value: 'Archery',
          },
        ],
        required: true,
        size: 'medium',
      },
      {
        label: 'Category',
        type: 'autocomplete',
        field: 'category',
        options: [
          {
            label: 'U-19',
            value: 'Womens U-19',
          },
          {
            label: 'U-21',
            value: 'Womens U-19',
          },
          {
            label: 'Womens U-19',
            value: 'Womens U-19',
          },
        ],
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
    ],
  },
];

const SportsForm = () => {
  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
  };
  return (
    <GenericForm
      //   mode="edit"
      apiPath="https://api.example.com/user/123"
      fields={fields}
      onSubmit={handleSubmit}
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

export default SportsForm;

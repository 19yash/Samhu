import React from 'react';
import GenericForm from '../../components/form/Form';

const fields = [
  {
    label: 'Sports',
    type: 'text',
    field: 'sport',
    required: true,
    size: 'medium',
  },
  {
    label: 'Category',
    type: 'chip',
    field: 'category',
    required: true,
    size: 'medium',
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

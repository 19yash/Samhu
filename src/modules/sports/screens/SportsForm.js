import React from 'react';
import GenericForm from '../../components/form/Form';
import routeLink from '../../../constants/routeLink';
import { modes } from '../../../constants/formConstants';
import Modal from '../../components/modal';

const fields = [
  {
    label: 'Add Sport',
    fields: [
      {
        label: 'Name',
        type: 'text',
        field: 'sports_name',
        required: true,
        size: 'large',
      },
    ],
  },
];

const SportsForm = () => {
  console.log('Loaded completely');
  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
  };
  return (
    <Modal>
      <GenericForm
        mode={modes.create}
        apiPath={routeLink.sports}
        layout={fields}
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
    </Modal>
  );
};

export default SportsForm;

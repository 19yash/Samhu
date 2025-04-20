import React from 'react';
import GenericForm from '../../components/form/Form';
import routeLink from '../../../constants/routeLink';
import { modes } from '../../../constants/formConstants';
import Modal from '../../components/modal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { sportsTableStyle } from '../sports.style';

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
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log('🚀 ~ SportsForm ~ state:', state);
  const { sportsId } = useParams();

  const { mode = modes.create, sport } = state || {};
  console.log('🚀 ~ SportsForm ~ mode:', mode);

  return (
    <Modal>
      <GenericForm
        afterSubmit={() => {
          navigate(-1);
        }}
        defaultValues={
          mode === modes.edit ? { sports_name: sport?.sports_name } : {}
        }
        mode={mode}
        apiPath={
          mode === modes.create
            ? routeLink.sports
            : `${routeLink.sports}${sportsId}`
        }
        layout={fields}
        styles={sportsTableStyle}
      />
    </Modal>
  );
};

export default SportsForm;

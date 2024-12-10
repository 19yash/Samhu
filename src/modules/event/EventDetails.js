import React from 'react';
import { useLocation } from 'react-router-dom';
import ParticaipantsTable from './screens/ParticipantsTable';
import images from '../../images';
const EventDetails = () => {
  const { state } = useLocation();
  const { event = {} } = state || {};

  return (
    <>
      <ParticaipantsTable></ParticaipantsTable>
    </>
  );
};

export default EventDetails;

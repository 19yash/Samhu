import TabNavigation from '../../components/tab/TabNavigation';
import ParticaipantsTable from './ParticipantsTable';
import React from 'react';

const Participants = ({ event }) => {
  console.log('🚀 ~ Participants ~ event:', event);
  if (!event) {
    return;
  }

  const tabs = [];

  event?.categories?.forEach((category) => {
    tabs.push({
      name: category?.category_details?.name,
      element: ParticaipantsTable,
      props: { category: category.category_details },
    });
  });
  if (!tabs.length) {
    return <div>No Paticipants Data</div>;
  }
  return <TabNavigation tabs={tabs} />;
};

export default Participants;

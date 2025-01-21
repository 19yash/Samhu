import TabNavigation from '../../components/tab/TabNavigation';
import ParticaipantsTable from './ParticipantsTable';
import React from 'react';

const Participants = ({ event }) => {
  if (!event) {
    return;
  }

  const tabs = [];
  event.categories.map((category) => {
    tabs.push({
      name: category.categoryId.name,
      element: ParticaipantsTable,
      props: { event: event },
    });
  });

  return <TabNavigation tabs={tabs} />;
};

export default Participants;

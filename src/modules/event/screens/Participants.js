import TabNavigation from '../../components/tab/TabNavigation';
import ParticaipantsTable from './ParticipantsTable';

const Participants = ({ event }) => {
  if (!event) {
    return;
  }

  const tabs = [];
  event.categories.map((event) => {
    event.categories.map((category) => {
      tabs.push({
        name: category.name,
        element: ParticaipantsTable,
        props: { event: event },
      });
    });
  });

  return <TabNavigation tabs={tabs} />;
};

export default Participants;

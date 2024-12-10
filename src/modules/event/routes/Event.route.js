import CategoryForm from '../../sports/screens/CategoryForm';
import EventDetails from '../EventDetails';
import EventForm from '../EventForm';

const EventRoutes = [
  {
    name: 'AddEvent',
    path: '/events/category',
    element: <CategoryForm />,
    // element: <EventForm />,
  },
  {
    name: 'Event Details',
    path: '/events/event-details',
    element: <EventDetails />,
  },
  {
    name: 'AddEvent',
    path: '/events/add-event',
    element: <EventForm />,
  },
];

export default EventRoutes;

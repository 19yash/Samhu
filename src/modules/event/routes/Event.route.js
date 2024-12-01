import CategoryForm from '../../sports/screens/CategoryForm';
import EventForm from '../EventForm';

const EventRoutes = [
  {
    name: 'AddEvent',
    path: '/events/category',
    element: <CategoryForm />,
    // element: <EventForm />,
  },
  {
    name: 'AddEvent',
    path: '/events/add-event',
    element: <EventForm />,
  },
];

export default EventRoutes;

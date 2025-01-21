import CategoryForm from '../../sports/screens/CategoryForm';
import EventDetails from '../EventDetails';
import EventForm from '../EventForm';
import ParticipantForm from '../ParticipantaForm';
import React from 'react';

const EventRoutes = [
  {
    name: 'AddEvent',
    path: '/events/category',
    element: <CategoryForm />,
    // element: <EventForm />,
  },
  {
    name: 'Event Details',
    path: '/events/event-details/:eventId',
    element: <EventDetails />,
  },
  {
    name: 'AddEvent',
    path: '/events/add-event',
    element: <EventForm />,
  },
  {
    name: 'Edit Event',
    path: '/events/edit-event/:eventId',
    element: <EventForm />,
  },
  {
    name: 'Participant Form',
    path: '/events/event-details/:eventId/participate',
    element: <ParticipantForm />,
  },
];

export default EventRoutes;

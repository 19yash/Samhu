import React from 'react';
import GenericForm from '../components/form/Form';
import httpService from '../../services/httpService';
import routeLink from '../../constants/routeLink';
import { useLocation } from 'react-router-dom';
import { modes } from '../../constants/formConstants';

const layoutFields = [
  {
    label: 'Tounament Details',
    fields: [
      {
        label: 'Tornament Name',
        type: 'text',
        field: 'name',
        required: true,
        size: 'medium',
      },
      {
        label: 'Sports',
        type: 'autocomplete',
        field: 'sport',
        options: [
          {
            label: 'Cricket',
            value: 'Cricket',
          },
          {
            label: 'Football',
            value: 'Football',
          },
          {
            label: 'Archery',
            value: 'Archery',
          },
        ],
        required: true,
        size: 'medium',
      },
      {
        label: 'Category',
        type: 'autocomplete',
        field: 'category',
        options: [
          {
            label: 'U-19',
            value: 'Womens U-19',
          },
          {
            label: 'U-21',
            value: 'Womens U-19',
          },
          {
            label: 'Womens U-19',
            value: 'Womens U-19',
          },
        ],
        required: true,
        size: 'medium',
      },

      {
        label: 'Registration Fees',
        type: 'number',
        field: 'fees',
        required: true,
        size: 'medium',
      },

      {
        label: 'Reward',
        type: 'text',
        field: 'reward',
        required: true,
      },
      {
        label: 'Poster',
        type: 'file',
        field: 'poster',
        required: true,
      },
    ],
  },
  {
    label: 'Dates',
    fields: [
      {
        label: 'Start Date',
        type: 'date',
        field: 'eventDate',
        required: true,
        size: 'medium',
      },
      {
        label: 'End Date',
        type: 'date',
        field: 'eventDate',
        required: true,
        size: 'medium',
      },
      {
        label: 'Registration start Date',
        type: 'date',
        field: 'eventDate',
        required: true,
        size: 'medium',
      },
      {
        label: 'Registration End Date',
        type: 'date',
        field: 'eventDate',
        required: true,
        size: 'medium',
      },
    ],
  },
  {
    label: 'Organizer Contact Info',
    fields: [
      {
        label: 'Name',
        type: 'text',
        field: 'name',
        required: true,
        size: 'medium',
      },
      {
        label: 'Phone Numbetr',
        type: 'text',
        field: 'name',
        required: true,
        size: 'medium',
      },
      {
        label: 'Email',
        type: 'text',
        field: 'name',
        required: true,
        size: 'medium',
      },
    ],
  },
  {
    label: 'Venue Info',
    fields: [
      {
        label: 'Name',
        type: 'text',
        field: 'name',
        required: true,
        size: 'medium',
      },
      {
        label: 'Address',
        type: 'text',
        field: 'name',
        required: true,
        size: 'medium',
      },
      {
        label: 'City',
        type: 'text',
        field: 'name',
        required: true,
        size: 'medium',
      },
      {
        label: 'ZipCode',
        type: 'text',
        field: 'name',
        required: true,
        size: 'medium',
      },
      {
        label: 'Country',
        type: 'text',
        field: 'name',
        required: true,
        size: 'medium',
      },
    ],
  },
];

const EventForm = () => {
  const { state } = useLocation();
  const { mode = modes.create, event } = state || {};

  return (
    <GenericForm
      mode={mode}
      apiPath={
        mode === modes.create
          ? routeLink.events
          : `${routeLink.events}/${event?._id}`
      }
      layout={layoutFields}
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

export default EventForm;

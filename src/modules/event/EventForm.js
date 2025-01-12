import React from 'react';
import GenericForm from '../components/form/Form';
import httpService from '../../services/httpService';
import routeLink from '../../constants/routeLink';
import { useLocation } from 'react-router-dom';
import { modes } from '../../constants/formConstants';
import { toast } from 'react-toastify';

const EventForm = () => {
  const { state } = useLocation();
  const { mode = modes.create, event } = state || {};

  const fetchCategories = async (sportsId) => {
    try {
      // const response = await httpService.get(routeLink.category);
      // console.log('🚀 ~ fetchCategories ~ response:', response);
      // return response;
      return [
        {
          _id: '123456',
          name: 'Women',
        },
        {
          _id: '123457',
          name: 'Men',
        },
      ];
      // if (response) {
      //   // setCategories(response.data);
      //   setCategories();
      // } else {
      //   throw new Error('Try Again Later');
      // }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const layoutFields = [
    {
      label: 'Tournament Details',
      fields: [
        {
          label: 'Tornament Name',
          type: 'text',
          field: 'name',
          required: true,
          size: 'medium',
          required: (formData) => {
            console.log(formData);
            return true;
          },
        },
        {
          label: 'Start Date',
          type: 'date',
          field: 'event_start_date',
          required: true,
          size: 'medium',
        },
        {
          label: 'End Date',
          type: 'date',
          field: 'event_end_Date',
          required: true,
          size: 'medium',
        },
        {
          label: 'Registration start Date',
          type: 'date',
          field: 'registration_start_date',
          required: true,
          size: 'medium',
        },
        {
          label: 'Registration End Date',
          type: 'date',
          field: 'registration_end_date',
          required: true,
          size: 'medium',
        },
        {
          label: 'Reward',
          type: 'text',
          field: 'rewards',
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
      label: 'Organizer Contact Info',
      fields: [
        {
          label: 'Name',
          type: 'text',
          field: 'organizer_name',
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
    {
      label: 'Sports Details',
      fields: [
        {
          label: 'Sports',
          type: 'autocomplete',
          field: 'sport',
          api: routeLink.sports,
          options: [
            {
              label: 'Cricket',
              value: { name: 'Cricket', _id: '123456' },
            },
            {
              label: 'Football',
              value: { name: 'Football', _id: '123457' },
            },
            {
              label: 'Archery',
              value: { name: 'Archery', _id: '123458' },
            },
          ],
          required: true,
          size: 'large',
        },
      ],
    },
  ];
  return (
    <GenericForm
      computations={[
        {
          fields: ['sport'],
          condition: (formData) => {
            return formData?.sport;
          },
          compute: async ({ formData, formLayout, setFormLayout }) => {
            try {
              const { sport } = formData || {};
              if (!sport?._id) {
                console.error('Sport ID is missing.');
                return;
              }

              // Fetch categories for the selected sport
              const categories = await fetchCategories(sport._id);

              if (!categories || !Array.isArray(categories)) {
                console.error('Invalid categories data.');
                return;
              }

              // Create copies of form data and layout
              const processedLayout = [...formLayout];

              // Process each category
              categories.forEach((category) => {
                // Add category layout to processedLayout
                processedLayout.push({
                  label: '',
                  fields: [
                    {
                      type: 'checkbox',
                      label: category.name,
                      field: `categories_${category._id}.selected`, // Dynamic field name
                      size: 'medium',
                    },
                    {
                      type: 'text',
                      label: 'Price',
                      field: `categories_${category._id}.price`, // Dynamic field name
                      size: 'medium',
                      // required,
                    },
                  ],
                });
              });
              // Update the state
              setFormLayout(processedLayout);
            } catch (error) {
              console.error('Error in compute function:', error);
            }
          },
        },
      ]}
      beforeSubmit={(formData) => {
        const processedFormData = { categories: [] };
        Object.keys(formData).forEach((key) => {
          if (key.startsWith('categories_') && formData[key].selected) {
            const category_id = key.replace('categories_', '');
            processedFormData['categories'].push({
              category_id: category_id,
              price: formData[key].price,
            });
          } else {
            processedFormData[key] = formData[key];
          }
        });
        return processedFormData;
      }}
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

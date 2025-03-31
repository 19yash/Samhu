import React from 'react';
import GenericForm from '../components/form/Form';
import httpService from '../../services/httpService';
import routeLink from '../../constants/routeLink';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { modes } from '../../constants/formConstants';
import { toast } from 'react-toastify';
import { useAuth } from '../auth/hooks/useAuth';
import moment from 'moment';

const EventForm = () => {
  const { eventId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { mode = modes.create } = state || {};

  const fetchCategories = async (sportsId) => {
    try {
      const response = await httpService.get(`${routeLink.category}/`, {
        sports_id: sportsId,
      });
      if (response.data) {
        return response.data;
      } else {
        throw new Error('No Categories Available');
      }
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
          field: 'title',
          required: true,
          size: 'medium',
        },
        {
          label: 'Start Date',
          type: 'date',
          field: 'start_date',
          required: true,
          size: 'medium',
        },
        {
          label: 'End Date',
          type: 'date',
          field: 'end_date',
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
          label: 'Description',
          type: 'textarea',
          field: 'description',
        },
        {
          label: 'Poster',
          type: 'file',
          field: 'poster',
          api: routeLink.uploadEventPoster,
          required: true,
          allowedFormats: '.jpg,.png,.jpeg',
        },
      ],
    },
    {
      label: 'Venue Info',
      fields: [
        {
          label: 'Name',
          type: 'text',
          field: 'venue_name',
          required: true,
          size: 'medium',
        },
        {
          label: 'Address',
          type: 'text',
          field: 'venue_address',
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
          field: 'sports_id',
          api: routeLink.sports,
          keyField: 'id',
          suggestionField: 'sports_name',
          required: true,
          size: 'large',
          visible: () => {
            return mode === modes.create;
          },
        },
        {
          label: 'Sports',
          type: 'autocomplete',
          field: 'sport_details',
          api: routeLink.sports,
          keyField: 'id',
          suggestionField: 'sports_name',
          size: 'large',
          visible: () => {
            return mode === modes.edit;
          },
        },
      ],
    },
  ];
  return (
    <GenericForm
      computations={[
        {
          fields: ['sports_id'],
          condition: (formData) => {
            return formData?.sports_id;
          },
          compute: async ({ formData, formLayout, setFormLayout }) => {
            try {
              const processedLayout = [];
              formLayout.forEach((section) => {
                const _sections = {
                  ...section,
                };
                const _fields = section.fields.filter((input) => {
                  return !input.field.includes('categories_');
                });
                _sections.fields = _fields;
                processedLayout.push(_sections);
              });
              const { sports_id } = formData || {};
              if (!sports_id) {
                console.error('Sport ID is missing.');
                return;
              }

              // Fetch categories for the selected sport
              const categories = await fetchCategories(sports_id);

              if (!categories || !Array.isArray(categories)) {
                console.error('Invalid categories data.');
                return;
              }

              // Create copies of form data and layout

              // Process each category
              categories.forEach((category) => {
                // Add category layout to processedLayout
                processedLayout.push({
                  label: '',
                  fields: [
                    {
                      type: 'checkbox',
                      label: category.name,
                      field: `categories_${category.id}.selected`, // Dynamic field name
                      size: 'medium',
                    },
                    {
                      type: 'text',
                      label: 'Price',
                      field: `categories_${category.id}.price`, // Dynamic field name
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
        {
          fields: ['sports_id'],
          condition: (formData) => {
            return !formData?.sports_id;
          },
          compute: async ({ formData, formLayout, setFormLayout }) => {
            try {
              const processedLayout = [];
              formLayout.forEach((section) => {
                const _sections = {
                  ...section,
                };
                const _fields = section.fields.filter((input) => {
                  return !input.field.includes('categories_');
                });
                _sections.fields = _fields;
                processedLayout.push(_sections);
              });
              // Update the state
              setFormLayout(processedLayout);
            } catch (error) {
              console.error('Error in compute function:', error);
            }
          },
        },
      ]}
      afterSubmit={() => {
        navigate(-1);
      }}
      beforeSubmit={(formData) => {
        const {
          registration_end_date,
          registration_start_date,
          start_date,
          end_date,
        } = formData;
        if (
          moment(registration_end_date).isBefore(
            moment(registration_start_date)
          )
        ) {
          throw new Error(
            'Registration end date cannot be before the start date'
          );
        }
        if (moment(start_date).isBefore(moment(registration_end_date))) {
          throw new Error(
            'Registration end date cannot be after the start date'
          );
        }
        if (moment(end_date).isBefore(moment(start_date))) {
          throw new Error('Event end date cannot be before the start date');
        }

        const processedFormData = { ...formData, categories: [] };
        Object.keys(formData).forEach((key) => {
          if (key.startsWith('categories_') && formData[key].selected) {
            const category_id = key.replace('categories_', '');
            processedFormData['categories'].push({
              category_id: category_id,
              price: Number(formData[key].price),
            });
          }
        });
        processedFormData['host_id'] = user._id;
        return processedFormData;
      }}
      mode={mode}
      apiPath={
        mode === modes.create
          ? `${routeLink.events}/`
          : `${routeLink.events}/${eventId}`
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

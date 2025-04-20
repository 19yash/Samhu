import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import GenericForm from '../components/form/Form';
import { modes } from '../../constants/formConstants';
import { useAuth } from '../auth/hooks/useAuth';
import loadRazorpayScript from '../../utility/rzorpay';
import config from '../../config.js';
import { toast } from 'react-toastify';
import httpService from '../../services/httpService.js';

const ParticipantForm = () => {
  const navigate = useNavigate();
  const { participantId } = useParams();
  const { state } = useLocation();
  console.log('🚀 ~ ParticipantForm ~ state:', state);
  const {
    mode = modes.create,
    event,
    is_team_sport,
    participants_in_team,
  } = state || {};
  const { user } = useAuth();
  const categoryOptions = event?.categories?.map((category) => {
    return {
      label: category?.category_details?.name,
      value: category?.category_details,
    };
  });
  const computeParticipantLayout = async ({
    formData,
    formLayout,
    setFormLayout,
    setFormData,
  }) => {
    const response = await httpService.get(
      `/event/participate/event-category-participant`,
      {
        category_id: formData.category_id?.id,
        event_id: event?.id,
        participant_id: user?.id,
      }
    );
    if (response?.data && response.data?.payment_status === 'captured') {
      toast.error('You have already participated in this event');
      navigate(`/app/events/event-details/${event.id}`, {
        state: {
          reason: 'Already Participated',
          orderId: response.data.order_id,
          event: event,
        },
      });
      return;
    }
    if (response?.data && response.data?.payment_status === 'created') {
      const _response = await httpService.post(`/event/participate`, {
        ...response?.data,
      });
      toast.info(
        'You have already participated in this event and payment is pending redirecting to payment page'
      );
      await handlePayment(_response);
      return;
    }

    const newFormData = { ...formData };
    const { category_id, category_details } = formData;

    if (formData.members) {
      for (let i = 0; i < formData.members.length; i++) {
        newFormData[`members_${i}_email`] = formData.members[i].email;
        newFormData[`members_${i}_name`] = formData.members[i].name;
        newFormData[`members_${i}_phone`] = formData.members[i].phone;
        newFormData[`members_${i}_role`] = formData.members[i].role;
      }
    }
    const processedLayout = [];
    try {
      if (category_id?.is_team_sport || category_details?.is_team_sport) {
        const participants =
          category_id?.participants_in_team ||
          category_details?.participants_in_team;
        processedLayout.push({
          label: 'Team Details',
          fields: [
            {
              type: 'text',
              label: 'Team Name',
              field: 'team_name',
              required: true,
              size: 'medium',
            },
          ],
        });
        for (let i = 0; i < participants; i++) {
          processedLayout.push({
            label: `Participant ${i + 1} Details`,
            fields: [
              {
                type: 'text',
                label: `name`,
                field: `members_${i}_name`,
                required: true,
                size: 'medium',
              },
              {
                type: 'text',
                label: `email`,
                field: `members_${i}_email`,
                required: true,
                size: 'medium',
              },
              {
                label: 'Phone Number',
                type: 'text',
                field: `members_${i}_phone`,
                required: true,
                size: 'medium',
              },
              {
                label: 'Role',
                type: 'autocomplete',
                field: `members_${i}_role`,
                options: [
                  { label: 'Captain', value: 'Captain' },
                  { label: 'Vice Captain', value: 'Vice Captain' },
                ],
                size: 'medium',
              },
            ],
          });
        }
      } else {
        processedLayout.push({
          label: 'Participant Details',
          fields: [
            {
              type: 'text',
              label: 'name',
              field: 'name',
              size: 'medium',
              readOnly: true,
              value: user?.user_name,
            },
            {
              type: 'text',
              label: 'email',
              field: 'email',
              size: 'medium',
              readOnly: true,
              value: user?.email,
            },
            {
              label: 'Phone Number',
              type: 'text',
              field: 'phone',
              size: 'medium',
              readOnly: true,
              value: user?.PhoneNumber,
            },
          ],
        });
      }
      setFormLayout(processedLayout);
      // setFormData(newFormData);
      return newFormData;
    } catch (error) {
      console.error('Error in compute function:', error);
    }
  };
  const layoutFields = [
    {
      label: '',
      fields: [
        {
          label: 'Select Category In Which You want to Participate',
          type: 'autocomplete',
          field: 'category_id',
          options: categoryOptions,
          required: true,
          size: 'medium',
        },
      ],
    },
  ];

  const handlePayment = async (response) => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert('Something Went Wrong Please Try Again Later.');
      return;
    }

    try {
      const { order_id, amount_paid, currency } = response.data;
      const options = {
        key: config.rzpKey,
        amount: amount_paid,
        currency,
        order_id,
        name: 'Udaan sport',
        description: 'Payment for event registration',
        handler: function (response) {
          // Handle payment success
          navigate('/app/paymentSuccess', {
            state: {
              orderId: response.razorpay_order_id,
              event: event,
            },
          });
        },
        prefill: {
          name: user.user_name,
          email: user.email,
          contact: user.PhoneNumber,
        },
        modal: {
          ondismiss: function () {
            toast.info('Payment was cancelled.');
            navigate(`/app/events/event-details/${event.id}`, {
              state: {
                reason: 'User dismissed Razorpay modal',
                orderId: order_id,
                event: event,
              },
            });
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        toast.error('Payment failed. Please try again.');
        navigate(`/app/events/event-details/${event.id}`, {
          state: {
            reason: response.error.description,
            orderId: options.order_id,
            event: event,
          },
        });
      });
      rzp.open();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <GenericForm
      afterSubmit={(response) => handlePayment(response)}
      mode={mode}
      beforeSubmit={(formData) => {
        const newFormData = {
          ...formData,
          members: [],
        };
        const participant =
          formData['category_id']?.participants_in_team ||
          formData['category_details']?.participants_in_team;
        let isCaptainSelected = false;
        let isViceCaptainSelected = false;
        for (let i = 0; i < participant; i++) {
          if (formData[`members_${i}_role`] === 'Captain') {
            if (isCaptainSelected) {
              throw new Error('Only one Captain is allowed');
            }
            isCaptainSelected = true;
          }
          if (formData[`members_${i}_role`] === 'Vice Captain') {
            if (isViceCaptainSelected) {
              throw new Error('Only one Vice Captain is allowed');
            }
            isViceCaptainSelected = true;
          }
          newFormData['members'].push({
            name: formData[`members_${i}_name`],
            email: formData[`members_${i}_email`],
            phone: formData[`members_${i}_phone`],
            role: formData[`members_${i}_role`],
          });
          delete newFormData[`members_${i}_name`];
          delete newFormData[`members_${i}_email`];
          delete newFormData[`members_${i}_phone`];
          delete newFormData[`members_${i}_role`];
        }
        if (mode === modes.create) {
          newFormData['category_id'] = formData['category_id'].id;
          newFormData['event_id'] = event?.id;
          newFormData['participant_id'] = user?.id;
        }

        return newFormData;
      }}
      computations={[
        {
          fields: ['category_id'],
          condition: (formData) => {
            return formData?.category_id;
          },
          compute: computeParticipantLayout,
        },
      ]}
      apiPath={
        mode === modes.create
          ? '/event/participate'
          : `/event/participate/${participantId}`
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

export default ParticipantForm;

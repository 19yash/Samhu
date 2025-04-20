import moment from 'moment';
import routeLink from '../../constants/routeLink';
import React from 'react';
import httpService from '../../services/httpService';
import { useAuth } from '../auth/hooks/useAuth';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import EventCard2 from '../event/EventCard';
import theme from '../../theme/Theme';
import { useNavigate } from 'react-router-dom';
import { userRole } from '../../constants/userRole';

const Dashboard = () => {
  const { user } = useAuth();
  const [upcomingEvent, setUpcomingEvent] = useState([]);
  const [otherEvents, setOtherEvents] = useState([]);
  const [paymentPending, setPaymentPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const filter = {};
  if (user.role === userRole.host) {
    filter['host_id'] = user.id;
  }

  const fetchData = async () => {
    const upcomingEvents = [];
    const otherEvents = [];
    const paymentPending = [];
    try {
      let response;
      if (user.role === userRole.participant) {
        response = await httpService.get(`/event/participate`, {
          participant_id: user.id,
        });

        if (response.data) {
          response.data.forEach((event) => {
            if (
              moment(event?.event_details?.start_date) > moment() &&
              event.payment_status !== 'created'
            ) {
              upcomingEvents.push(event.event_details);
            } else if (event?.payment_status === 'created') {
              paymentPending.push(event.event_details);
            } else {
              otherEvents.push(event.event_details);
            }
          });
        }
      } else {
        response = await httpService.get(`${routeLink.events}/`, {
          ...filter,
        });
        if (response.data) {
          response.data.forEach((event) => {
            if (moment(event.start_date) > moment()) {
              upcomingEvents.push(event);
            } else {
              otherEvents.push(event);
            }
          });
        }
      }
      otherEvents.reverse();
      setUpcomingEvent(upcomingEvents);
      setOtherEvents(otherEvents);
      setPaymentPending(paymentPending);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!loading) {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ color: theme.palette.primary.main }}>Upcoming Events</h1>
          <div
            style={{
              width: '100%',
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
              padding: '1rem',
              justifyContent: 'center',
            }}
          >
            {!upcomingEvent.length && (
              <div style={{ width: '100%', textAlign: 'center' }}>
                No Upcoming Event
              </div>
            )}
            {upcomingEvent.length > 0 &&
              upcomingEvent.map((event) => {
                return (
                  <EventCard2
                    dashboard={true}
                    event={event}
                    onPress={() => {
                      navigate(`/app/events/event-details/${event.id}`, {});
                    }}
                  />
                );
              })}
          </div>
        </div>
        {paymentPending.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h1 style={{ color: theme.palette.primary.main }}>
              Payment Pending
            </h1>
            <div
              style={{
                width: '100%',
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap',
                padding: '1rem',
                justifyContent: 'center',
              }}
            >
              {paymentPending.map((event) => {
                return (
                  <EventCard2
                    dashboard={true}
                    event={event}
                    onPress={() => {
                      navigate(`/app/events/event-details/${event.id}`, {});
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ color: theme.palette.primary.main }}>Other Events</h1>
          <div
            style={{
              width: '100%',
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
              padding: '1rem',
              justifyContent: 'center',
            }}
          >
            {!otherEvents.length && (
              <div style={{ width: '100%', textAlign: 'center' }}>No Event</div>
            )}
            {otherEvents.length > 0 &&
              otherEvents.map((event) => {
                return (
                  <EventCard2
                    event={event}
                    dashboard={true}
                    onPress={() => {
                      navigate(`/app/events/event-details/${event.id}`, {});
                    }}
                  />
                );
              })}
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;

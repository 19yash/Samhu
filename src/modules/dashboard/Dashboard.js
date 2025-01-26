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
  console.log('🚀 ~ Dashboard ~ otherEvents:', otherEvents);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const filter = {};
  if (user.role === userRole.host) {
    filter['hostId'] = user.id;
  }

  const fetchData = async () => {
    const upcomingEvents = [];
    const otherEvents = [];
    try {
      let response;
      if (user.role === userRole.participant) {
        response = await httpService.get(`/event/participate`, {
          participant_id: user.id,
        });

        if (response.data) {
          response.data.forEach((event) => {
            if (moment(event?.event_details?.start_date) > moment()) {
              upcomingEvents.push(event.event_details);
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
      setUpcomingEvent(upcomingEvents);
      setOtherEvents(otherEvents);
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
            padding: '2rem',
          }}
        >
          <h1 style={{ color: theme.palette.primary.main }}>Upcoming Events</h1>
          <div
            style={{
              width: '100%',
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
            }}
          >
            {!upcomingEvent.length && <div>No Upcoming Event</div>}
            {upcomingEvent.length > 0 &&
              upcomingEvent.map((event) => {
                return (
                  <EventCard2
                    event={event}
                    onPress={() => {
                      navigate(`/app/events/event-details/${event.id}`, {});
                    }}
                  />
                );
              })}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <h1 style={{ color: theme.palette.primary.main }}>Other Events</h1>
          <div
            style={{
              width: '100%',
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
            }}
          >
            {!otherEvents.length && <div>No Upcoming Event</div>}
            {otherEvents.length > 0 &&
              otherEvents.map((event) => {
                return (
                  <EventCard2
                    event={event}
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

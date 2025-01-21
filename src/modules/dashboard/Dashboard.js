import moment from 'moment';
import routeLink from '../../constants/routeLink';
import React from 'react';
import { userRole } from '../../constants/userRole';
import httpService from '../../services/httpService';
import { useAuth } from '../auth/hooks/useAuth';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import EventCard2 from '../event/EventCard';
import theme from '../../theme/Theme';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [upcomingEvent, setUpcomingEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await httpService.get(`${routeLink.events}/`, {
        hostId: user.id,
      });
      if (response.data) {
        const data = response.data.filter(
          (event) => moment(event.start_date) > moment()
        );
        setUpcomingEvent(data);
      }
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
            padding: '1rem',
          }}
        >
          <h1 style={{ color: theme.palette.primary.main }}>Upcoming Events</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {!upcomingEvent.length && <div>No Upcoming Event</div>}
            {upcomingEvent.length &&
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
        <div>
          <h1 style={{ color: theme.palette.primary.main }}>Others Event</h1>
          {/* {
            
          } */}
        </div>
      </div>
    );
  }
};

export default Dashboard;

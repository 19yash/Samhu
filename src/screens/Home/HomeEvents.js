import React, { useEffect, useState } from 'react';
import httpService from '../../services/httpService';
import routeLink from '../../constants/routeLink';
import Loader from '../../modules/components/Loader';
import { EventContainer } from '../../modules/event/styles/EventDetails.style';
import { useNavigate } from 'react-router-dom';
import EventCard from '../../modules/event/EventCard';

const HomeEvents = ({ upcoming }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await httpService.get(`${routeLink.events}/`, {});
      if (response.data && upcoming) {
        setEvents(response.data.slice(-3));
      } else if (response.data && !upcoming) {
        setEvents(response.data.slice(-6, -3));
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
  return (
    <EventContainer>
      {events.length > 0 &&
        events.map((event) => {
          return (
            <EventCard
              onPress={() => {
                navigate(`events/event-details/${event.id}`, {
                  state: {
                    fromDashboard: true,
                  },
                });
              }}
              showEdit={false}
              event={event}
            />
          );
        })}
    </EventContainer>
  );
};

export default HomeEvents;

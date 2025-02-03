import { useEffect, useState } from 'react';
import routeLink from '../../constants/routeLink';
import EventCard from '../../modules/event/EventCard';
import httpService from '../../services/httpService';
import NavBar from '../NavBar';
import {
  EventContainer,
  heading,
  heroSection,
  section,
  subHeading,
} from './Event.style';
import Footer from '../Footer';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../modules/components/Loader';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await httpService.get(`${routeLink.events}/`, {});
      console.log('Event Page🚀 ~ fetchData ~ response:', response);
      if (response.data) {
        setEvents(response.data);
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
  return (
    <div>
      <NavBar showIcon={true} />
      <div style={heroSection}>Events</div>
      <div style={section}>
        <div style={heading}>All Events</div>
        <div style={subHeading}>
          All Events Explore Our Featured Sports: Where Passion Meets
          Performance!
        </div>
        <div style={EventContainer}>
          {loading ? (
            <Loader />
          ) : events.length === 0 ? (
            <div>No Data Found</div>
          ) : (
            events.map((event) => {
              return (
                <EventCard
                  onPress={() => {
                    navigate(`event-details/${event.id}`, {
                      state: {
                        fromDashboard: true,
                      },
                    });
                  }}
                  event={event}
                />
              );
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventPage;

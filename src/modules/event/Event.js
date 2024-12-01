import { useEffect, useState } from 'react';
import LoadingScreen from '../../screens/LoadingScreen';
import httpService from '../../services/httpService';
import routeLink from '../../constants/routeLink';
import EventCard from './EventCard';
import { EventContainer, EventHeader } from './styles/Event.style';
import Header from '../components/Header';
import View from '../components/View';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState({});
  const navigate = useNavigate();
  // take from context later
  const loading = false;
  const fetchData = () => {
    try {
      // setLoading(false);
      const response = httpService.get(routeLink.events, {
        params: {
          filter,
        },
      });
      if (response.data) {
        setEvents(response.data);
      }
    } catch (err) {
      console.log(err);
      // setLoading(false);
    }
  };
  // useEffect(() => {
  //   fetchData();
  // });

  if (loading) {
    return <LoadingScreen></LoadingScreen>;
  }
  return (
    <View>
      <EventHeader>
        <Button
          variant="outlined"
          onClick={() => {
            navigate('add-event');
          }}
        >
          Add Event
        </Button>
      </EventHeader>
      <EventContainer>
        {/* {events.length &&
          events.map((event) => {
            return <EventCard event={event} />;
          })} */}
        <EventCard
          title="Football Tournament"
          subtitle="Football"
          image="https://via.placeholder.com/400x225"
          date="29 November, 2024"
          price={99}
          venue="Sportyzo Sports Academy, Gurugram"
          organizer="All India Football Federation (AIFF)"
        />
        <EventCard
          title="Football Tournament"
          subtitle="Football"
          image="https://via.placeholder.com/400x225"
          date="29 November, 2024"
          price={99}
          venue="Sportyzo Sports Academy, Gurugram"
          organizer="All India Football Federation (AIFF)"
        />
      </EventContainer>
    </View>
  );
};

export default Event;

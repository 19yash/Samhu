import { useEffect } from 'react';
import LoadingScreen from '../../screens/LoadingScreen';
import httpService from '../../services/httpService';
import routeLink from '../../constants/routeLink';
import EventCard from './EventCard';
import { EventContainer } from './styles/Event.style';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState({});
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
  useEffect(() => {
    fetchData();
  });

  if (loading) {
    return <LoadingScreen></LoadingScreen>;
  }
  return (
    <EventContainer>
      Events
      {events.length &&
        events.map((event) => {
          return <EventCard event={event} />;
        })}
    </EventContainer>
  );
};

export default Event;

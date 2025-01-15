import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import LoadingScreen from '../../screens/LoadingScreen';
import httpService from '../../services/httpService';
import routeLink from '../../constants/routeLink';
import View from '../components/View';
import { EventContainer, EventHeader } from './styles/Event.style';
import EventCard from './EventCard';
import { modes } from '../../constants/formConstants';
import checkAuthorization from '../../services/checkAuthorization';
import { useAuth } from '../auth/hooks/useAuth';
import { action, entity } from '../../constants/authorization';

const Event = () => {
  const { user } = useAuth();
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

  const event1 = {
    _id: '67815197-23a4-8008-9877-8939e0bb5663',
    title: 'Football Tournament',
    subtitle: 'Football',
    image: 'https://via.placeholder.com/400x225',
    date: '29 November, 2024',
    price: '99',
    venue: 'Sportyzo Sports Academy, Gurugram',
    organizer: 'All India Football Federation (AIFF)',
  };
  return (
    <View>
      <EventHeader>
        {checkAuthorization(user, entity.Events, action.create) && (
          <Button
            variant="outlined"
            onClick={() => {
              navigate('add-event', {
                state: {
                  mode: modes.create,
                },
              });
            }}
          >
            Add Event
          </Button>
        )}
      </EventHeader>
      <EventContainer>
        {/* {events.length &&
          events.map((event) => {
            return <EventCard event={event} />;
          })} */}
        <EventCard
          event={event1}
          onPress={() => {
            navigate(`event-details/${event1._id}`, {});
          }}
        />
        <EventCard
          event={event1}
          onPress={() => {
            navigate(`event-details/${event1._id}`, {});
          }}
        />
      </EventContainer>
    </View>
  );
};

export default Event;

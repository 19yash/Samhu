import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import httpService from '../../services/httpService';
import routeLink from '../../constants/routeLink';
import View from '../components/View';
import { EventContainer, EventHeader } from './styles/Event.style';
import EventCard from './EventCard';
import { modes } from '../../constants/formConstants';
import checkAuthorization from '../../services/checkAuthorization';
import { useAuth } from '../auth/hooks/useAuth';
import { action, entity } from '../../constants/authorization';
import Loader from '../components/Loader';
import GenericFilter from '../components/filter';
import React from 'react';

const Event = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  console.log('🚀 ~ Event ~ events:', events);
  const [filterValues, setFilterValues] = useState({
    sports_id: '6759e34dc7f4ea8e52c2c4fc',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // take from context later
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await httpService.get(`${routeLink.events}/`, {
        ...filterValues,
      });
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
    console.log('filterValues', filterValues);
    fetchData();
  }, [filterValues]);

  if (loading) {
    // return <LoadingScreen></LoadingScreen>;
    return <Loader />;
  }

  return (
    <View>
      <EventHeader>
        <div style={{ width: '200px' }}>
          <GenericFilter
            filterKey={'sports_id'}
            setFilterValues={setFilterValues}
            label={'Sports'}
            api={routeLink.sports}
            suggestionField={'sports_name'}
            keyField={'id'}
          />
        </div>
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
        {events.length &&
          events.map((event) => {
            return (
              <EventCard
                onPress={() => {
                  navigate(`event-details/${event.id}`, {});
                }}
                event={event}
              />
            );
          })}
      </EventContainer>
    </View>
  );
};

export default Event;

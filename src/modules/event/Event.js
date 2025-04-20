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
import { userRole } from '../../constants/userRole';

const Event = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [filterValues, setFilterValues] = useState(
    user.role === userRole.host
      ? {
          host_id: user.id,
        }
      : {}
  );
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);

  const navigate = useNavigate();
  // take from context later
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await httpService.get(`${routeLink.events}/`, {
        ...filterValues,
      });
      const data = response?.data || [];
      data.reverse();
      if (data) {
        setEvents(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [filterValues]);

  return (
    <View>
      <EventHeader>
        <div style={{ width: '200px' }}>
          <GenericFilter
            value={value}
            setValue={setValue}
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

      {!loading ? (
        <EventContainer>
          {events.length === 0 && (
            <div style={{ width: '100%', textAlign: 'center' }}>
              Currently No Event Hosted By you
            </div>
          )}
          {events.length > 0 &&
            events.map((event) => {
              return (
                <EventCard
                  onPress={() => {
                    navigate(`event-details/${event.id}`, {});
                  }}
                  event={event}
                  showEdit={true}
                />
              );
            })}
        </EventContainer>
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default Event;

import React from 'react';
import { useLocation } from 'react-router-dom';
import ParticaipantsTable from './screens/ParticipantsTable';
import images from '../../images';
import {
  EventContainer,
  EventDetailsStyles,
  ImageContainer,
  Img,
} from './styles/EventDetails.style';
import moment from 'moment/moment';
import View from '../components/View';
const EventDetails = () => {
  const { state } = useLocation();
  const {
    event = {
      start_time: '',
      end_time: '',
      title: '',
      date: '',
      venue_name: '',
      venue_address: '',
      host_id: '',
      organized_by: '',
      registration_start_time: '',
      registration_end_time: '',
      price: '',
    },
  } = state || {};

  return (
    <View style={{ gap: '12px' }}>
      <EventContainer>
        <ImageContainer>
          <Img src={images.game} style={{ width: '100%', height: '100%' }} />
        </ImageContainer>
        <EventDetailsStyles>
          <div>
            <h2>{event.title}</h2>
            <div>
              <Img src={images.calender} />
              {moment(event.date).format("'DD MMMM, YYYY'")}
            </div>
            <div>
              <Img src={images.clock} />
              {event.start_time} - {event.end_time}
            </div>
            <div>
              <h2>Venue</h2>
              <p>
                {event.venue_name} , {event.venue_address}
              </p>
            </div>
            <div>
              <h2>Organized By</h2>
              <p>{event.organized_by}</p>
            </div>
          </div>
        </EventDetailsStyles>
      </EventContainer>
      {event.description && <p>{event.description}</p>}
      <ParticaipantsTable></ParticaipantsTable>
    </View>
  );
};

export default EventDetails;

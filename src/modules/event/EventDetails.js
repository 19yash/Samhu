import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import images from '../../images';
import {
  EventContainer,
  EventDetailsStyles,
  ImageContainer,
  Img,
  Information,
  BasicInfo,
  Info,
  Heading1,
} from './styles/EventDetails.style';
import moment from 'moment';
import View from '../components/View';
import Button from '../components/button/Button';
import httpService from '../../services/httpService';
import routeLink from '../../constants/routeLink';
import Participants from './screens/Participants';
import checkAuthorization from '../../services/checkAuthorization';
import { action, entity } from '../../constants/authorization';
import { useAuth } from '../auth/hooks/useAuth';
import Loader from '../components/Loader';
const EventDetails = () => {
  const { eventId } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await httpService.get(`${routeLink.events}/${eventId}`);
      if (response?.data) {
        setEvent(response.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <Loader />;
  }
  return (
    <View style={{ gap: '12px' }}>
      <EventContainer>
        <ImageContainer>
          <Img
            src={images.game}
            style={{ width: '100%', height: '800px', borderRadius: '12px' }}
          />
        </ImageContainer>
        <EventDetailsStyles>
          {/* <div> */}
          {moment(event?.registration_end_date) > moment() &&
            checkAuthorization(user, entity.Participants, action.create) && (
              <Button
                text={'Participate Now'}
                onClick={() => {
                  navigate('participate', {
                    state: { event: event },
                  });
                }}
              />
            )}
          {moment(event?.registration_end_date) < moment() && (
            <Information>Registration has been closed Now !!</Information>
          )}
          {moment(event?.end_date) < moment() && (
            <Information>Results has been Anounced !!</Information>
          )}
          <BasicInfo>
            <h2>{event?.title}</h2>
            <div>
              {'Sports'}: {event?.sport_details?.sports_name}
            </div>
            <div>
              {'Category'}:{' '}
              {event?.categories?.map((category) => {
                return category.category_details.name;
              })}
            </div>
            <Info>
              <Img src={images.calender} />
              {moment(event?.start_date).format('DD MMMM, YYYY')}
            </Info>
            <Info>
              <Img src={images.clock} />
              {event?.start_date} - {event?.end_date}
            </Info>
            {/* <div>Price: ₹ {event.price}</div> */}
          </BasicInfo>
          <div>
            <Heading1>Venue :</Heading1>
            <p>
              {event?.venue_name} , {event?.venue_address}
            </p>
          </div>
          <div>
            <Heading1>Registration Date :</Heading1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Img src={images.calender} />
              {moment(event?.registration_start_time).format('DD MMMM, YYYY')} -
              {moment(event?.registration_end_time).format('DD MMMM, YYYY')}
            </div>
          </div>
          <div>
            <Heading1>Organized By : </Heading1>
            <p>{event?.host_details?.organisation_name}</p>
          </div>
          {event?.rewards && (
            <div>
              <Heading1>Rewards:</Heading1>
              <p>{event?.rewards}</p>
            </div>
          )}
          {event?.description && (
            <div>
              <Heading1>Description:</Heading1>
              <p>{event?.description}</p>
            </div>
          )}

          {/* </div> */}
        </EventDetailsStyles>
      </EventContainer>
      <>
        {/* <Heading>Participants</Heading> */}
        {checkAuthorization(user, entity.Participants, action.view) &&
          event && <Participants event={event} />}{' '}
      </>
    </View>
  );
};

export default EventDetails;

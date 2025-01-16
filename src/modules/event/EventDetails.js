import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ParticaipantsTable from './screens/ParticipantsTable';
import images from '../../images';
import {
  EventContainer,
  EventDetailsStyles,
  ImageContainer,
  Img,
  Heading,
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
const EventDetails = () => {
  const { eventId } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState({
    sports: {
      name: 'Football',
    },
    category: {
      name: 'U-19 Females',
    },
    start_time: '19:00',
    end_time: '21:00',
    title: 'Football Tournament',
    date: '2024-12-26',
    venue_name: 'Indoor Stadium',
    venue_address:
      'Veer Savarkar Indoor Stadium, Race Course Rd, Race Course, Sadar Rajkot, Gujarat 360007 India',
    host_id: '',
    organized_by: 'Sports Club',
    registration_start_time: '2024-12-20',
    registration_end_time: '2024-12-21',
    price: '1000',
    rewards: 'Winnners Team Will get a Price Money of 1 lack rupees',
    description: `Are you ready to showcase your Basketball skills and compete for glory?Join us for the 2024 Basketball Tournament, where teams from across the region will battle it out for the championship title.Whether you’re a seasoned player or just love the game, this is your chance to be part of an unforgettable Basketball experience!`,
  });
  const navigate = useNavigate();
  const fetchEvent = async () => {
    try {
      const response = await httpService.get(`${routeLink.events}/${eventId}`);
      if (response?.data) {
        setEvent(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  console.log('events', event);
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
                  navigate('participate');
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
            <h2>{event.title}</h2>
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
              {event.start_date} - {event.end_date}
            </Info>
            {/* <div>Price: ₹ {event.price}</div> */}
          </BasicInfo>
          <div>
            <Heading1>Venue :</Heading1>
            <p>
              {event.venue_name} , {event.venue_address}
            </p>
          </div>
          <div>
            <Heading1>Registration Date :</Heading1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Img src={images.calender} />
              {moment(event.registration_start_time).format('DD MMMM, YYYY')} -
              {moment(event.registration_end_time).format('DD MMMM, YYYY')}
            </div>
          </div>
          <div>
            <Heading1>Organized By : </Heading1>
            <p>{event.host_details?.organisation_name}</p>
          </div>
          {event.rewards && (
            <div>
              <Heading1>Rewards:</Heading1>
              <p>{event.rewards}</p>
            </div>
          )}
          {event.description && (
            <div>
              <Heading1>Description:</Heading1>
              <p>{event.description}</p>
            </div>
          )}

          {/* </div> */}
        </EventDetailsStyles>
      </EventContainer>
      <>
        <Heading>Participants</Heading>
        <Participants
          event={{
            categories: [
              {
                categoryId: { name: 'Men' },
                price: '200',
              },
              {
                categoryId: { name: 'Women' },
                price: '200',
              },
            ],
            _id: '67815197-23a4-8008-9877-8939e0bb5663',
            title: 'Football Tournament',
            subtitle: 'Football',
            image: 'https://via.placeholder.com/400x225',
            date: '29 November, 2024',
            price: '99',
            venue: 'Sportyzo Sports Academy, Gurugram',
            organizer: 'All India Football Federation (AIFF)',
          }}
        />
        {/* <ParticaipantsTable></ParticaipantsTable> */}
      </>
    </View>
  );
};

export default EventDetails;

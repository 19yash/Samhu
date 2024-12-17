import { useEffect, useState } from 'react';
import routeLink from '../../constants/routeLink';
import EventCard2 from '../../modules/event/EventCard';
import httpService from '../../services/httpService';
import LoadingScreen from '../LoadingScreen';
import NavBar from '../NavBar';
import {
  EventContainer,
  heading,
  heroSection,
  section,
  subHeading,
} from './Event.style';
import Footer from '../Footer';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState({});
  const [loading, setLoading] = useState(false);
  const fetchEvents = async () => {
    setLoading(true);
    try {
      // const reposne = await httpService.get(routeLink.events, {
      //   params: {
      //     filter: filter,
      //   },
      // });
      // if (reposneesponse.data) {
      //   setEvents(reposne.data);
      // }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, [filter]);
  return (
    <div>
      <NavBar />
      <div style={heroSection}>Events</div>
      <div style={section}>
        <div style={heading}>All Events</div>
        <div style={subHeading}>
          All Events Explore Our Featured Sports: Where Passion Meets
          Performance!
        </div>
        <div style={EventContainer}>
          {loading ? (
            <LoadingScreen />
          ) : events.length > 0 ? (
            <div>No Data Found</div>
          ) : (
            events.map((event) => {
              return <EventCard2 event={event} />;
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventPage;

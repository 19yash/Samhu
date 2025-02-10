import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { ImageContainer, Img } from './styles/EventCard.style';
import images from '../../images';
import { modes } from '../../constants/formConstants';
import Button from '../components/button/Button';
import checkAuthorization from '../../services/checkAuthorization';
import { action, entity } from '../../constants/authorization';
import { useAuth } from '../auth/hooks/useAuth';
import { userRole } from '../../constants/userRole';

const EventCard = ({ event = {}, onPress, dashboard, showEdit }) => {
  const {
    id,
    title,
    start_date,
    venue_name,
    venue_address,
    host_details,
    registration_start_date,
    sport_details,
    poster,
  } = event;
  const [imgSrc, setImgSrc] = useState(poster);

  const handleImageError = () => {
    setImgSrc(images.game);
  };
  const { user } = useAuth();
  const theme = useTheme();
  const startDate = moment(start_date).format('DD MMMM, YYYY');
  const registrationDate = moment(registration_start_date).format(
    'DD MMMM, YYYY'
  );
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        maxWidth: 305,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        overflow: 'hidden',
        position: 'relative',
        '&:hover': {
          transform: 'scale(1.05)', // Slight scale-up effect
          boxShadow: `0px 4px 10px ${theme.palette.primary.main}`, // Deeper shadow on hover
          cursor: 'pointer',
        },
      }}
      onClick={() => {
        onPress();
      }}
    >
      {/* Image */}
      <CardMedia
        component="img"
        height="140"
        image={imgSrc}
        onError={handleImageError}
      />
      {/* Content */}
      <CardContent>
        {/* Event Title */}
        <Typography
          variant="subtitle2"
          color={theme.palette.text.secondary}
          sx={{ textTransform: 'uppercase', fontWeight: 600, fontSize: '10px' }}
        >
          {sport_details.sports_name}
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          sx={{ fontWeight: 700, marginBottom: 2 }}
        >
          {title}
        </Typography>
        {/* Date and Price */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
        >
          <Box>
            <Typography
              variant="subtitle2"
              color={theme.palette.text.secondary}
            >
              Event Date:
            </Typography>
            <Typography variant="body2">{startDate}</Typography>
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              color={theme.palette.text.secondary}
            >
              Registration Date:
            </Typography>
            <Typography variant="body2" color={theme.palette.success.main}>
              {registrationDate}
            </Typography>
          </Box>
        </Box>
        {/* Venue and Organizer */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography
              variant="subtitle2"
              color={theme.palette.text.secondary}
            >
              Venue:
            </Typography>
            <Typography variant="body2">
              {`${venue_name}, ${venue_address}`}
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography
              variant="subtitle2"
              color={theme.palette.text.secondary}
            >
              Organized By:
            </Typography>{' '}
            <Typography variant="body2">
              {`${host_details?.organisation_name}`}
            </Typography>
          </Box>
        </Box>
        <Box marginTop={'1rem'}>
          {moment(event?.registration_start_date) <= moment() &&
            moment(event?.registration_end_date) > moment() &&
            !dashboard &&
            user?.role === userRole.participant &&
            checkAuthorization(user, entity.Participants, action.create) && (
              <Button
                text={'Participate'}
                onClick={(e) => {
                  e.stopPropagation();
                  onPress();
                }}
              />
            )}
        </Box>
      </CardContent>

      {showEdit &&
        checkAuthorization(user, entity.Events, action.edit) &&
        moment(event?.registration_start_date) > moment() && (
          <ImageContainer>
            <Img
              onClick={(e) => {
                e.stopPropagation();
                navigate(`edit-event/${id}`, {
                  state: { event, mode: modes.edit },
                });
              }}
              src={images.editLight}
            />
          </ImageContainer>
        )}
    </Card>
  );
};

export default EventCard;

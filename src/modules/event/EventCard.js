import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  useTheme,
  Button,
} from '@mui/material';
import moment from 'moment';
import { configs } from 'eslint-plugin-prettier';
import { Navigate, useNavigate } from 'react-router-dom';
import { ImageContainer, Img } from './styles/EventCard.style';
import images from '../../images';
import { modes } from '../../constants/formConstants';

// {
//     title,
//     date,
//     start_time,
//     end_time,
//     venue_name,
//     venue_address,
//     host_id,
//     organized_by,
//     registration_start_time,
//     registration_end_time,
//     price,
//   rewards,

// }
const EventCard2 = ({ event = {} }) => {
  const theme = useTheme();
  const {
    title,
    date,
    start_time,
    end_time,
    venue_name,
    venue_address,
    host_id,
    organized_by,
    registration_start_time,
    registration_end_time,
    price,
  } = event;

  const Date = moment(date).format("'DD MMMM, YYYY'");
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        overflow: 'hidden',
        position: 'relative',
      }}
      onClick={() =>
        navigate('event-details', {
          state: { event },
        })
      }
    >
      {/* Image */}
      <CardMedia
        component="img"
        height="140"
        image="https://via.placeholder.com/400x200"
        alt="Event Image"
      />
      {/* Content */}
      <CardContent>
        {/* Event Title */}
        <Typography
          variant="subtitle2"
          color={theme.palette.text.secondary}
          sx={{ textTransform: 'uppercase', fontWeight: 600 }}
        >
          Football
        </Typography>
        <Typography
          variant="h6"
          color="primary"
          sx={{ fontWeight: 700, marginBottom: 2 }}
        >
          {title}
        </Typography>
        {/* Date and Price */}
        <Box display="flex" justifyContent="space-between" marginBottom={2}>
          <Box>
            <Typography
              variant="subtitle2"
              color={theme.palette.text.secondary}
            >
              Date:
            </Typography>
            <Typography variant="body2">{Date}</Typography>
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              color={theme.palette.text.secondary}
            >
              Price:
            </Typography>
            <Typography variant="body2" color={theme.palette.success.main}>
              {price ? price : '90'}
            </Typography>
          </Box>
        </Box>
        {/* Venue and Organizer */}
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography
              variant="subtitle2"
              color={theme.palette.text.secondary}
            >
              Venue:
            </Typography>
            <Typography variant="body2">
              {venue_address
                ? `${venue_name}, ${venue_address}`
                : 'Sportyzo Sports Academy, Gurugram'}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              color={theme.palette.text.secondary}
            >
              {' '}
              Organized By:{' '}
            </Typography>{' '}
            <Typography variant="body2">
              {venue_address
                ? `${venue_name}, ${venue_address}`
                : 'All India Football Federation (AIFF)'}
            </Typography>{' '}
          </Box>{' '}
        </Box>{' '}
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: theme.spacing(2) }}
        >
          Book Now
        </Button>
      </CardContent>{' '}
      <ImageContainer>
        <Img
          onClick={(e) => {
            e.stopPropagation();
            navigate('add-event', {
              state: { event, mode: modes.create },
            });
          }}
          src={images.editLight}
        />
      </ImageContainer>
    </Card>
  );
};

export default EventCard2;

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Stack } from '@mui/material';
import { HeaderContainer } from './styles/header.style';

const Header = ({ title, secondaryTitle, actions, styles }) => {
  return (
    // <Box
    //   display="flex"
    //   justifyContent="space-between"
    //   alignItems="center"
    //   p={2}
    //   style={styles?.container}
    //   bgcolor="background.paper"
    //   boxShadow={1}
    // >
    <HeaderContainer>
      {/* Left Section: Title and Secondary Title */}
      <Box display="flex" alignItems="baseline" gap={1}>
        <Typography variant="h5" style={styles?.title}>
          {title}
        </Typography>
        {secondaryTitle && (
          <Typography
            variant="subtitle1"
            color="text.secondary"
            style={styles?.secondaryTitle}
          >
            {secondaryTitle}
          </Typography>
        )}
      </Box>

      {/* Right Section: Actions */}
      <Stack direction="row" spacing={2}>
        {actions?.map((action, index) => (
          <Box key={index} style={styles?.action}>
            {action}
          </Box>
        ))}
      </Stack>
    </HeaderContainer>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  secondaryTitle: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.node),
  styles: PropTypes.object,
};

Header.defaultProps = {
  secondaryTitle: '',
  actions: [],
  styles: {},
};

export default Header;

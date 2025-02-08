import React from 'react';
import { Breadcrumbs, Link, Typography, useMediaQuery } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const BreadcrumbsComponent = () => {
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // Equivalent to min-width: 768px

  // Remove "app" for display and filter out final ID-like segments
  const pathnames = location.pathname
    .replace(/^\/app/, '') // Remove "app" from display path
    .split('/')
    .filter((path) => path && !path.match(/^[a-f0-9]{24}$/)); // Ignore event IDs

  if (!isDesktop) return null; // Show only on desktop screens

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ padding: 2, width: '100%' }}>
      {/* Home Link */}
      <Link component={RouterLink} to="/app" color="inherit">
        Home
      </Link>

      {pathnames.map((value, index) => {
        const path = `/${pathnames.slice(0, index + 1).join('/')}`;
        const navigatePath = `/app${path}`; // Include "app" for navigation URLs
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography key={navigatePath} color="textPrimary">
            {decodeURIComponent(value.replace(/-/g, ' '))}
          </Typography>
        ) : (
          <Link
            key={navigatePath}
            component={RouterLink}
            to={navigatePath}
            color="inherit"
          >
            {decodeURIComponent(value.replace(/-/g, ' '))}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;

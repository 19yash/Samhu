import React, { useState } from 'react';
import { Tabs, Tab, Box, useMediaQuery } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const TabNavigation = ({ tabs, styles }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split('/');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Initialize the active tab based on the current route
  const initialTabIndex = tabs.findIndex((tab) => {
    if (tab?.route) {
      const route = tab.route.split('/');
      return path[path.length - 1] === route[route.length - 1];
    }
    return false;
  });

  const [activeTab, setActiveTab] = useState(
    initialTabIndex !== -1 ? initialTabIndex : 0
  );

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (tabs[newValue]?.route) {
      navigate(tabs[newValue].route, {
        state: {
          ...(tabs[newValue].state || {}),
          ...(tabs[newValue].props || {}),
        },
      });
    }
  };

  const renderElement = (element, props) => {
    return typeof element === 'function' ? element(props) : element;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          ...styles?.TabContainer,
          '& .MuiTab-root': {
            fontSize: isSmallScreen ? '0.8rem' : '1rem',
            minWidth: isSmallScreen ? '80px' : '120px',
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.name}
            sx={activeTab === index ? { fontWeight: 'bold' } : {}}
          />
        ))}
      </Tabs>

      <Box
        sx={{
          pt: { xs: 1, md: 2 }, // Padding top 1 for small screens, padding all around 2 for medium screens and up
          px: { md: 2 },
          ...styles?.TabContent,
        }}
      >
        {tabs[0].route && <Outlet />}
        {tabs[activeTab]?.element &&
          renderElement(tabs[activeTab].element, {
            ...(tabs[activeTab].props || {}),
            activeTab,
          })}
      </Box>
    </Box>
  );
};

export default TabNavigation;

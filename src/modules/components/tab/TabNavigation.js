import React, { useState } from 'react';
import {
  SelectedTab,
  Tab,
  TabContainer,
  TabContent,
  TabNavigationStyle,
} from './TabNavigation.styles';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const TabNavigation = ({ tabs, styles }) => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split('/');
  const renderElement = (element, props) => {
    return typeof element === 'function' ? element(props) : element;
  };

  return (
    <TabNavigationStyle style={styles?.TabNavigationStyle || {}}>
      <TabContainer style={styles?.TabContainer || {}}>
        {tabs.map((tab, index) => {
          let selectedTab = false;
          if (tab.route) {
            const route = tab.route.split('/');
            selectedTab = path[path.length - 1] === route[route.length - 1];
          } else if (index === activeTab) {
            selectedTab = true;
          }
          return selectedTab ? (
            <SelectedTab key={index}>{tab.name}</SelectedTab>
          ) : (
            <Tab
              key={index}
              onClick={() => {
                setActiveTab(index);
                navigate(tab.route, {
                  state: {
                    ...tab.state,
                    ...(tab.props || {}),
                  },
                });
              }}
            >
              {tab.name}
            </Tab>
          );
        })}
      </TabContainer>

      <TabContent style={styles?.TabContent || {}}>
        {tabs[0].route && <Outlet />}
        {tabs[activeTab].element &&
          renderElement(tabs[activeTab].element, {
            ...(tabs[activeTab].props || {}),
            activeTab,
          })}
      </TabContent>
    </TabNavigationStyle>
  );
};

export default TabNavigation;

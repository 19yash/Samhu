import React, { useState } from 'react';
import { CNavItem, CNavLink } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';

import { useLocation, useNavigate } from 'react-router-dom';
import SidenavGroup from './SidenavGroup';
import {
  hoveredStyle,
  iconStyle,
  selectedIconStyle,
  selectedSideNavItemStyle,
  SideNavItemStyle,
} from './sidenav.style';

const SidenavItem = ({ item, index: key, level }) => {
  const location = useLocation();
  const isSelected =
    location.pathname.split('/')[2] === item.path?.split('/')[2];

  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <>
      {item.children ? (
        <SidenavGroup item={item} level={level} />
      ) : (
        <CNavItem>
          <CNavLink
            onClick={(event) => {
              handleClick(event);
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              ...(isSelected ? selectedSideNavItemStyle : SideNavItemStyle),
              ...(isHovered ? hoveredStyle : {}),
            }}
          >
            <CIcon
              icon={item.icon}
              customClassName="nav-icon"
              style={{
                ...(isSelected ? selectedIconStyle : iconStyle),
                ...(isHovered ? hoveredStyle : {}),
              }}
            />
            {item.name}
          </CNavLink>
        </CNavItem>
      )}
    </>
  );
};

export default SidenavItem;

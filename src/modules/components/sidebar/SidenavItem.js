import React, { useState } from 'react';
import { CNavItem, CNavLink } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';

import { useNavigate } from 'react-router-dom';
import SidenavGroup from './SidenavGroup';
import {
  hoveredStyle,
  iconStyle,
  selectedIconStyle,
  selectedSideNavItemStyle,
  SideNavItemStyle,
} from './sidenav.style';
import theme from '../../../theme/Theme';

const SidenavItem = ({
  item,
  index: key,
  level,
  selectedItem,
  setSelectedItem,
}) => {
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
              setSelectedItem(key);
              handleClick(event);
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              ...(key === selectedItem
                ? selectedSideNavItemStyle
                : SideNavItemStyle),
              ...(isHovered ? hoveredStyle : {}),
            }}
          >
            <CIcon
              icon={item.icon}
              customClassName="nav-icon"
              style={{
                ...(key === selectedItem ? selectedIconStyle : iconStyle),
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

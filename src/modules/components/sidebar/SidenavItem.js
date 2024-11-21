import React from 'react';
import { CNavItem, CNavLink } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';

import { useNavigate } from 'react-router-dom';
import SidenavGroup from './SidenavGroup';

const SidenavItem = ({ item, level }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <>
      {item.children ? (
        <SidenavGroup item={item} level={level} />
      ) : (
        <CNavItem
          onClick={handleClick}
          style={{ paddingLeft: `${level * 20}px` }}
        >
          <CNavLink>
            <CIcon icon={item.icon} customClassName="nav-icon" />
            {item.name}
          </CNavLink>
        </CNavItem>
      )}
    </>
  );
};

export default SidenavItem;

import React, { useState } from 'react';
import { CNavGroup } from '@coreui/react';
import SidenavItem from './SidenavItem';

const SidenavGroup = ({ item, level }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleGroup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CNavGroup toggler={item.name} onClick={toggleGroup}>
      {item.children.map((child, index) => (
        <SidenavItem key={index} item={child} level={level + 1} />
      ))}
    </CNavGroup>
  );
};

export default SidenavGroup;

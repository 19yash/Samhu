import React, { useState } from 'react';
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import SidenavItem from './SidenavItem';

const Sidenav = ({ navItems, brandName = 'MyApp' }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CSidebar visible={isOpen} onVisibleChange={(val) => setIsOpen(val)}>
      <CSidebarBrand className="d-none d-md-flex" to="/">
        {brandName}
      </CSidebarBrand>
      <CSidebarNav>
        {navItems.map((item, index) => (
          <SidenavItem key={index} item={item} level={0} />
        ))}
      </CSidebarNav>
      <CSidebarToggler
        onClick={toggleSidebar}
        style={{
          padding: '10px',
          backgroundColor: '#007bff',
          cursor: 'pointer',
          padding: '2px 6px',
          position: 'absolute',
          left: '250px',
          top: 0,
        }} // Inline styles here
      />
    </CSidebar>
  );
};

export default Sidenav;

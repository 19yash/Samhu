import React, { useState } from 'react';
import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import SidenavItem from './SidenavItem';
import images from '../../../images';
import { Icon, Img } from './AppSideBar.style';
import { SideBarNav, SideBarToggle } from './sidenav.style';

const Sidenav = ({ navItems, brandName }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  console.log('🚀 ~ images:', images.fullLogotransparent);

  return (
    <CSidebar style={SideBarNav.container} narrow={!isOpen}>
      {isOpen && (
        <CSidebarBrand className="d-none d-md-flex" to="/">
          {<Img src={images.fullLogotransparent} alt={brandName} />}
        </CSidebarBrand>
      )}
      <CSidebarNav style={{ gap: '8px' }}>
        {navItems.map((item, index) => (
          <SidenavItem
            key={index}
            style={{ color: '#fff' }}
            index={index}
            item={item}
            level={0}
          />
        ))}
      </CSidebarNav>
      <SideBarToggle onClick={toggleSidebar}>
        <Icon src={isOpen ? images.doubleLeft : images.doubleRight} />
      </SideBarToggle>
    </CSidebar>
  );
};

export default Sidenav;

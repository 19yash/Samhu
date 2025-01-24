import styled from 'styled-components';
// import SidenavItem from './SidenavItem';
import theme from '../../../theme/Theme';

export const SideBarNav = {
  container: {
    backgroundColor: theme.palette.background.greyPrimary,
    color: '#fff',
  },
};

export const SideBarToggle = styled.div`
  position: absolute;
  display: flex;
  top: 35px;
  right: -12px;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  align-items: center;
  justify-content: center;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 12px;
  background-color: rgb(249, 250, 251);
`;
export const selectedSideNavItemStyle = {
  backgroundColor: theme.palette.background.secoundary,
  color: theme.palette.primary.main,
  fontSize: '14px',
};

export const hoveredStyle = {
  color: theme.palette.primary.main,
};
export const SideNavItemStyle = {
  color: theme.palette.text.primary,
  fontSize: '14px',
};

export const selectedIconStyle = {
  color: theme.palette.primary.main,
};
export const iconStyle = {
  color: theme.palette.text.primary,
};

// export const StyledSidenavItem = styled(SidenavItem)`
//   color: #fff;
//   transition:
//     background-color 0.3s ease,
//     color 0.3s ease;

//   &:hover {
//     background-color: #fff;
//     color: #f0f0f0;
//   }
// `;

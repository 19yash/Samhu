import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import theme from '../../../theme/Theme';
import { Icon } from './buttonStyle';

// Predefined button styles based on type
const buttonStyles = {
  backgroundWithBorder: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    border: '1px solid #fff',
  },
  backgroundWithOutBorder: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  withOutBackground: {
    backgroundColor: 'transparent',
    color: '#000',
  },
};

// Styled button based on props
const StyledButton = styled(MuiButton)(({ buttonType, style }) => ({
  ...buttonStyles[buttonType],
  ...style,
}));

const Button = ({
  text,
  icon,
  iconPosition = 'start',
  buttonType = 'backgroundWithOutBorder',
  style,
  loading = false,
  ...props
}) => {
  return (
    <StyledButton
      variant="contained"
      buttonType={buttonType}
      style={style}
      disabled={loading} // Disable button when loading is true
      {...props}
    >
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        <>
          {icon && iconPosition === 'start' && (
            <Icon src={icon} alt="button icon" />
          )}
          {text}
          {icon && iconPosition === 'end' && (
            <Icon src={icon} alt="button icon" />
          )}
        </>
      )}
    </StyledButton>
  );
};

export default Button;

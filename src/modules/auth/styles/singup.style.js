import styled from 'styled-components';
// Theme colors extracted from the logo SVG
const themeColors = {
  primary: '#FF914D', // Orange from the logo
  secondary: '#FFFFFF', // White for contrast
  accent: '#333333', // Dark gray for text
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  background-color: white;
  padding: 1rem;
  box-sizing: border-box;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Logo = styled.img`
  width: 400px;
  @media (max-width: 768px) {
    width: 250px;
  }
`;

// Updated styles using theme colors and responsiveness
export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: themeColors.secondary,
    padding: '1rem',
    boxSizing: 'border-box',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {},
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '10px',
    backgroundColor: themeColors.secondary,
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 8px 8px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '400px',

    '@media (max-width: 768px)': {
      padding: '1.5rem',
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
    },
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: themeColors.accent,
    fontSize: '1.5rem',

    '@media (max-width: 768px)': {
      fontSize: '1.25rem',
    },
  },
  formGroup: {
    // marginBottom:'1px'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem', // Space between fields

    '@media (max-width: 768px)': {
      flexDirection: 'column', // Stacks fields vertically on smaller screens
    },
  },
  fieldGroup: {
    minWidth: '160px', // Ensures fields don't become too narrow
  },
  label: {
    display: 'block',
    marginBottom: '.5rem',
    color: themeColors.accent,
    fontSize: '14px',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    padding: '.5rem',
    borderRadius: '4px',
    border: `1px solid ${themeColors.accent}`,
    fontSize: '12px',
    color: themeColors.accent,
    boxSizing: 'border-box',

    '@media (max-width: 768px)': {
      padding: '.65rem',
      fontSize: '0.9rem',
    },
  },
  button: {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: themeColors.primary,
    color: themeColors.secondary,
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.75rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',

    '@media (max-width: 768px)': {
      padding: '0.65rem',
      fontSize: '0.9rem',
    },
  },
  errorMessage: {
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
  },
};

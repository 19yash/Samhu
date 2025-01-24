const themeColors = {
  primary: '#FF914D', // Orange from the logo
  secondary: '#FFFFFF', // White for contrast
  accent: '#333333', // Dark gray for text
};

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: themeColors.secondary,
    padding: '1rem', // Add padding for smaller screens
    boxSizing: 'border-box',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: themeColors.secondary,
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '400px',
    transition: 'all 0.3s ease', // Smooth transitions for resizing
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: themeColors.accent,
    fontSize: '1.5rem', // Responsive font size
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '.5rem',
    color: themeColors.accent,
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '.5rem',
    borderRadius: '4px',
    border: `1px solid ${themeColors.accent}`,
    fontSize: '12px',
    color: themeColors.accent,
    boxSizing: 'border-box', // Ensure padding doesn't break layout
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
  },
  errorMessage: {
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
  },

  linkStyle: {
    color: themeColors.primary,
    fontSize: '14px',
  },

  // Media query for responsiveness
  '@media (max-width: 768px)': {
    form: {
      padding: '1.5rem', // Reduce padding on smaller screens
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)', // Adjust shadow for smaller screens
    },
    title: {
      fontSize: '1.25rem', // Reduce font size for titles on small screens
    },
    input: {
      padding: '.65rem', // Slightly reduce padding for inputs on small screens
      fontSize: '0.9rem', // Adjust input font size for readability
    },
    button: {
      padding: '0.65rem', // Slightly smaller button on smaller screens
      fontSize: '0.9rem',
    },
  },
};

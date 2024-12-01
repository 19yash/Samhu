import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Theme';

// Create a context to manage theme
const ThemeContext = createContext();

// Define the custom ThemeProvider
const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light'); // Manage theme mode (light/dark)

  // Define your custom theme properties
  const customTheme = useMemo(() => {
    return createTheme(theme);
  }, [mode]);

  // Expose toggle functionality through the context
  const toggleTheme = () =>
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={customTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook to access the theme context
const useCustomTheme = () => useContext(ThemeContext);

export { CustomThemeProvider, useCustomTheme };

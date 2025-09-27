import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material';

const ThemeContext = createContext({ mode: 'light', toggle: () => {} });

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('theme_mode');
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme_mode', mode);
  }, [mode]);

  const muiTheme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  const value = useMemo(() => ({ mode, toggle: () => setMode(m => (m === 'dark' ? 'light' : 'dark')) }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <MUIThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext);


import React, { createContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Get initial theme from localStorage or default to 'light'
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('portfolio-theme-mode');
    return savedMode || 'light';
  });

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio-theme-mode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Create theme with modern color palette
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#2563eb' : '#3b82f6',
            light: mode === 'light' ? '#93c5fd' : '#60a5fa',
            dark: mode === 'light' ? '#1e40af' : '#1d4ed8',
          },
          secondary: {
            main: mode === 'light' ? '#8b5cf6' : '#a855f7',
            light: mode === 'light' ? '#c4b5fd' : '#d8b4fe',
            dark: mode === 'light' ? '#6d28d9' : '#7c3aed',
          },
          success: {
            main: mode === 'light' ? '#059669' : '#10b981',
            light: mode === 'light' ? '#86efac' : '#6ee7b7',
            dark: mode === 'light' ? '#065f46' : '#047857',
          },
          error: {
            main: mode === 'light' ? '#dc2626' : '#ef4444',
            light: mode === 'light' ? '#fca5a5' : '#f87171',
            dark: mode === 'light' ? '#b91c1c' : '#dc2626',
          },
          warning: {
            main: mode === 'light' ? '#d97706' : '#f59e0b',
            light: mode === 'light' ? '#fcd34d' : '#fde68a',
            dark: mode === 'light' ? '#b45309' : '#d97706',
          },
          info: {
            main: mode === 'light' ? '#0891b2' : '#06b6d4',
            light: mode === 'light' ? '#67e8f9' : '#22d3ee',
            dark: mode === 'light' ? '#0e7490' : '#0891b2',
          },
          background: {
            default: mode === 'light' ? '#f8fafc' : '#0f172a',
            paper: mode === 'light' ? '#ffffff' : '#1e293b',
          },
          text: {
            primary: mode === 'light' ? '#1e293b' : '#f1f5f9',
            secondary: mode === 'light' ? '#64748b' : '#94a3b8',
          },
          divider: mode === 'light' ? '#e2e8f0' : '#334155',
        },
        typography: {
          fontFamily: [
            'Inter',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),
          h1: {
            fontWeight: 800,
            fontSize: '2.5rem',
          },
          h2: {
            fontWeight: 700,
            fontSize: '2rem',
          },
          h3: {
            fontWeight: 700,
            fontSize: '1.75rem',
          },
          h4: {
            fontWeight: 600,
            fontSize: '1.5rem',
          },
          h5: {
            fontWeight: 600,
            fontSize: '1.25rem',
          },
          h6: {
            fontWeight: 600,
            fontSize: '1.125rem',
          },
          body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
          },
          body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
          },
        },
        shape: {
          borderRadius: 12,
        },
        shadows: mode === 'light' ? [
          'none',
          '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          ...Array(18).fill('none')
        ] : [
          'none',
          '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
          '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
          '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
          '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
          '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
          '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          ...Array(18).fill('none')
        ],
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: mode === 'light' 
                  ? '0 4px 20px rgba(0, 0, 0, 0.05)' 
                  : '0 4px 20px rgba(0, 0, 0, 0.2)',
                border: `1px solid ${mode === 'light' ? '#e2e8f0' : '#334155'}`,
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 8,
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 6,
                fontWeight: 600,
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

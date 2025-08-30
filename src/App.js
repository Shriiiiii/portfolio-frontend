
import React, { useState, useEffect, useRef } from 'react';
import { Box, CircularProgress, Typography, alpha, useTheme } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Import the new layout components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  // --- SCROLLING LOGIC ---
  const dashboardRef = useRef(null);
  const performanceRef = useRef(null);
  const allocationRef = useRef(null);
  const holdingsRef = useRef(null);
  const insightsRef = useRef(null);
  const topPerformersRef = useRef(null);
  const sectorRef = useRef(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleScroll = (ref) => {
    if (ref && ref.current) {
      const yOffset = -80; 
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (ref === dashboardRef) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileOpen(false); // Close sidebar on mobile after selection
  };

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [summaryRes, holdingsRes, allocationRes, performanceRes, activityRes] = await Promise.all([
          fetch(`${API_URL}/api/portfolio/summary`),
          fetch(`${API_URL}/api/portfolio/holdings`),
          fetch(`${API_URL}/api/portfolio/allocation`),
          fetch(`${API_URL}/api/portfolio/performance`),
          fetch(`${API_URL}/api/portfolio/activity`)
        ]);

        if (!summaryRes.ok || !holdingsRes.ok || !allocationRes.ok || !performanceRes.ok || !activityRes.ok) {
          throw new Error('Network response was not ok. Please ensure the backend server is running.');
        }

        const summary = await summaryRes.json();
        const holdings = await holdingsRes.json();
        const allocation = await allocationRes.json();
        const performance = await performanceRes.json();
        const activity = await activityRes.json();
        
        setData({ ...summary, holdings, allocation, performance, activity });

      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const refs = { 
    dashboardRef, 
    performanceRef, 
    allocationRef, 
    holdingsRef, 
    insightsRef,
    topPerformersRef,
    sectorRef
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      overflow: 'hidden' // Prevent overall scrolling
    }}>
      <Sidebar 
        refs={refs} 
        handleScroll={handleScroll} 
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        minWidth: 0,
        width: 'calc(100% - 280px)', // Account for sidebar width
        ml: { md: '280px' } // Margin for sidebar on desktop
      }}>
        <Header handleDrawerToggle={handleDrawerToggle} />
        
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            overflow: 'hidden', // Prevent main content scrolling
            background: theme.palette.background.default,
            p: 0, // Remove padding
            m: 0  // Remove margin
          }} 
          ref={dashboardRef}
        >
          {loading && (
            <Box 
              display="flex" 
              justifyContent="center" 
              alignItems="center" 
              sx={{ 
                height: '100vh',
                background: alpha(theme.palette.background.default, 0.8)
              }}
            >
              <Box textAlign="center">
                <CircularProgress size={60} thickness={4} />
                <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
                  Loading Portfolio Data...
                </Typography>
              </Box>
            </Box>
          )}
          
          {error && (
            <Box 
              display="flex" 
              justifyContent="center" 
              alignItems="center" 
              sx={{ 
                height: '100vh',
                background: alpha(theme.palette.background.default, 0.8)
              }}
            >
              <Box textAlign="center" sx={{ maxWidth: 400, p: 3 }}>
                <ErrorOutlineIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
                <Typography variant="h6" color="error" gutterBottom>
                  Connection Error
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {error}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Please ensure the backend server is running on port 5000
                </Typography>
              </Box>
            </Box>
          )}
          
          {data && (
            <Box sx={{ height: '100%', overflow: 'auto' }}>
              <Dashboard data={data} refs={refs} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default App;

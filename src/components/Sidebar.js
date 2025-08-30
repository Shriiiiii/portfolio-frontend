
import React, { useState } from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import InsightsIcon from '@mui/icons-material/Insights';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

// Modern sidebar with improved styling and functionality
const Sidebar = ({ refs, handleScroll, mobileOpen, handleDrawerToggle }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Updated menu items with more relevant icons
  const menuItems = [
    { text: 'Dashboard Overview', icon: <DashboardIcon />, ref: refs.dashboardRef },
    { text: 'Performance Analytics', icon: <BarChartIcon />, ref: refs.performanceRef },
    { text: 'Portfolio Allocation', icon: <PieChartIcon />, ref: refs.allocationRef },
    { text: 'Holdings Details', icon: <TableChartIcon />, ref: refs.holdingsRef },
    { text: 'Market Insights', icon: <InsightsIcon />, ref: refs.insightsRef },
    { text: 'Top Performers', icon: <TrendingUpIcon />, ref: refs.topPerformersRef },
    { text: 'Sector Analysis', icon: <AccountBalanceIcon />, ref: refs.sectorRef },
  ];

  const handleListItemClick = (event, index, ref) => {
    setSelectedIndex(index);
    handleScroll(ref);
    if (isMobile) {
      handleDrawerToggle(); // Close sidebar on mobile after selection
    }
  };

  return (
    <Box
      sx={{
        width: { md: 280 },
        height: '100vh',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: { xs: mobileOpen ? 'flex' : 'none', md: 'flex' },
        flexDirection: 'column',
        position: { xs: 'fixed', md: 'fixed' }, // Changed to fixed
        top: 0,
        left: 0,
        zIndex: theme.zIndex.drawer + 1,
        overflowY: 'auto',
        boxShadow: { xs: theme.shadows[8], md: 'none' }
      }}
    >
      {/* Logo section with improved styling */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)' 
          : 'linear-gradient(135deg, #3498db 0%, #2c3e50 100%)',
        minHeight: '64px'
      }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 'bold', 
          color: 'white',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          fontSize: '1.1rem'
        }}>
          PORTFOLIO DASHBOARD
        </Typography>
      </Box>
      
      <Divider />
      
      {/* Navigation menu with improved styling */}
      <List sx={{ px: 1, py: 1, flex: 1 }}>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton 
              sx={{ 
                borderRadius: '8px',
                py: 1.25,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.08)' 
                    : 'rgba(25, 118, 210, 0.08)',
                  transform: 'translateX(4px)'
                },
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  boxShadow: theme.shadows[1],
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  }
                }
              }} 
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index, item.ref)}
            >
              <ListItemIcon sx={{ 
                minWidth: 36,
                color: selectedIndex === index ? 'white' : 'inherit'
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontSize: '0.9rem',
                  fontWeight: selectedIndex === index ? 600 : 400
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      {/* Footer section in sidebar */}
      <Box sx={{ p: 1.5, textAlign: 'center', borderTop: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="caption" color="text.secondary">
          Portfolio Analytics v2.0
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;

// First, I'm importing everything I need from React and Material-UI.
import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Grid, Card, CardContent, Container,
  Paper, useTheme, useMediaQuery, CircularProgress, keyframes
} from '@mui/material';
import { styled } from '@mui/material/styles';

// I'm also importing all the child components that make up my dashboard.
import HoldingsTable from './components/HoldingsTable';
import PerformanceChart from './components/PerformanceChart';
import AllocationPieChart from './components/AllocationPieChart';
import PortfolioInsights from './components/PortfolioInsights';
import PerformanceMetrics from './components/PerformanceMetrics';

// --- STYLED COMPONENTS ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AnimatedPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
  animation: `${fadeIn} 0.7s ease-in-out`,
  height: '100%'
}));

const DashboardCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: '16px',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8]
  },
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: 700,
  color: theme.palette.text.primary,
  position: 'relative',
  paddingBottom: theme.spacing(1.5),
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '60px',
    height: '4px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '2px'
  }
}));

// This is my main App component where everything comes together.
function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // I'm creating an async function to fetch all my data from the backend.
    const fetchAllData = async () => {
      // KEY CHANGE FOR DEPLOYMENT:
      // I'm using an environment variable for my API's base URL.
      // When I run `npm start` locally, it will default to 'http://localhost:5000'.
      // When I deploy to Vercel, it will use the REACT_APP_API_URL I set in the Vercel dashboard.
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

      try {
        // I'm using Promise.all to make all API calls concurrently for better performance.
        const [summaryRes, holdingsRes, allocationRes, performanceRes] = await Promise.all([
          fetch(`${API_URL}/api/portfolio/summary`),
          fetch(`${API_URL}/api/portfolio/holdings`),
          fetch(`${API_URL}/api/portfolio/allocation`),
          fetch(`${API_URL}/api/portfolio/performance`)
        ]);

        if (!summaryRes.ok || !holdingsRes.ok || !allocationRes.ok || !performanceRes.ok) {
          throw new Error('Network response was not ok. Please ensure the backend server is running.');
        }

        const summary = await summaryRes.json();
        const holdings = await holdingsRes.json();
        const allocation = await allocationRes.json();
        const performance = await performanceRes.json();
        
        setData({
          ...summary,
          holdings,
          allocation,
          performance,
        });

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []); // The empty array `[]` means this effect only runs once.

  if (loading) {
    return (<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress size={60} /></Box>);
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" textAlign="center" sx={{ p: 3 }}>
        <Typography variant="h5" color="error" gutterBottom>Oops! Something went wrong.</Typography>
        <Typography variant="body1">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', backgroundColor: theme.palette.background.default, py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography variant={isMobile ? "h4" : "h3"} component="h1" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>Portfolio Analytics Dashboard</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>A comprehensive view of your investments</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 5 }}>
          <Grid container spacing={isMobile ? 2 : 3} sx={{ maxWidth: '1100px' }}>
            {[
              { title: 'Total Value', value: `₹${data.totalValue?.toLocaleString() ?? 'N/A'}`, color: 'primary.main' },
              { title: 'Total Gain/Loss', value: `₹${data.totalGainLoss?.toLocaleString() ?? 'N/A'}`, color: data.totalGainLoss >= 0 ? 'success.main' : 'error.main' },
              { title: 'Return %', value: `${data.totalGainLossPercent?.toFixed(2) ?? '0.00'}%`, color: data.totalGainLossPercent >= 0 ? 'success.main' : 'error.main' },
              { title: 'Number of Holdings', value: data.holdings?.length ?? 0, color: 'text.secondary' }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <DashboardCard elevation={0} variant="outlined">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>{item.title}</Typography>
                    <Typography variant={isMobile ? "h4" : "h3"} component="div" color={item.color} sx={{ fontWeight: 700 }}>{item.value}</Typography>
                  </CardContent>
                </DashboardCard>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        <Box sx={{ mb: 5 }}>
            <PortfolioInsights summary={data} />
        </Box>

        <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 5 }}>
          <Grid item xs={12} md={4}>
            <AnimatedPaper variant="outlined">
              <SectionHeader variant="h6">Allocation by Sector</SectionHeader>
              <Box sx={{ height: '300px', position: 'relative' }}><AllocationPieChart data={data.allocation.bySector} /></Box>
            </AnimatedPaper>
          </Grid>
          <Grid item xs={12} md={4}>
            <AnimatedPaper variant="outlined">
              <SectionHeader variant="h6">Allocation by Asset Class</SectionHeader>
              <Box sx={{ height: '300px', position: 'relative' }}><AllocationPieChart data={data.allocation.byAssetClass} /></Box>
            </AnimatedPaper>
          </Grid>
          <Grid item xs={12} md={4}>
            <AnimatedPaper variant="outlined">
              <SectionHeader variant="h6">Market Cap Distribution</SectionHeader>
              <Box sx={{ height: '300px', position: 'relative' }}><AllocationPieChart data={data.allocation.byMarketCap} /></Box>
            </AnimatedPaper>
          </Grid>
        </Grid>

        <Box sx={{ mb: 5 }}>
          <AnimatedPaper variant="outlined">
            <SectionHeader variant="h5">Performance Comparison</SectionHeader>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} lg={8}>
                    <Box sx={{ height: isMobile ? '300px' : '400px' }}>
                        <PerformanceChart performance={data.performance} />
                    </Box>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <PerformanceMetrics returns={data.performance.returns} />
                </Grid>
            </Grid>
          </AnimatedPaper>
        </Box>

        <AnimatedPaper variant="outlined">
          <SectionHeader variant="h5">Your Holdings</SectionHeader>
          <HoldingsTable holdings={data.holdings} />
        </AnimatedPaper>
      </Container>
    </Box>
  );
}

export default App;

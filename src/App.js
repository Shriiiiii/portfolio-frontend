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
// Here, I'm defining custom-styled components using MUI's `styled` utility.
// This keeps my styling logic separate from the main component structure.

// This is a simple fade-in animation I'll apply to my main content blocks.
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// I created this `AnimatedPaper` to be my standard container for sections.
// It uses the `fadeIn` animation and has a nice, soft shadow and rounded corners.
const AnimatedPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
  animation: `${fadeIn} 0.7s ease-in-out`,
  height: '100%' // This makes sure cards in the same row have the same height.
}));

// This is the style for my four summary cards at the top.
// I added a little "lift" effect on hover to make it feel interactive.
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

// This is for my section titles, like "Allocation by Sector".
// The `&:after` creates that little colored underline for a nice visual touch.
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
  // I'm using MUI's theme for consistent styling.
  const theme = useTheme();
  // This hook helps me make the layout responsive for mobile.
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // I'm using state to hold the portfolio data, loading status, and any potential errors.
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This `useEffect` hook runs once when the component mounts to fetch all my data.
  useEffect(() => {
    // I'm creating an async function to fetch all my data from the backend.
    const fetchAllData = async () => {
      try {
        // I'm using Promise.all to make all API calls concurrently for better performance.
        const [summaryRes, holdingsRes, allocationRes, performanceRes] = await Promise.all([
          fetch('http://localhost:5000/api/portfolio/summary'),
          fetch('http://localhost:5000/api/portfolio/holdings'),
          fetch('http://localhost:5000/api/portfolio/allocation'),
          fetch('http://localhost:5000/api/portfolio/performance')
        ]);

        // I'm checking if any of the responses failed.
        if (!summaryRes.ok || !holdingsRes.ok || !allocationRes.ok || !performanceRes.ok) {
          throw new Error('Network response was not ok. Please ensure the backend server is running.');
        }

        // I'm parsing the JSON from each response.
        const summary = await summaryRes.json();
        const holdings = await holdingsRes.json();
        const allocation = await allocationRes.json();
        const performance = await performanceRes.json();
        
        // I'm combining all the data into a single state object.
        setData({
          ...summary, // Spreading the summary properties (totalValue, etc.) to the top level.
          holdings,
          allocation,
          performance,
        });

      } catch (err) {
        // If anything goes wrong, I'll set an error message.
        setError(err.message);
      } finally {
        // Finally, I'll stop the loading spinner.
        setLoading(false);
      }
    };

    fetchAllData();
  }, []); // The empty array `[]` means this effect only runs once.

  // While the data is loading, I show a simple loading spinner.
  if (loading) {
    return (<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress size={60} /></Box>);
  }

  // This is my UI for displaying an error message if the data fetch fails.
  if (error) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" textAlign="center" sx={{ p: 3 }}>
        <Typography variant="h5" color="error" gutterBottom>Oops! Something went wrong.</Typography>
        <Typography variant="body1">{error}</Typography>
      </Box>
    );
  }

  // This is the main JSX that renders my dashboard.
  return (
    <Box sx={{ minHeight: '100vh', width: '100%', backgroundColor: theme.palette.background.default, py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Header Section */}
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography variant={isMobile ? "h4" : "h3"} component="h1" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>Portfolio Analytics Dashboard</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>A comprehensive view of your investments</Typography>
        </Box>

        {/* Summary Cards Section */}
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
        
        {/* I'm rendering my new PortfolioInsights component here, passing the whole data object as the summary. */}
        <Box sx={{ mb: 5 }}>
            <PortfolioInsights summary={data} />
        </Box>

        {/* Allocation Charts Section */}
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

        {/* Performance Chart & Metrics Section */}
        <Box sx={{ mb: 5 }}>
          <AnimatedPaper variant="outlined">
            <SectionHeader variant="h5">Performance Comparison</SectionHeader>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} lg={8}>
                    <Box sx={{ height: isMobile ? '300px' : '400px' }}>
                        <PerformanceChart performance={data.performance} />
                    </Box>
                </Grid>
                {/* I'm rendering the new PerformanceMetrics component next to the line chart. */}
                <Grid item xs={12} lg={4}>
                    <PerformanceMetrics returns={data.performance.returns} />
                </Grid>
            </Grid>
          </AnimatedPaper>
        </Box>

        {/* Holdings Table Section */}
        <AnimatedPaper variant="outlined">
          <SectionHeader variant="h5">Your Holdings</SectionHeader>
          {/* I'm now passing the holdings data from the state to the table. */}
          <HoldingsTable holdings={data.holdings} />
        </AnimatedPaper>
      </Container>
    </Box>
  );
}

export default App;

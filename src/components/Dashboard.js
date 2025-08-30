
import React from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  useTheme,
  alpha,
  Card,
  CardContent,
  Stack,
  Chip
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PieChartIcon from '@mui/icons-material/PieChart';

// Import all your existing components
import HoldingsTable from './HoldingsTable';
import PerformanceChart from './PerformanceChart';
import AllocationPieChart from './AllocationPieChart';
import PortfolioInsights from './PortfolioInsights';
import RecentActivity from './RecentActivity';

// Single column dashboard with full-width components
const Dashboard = ({ data, refs }) => {
  const theme = useTheme();

  // Helper function to format the summary card values
  const SummaryCard = ({ title, value, subtitle, icon, color, trend }) => (
    <Card 
      sx={{ 
        height: '100%',
        borderRadius: '12px',
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[1],
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4],
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1, mb: 1 }}>
              {value}
            </Typography>
            {subtitle && (
              <Stack direction="row" alignItems="center" spacing={1}>
                {trend >= 0 ? (
                  <TrendingUpIcon sx={{ fontSize: '1.2rem', color: 'success.main' }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: '1.2rem', color: 'error.main' }} />
                )}
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: trend >= 0 ? 'success.main' : 'error.main',
                    fontWeight: 600
                  }}
                >
                  {subtitle}
                </Typography>
              </Stack>
            )}
          </Box>
          <Box sx={{
            p: 2,
            borderRadius: '10px',
            backgroundColor: alpha(color, 0.1),
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '50px'
          }}>
            {React.cloneElement(icon, { sx: { fontSize: '1.5rem' } })}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
          Portfolio Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Track your investments and analyze performance in real-time
        </Typography>
      </Box>

      {/* Top Row: Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <SummaryCard 
            title="Total Investment" 
            value={`₹${data.totalInvested?.toLocaleString('en-IN') ?? 'N/A'}`}
            icon={<AccountBalanceIcon />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <SummaryCard 
            title="Current Value" 
            value={`₹${data.totalValue?.toLocaleString('en-IN') ?? 'N/A'}`}
            subtitle={`₹${data.totalGainLoss?.toLocaleString('en-IN') ?? 'N/A'}`}
            trend={data.totalGainLoss}
            icon={<TrendingUpIcon />}
            color={data.totalGainLoss >= 0 ? theme.palette.success.main : theme.palette.error.main}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <SummaryCard 
            title="ROI" 
            value={`${data.totalGainLossPercent?.toFixed(2) ?? '0.00'}%`}
            trend={data.totalGainLossPercent}
            icon={<PieChartIcon />}
            color={data.totalGainLossPercent >= 0 ? theme.palette.success.main : theme.palette.error.main}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <SummaryCard 
            title="Holdings" 
            value={data.holdings?.length ?? 0}
            icon={<PieChartIcon />}
            color={theme.palette.info.main}
          />
        </Grid>
      </Grid>
      
      {/* Single Column Layout */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Performance Chart Section */}
        <Box ref={refs.performanceRef}>
          <Card sx={{ borderRadius: '16px', overflow: 'hidden' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Investment Growth
              </Typography>
              <Box sx={{ height: 400 }}>
                <PerformanceChart performance={data.performance} />
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Holdings Table Section */}
        <Box ref={refs.holdingsRef}>
          <Card sx={{ borderRadius: '16px', overflow: 'hidden' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Your Holdings
              </Typography>
              <HoldingsTable holdings={data.holdings} />
            </CardContent>
          </Card>
        </Box>

        {/* Portfolio Allocation Section */}
        <Box ref={refs.allocationRef}>
          <Card sx={{ borderRadius: '16px', overflow: 'hidden' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Portfolio Allocation
              </Typography>
              <Box sx={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '100%', maxWidth: 500, height: '100%' }}>
                  <AllocationPieChart data={data.allocation.bySector} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Two-column section for Insights and Activity */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box ref={refs.insightsRef}>
              <Card sx={{ borderRadius: '16px', height: '100%' }}>
                <CardContent sx={{ p: 3, height: '100%' }}>
                  <PortfolioInsights summary={data} />
                </CardContent>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: '16px', height: '100%' }}>
              <CardContent sx={{ p: 3, height: '100%' }}>
                <RecentActivity activity={data.activity} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;

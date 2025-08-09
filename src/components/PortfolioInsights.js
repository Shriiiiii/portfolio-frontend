// I'm importing React and the Material-UI components I need for this section.
import React from 'react';
import { Box, Typography, Paper, Grid, Divider, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import InsightsIcon from '@mui/icons-material/Insights';
import { styled } from '@mui/material/styles';

// I'm creating a styled component for the insight cards to reduce code repetition.
const InsightCard = styled(Box)(({ theme, borderColor }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${borderColor}`,
  borderRadius: theme.shape.borderRadius * 1.5,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}));

// This is my component for showing the portfolio's key insights.
// It takes a `summary` object as a prop, which will contain all the necessary data.
const PortfolioInsights = ({ summary }) => {
  // If for some reason the summary data hasn't loaded, I'll render nothing.
  if (!summary) {
    return null;
  }

  // A helper function to determine the color of the risk chip.
  const getRiskColor = (level) => {
    if (level === 'High') return 'error';
    if (level === 'Moderate') return 'warning';
    return 'success';
  };

  return (
    // I'm using a Paper component for the container with my standard styling.
    <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: '16px' }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Portfolio Insights
      </Typography>
      <Grid container spacing={3}>
        {/* Top Performer Card */}
        <Grid item xs={12} sm={6}>
          <InsightCard borderColor="success.light">
            <Box display="flex" alignItems="center" mb={1}>
              <TrendingUpIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'success.dark' }}>
                Top Performer
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {summary.topPerformer.name} ({summary.topPerformer.symbol})
            </Typography>
            <Typography variant="body1" sx={{ color: 'success.main', fontWeight: 'bold' }}>
              +{summary.topPerformer.gainPercent.toFixed(2)}%
            </Typography>
          </InsightCard>
        </Grid>

        {/* Worst Performer Card */}
        <Grid item xs={12} sm={6}>
          <InsightCard borderColor="error.light">
            <Box display="flex" alignItems="center" mb={1}>
              <TrendingDownIcon color="error" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'error.dark' }}>
                Worst Performer
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {summary.worstPerformer.name} ({summary.worstPerformer.symbol})
            </Typography>
            <Typography variant="body1" sx={{ color: 'error.main', fontWeight: 'bold' }}>
              {summary.worstPerformer.gainPercent.toFixed(2)}%
            </Typography>
          </InsightCard>
        </Grid>

        {/* Diversification and Risk Section */}
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
            <Box display="flex" alignItems="center">
              <InsightsIcon color="primary" sx={{ mr: 1.5 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Diversification Score: <strong style={{ fontSize: '1.2rem' }}>{summary.diversificationScore}/10</strong>
              </Typography>
            </Box>
            <Chip 
              label={`Risk Level: ${summary.riskLevel}`} 
              color={getRiskColor(summary.riskLevel)}
              variant="filled"
              size="medium"
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PortfolioInsights;

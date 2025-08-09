import React from 'react';
import { Box, Typography, Paper, Grid, Divider, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import InsightsIcon from '@mui/icons-material/Insights';

const TopPerformers = ({ summary }) => {
  if (!summary) return null;

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Portfolio Insights
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'success.light', borderRadius: 1 }}>
            <Box display="flex" alignItems="center" mb={1}>
              <TrendingUpIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" color="success.main">
                Top Performer
              </Typography>
            </Box>
            <Typography variant="h6">
              {summary.topPerformer.name} ({summary.topPerformer.symbol})
            </Typography>
            <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold' }}>
              +{summary.topPerformer.gainPercent}%
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'error.light', borderRadius: 1 }}>
            <Box display="flex" alignItems="center" mb={1}>
              <TrendingDownIcon color="error" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" color="error.main">
                Worst Performer
              </Typography>
            </Box>
            <Typography variant="h6">
              {summary.worstPerformer.name} ({summary.worstPerformer.symbol})
            </Typography>
            <Typography variant="body1" color="error.main" sx={{ fontWeight: 'bold' }}>
              {summary.worstPerformer.gainPercent}%
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <InsightsIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1">
                Diversification Score: <strong>{summary.diversificationScore}/10</strong>
              </Typography>
            </Box>
            <Chip 
              label={`Risk Level: ${summary.riskLevel}`} 
              color={
                summary.riskLevel === 'High' ? 'error' : 
                summary.riskLevel === 'Moderate' ? 'warning' : 'success'
              } 
              variant="outlined"
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TopPerformers;

import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Divider, 
  Chip,
  LinearProgress,
  Stack,
  useTheme,
  alpha
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import InsightsIcon from '@mui/icons-material/Insights';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import RiskIcon from '@mui/icons-material/Warning';

// Full-width portfolio insights component
const PortfolioInsights = ({ summary }) => {
  const theme = useTheme();

  if (!summary) {
    return null;
  }

  const getRiskColor = (level) => {
    if (level === 'High') return 'error';
    if (level === 'Moderate') return 'warning';
    return 'success';
  };

  const getDiversificationScoreColor = (score) => {
    if (score >= 8) return 'success';
    if (score >= 5) return 'warning';
    return 'error';
  };

  const PerformerCard = ({ title, performer, isTop, color }) => (
    <Card 
      sx={{ 
        p: 3,
        borderRadius: '12px',
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(color, 0.15)} 100%)`
          : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(color, 0.08)} 100%)`,
        border: `1px solid ${alpha(color, 0.2)}`,
        height: '100%'
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          {isTop ? (
            <TrendingUpIcon sx={{ color, fontSize: '2rem' }} />
          ) : (
            <TrendingDownIcon sx={{ color, fontSize: '2rem' }} />
          )}
          <Typography variant="h6" sx={{ fontWeight: 700, color }}>
            {title}
          </Typography>
        </Stack>
        
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            {performer.symbol}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {performer.name}
          </Typography>
        </Box>

        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Chip
            label={`${isTop ? '+' : ''}${performer.gainPercent.toFixed(2)}%`}
            size="large"
            sx={{ 
              backgroundColor: alpha(color, 0.2),
              color: color,
              fontWeight: 800,
              fontSize: '1.1rem',
              padding: '8px 16px'
            }}
          />
        </Stack>
      </Stack>
    </Card>
  );

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <InsightsIcon sx={{ fontSize: '2rem', color: 'primary.main' }} />
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Portfolio Insights
        </Typography>
      </Stack>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <PerformerCard
            title="Top Performer"
            performer={summary.topPerformer}
            isTop={true}
            color={theme.palette.success.main}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <PerformerCard
            title="Worst Performer"
            performer={summary.worstPerformer}
            isTop={false}
            color={theme.palette.error.main}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Diversification Score */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Diversity3Icon sx={{ fontSize: '1.5rem', color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Diversification Score
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={3}>
          <LinearProgress 
            variant="determinate" 
            value={summary.diversificationScore * 10} 
            sx={{ 
              flexGrow: 1,
              height: 12,
              borderRadius: 6,
              backgroundColor: theme.palette.action.hover,
              '& .MuiLinearProgress-bar': {
                backgroundColor: theme.palette[getDiversificationScoreColor(summary.diversificationScore)].main,
                borderRadius: 6
              }
            }}
          />
          <Chip 
            label={`${summary.diversificationScore}/10`} 
            color={getDiversificationScoreColor(summary.diversificationScore)}
            size="large"
            sx={{ 
              fontSize: '1.1rem',
              fontWeight: 700,
              padding: '8px 16px'
            }}
          />
        </Stack>
      </Box>

      {/* Risk Level */}
      <Stack direction="row" alignItems="center" spacing={3}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <RiskIcon sx={{ fontSize: '1.5rem', color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Risk Level
          </Typography>
        </Stack>
        <Chip 
          label={summary.riskLevel} 
          color={getRiskColor(summary.riskLevel)}
          size="large"
          sx={{ 
            fontSize: '1.1rem',
            fontWeight: 700,
            padding: '8px 24px'
          }}
        />
      </Stack>
    </Box>
  );
};

export default PortfolioInsights;

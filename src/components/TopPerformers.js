
import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Chip,
  Stack,
  useTheme,
  alpha
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WarningIcon from '@mui/icons-material/Warning';

// Modern top performers component with improved design
const TopPerformers = ({ summary }) => {
  const theme = useTheme();

  if (!summary) return null;

  const PerformerCard = ({ title, performer, isTop, color }) => (
    <Card 
      sx={{ 
        height: '100%',
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(color, 0.15)} 100%)`
          : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(color, 0.08)} 100%)`,
        border: `1px solid ${alpha(color, 0.2)}`,
        borderRadius: '16px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            {isTop ? (
              <EmojiEventsIcon sx={{ color, fontSize: '1.5rem' }} />
            ) : (
              <WarningIcon sx={{ color, fontSize: '1.5rem' }} />
            )}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color }}>
              {title}
            </Typography>
          </Stack>
          
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              {performer.symbol}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {performer.name}
            </Typography>
          </Box>

          <Stack direction="row" alignItems="center" spacing={1}>
            {isTop ? (
              <TrendingUpIcon sx={{ color, fontSize: '1.2rem' }} />
            ) : (
              <TrendingDownIcon sx={{ color, fontSize: '1.2rem' }} />
            )}
            <Chip
              label={`${isTop ? '+' : ''}${performer.gainPercent.toFixed(2)}%`}
              size="small"
              sx={{ 
                backgroundColor: alpha(color, 0.2),
                color: color,
                fontWeight: 700,
                fontSize: '0.875rem'
              }}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Performance Highlights
      </Typography>
      
      <Grid container spacing={3}>
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
    </Box>
  );
};

export default TopPerformers;


import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  Divider,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  useTheme
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';

// Compact activity feed with filtering
const RecentActivity = ({ activity }) => {
  const theme = useTheme();
  const [filter, setFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);

  if (!activity || activity.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="body2" color="text.secondary">
          No recent activity
        </Typography>
      </Box>
    );
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setAnchorEl(null);
  };

  const filteredActivity = filter === 'all' 
    ? activity 
    : activity.filter(item => item.type === filter);

  const getActivityIcon = (type) => {
    return type === 'buy' 
      ? <ArrowUpwardIcon sx={{ color: 'success.main', fontSize: '0.9rem' }} />
      : <ArrowDownwardIcon sx={{ color: 'error.main', fontSize: '0.9rem' }} />;
  };

  const getActivityColor = (type) => {
    return type === 'buy' ? 'success' : 'error';
  };

  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Recent Activity
        </Typography>
        <IconButton 
          size="small" 
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{ 
            fontSize: '0.8rem',
            padding: '4px'
          }}
        >
          <FilterListIcon fontSize="small" />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: '8px',
            minWidth: 120
          }
        }}
      >
        <MenuItem onClick={() => handleFilterChange('all')} selected={filter === 'all'}>
          All Activities
        </MenuItem>
        <MenuItem onClick={() => handleFilterChange('buy')} selected={filter === 'buy'}>
          Purchases
        </MenuItem>
        <MenuItem onClick={() => handleFilterChange('sell')} selected={filter === 'sell'}>
          Sales
        </MenuItem>
      </Menu>

      <List sx={{ width: '100%', maxHeight: '200px', overflow: 'auto' }}>
        {filteredActivity.slice(0, 3).map((item, index) => (
          <React.Fragment key={index}>
            <ListItem 
              alignItems="flex-start"
              sx={{ 
                px: 0,
                py: 1,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover
                }
              }}
            >
              <ListItemAvatar>
                <Avatar 
                  sx={{ 
                    width: 28,
                    height: 28,
                    bgcolor: theme.palette[getActivityColor(item.type)].light,
                  }}
                >
                  {getActivityIcon(item.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mr: 1, fontSize: '0.8rem' }}>
                      {item.symbol}
                    </Typography>
                    <Chip
                      label={item.type.toUpperCase()}
                      size="small"
                      color={getActivityColor(item.type)}
                      variant="outlined"
                      sx={{ height: 18, fontSize: '0.6rem' }}
                    />
                  </Box>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {`${item.quantity} @ ₹${item.price} • ${new Date(item.date).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'short'
                    })}`}
                  </Typography>
                }
                sx={{ m: 0 }}
              />
            </ListItem>
            {index < filteredActivity.length - 1 && (
              <Divider variant="inset" component="li" sx={{ mx: 0 }} />
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default RecentActivity;

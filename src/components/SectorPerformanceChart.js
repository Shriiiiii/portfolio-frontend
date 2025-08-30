
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { 
  Box, 
  useTheme, 
  alpha,
  Typography,
  Card,
  CardContent
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Modern sector performance chart with improved design
const SectorPerformanceChart = ({ holdings }) => {
  const theme = useTheme();

  // Calculate sector performance
  const sectorPerformance = holdings.reduce((acc, holding) => {
    const gainLoss = holding.gainLoss || 0;
    const sector = holding.sector || 'Uncategorized';
    if (!acc[sector]) {
      acc[sector] = 0;
    }
    acc[sector] += gainLoss;
    return acc;
  }, {});

  const labels = Object.keys(sectorPerformance);
  const dataValues = Object.values(sectorPerformance);

  // Prepare chart data
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Gain/Loss by Sector',
        data: dataValues,
        backgroundColor: dataValues.map(value => 
          value >= 0 
            ? alpha(theme.palette.success.main, 0.7)
            : alpha(theme.palette.error.main, 0.7)
        ),
        borderColor: dataValues.map(value => 
          value >= 0 
            ? theme.palette.success.main
            : theme.palette.error.main
        ),
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: dataValues.map(value => 
          value >= 0 
            ? theme.palette.success.main
            : theme.palette.error.main
        ),
      },
    ],
  };

  // Configure chart options
  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            return `₹${context.parsed.x.toLocaleString('en-IN')}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: alpha(theme.palette.divider, 0.3),
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            size: 12,
            weight: 500
          },
          callback: function (value) {
            if (value >= 1000000) {
              return `₹${(value / 1000000).toFixed(1)}M`;
            }
            if (value >= 1000) {
              return `₹${(value / 1000).toFixed(0)}k`;
            }
            return `₹${value}`;
          }
        }
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme.palette.text.primary,
          font: {
            size: 12,
            weight: 600
          }
        }
      }
    }
  };

  // Calculate totals for summary
  const totalGain = dataValues.filter(v => v > 0).reduce((sum, v) => sum + v, 0);
  const totalLoss = dataValues.filter(v => v < 0).reduce((sum, v) => sum + v, 0);
  const netPerformance = totalGain + totalLoss;

  return (
    <Card sx={{ borderRadius: '16px', height: '100%' }}>
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
          Sector Performance
        </Typography>
        
        {/* Performance Summary */}
        <Box sx={{ mb: 3, p: 2, borderRadius: '12px', bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Net Performance
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {netPerformance >= 0 ? (
                <TrendingUpIcon sx={{ color: 'success.main', fontSize: '1rem', mr: 0.5 }} />
              ) : (
                <TrendingDownIcon sx={{ color: 'error.main', fontSize: '1rem', mr: 0.5 }} />
              )}
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  color: netPerformance >= 0 ? 'success.main' : 'error.main'
                }}
              >
                ₹{Math.abs(netPerformance).toLocaleString('en-IN')}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="success.main">
              Gain: ₹{totalGain.toLocaleString('en-IN')}
            </Typography>
            <Typography variant="caption" color="error.main">
              Loss: ₹{Math.abs(totalLoss).toLocaleString('en-IN')}
            </Typography>
          </Box>
        </Box>

        {/* Chart */}
        <Box sx={{ flexGrow: 1, minHeight: 300 }}>
          <Bar data={chartData} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SectorPerformanceChart;

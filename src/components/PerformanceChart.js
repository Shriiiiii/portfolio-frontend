
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Box, useTheme, alpha } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Modern performance chart with improved styling and interactivity
const PerformanceChart = ({ performance }) => {
  const theme = useTheme();
  
  const data = {
    labels: performance.timeline.map(item => new Date(item.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })),
    datasets: [
      {
        label: 'Your Portfolio',
        data: performance.timeline.map(item => item.portfolio),
        borderColor: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        tension: 0.4,
        fill: true,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: theme.palette.primary.main,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: theme.palette.primary.main,
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
      },
      {
        label: 'Nifty 50',
        data: performance.timeline.map(item => item.nifty50),
        borderColor: theme.palette.secondary.main,
        backgroundColor: alpha(theme.palette.secondary.main, 0.1),
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: theme.palette.secondary.main,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: theme.palette.secondary.main,
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
        borderDash: [5, 5],
      },
      {
        label: 'Gold',
        data: performance.timeline.map(item => item.gold),
        borderColor: theme.palette.warning.main,
        backgroundColor: alpha(theme.palette.warning.main, 0.1),
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: theme.palette.warning.main,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: theme.palette.warning.main,
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
        borderDash: [3, 3],
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          font: {
            family: theme.typography.fontFamily,
            size: 13,
            weight: 600
          },
          padding: 20,
          usePointStyle: true,
          boxWidth: 8,
          color: theme.palette.text.primary,
        }
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 16,
        usePointStyle: true,
        boxPadding: 6,
        callbacks: {
          title: function(context) {
            return new Date(performance.timeline[context[0].dataIndex].date).toLocaleDateString('en-IN', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            });
          },
          label: function(context) {
            return `${context.dataset.label}: ₹${context.parsed.y.toLocaleString('en-IN')}`;
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            size: 12,
            weight: 500
          },
          maxRotation: 0,
          padding: 10,
        }
      },
      y: {
        grid: {
          color: alpha(theme.palette.divider, 0.5),
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          padding: 10,
          font: {
            size: 12,
            weight: 500
          },
          callback: function(value) {
            if (value >= 100000) {
              return `₹${(value / 100000).toFixed(1)}L`;
            }
            if (value >= 1000) {
              return `₹${(value / 1000).toFixed(1)}k`;
            }
            return `₹${value}`;
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      <Line data={data} options={options} />
    </Box>
  );
};

export default PerformanceChart;

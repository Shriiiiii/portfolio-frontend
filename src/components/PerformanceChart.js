// I'm importing React and the Line component from the chart library.
import React from 'react';
import { Line } from 'react-chartjs-2';

// Just like the pie chart, I need to import and register the parts for the line chart.
import { 
  Chart as ChartJS,
  CategoryScale, // For the X-axis (dates).
  LinearScale,   // For the Y-axis (values).
  PointElement,  // For the dots on the line.
  LineElement,   // For the line itself.
  Title,
  Tooltip,
  Legend,
  Filler         // This is needed to create the colored area under the line.
} from 'chart.js';
import { Box, useTheme } from '@mui/material';

// Registering all the parts.
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

// This is my Performance Chart component. It takes `performance` data as a prop.
const PerformanceChart = ({ performance }) => {
  const theme = useTheme();
  
  // I'm preparing the data for the line chart.
  const data = {
    // The labels are the dates for the X-axis. I'm formatting them to be more readable.
    labels: performance.timeline.map(item => new Date(item.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })),
    datasets: [
      {
        label: 'Your Portfolio',
        data: performance.timeline.map(item => item.portfolio),
        borderColor: theme.palette.primary.main,
        // This was the fix for the black background. I'm using my primary color
        // with a '33' hex code at the end, which makes it semi-transparent.
        backgroundColor: `${theme.palette.primary.main}33`, 
        tension: 0.4, // This makes the line curved and smooth.
        fill: true, // This tells the chart to fill the area under the line.
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: theme.palette.primary.main,
      },
      {
        label: 'Nifty 50',
        data: performance.timeline.map(item => item.nifty50),
        borderColor: theme.palette.secondary.main,
        backgroundColor: `${theme.palette.secondary.main}33`,
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: theme.palette.secondary.main,
      },
      {
        label: 'Gold',
        data: performance.timeline.map(item => item.gold),
        borderColor: theme.palette.warning.main,
        backgroundColor: `${theme.palette.warning.main}33`,
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: theme.palette.warning.main,
      }
    ]
  };

  // Configuring the look and feel of the line chart.
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end', // Aligns the legend to the right side.
        labels: {
          font: {
            family: theme.typography.fontFamily,
            size: 14
          },
          padding: 20,
          usePointStyle: true,
          boxWidth: 8,
        }
      },
      tooltip: {
        // Styling the tooltip to match.
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ₹${context.parsed.y.toLocaleString('en-IN')}`;
          }
        }
      }
    },
    // Customizing the X and Y axes.
    scales: {
      x: {
        grid: {
          display: false // I'm hiding the vertical grid lines to make it cleaner.
        },
        ticks: {
          color: theme.palette.text.secondary
        }
      },
      y: {
        grid: {
          color: theme.palette.divider, // Using a subtle color for the horizontal grid lines.
          drawBorder: false,
        },
        ticks: {
          color: theme.palette.text.secondary,
          padding: 10,
          // This callback formats the Y-axis labels to be shorter (e.g., "₹1L" instead of "₹100,000").
          callback: function(value) {
            if (value >= 100000) {
              return `₹${value / 100000}L`;
            }
            if (value >= 1000) {
              return `₹${value / 1000}k`;
            }
            return `₹${value}`;
          }
        }
      }
    }
  };

  // Returning the Line component inside a Box to control its height.
  return (
    <Box sx={{ height: '100%' }}>
      <Line data={data} options={options} />
    </Box>
  );
};

export default PerformanceChart;

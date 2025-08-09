// I'm importing React and the Pie component from the chart library.
import React from 'react';
import { Pie } from 'react-chartjs-2';

// I need to import and register the specific parts of Chart.js that the Pie chart uses.
import { 
  Chart as ChartJS,
  ArcElement, // This draws the "slices" of the pie.
  Tooltip,    // This shows the popup when I hover over a slice.
  Legend      // This displays the key (e.g., "Technology", "Banking").
} from 'chart.js';
import { useTheme } from '@mui/material';

// Here, I'm officially registering these parts with Chart.js.
ChartJS.register(ArcElement, Tooltip, Legend);

// This is my reusable Pie Chart component. It receives `data` as a prop.
const AllocationPieChart = ({ data }) => {
  // I'm accessing my global theme to use my consistent brand colors.
  const theme = useTheme();

  // I'm preparing the data in the format that Chart.js expects.
  const chartData = {
    // The labels are the names of the slices (e.g., "Technology", "Equity").
    labels: Object.keys(data),
    datasets: [{
      // The data is an array of the numerical values for each slice.
      data: Object.values(data).map(item => item.value),
      // I've defined a nice color palette for the slices.
      backgroundColor: [
        theme.palette.primary.main,
        '#673ab7', // A nice purple
        '#ff9800', // A vibrant orange
        '#e91e63', // A vivid pink
        '#00bcd4', // A clean cyan
        theme.palette.success.main
      ],
      borderWidth: 2, // A small border helps separate the slices visually.
      borderColor: theme.palette.background.paper, // The border color matches the card background.
      hoverOffset: 15 // This makes the slice pop out a bit on hover.
    }]
  };

  // Here, I'm configuring the options to control how the chart looks and behaves.
  const options = {
    responsive: true, // This makes the chart resize with its container.
    maintainAspectRatio: false, // I need this to be false to control the height manually.
    plugins: {
      legend: {
        position: 'bottom', // I placed the legend at the bottom to keep the chart centered.
        labels: {
          font: {
            family: theme.typography.fontFamily, // Using my app's font.
            size: 14
          },
          padding: 20,
          usePointStyle: true, // This makes the legend key a circle instead of a box.
          color: theme.palette.text.primary
        }
      },
      tooltip: {
        // I'm styling the tooltip to match my app's theme.
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
        // This callback lets me customize the text inside the tooltip.
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            // I'm safely checking if the percentage exists before adding it.
            const percentage = data[context.label]?.percentage;
            const percentageString = percentage ? ` (${percentage.toFixed(1)}%)` : '';
            return `${label}: ₹${value.toLocaleString('en-IN')}${percentageString}`;
          }
        }
      }
    }
  };

  // Finally, I'm returning the Pie component with my data and options.
  // The `devicePixelRatio` prop is the fix for the blurriness on high-res screens.
  return <Pie data={chartData} options={options} devicePixelRatio={window.devicePixelRatio} />;
};

export default AllocationPieChart;


import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useTheme, alpha, Box, Typography } from '@mui/material';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';

ChartJS.register(ArcElement, Tooltip, Legend);

// Modern doughnut chart with improved styling and center label
const AllocationPieChart = ({ data }) => {
  const theme = useTheme();

  // Calculate total value for center display
  const totalValue = Object.values(data).reduce((sum, item) => sum + (item.value || 0), 0);

  const chartData = {
    labels: Object.keys(data),
    datasets: [{
      data: Object.values(data).map(item => item.value),
      backgroundColor: [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.success.main,
        theme.palette.warning.main,
        theme.palette.error.main,
        theme.palette.info.main,
        theme.palette.text.primary,
      ],
      borderWidth: 2,
      borderColor: theme.palette.background.paper,
      hoverOffset: 20,
      borderRadius: 6,
      spacing: 2,
      cutout: '65%'
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: theme.typography.fontFamily,
            size: 12,
            weight: 600
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          color: theme.palette.text.primary,
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return chart.data.labels.map((label, i) => {
              const value = datasets[0].data[i];
              const percentage = ((value / totalValue) * 100).toFixed(1);
              return {
                text: `${label}: ${percentage}%`,
                fillStyle: datasets[0].backgroundColor[i],
                strokeStyle: datasets[0].borderColor,
                lineWidth: datasets[0].borderWidth,
                hidden: isNaN(datasets[0].data[i]) || chart.getDatasetMeta(0).data[i].hidden,
                index: i
              };
            });
          }
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
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = ((value / totalValue) * 100).toFixed(1);
            return `${label}: ₹${value.toLocaleString('en-IN')} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '65%'
  };

  // Center text component
  const CenterText = () => (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        pointerEvents: 'none'
      }}
    >
      <PieChartOutlineIcon 
        sx={{ 
          fontSize: '2rem', 
          color: theme.palette.text.secondary,
          mb: 0.5
        }} 
      />
      <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
        {`₹${(totalValue / 100000).toFixed(1)}L`}
      </Typography>
      <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
        Total Value
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <Doughnut data={chartData} options={options} />
      <CenterText />
    </Box>
  );
};

export default AllocationPieChart;

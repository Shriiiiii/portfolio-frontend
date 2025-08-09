// I'm importing React and the necessary Material-UI components.
import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

// This component shows the periodic returns (1M, 3M, 1Y).
// It takes the `returns` data object as a prop.
const PerformanceMetrics = ({ returns }) => {
  // If the data isn't ready, I won't render anything.
  if (!returns) {
    return null;
  }

  // I'm defining the rows of my table for easy mapping.
  const rows = [
    { name: 'Your Portfolio', data: returns.portfolio },
    { name: 'Nifty 50', data: returns.nifty50 },
    { name: 'Gold', data: returns.gold },
  ];

  // A helper function to format the percentage and color-code it.
  // This keeps my JSX clean.
  const formatCell = (value) => {
    const color = value >= 0 ? 'success.main' : 'error.main';
    const sign = value > 0 ? '+' : '';
    return (
      <Typography sx={{ color, fontWeight: 'bold' }}>
        {sign}{value?.toFixed(1)}%
      </Typography>
    );
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Trailing Returns
      </Typography>
      {/* I'm using a standard MUI Table inside a styled Paper container. */}
      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '16px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Benchmark</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>1 Month</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>3 Months</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>1 Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* I'm mapping over my rows to create the table body. */}
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                  {row.name}
                </TableCell>
                <TableCell align="right">{formatCell(row.data['1month'])}</TableCell>
                <TableCell align="right">{formatCell(row.data['3months'])}</TableCell>
                <TableCell align="right">{formatCell(row.data['1year'])}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PerformanceMetrics;

// I'm adding TextField and other necessary components from Material-UI for the search bar.
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TableSortLabel, Box, TextField, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { visuallyHidden } from '@mui/utils'; // A utility for accessibility.

// My table component receives the `holdings` array as a prop.
const HoldingsTable = ({ holdings }) => {
  // I'm using state to keep track of how the table is currently sorted.
  const [order, setOrder] = useState('asc'); // 'asc' or 'desc'
  const [orderBy, setOrderBy] = useState('symbol'); // The column to sort by.
  // I'm adding a new state to hold the search query from the user.
  const [filter, setFilter] = useState('');

  // This function handles what happens when I click a column header to sort it.
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // This function updates the filter state whenever the user types in the search box.
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Before I sort, I'm enhancing my data.
  // The original data doesn't have `value` or `gainLossPercent`, so I calculate them here.
  const enhancedHoldings = holdings.map(h => {
    const value = (h.quantity || 0) * (h.currentValue || 0);
    const totalInvestment = (h.quantity || 0) * (h.avgPrice || 0);
    const gainLossPercent = totalInvestment > 0 ? ((h.gainLoss || 0) / totalInvestment) * 100 : 0;
    
    // I return a new object with all the original properties plus my new calculated ones.
    return { ...h, value, gainLossPercent };
  });

  // I'm filtering the holdings *before* sorting them.
  // This checks if the user's search text appears in either the stock name or its symbol.
  const filteredHoldings = enhancedHoldings.filter(holding => 
    holding.name.toLowerCase().includes(filter.toLowerCase()) ||
    holding.symbol.toLowerCase().includes(filter.toLowerCase())
  );

  // Now I sort the `filteredHoldings` array based on the current `order` and `orderBy` state.
  const sortedHoldings = [...filteredHoldings].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });

  // This array defines the columns for my table header.
  const headers = [
    { id: 'symbol', label: 'Symbol' },
    { id: 'name', label: 'Name' },
    { id: 'quantity', label: 'Quantity', align: 'right' },
    { id: 'avgPrice', label: 'Avg Price', align: 'right' },
    { id: 'currentValue', label: 'Current Price', align: 'right' },
    { id: 'value', label: 'Value', align: 'right' },
    { id: 'gainLoss', label: 'Gain/Loss', align: 'right' },
  ];

  // This is the JSX for my table. I'm using a Fragment to return the search bar and the table together.
  return (
    <>
      {/* This is my new search bar, placed above the table. */}
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search Holdings..."
          value={filter}
          onChange={handleFilterChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* I'm mapping over my `headers` array to create the column headers. */}
              {headers.map((headCell) => (
                <TableCell key={headCell.id} align={headCell.align || 'left'} sortDirection={orderBy === headCell.id ? order : false}>
                  {/* The TableSortLabel provides the sorting arrow icon and click handler. */}
                  <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={() => handleSort(headCell.id)}>
                    {headCell.label}
                    {/* This part is for screen readers to announce the sort order. */}
                    {orderBy === headCell.id ? (<Box component="span" sx={visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* I'm mapping over the `sortedHoldings` array to create a row for each holding. */}
            {sortedHoldings.map((holding) => (
              <TableRow key={holding.symbol}>
                <TableCell>{holding.symbol}</TableCell>
                <TableCell>{holding.name}</TableCell>
                <TableCell align="right">{holding.quantity}</TableCell>
                {/* I'm using optional chaining (?.) and the nullish coalescing operator (??)
                  as a safety measure. If a value is missing (null/undefined), it won't crash
                  the app and will display 'N/A' instead.
                */}
                <TableCell align="right">₹{holding.avgPrice?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'N/A'}</TableCell>
                <TableCell align="right">₹{holding.currentValue?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'N/A'}</TableCell>
                <TableCell align="right">₹{holding.value?.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'N/A'}</TableCell>
                <TableCell 
                  align="right"
                  // I'm dynamically setting the text color to green for gains and red for losses.
                  sx={{ color: (holding.gainLoss || 0) >= 0 ? 'success.main' : 'error.main', fontWeight: 'bold' }}
                >
                  {/* I'm displaying the absolute gain/loss value and the percentage with an up/down arrow. */}
                  ₹{Math.abs(holding.gainLoss || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
                  ({(holding.gainLossPercent || 0).toFixed(2)}% {(holding.gainLoss || 0) >= 0 ? '▲' : '▼'})
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HoldingsTable;

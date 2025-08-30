
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TableSortLabel, Box, TextField, InputAdornment,
  Chip, IconButton, Menu, MenuItem, Typography, useTheme,
  alpha, TablePagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { visuallyHidden } from '@mui/utils';

// Full-width holdings table
const HoldingsTable = ({ holdings }) => {
  const theme = useTheme();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('value');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedHolding, setSelectedHolding] = useState(null);

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(0);
  };

  const handleMenuOpen = (event, holding) => {
    setAnchorEl(event.currentTarget);
    setSelectedHolding(holding);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedHolding(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Enhance holdings data with calculated values
  const enhancedHoldings = holdings.map(h => {
    const value = (h.quantity || 0) * (h.currentValue || 0);
    const totalInvestment = (h.quantity || 0) * (h.avgPrice || 0);
    const gainLossPercent = totalInvestment > 0 ? ((h.gainLoss || 0) / totalInvestment) * 100 : 0;
    return { ...h, value, gainLossPercent };
  });

  // Filter holdings
  const filteredHoldings = enhancedHoldings.filter(holding => 
    holding.name.toLowerCase().includes(filter.toLowerCase()) ||
    holding.symbol.toLowerCase().includes(filter.toLowerCase())
  );

  // Sort holdings
  const sortedHoldings = [...filteredHoldings].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate holdings
  const paginatedHoldings = sortedHoldings.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const headers = [
    { id: 'symbol', label: 'Symbol', width: '15%' },
    { id: 'name', label: 'Name', width: '25%' },
    { id: 'quantity', label: 'Quantity', align: 'right', width: '12%' },
    { id: 'avgPrice', label: 'Avg Price', align: 'right', width: '15%' },
    { id: 'currentValue', label: 'Current Price', align: 'right', width: '15%' },
    { id: 'value', label: 'Value', align: 'right', width: '15%' },
    { id: 'gainLoss', label: 'Gain/Loss %', align: 'right', width: '15%' },
  ];

  const formatCurrency = (value) => 
    value ? `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'N/A';

  return (
    <Box sx={{ width: '100%' }}>
      {/* Search and Filter Bar */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Your Holdings ({filteredHoldings.length})
        </Typography>
        <TextField
          variant="outlined"
          size="medium"
          placeholder="Search holdings..."
          value={filter}
          onChange={handleFilterChange}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: { borderRadius: '8px' }
          }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: '8px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ 
              backgroundColor: theme.palette.mode === 'dark' 
                ? alpha(theme.palette.background.paper, 0.5) 
                : theme.palette.grey[50] 
            }}>
              {headers.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.align || 'left'}
                  sortDirection={orderBy === headCell.id ? order : false}
                  sx={{ 
                    width: headCell.width,
                    py: 2,
                    fontWeight: 700,
                    fontSize: '1rem',
                    border: 'none'
                  }}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={() => handleSort(headCell.id)}
                    sx={{ fontWeight: 700 }}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedHoldings.map((holding) => (
              <TableRow 
                key={holding.symbol}
                sx={{ 
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover
                  }
                }}
              >
                <TableCell sx={{ border: 'none', py: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {holding.symbol}
                  </Typography>
                </TableCell>
                <TableCell sx={{ border: 'none', py: 2 }}>
                  <Typography variant="body1">
                    {holding.name}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ border: 'none', py: 2 }}>
                  <Typography variant="body1">
                    {holding.quantity}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ border: 'none', py: 2 }}>
                  <Typography variant="body1">
                    {formatCurrency(holding.avgPrice)}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ border: 'none', py: 2 }}>
                  <Typography variant="body1">
                    {formatCurrency(holding.currentValue)}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ border: 'none', py: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {formatCurrency(holding.value)}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ border: 'none', py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    {holding.gainLoss >= 0 ? (
                      <TrendingUpIcon sx={{ fontSize: '1.2rem', color: 'success.main', mr: 1 }} />
                    ) : (
                      <TrendingDownIcon sx={{ fontSize: '1.2rem', color: 'error.main', mr: 1 }} />
                    )}
                    <Chip
                      label={`${(holding.gainLossPercent || 0).toFixed(2)}%`}
                      size="medium"
                      variant="filled"
                      color={holding.gainLoss >= 0 ? 'success' : 'error'}
                      sx={{ 
                        height: 32,
                        fontSize: '0.9rem',
                        fontWeight: 700
                      }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredHoldings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ 
          mt: 2,
          '& .MuiTablePagination-toolbar': {
            padding: 2
          }
        }}
      />
    </Box>
  );
};

export default HoldingsTable;

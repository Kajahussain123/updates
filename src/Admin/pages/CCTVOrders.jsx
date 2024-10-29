import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Grid, IconButton, Avatar } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import AdminHeader from '../components/Header';

const mockData = [
  {
    id: 1,
    name: 'Athul Krishna',
    mobile: '6547587945',
    service: 'Repair',
    cctv: 'Mi',
    house: 'Kalliyath House',
    state: 'Kerala',
    district: 'Kozhikode',
    pin: '627289',
    description: 'Not recording',
    
  },
  
  
];

const CCTVOrders = () => {
  const [data, setData] = useState(mockData);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = data.filter((entry) =>
    entry.name.toLowerCase().includes(search.toLowerCase()) ||
    entry.mobile.includes(search)
  );

  return (
    <div>
        <AdminHeader></AdminHeader>
        <Box sx={{ width: '90%', margin: '0 auto', mt: 4 }}>
          <Typography variant="h4" gutterBottom>
           CCTV Orders
          </Typography>
    
          {/* Search Field */}
          <TextField
            label="Search by Name or Mobile"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={search}
            onChange={handleSearch}
          />
    
          {/* Data Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Mobile Number</strong></TableCell>
                  <TableCell><strong>Services</strong></TableCell>
                  <TableCell><strong>CCTV</strong></TableCell>
                  <TableCell><strong>House Name</strong></TableCell>
                  <TableCell><strong>State</strong></TableCell>
                  <TableCell><strong>District</strong></TableCell>
                  <TableCell><strong>PIN Code</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.name}</TableCell>
                      <TableCell>{entry.mobile}</TableCell>
                      <TableCell>{entry.service}</TableCell>
                      <TableCell>{entry.cctv}</TableCell>
                      <TableCell>{entry.house}</TableCell>
                      <TableCell>{entry.state}</TableCell>
                      <TableCell>{entry.district}</TableCell>
                      <TableCell>{entry.pin}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      
                      <TableCell>
                        <IconButton color="primary">
                          <Edit />
                        </IconButton>
                        <IconButton color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={11} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
    
          {/* Optional Action Button for Admin */}
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary">
              Export Data
            </Button>
          </Box>
        </Box>
    </div>
  );
};

export default CCTVOrders;
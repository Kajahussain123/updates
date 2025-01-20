import React, { useState, useEffect } from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, IconButton, Avatar,
  Modal, Select, MenuItem, FormControl, InputLabel, CircularProgress
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import AdminHeader from '../components/Header';
import { getMobileRequiest, updateMobileStatus, deleteMobileRequest } from '../../services/allApi';

const MobileOrders = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const fetchMobileRequests = async () => {
    setLoading(true);
    try {
      const response = await getMobileRequiest();
      
      if (response.message === "No mobile details found") {
        setData([]);  // Clear data if no mobile details are found
        setError('No data available');
      } else {
        setData(response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        setError('');
      }
    } catch (err) {
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchMobileRequests();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleEditClick = (request) => {
    setSelectedRequest(request);
    setStatus(request.status);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRequest(null);
    setStatus('');
  };

  const handleStatusUpdate = async () => {
    if (!selectedRequest) return;

    setIsLoading(true);
    try {
      await updateMobileStatus({ status }, selectedRequest._id);
      fetchMobileRequests();
      handleModalClose();
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await deleteMobileRequest(id);
        fetchMobileRequests();
      } catch (err) {
        console.error('Failed to delete request:', err);
      }
    }
  };

  const handleClearFilters = () => {
    setFilterStatus('');
    setFromDate('');
    setToDate('');
  };

  const filteredData = data.filter((entry) => {
    const matchesSearch =
      entry.userId.name.toLowerCase().includes(search.toLowerCase()) ||
      entry.userId.mobileNumber.includes(search);
    const matchesStatus = filterStatus ? entry.status === filterStatus : true;
    const matchesDate =
      (!fromDate || new Date(entry.createdAt) >= new Date(fromDate)) &&
      (!toDate || new Date(entry.createdAt) <= new Date(toDate));

    return matchesSearch && matchesStatus && matchesDate;
  });

  if (error) return <Typography>{error}</Typography>;

  return (
    <div>
      <AdminHeader />
      <Box sx={{ width: '90%', margin: '0 auto', mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Submissions
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <TextField
            label="Search by Name or Mobile"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            sx={{ flex: 1, mr: 2 }}
          />

          <FormControl sx={{ minWidth: 120, mr: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="date"
            label="From"
            InputLabelProps={{ shrink: true }}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            sx={{ mr: 2 }}
          />

          <TextField
            type="date"
            label="To"
            InputLabelProps={{ shrink: true }}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            sx={{ mr: 2 }}
          />

          <Button variant="outlined" onClick={handleClearFilters}>
            Clear
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Mobile Number</strong></TableCell>
                <TableCell><strong>Model Name</strong></TableCell>
                <TableCell><strong>Company</strong></TableCell>
                <TableCell><strong>House Name</strong></TableCell>
                <TableCell><strong>State</strong></TableCell>
                <TableCell><strong>District</strong></TableCell>
                <TableCell><strong>PIN Code</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Image</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={12} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : filteredData.length > 0 ? (
                filteredData.reverse().map((entry) => (
                  <TableRow key={entry._id}>
                    <TableCell>{new Date(entry.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{entry.userId?.name || 'N/A'}</TableCell>
                    <TableCell>{entry.userId?.mobileNumber || 'N/A'}</TableCell>
                    <TableCell>{entry.mobileId?.model_name || 'N/A'}</TableCell>
                    <TableCell>{entry.mobileId?.company_name || 'N/A'}</TableCell>
                    <TableCell>{entry.userId?.houseName || 'N/A'}</TableCell>
                    <TableCell>{entry.userId?.state || 'N/A'}</TableCell>
                    <TableCell>{entry.userId?.district || 'N/A'}</TableCell>
                    <TableCell>{entry.userId?.pincode || 'N/A'}</TableCell>
                    <TableCell>{entry.mobileId?.description || 'N/A'}</TableCell>
                    <TableCell>
                      {entry.mobileId?.mobile_img ? (
                        <Avatar
                          alt="Mobile Phone"
                          src={`https://updates-backend.onrender.com/${entry.mobileId.mobile_img}`}
                          sx={{ width: 50, height: 50 }}
                        />
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>{entry.status}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEditClick(entry)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(entry._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={12} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        </TableContainer>


        <Modal open={modalOpen} onClose={handleModalClose}>
          <Box sx={{ width: 400, margin: 'auto', mt: 10, p: 4, backgroundColor: 'white', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Update Status
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleStatusUpdate}
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update'}
              </Button>

              <Button variant="outlined" color="secondary" onClick={handleModalClose} sx={{ ml: 2 }}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default MobileOrders;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  IconButton,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import AdminHeader from '../components/Header';
import { deleteACCCTVRequest, getACCCTVRequest, updateACCCTVStatus } from '../../services/allApi';

const ACOrders = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchACRequests = async () => {
    try {
      const response = await getACCCTVRequest();
      const acRequests = response.filter(
        (entry) => entry.Ac_cctvId.product_type === 'AC'
      );
      setData(acRequests);
    } catch (err) {
      console.error('Error fetching AC requests:', err);
      setError('Failed to load AC requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchACRequests();
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
      await updateACCCTVStatus({ status }, selectedRequest._id);
      fetchACRequests();
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
        await deleteACCCTVRequest(id);
        fetchACRequests();
      } catch (err) {
        console.error('Failed to delete request:', err);
      }
    }
  };

  const handleClearFilters = () => {
    setStatusFilter('');
    setDateFilter({ from: '', to: '' });
  };

  const filteredData = data
    .filter(
      (entry) =>
        entry.userId.name.toLowerCase().includes(search.toLowerCase()) ||
        entry.userId.mobileNumber.includes(search)
    )
    .filter((entry) => (statusFilter ? entry.status === statusFilter : true))
    .filter((entry) => {
      if (dateFilter.from && dateFilter.to) {
        const createdAt = new Date(entry.createdAt);
        const fromDate = new Date(dateFilter.from);
        const toDate = new Date(dateFilter.to);
        return createdAt >= fromDate && createdAt <= toDate;
      }
      return true;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      <AdminHeader />
      <Box sx={{ width: '90%', margin: '0 auto', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          AC Orders
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField
            label="Search by Name or Mobile"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            sx={{ flex: 1, mr: 2 }}
          />

          <FormControl sx={{ minWidth: 150, mr: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="From"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dateFilter.from}
            onChange={(e) => setDateFilter({ ...dateFilter, from: e.target.value })}
            sx={{ mr: 2 }}
          />

          <TextField
            label="To"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dateFilter.to}
            onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })}
            sx={{ mr: 2 }}
          />

          <Button variant="outlined" color="secondary" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </Box>

        {loading ? (
          <Typography variant="h6" align="center">
            Loading...
          </Typography>
        ) : error ? (
          <Typography variant="h6" color="error" align="center">
            {error}
          </Typography>
        ) : (
          <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell><strong>Date</strong></TableCell>
        <TableCell><strong>Name</strong></TableCell>
        <TableCell><strong>Mobile Number</strong></TableCell>
        <TableCell><strong>Services</strong></TableCell>
        <TableCell><strong>AC Brand</strong></TableCell>
        <TableCell><strong>House Name</strong></TableCell>
        <TableCell><strong>State</strong></TableCell>
        <TableCell><strong>District</strong></TableCell>
        <TableCell><strong>PIN Code</strong></TableCell>
        <TableCell><strong>Description</strong></TableCell>
        <TableCell><strong>Status</strong></TableCell>
        <TableCell><strong>Actions</strong></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {filteredData.length > 0 ? (
        // Reverse the filteredData array to show the last order first
        filteredData.reverse().map((entry) => (
          <TableRow key={entry._id}>
            <TableCell>{new Date(entry.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>{entry.userId.name}</TableCell>
            <TableCell>{entry.userId.mobileNumber}</TableCell>
            <TableCell>{entry.Ac_cctvId.service_type}</TableCell>
            <TableCell>{entry.Ac_cctvId.brand}</TableCell>
            <TableCell>{entry.userId.houseName}</TableCell>
            <TableCell>{entry.userId.state}</TableCell>
            <TableCell>{entry.userId.district}</TableCell>
            <TableCell>{entry.userId.pincode}</TableCell>
            <TableCell>{entry.Ac_cctvId.description}</TableCell>
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
          <TableCell colSpan={11} align="center">
            No AC requests available
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>

        )}

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary">
            Export Data
          </Button>
        </Box>

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

export default ACOrders;

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

const CCTVOrders = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [status, setStatus] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchCCTVOrders = async () => {
    try {
      const response = await getACCCTVRequest();
      const cctvOrders = response.filter(
        (order) => order.Ac_cctvId.product_type === 'CCTV'
      );
      setData(cctvOrders);
    } catch (error) {
      console.error('Error fetching CCTV orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCCTVOrders();
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
      fetchCCTVOrders();
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
        fetchCCTVOrders();
      } catch (err) {
        console.error('Failed to delete request:', err);
      }
    }
  };

  const clearFilters = () => {
    setSearch('');
    setFilterStatus('');
    setFromDate('');
    setToDate('');
  };

  const filteredData = data
    .filter(
      (entry) =>
        entry.userId.name.toLowerCase().includes(search.toLowerCase()) ||
        entry.userId.mobileNumber.includes(search)
    )
    .filter((entry) =>
      filterStatus ? entry.status === filterStatus : true
    )
    .filter((entry) => {
      const orderDate = new Date(entry.createdAt);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      if (from && orderDate < from) return false;
      if (to && orderDate > to) return false;

      return true;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      <AdminHeader />
      <Box sx={{ width: '90%', margin: '0 auto', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          CCTV Orders
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField
            label="Search by Name or Mobile"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            sx={{ flex: 1, mr: 2 }}
          />

          <FormControl sx={{ width: 200, mr: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
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
            sx={{ width: 150, mr: 2 }}
          />
          <TextField
            type="date"
            label="To"
            InputLabelProps={{ shrink: true }}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            sx={{ width: 150, mr: 2 }}
          />

          <Button variant="outlined" onClick={clearFilters}>
            Clear Filters
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Mobile Number</strong></TableCell>
                <TableCell><strong>Service</strong></TableCell>
                <TableCell><strong>Brand</strong></TableCell>
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredData.length > 0 ? (
                filteredData.map((entry) => (
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

export default CCTVOrders;

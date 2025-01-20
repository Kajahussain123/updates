import React, { useState, useEffect } from 'react';
import {Box,Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography,TextField,IconButton,Modal,
  FormControl,InputLabel,Select,MenuItem,} from '@mui/material';
import { Edit } from '@mui/icons-material';
import AdminHeader from '../components/Header';
import { viewOrders, updateOrderStatus } from '../../services/allApi';

const ViewAccessoryOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch accessory orders
  const fetchAccessoryOrders = async () => {
    try {
      const response = await viewOrders();
      setOrders(response);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load accessory orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccessoryOrders();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Handle opening the status update modal
  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setStatus(order.status);
    setModalOpen(true);
  };

  // Handle closing the modal
  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedOrder(null);
    setStatus('');
  };

  // Update the order status
  const handleStatusUpdate = async () => {
    if (!selectedOrder) return;

    setIsUpdating(true);
    try {
      await updateOrderStatus({ status }, selectedOrder._id);
      fetchAccessoryOrders();
      handleModalClose();
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Filter orders based on search
  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.phone_number.toString().includes(search)
  );

  return (
    <div>
      <AdminHeader />
      <Box sx={{ width: '90%', margin: '0 auto', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          View Accessory Orders
        </Typography>

        <TextField
          label="Search by Name or Phone Number"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={search}
          onChange={handleSearch}
        />

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
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Phone Number</strong></TableCell>
                  <TableCell><strong>Accessory Title</strong></TableCell>
                  <TableCell><strong>Brand</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.phone_number}</TableCell>
                      <TableCell>{order.accessoryId.title}</TableCell>
                      <TableCell>{order.accessoryId.brand}</TableCell>
                      <TableCell>{order.accessoryId.description}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEditClick(order)}>
                          <Edit />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No accessory orders available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

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
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Update'}
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

export default ViewAccessoryOrders;

import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import AdminHeader from '../components/Header';
import { addACCCTVServices, deleteACCCTVServices, getACServices, updateACCCTVServices } from '../../services/allApi';

const AddACService = () => {
  const [serviceName, setServiceName] = useState('');
  const [services, setServices] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getACServices();
        if (response && response.length > 0) {
          const product = response[0];
          setServices(product.services);
          setProductId(product._id);
        } else {
          console.error('No brands found in the response');
        }
      } catch (error) {
        console.error('Failed to fetch CCTV brands:', error);
      }
    };

    fetchServices();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setServiceName(e.target.value);
  };

  const handleAddOrEditService = async () => {
    if (!serviceName) return; // Avoid empty input
  
    const newService = { serviceName };
  
    try {
      if (isEditing && editIndex !== null) {
        // Update brand logic for editing
        const oldServiceName = services[editIndex]?.serviceName; // Ensure it's not undefined
        await updateACCCTVServices(
          { oldServiceName, newService },
          productId
        );
        const updatedServices = services.map((service, index) =>
          index === editIndex ? newService : service
        );
        setServices(updatedServices); // Update local state
        setIsEditing(false); // Reset edit mode
        setEditIndex(null);
      } else {
        // Add brand logic for adding
        const updatedServices = [...services, newService];
        await addACCCTVServices({ services: updatedServices }, productId);
        setServices(updatedServices); // Update the local brands list
      }
    } catch (error) {
      console.error('Failed to add/edit brand:', error);
    }
  
    setServiceName(''); // Clear the input field after adding or editing
  };

 // Handle delete
const handleDelete = async (index) => {
  if (productId) {
    const serviceNameToDelete = services[index].serviceName;
    const updatedServices = services.filter((_, i) => i !== index);
    try {
      await deleteACCCTVServices(serviceNameToDelete, productId);
      setServices(updatedServices); // Update the local brands list after deletion
    } catch (error) {
      console.error('Failed to delete brand:', error);
    }
  }
};

  // Handle edit
  const handleEdit = (index) => {
    setServiceName(services[index].serviceName); // Set the brand name for editing
    setEditIndex(index);
    setIsEditing(true); // Switch to edit mode
  };
  return (
    <div>
    <AdminHeader></AdminHeader>
    <Box sx={{ width: '90%', margin: '0 auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add AC Services 
      </Typography>

      {/* Add/Edit Brand Form */}
      <Box sx={{ mb: 4 }}>
        <TextField
          label="Services Name"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={serviceName}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddOrEditService}
          disabled={!serviceName}
        >
          {isEditing ? 'Update Service' : 'Add Service'}
        </Button>
      </Box>

      {/* Brands Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Services Name</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.length > 0 ? (
              services.map((service, index) => (
                <TableRow key={index}>
                  <TableCell>{service.serviceName}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(index)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} align="center">
                  No Services added
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
</div>
  );
};

export default AddACService;

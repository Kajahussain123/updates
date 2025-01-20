import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import AdminHeader from '../components/Header';
import { addACCCTVBrands, deleteACCCTVBrands, getACBrands, updateACCCTVBrands } from '../../services/allApi';

const AddACBrand = () => {
  const [brandName, setBrandName] = useState('');
  const [brands, setBrands] = useState([]); // Initialize as an empty array
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getACBrands();
        if (response && response.length > 0) {
          const product = response[0];
          setBrands(product.brands); // Assuming the response contains brands
          setProductId(product._id);
        } else {
          console.error('No brands found in the response');
        }
      } catch (error) {
        console.error('Failed to fetch CCTV brands:', error);
      }
    };
  
    fetchBrands();
  }, []);
  

  // Handle input change
  const handleInputChange = (e) => {
    setBrandName(e.target.value);
  };

  const handleAddOrEditBrand = async () => {
    if (!brandName) return; // Avoid empty input
  
    const newBrand = { brandName };
  
    try {
      if (isEditing && editIndex !== null) {
        // Update brand logic for editing
        const oldBrandName = brands[editIndex]?.brandName; // Ensure it's not undefined
        await updateACCCTVBrands(
          { oldBrandName, newBrand },
          productId
        );
        const updatedBrands = brands.map((brand, index) =>
          index === editIndex ? newBrand : brand
        );
        setBrands(updatedBrands); // Update local state
        setIsEditing(false); // Reset edit mode
        setEditIndex(null);
      } else {
        // Add brand logic for adding
        const updatedBrands = [...brands, newBrand];
        await addACCCTVBrands({ brands: updatedBrands }, productId);
        setBrands(updatedBrands); // Update the local brands list
      }
    } catch (error) {
      console.error('Failed to add/edit brand:', error);
    }
  
    setBrandName(''); // Clear the input field after adding or editing
  };
  


  // Handle delete
  const handleDelete = async (index) => {
    if (brands && brands[index]) {  // Ensure the brand exists before proceeding
      const brandNameToDelete = brands[index].brandName;
      const updatedBrands = brands.filter((_, i) => i !== index);
  
      try {
        await deleteACCCTVBrands(brandNameToDelete, productId);
        setBrands(updatedBrands); // Update the local brands list after deletion
      } catch (error) {
        console.error('Failed to delete brand:', error);
      }
    } else {
      console.error('Brand not found at index:', index);
    }
  };
  
  const handleEdit = (index) => {
    if (brands && brands[index]) {  // Ensure the brand exists before proceeding
      setBrandName(brands[index].brandName); // Set the brand name for editing
      setEditIndex(index); // Store the index of the brand being edited
      setIsEditing(true); // Switch to edit mode
    } else {
      console.error('Brand not found at index:', index);
    }
  };
  
  return (
    <div>
      <AdminHeader />
      <Box sx={{ width: '90%', margin: '0 auto', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add CCTV Brands
        </Typography>

        {/* Add/Edit Brand Form */}
        <Box sx={{ mb: 4 }}>
          <TextField
            label="Brand Name"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={brandName}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddOrEditBrand}
            disabled={!brandName}
          >
            {isEditing ? 'Update Brand' : 'Add Brand'}
          </Button>
        </Box>

        {/* Brands Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Brand Name</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brands.length > 0 ? (
                brands.map((brand, index) => (
                  <TableRow key={index}>
                    <TableCell>{brand.brandName}</TableCell>
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
                    No brands added
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

export default AddACBrand;

import React, { useState } from 'react';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import AdminHeader from '../components/Header';

const AddProductsCategory = () => {
  const [brandName, setBrandName] = useState('');
  const [brands, setBrands] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    setBrandName(e.target.value);
  };

  // Add or edit brand
  const handleAddOrEditBrand = () => {
    if (isEditing) {
      const updatedBrands = brands.map((brand, index) =>
        index === editIndex ? { ...brand, name: brandName } : brand
      );
      setBrands(updatedBrands);
      setIsEditing(false);
    } else {
      setBrands([...brands, { name: brandName }]);
    }
    setBrandName('');
  };

  // Delete brand
  const handleDelete = (index) => {
    const updatedBrands = brands.filter((_, i) => i !== index);
    setBrands(updatedBrands);
  };

  // Edit brand
  const handleEdit = (index) => {
    setBrandName(brands[index].name);
    setEditIndex(index);
    setIsEditing(true);
  };

  return (
    <div>
        <AdminHeader></AdminHeader>
        <Box sx={{ width: '90%', margin: '0 auto', mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Add Products Category 
          </Typography>
    
          {/* Add/Edit Brand Form */}
          <Box sx={{ mb: 4 }}>
            <TextField
              label="Category Name"
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
                  <TableCell><strong>Category Name</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {brands.length > 0 ? (
                  brands.map((brand, index) => (
                    <TableRow key={index}>
                      <TableCell>{brand.name}</TableCell>
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
                      No Category added
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

export default AddProductsCategory;

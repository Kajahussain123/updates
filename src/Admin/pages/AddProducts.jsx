import React, { useState } from 'react';
import {
  Box, Button, TextField, MenuItem, Select, InputLabel, FormControl,
  Grid, IconButton, Typography, OutlinedInput, Chip, Avatar
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import AdminHeader from '../components/Header';

const mockBrands = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Samsung' },
  { id: 3, name: 'Xiaomi' },
];

const mockCategories = [
  { id: 1, name: 'Smartphones' },
  { id: 2, name: 'Laptops' },
  { id: 3, name: 'Accessories' },
];

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [category, setCategory] = useState('');
  const [colours, setColours] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  // Handle image uploads
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Remove image
  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, imgIndex) => imgIndex !== index)
    );
  };

  const handleSubmit = () => {
    const productData = {
      productName,
      brandName,
      category,
      colours: colours.split(',').map((color) => color.trim()), // Parse colours into an array
      description,
      price,
      images: selectedImages, // In reality, you'd need to handle the file uploads here
    };
    console.log('Submitted product:', productData);
    // Add product submission logic here (e.g., API call)
  };

  return (
    <div>
        <AdminHeader></AdminHeader>
        <Box sx={{ width: '90%', margin: '0 auto', mt: 4 , mb:5}}>
          <Typography variant="h4" gutterBottom>
            Add Accessories
          </Typography>
          <Grid container spacing={2}>
            {/* Product Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Product Name"
                variant="outlined"
                fullWidth
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Grid>
    
            {/* Brand Name Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Brand Name</InputLabel>
                <Select
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  label="Brand Name"
                >
                  {mockBrands.map((brand) => (
                    <MenuItem key={brand.id} value={brand.name}>
                      {brand.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
    
            {/* Category Dropdown */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                >
                  {mockCategories.map((category) => (
                    <MenuItem key={category.id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
    
            {/* Colours Input */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Colours (comma-separated)"
                variant="outlined"
                fullWidth
                value={colours}
                onChange={(e) => setColours(e.target.value)}
              />
            </Grid>
    
            {/* Description */}
            <Grid item xs={12}>
              <TextField
                label="Product Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
    
            {/* Price */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
    
            {/* Image Upload */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
              >
                Upload Images
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
            </Grid>
    
            {/* Image Preview */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                {selectedImages.map((image, index) => (
                  <Box key={index} sx={{ position: 'relative' }}>
                    <Avatar
                      alt={`Product Image ${index}`}
                      src={image}
                      variant="square"
                      sx={{ width: 100, height: 100 }}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        bgcolor: 'white',
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Delete color="error" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Grid>
    
            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
              >
                Add Product
              </Button>
            </Grid>
          </Grid>
        </Box>
    </div>
  );
};

export default AddProduct;

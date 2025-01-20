import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  IconButton,
  Typography,
  Avatar,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import AdminHeader from '../components/Header';
import { addProduct, getCategories } from '../../services/allApi';
import { toast, ToastContainer } from 'react-toastify'; // Import Toast library
import 'react-toastify/dist/ReactToastify.css'; // Import styles



const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [brandName, setBrandName] = useState('');
  const [colours, setColours] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]); // Use file objects for upload
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveImage = (index) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, imgIndex) => imgIndex !== index)
    );
  };

  const handleSubmit = async () => {
    const productData = new FormData();
    productData.append('title', productName);
    productData.append('brand', brandName);
    productData.append('category', category);
    productData.append('color', colours);
    productData.append('description', description);
    productData.append('price', price);

    selectedFiles.forEach((file) => {
      productData.append('image', file);
    });

    try {
      setLoading(true);
      const response = await addProduct(productData);
      toast.success('Product added successfully!'); // Show success toast
      console.log('Product added successfully:', response);
      setLoading(false);

      // Clear form
      setProductName('');
      setBrandName('');
      setCategory('');
      setColours('');
      setBrandName('')
      setDescription('');
      setPrice('');
      setSelectedFiles([]);
    } catch (error) {
      console.error('Failed to add product:', error);
      toast.error('Failed to add product. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminHeader />
      <Box sx={{ width: '90%', margin: '0 auto', mt: 4, mb: 5 }}>
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

          <Grid item xs={12} sm={6}>
            <TextField
              label="Brand"
              variant="outlined"
              fullWidth
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
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
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.Category_Names}>
                    {cat.Category_Names}
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
              {selectedFiles.map((file, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <Avatar
                    alt={`Product Image ${index}`}
                    src={URL.createObjectURL(file)} // Display preview
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
              disabled={loading} // Disable while loading
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </Button>
          </Grid>
        </Grid>
        <ToastContainer />
      </Box>
    </div>
  );
};

export default AddProduct;

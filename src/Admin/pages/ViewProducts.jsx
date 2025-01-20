import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, CircularProgress,
  IconButton,
  Tooltip,
  Modal,
  TextField,
  Button
} from '@mui/material';
import AdminHeader from '../components/Header';
import { Edit, Delete } from '@mui/icons-material';
import { deleteProduct, editProduct, getProducts } from '../../services/allApi';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    image: '',
    brand: '',
    category: '',
    price: '',
    color: [],
  });
  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
   
    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setEditFormData({
      title: product.title,
      image: product.image[0] || '',
      brand: product.brand,
      category: product.category,
      price: product.price,
      color: product.color,
    });
    setOpenModal(true);
  };

  const handleUpdateProduct = async (productId) => {
    const reqBody = {
      title: editFormData.title,
      brand: editFormData.brand,
      category: editFormData.category,
      price: editFormData.price,
      color: editFormData.color,
      image: editFormData.image,
    };

    try {
      await editProduct(reqBody, productId);
      fetchProducts();
      setOpenModal(false);
    } catch (err) {
      console.error('Failed to update product:', err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        fetchProducts(); // Ensure fetchProducts updates the product list
      } catch (err) {
        console.error('Failed to delete product:', err);
      }
    }
  };
  

  return (
    <div>
      <AdminHeader />
      <Box sx={{ width: '90%', margin: '0 auto', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          View Products
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" variant="h6" align="center">
            {error}
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Brand Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Colours</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>
                      {product.image && Array.isArray(product.image) && product.image.length > 0
                        ? <img src={`https://updates-backend.onrender.com/${product.image[0]}`} alt={product.title} style={{ width: '100px', height: '100px' }} />
                        : 'No Image'}
                    </TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>Rs.{product.price}</TableCell>
                    <TableCell>{product.color.join(', ')}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => handleEditClick(product)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDeleteProduct(product._id)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ width: 400, margin: 'auto', mt: 10, p: 4, backgroundColor: 'white', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Edit Product
          </Typography>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            value={editFormData.title}
            onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
          />
          <TextField
            label="Brand"
            variant="outlined"
            fullWidth
            value={editFormData.brand}
            onChange={(e) => setEditFormData({ ...editFormData, brand: e.target.value })}
          />
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            value={editFormData.category}
            onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            value={editFormData.price}
            onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
          />
          <TextField
            label="Colors"
            variant="outlined"
            fullWidth
            value={editFormData.color.join(', ')}
            onChange={(e) => setEditFormData({ ...editFormData, color: e.target.value.split(', ') })}
          />
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpdateProduct(currentProduct._id)}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenModal(false)}
              sx={{ ml: 2 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};


export default ViewProducts;
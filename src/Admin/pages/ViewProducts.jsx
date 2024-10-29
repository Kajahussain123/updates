import React, { useState } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Button, Dialog, DialogActions, DialogContent, 
  DialogTitle, Typography, Tooltip
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import AdminHeader from '../components/Header';

// Sample data for products
const initialProducts = [
  { id: 1, productName: 'iPhone 14',image:"", brandName: 'Apple', category: 'Smartphones', price: 999, colours: 'Black, Silver' },
  { id: 2, productName: 'Galaxy S23',image:"", brandName: 'Samsung', category: 'Smartphones', price: 899, colours: 'Blue, White' },
  { id: 3, productName: 'Mi Band 6',image:"", brandName: 'Xiaomi', category: 'Accessories', price: 50, colours: 'Black, Red' },
];

const ViewProducts = () => {
  const [products, setProducts] = useState(initialProducts);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEdit = (id) => {
    alert(`Editing product with ID: ${id}`);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    setOpenDeleteDialog(false);
  };

  const handleDeleteDialogOpen = (product) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setSelectedProduct(null);
  };

  return (
    <div>
        <AdminHeader></AdminHeader>
        <Box sx={{ width: '90%', margin: '0 auto', mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            View Products
          </Typography>
    
          {/* Table to display products */}
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
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>{product.image}</TableCell>
                    <TableCell>{product.brandName}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.colours}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton color="primary" onClick={() => handleEdit(product.id)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDeleteDialogOpen(product)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    
          {/* Delete Confirmation Dialog */}
          <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to delete this product?</Typography>
              {selectedProduct && (
                <Typography variant="h6" mt={2}>
                  {selectedProduct.productName}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteDialogClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(selectedProduct.id)}
                color="error"
                variant="contained"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
    </div>
  );
};

export default ViewProducts;

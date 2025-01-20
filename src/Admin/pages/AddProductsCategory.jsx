import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import AdminHeader from '../components/Header';
import { addCategory, deleteCategory, editCategory, getCategories } from '../../services/allApi';

const AddProductsCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch categories on load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  // Add or edit category
  const handleAddOrEditCategory = async () => {
    try {
      if (isEditing) {
        // Edit category
        const response = await editCategory({ Category_Names: categoryName }, editId);
        const updatedCategories = categories.map((category, index) =>
          index === editIndex ? response : category
        );
        setCategories(updatedCategories);
        setIsEditing(false);
      } else {
        // Add category
        const response = await addCategory({ Category_Names: categoryName });
        setCategories([...categories, response]);
      }
      setCategoryName('');
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  // Delete category
  const handleDelete = async (categoryId, index) => {
    try {
      await deleteCategory(categoryId);
      const updatedCategories = categories.filter((_, i) => i !== index);
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Edit category
  const handleEdit = (categoryId, index) => {
    setCategoryName(categories[index].Category_Names);
    setEditIndex(index);
    setEditId(categoryId);
    setIsEditing(true);
  };

  return (
    <div>
      <AdminHeader />
      <Box sx={{ width: '90%', margin: '0 auto', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add Products Category
        </Typography>

        {/* Add/Edit Category Form */}
        <Box sx={{ mb: 4 }}>
          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={categoryName}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddOrEditCategory}
            disabled={!categoryName}
          >
            {isEditing ? 'Update Category' : 'Add Category'}
          </Button>
        </Box>

        {/* Categories Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Category Name</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.Category_Names}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEdit(category._id, index)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(category._id, index)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No Categories Added
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

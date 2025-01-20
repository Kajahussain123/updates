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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import AdminHeader from '../components/Header';
import { addTestimonials, deleteTestimonials, getTestimonials } from '../../services/allApi';

const AddTestimonial = () => {
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [description, setDescription] = useState('');
  const [Rating, setRating] = useState('');
  const [testimonials, setTestimonials] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getTestimonials();
        if (response && response.allTestimonial.length > 0) {
          setTestimonials(response.allTestimonial);
        } else {
          console.error('No testimonials found in the response');
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  // Handle input changes
  const handleInputChange = (e, field) => {
    if (field === 'name') setName(e.target.value);
    if (field === 'service') setService(e.target.value);
    if (field === 'description') setDescription(e.target.value);
    if (field === 'Rating') setRating(e.target.value);
  };

  // Add or Edit Testimonial
  const handleAddOrEditTestimonial = async () => {
    const newTestimonial = { Name: name, service, description, Rating };

    if (isEditing) {
      const updatedTestimonials = testimonials.map((testimonial, index) =>
        index === editIndex ? { ...testimonial, ...newTestimonial } : testimonial
      );
      try {
        setTestimonials(updatedTestimonials);
        setIsEditing(false);
        setEditIndex(null);
      } catch (error) {
        console.error('Failed to update testimonial:', error);
      }
    } else {
      try {
        const response = await addTestimonials(newTestimonial);
        setTestimonials([...testimonials, response]);
      } catch (error) {
        console.error('Failed to add testimonial:', error);
      }
    }

    setName('');
    setService('');
    setDescription('');
    setRating('');
  };

  // Handle delete confirmation
  const handleDeleteConfirmation = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteTestimonials(deleteId);
      if (response.message === 'Testimonial Deleted Successfully') {
        // Remove the deleted testimonial from the state immediately
        setTestimonials(testimonials.filter((testimonial) => testimonial._id !== deleteId));
        setOpenDeleteDialog(false); // Close the confirmation dialog
      } else {
        console.error('Failed to delete testimonial:', response.message);
      }
    } catch (error) {
      console.error('Error while deleting testimonial:', error);
    }
  };

  // Handle edit
  const handleEdit = (index) => {
    const testimonial = testimonials[index];
    setName(testimonial.Name);
    setService(testimonial.service);
    setDescription(testimonial.description);
    setRating(testimonial.Rating);
    setEditIndex(index);
    setIsEditing(true);
  };

  return (
    <div>
      <AdminHeader />
      <Box sx={{ width: '90%', margin: '0 auto', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add Testimonial
        </Typography>

        {/* Add/Edit Testimonial Form */}
        <Box sx={{ mb: 4 }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={name}
            onChange={(e) => handleInputChange(e, 'name')}
          />
          <TextField
            label="Service"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={service}
            onChange={(e) => handleInputChange(e, 'service')}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={description}
            onChange={(e) => handleInputChange(e, 'description')}
          />
          <TextField
            label="Rating (1-5)"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            type="number"
            value={Rating}
            onChange={(e) => handleInputChange(e, 'Rating')}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddOrEditTestimonial}
            disabled={!name || !service || !description || !Rating}
          >
            {isEditing ? 'Update Testimonial' : 'Add Testimonial'}
          </Button>
        </Box>

        {/* Testimonials Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Service</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Rating</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testimonials.length > 0 ? (
                testimonials.map((testimonial, index) => (
                  <TableRow key={testimonial._id}>
                    <TableCell>{testimonial.Name}</TableCell>
                    <TableCell>{testimonial.service}</TableCell>
                    <TableCell>{testimonial.description}</TableCell>
                    <TableCell>{testimonial.Rating}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEdit(index)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteConfirmation(testimonial._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No testimonials added
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Testimonial</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this testimonial?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTestimonial;

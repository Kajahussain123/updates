import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { Box, Button, Grid, MenuItem, TextField, Typography, LinearProgress } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import Header from '../../components/Header';
import { submitACService } from '../../services/allApi';

export default function ContactAC() {
  const navigate = useNavigate();
  const location = useLocation();
  const [contactData, setContactData] = useState({
    ...location.state,
    name: '',
    mobileNumber: '',
    houseName: '',
    state: '',
    district: '',
    pincode: '',
  });

  const handleInputChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await submitACService(contactData); 
      toast.success('Data submitted successfully!');
      navigate('/ac-submission'); 
    } catch (error) {
      toast.error('Failed to submit data. Please try again.');
    }
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header />
      <ToastContainer />
      <Box sx={{ width: '100%', maxWidth: 800, margin: '0 auto', padding: 4, marginTop: 4, boxSizing: 'border-box' }}>
      <LinearProgress
          variant="determinate"
          value={50}
          sx={{ mb: 3, height: 8, borderRadius: 5, backgroundColor: '#E0E0E0', '& .MuiLinearProgress-bar': { backgroundColor: '#7AA37A' }}}
        />
        <Typography variant="h5" sx={{ mb: 2 }}>
          We would appreciate it if you could share your contact details with us
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" name="name" fullWidth variant="outlined" onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Mobile number" name="mobileNumber" fullWidth variant="outlined" onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Address" name="houseName" fullWidth variant="outlined" onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="State"
              name="state"
              fullWidth
              select
              variant="outlined"
              onChange={handleInputChange}
            >
              <MenuItem value="">Select State</MenuItem>
              <MenuItem value="State1">State1</MenuItem>
              <MenuItem value="State2">State2</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="District"
              name="district"
              fullWidth
              select
              variant="outlined"
              onChange={handleInputChange}
            >
              <MenuItem value="">Select District</MenuItem>
              <MenuItem value="District1">District1</MenuItem>
              <MenuItem value="District2">District2</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="PIN Code" name="pincode" fullWidth variant="outlined" onChange={handleInputChange} />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, backgroundColor: '#7AA37A' }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, TextField, Typography, LinearProgress, MenuItem } from '@mui/material';
import Header from '../../components/Header';
import { fetchCCTVProductDetails } from '../../services/allApi';
import Loader from '../../components/Loader'; 

export default function CCTVForm() {
  const [formData, setFormData] = useState({ brand: '', service: '', description: '' });
  const [brands, setBrands] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchCCTVProductDetails()
      .then((data) => {
        setBrands(data.brands);
        setServices(data.services);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching services and brands:', error);
        setLoading(false); 
      });
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    navigate('/contact-cctv', { state: formData });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header />
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          margin: '0 auto',
          padding: 2,
          mt: 4,
          boxSizing: 'border-box', 
        }}
      >
        <LinearProgress
          variant="determinate"
          value={30}
          sx={{
            mb: 3,
            height: 8,
            borderRadius: 5,
            backgroundColor: '#E0E0E0',
            '& .MuiLinearProgress-bar': { backgroundColor: '#7AA37A' },
          }}
        />
        <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
          First we make sure which type of service you need
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Select Service"
              name="service"
              fullWidth
              select
              variant="outlined"
              onChange={handleInputChange}
              value={formData.service}
            >
              {services.map((service) => (
                <MenuItem key={service._id} value={service.serviceName}>
                  {service.serviceName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Select CCTV"
              name="brand"
              fullWidth
              select
              variant="outlined"
              onChange={handleInputChange}
              value={formData.brand}
            >
              {brands.map((brand) => (
                <MenuItem key={brand._id} value={brand.brandName}>
                  {brand.brandName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Write about your Needs"
              name="description"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              onChange={handleInputChange}
              value={formData.description}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, backgroundColor: '#7AA37A', color: '#fff' }}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Box>
    </div>
  );
}

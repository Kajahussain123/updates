import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Grid, TextField, Typography, LinearProgress, IconButton } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import Header from '../../components/Header';

export default function ContactDetailsForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialState = location.state || {
    model_name: '',
    company_name: '',
    mobile_img: null,
  };
  

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (location.state) {
      setFormData(location.state);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
        setFormData({ ...formData, mobile_img: e.target.files[0] });
    } else {
        setFormData({ ...formData, mobile_img: null });
    }
};


  const handleContinue = () => {
    if (!formData.model_name || !formData.company_name || !formData.mobile_img) {
      alert('Please fill in all fields and upload an image.');
      return;
    }
  
    // Convert file to Base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result; // Base64 encoded string
      const dataToPass = {
        model_name: formData.model_name,
        company_name: formData.company_name,
        mobile_img: base64Image, // Pass the Base64 string
      };
  
      navigate('/contact', { state: dataToPass });
    };
  
    reader.readAsDataURL(formData.mobile_img);
  };
  
  

  return (
    <div>
      <Header />
      <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto', padding: 4, marginTop: 4 }}>
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
        <Typography variant="h4" sx={{ mb: 2 }}>
          I need to understand your mobile phone first
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Model name"
              name="model_name"
              fullWidth
              variant="outlined"
              value={formData.model_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Company name"
              name="company_name"
              fullWidth
              variant="outlined"
              value={formData.company_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label="Upload your Mobile phone Photo"
                fullWidth
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <IconButton component="label">
                      <CloudUpload />
                      <input type="file" hidden onChange={handleFileChange} />
                    </IconButton>
                  ),
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, backgroundColor: '#7AA37A' }}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Box>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Grid, MenuItem, TextField, Typography, LinearProgress } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import Header from '../../components/Header';
import { submitCCTVService } from '../../services/allApi';

const statesAndDistricts = {
  "Kerala": [
    "Alappuzha", 
    "Ernakulam", 
    "Idukki", 
    "Kannur", 
    "Kasaragod", 
    "Kollam", 
    "Kottayam", 
    "Kozhikode", 
    "Malappuram", 
    "Palakkad", 
    "Pathanamthitta", 
    "Thiruvananthapuram", 
    "Thrissur", 
    "Wayanad"
  ]
};

export default function ContactCCTV() {
  const location = useLocation();
  const navigate = useNavigate();
  const [contactData, setContactData] = useState({
    ...location.state,
    name: '',
    mobileNumber: '',
    houseName: '',
    state: '',
    district: '',
    pincode: '',
  });

  const [districts, setDistricts] = useState([]); // To store districts based on the selected state
  const [errors, setErrors] = useState({
    mobileNumber: '',
    pincode: ''
  });

  useEffect(() => {
    // When the state changes, update the districts dropdown
    if (contactData.state && statesAndDistricts[contactData.state]) {
      setDistricts(statesAndDistricts[contactData.state]);
    } else {
      setDistricts([]); // Clear districts if no state is selected
    }
  }, [contactData.state]);

  const handleInputChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const validateMobileNumber = (mobileNumber) => {
    const mobileRegex = /^\d{10}$/;
    if (!mobileNumber) return 'Mobile number is required.';
    if (!mobileRegex.test(mobileNumber)) return 'Mobile number must be 10 digits.';
    return '';
  };

  const validatePincode = (pincode) => {
    const pincodeRegex = /^\d{6}$/;
    if (!pincode) return 'PIN code is required.';
    if (!pincodeRegex.test(pincode)) return 'PIN code must be 6 digits.';
    return '';
  };

  const handleSubmit = async () => {
    const mobileNumberError = validateMobileNumber(contactData.mobileNumber);
    const pincodeError = validatePincode(contactData.pincode);

    if (mobileNumberError || pincodeError) {
      setErrors({
        mobileNumber: mobileNumberError,
        pincode: pincodeError
      });
      return; // Don't proceed with submission if there's an error
    }

    try {
      await submitCCTVService(contactData);
      toast.success('Data submitted successfully!');
      navigate('/cctv-submission');
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
            <TextField 
              label="Name" 
              name="name" 
              fullWidth 
              variant="outlined" 
              onChange={handleInputChange} 
              value={contactData.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Mobile number" 
              name="mobileNumber" 
              fullWidth 
              variant="outlined" 
              onChange={handleInputChange} 
              value={contactData.mobileNumber} 
              error={!!errors.mobileNumber}
              helperText={errors.mobileNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Address" 
              name="houseName" 
              fullWidth 
              variant="outlined" 
              onChange={handleInputChange} 
              value={contactData.houseName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="State" 
              name="state" 
              fullWidth 
              select 
              variant="outlined" 
              onChange={handleInputChange} 
              value={contactData.state}
            >
              {Object.keys(statesAndDistricts).map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
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
              value={contactData.district}
              disabled={districts.length === 0} // Disable if no districts available
            >
              {districts.length > 0 ? (
                districts.map((district, index) => (
                  <MenuItem key={index} value={district}>
                    {district}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">Select State First</MenuItem>
              )}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="PIN Code" 
              name="pincode" 
              fullWidth 
              variant="outlined" 
              onChange={handleInputChange} 
              value={contactData.pincode} 
              error={!!errors.pincode}
              helperText={errors.pincode}
            />
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

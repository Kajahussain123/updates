import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Grid, MenuItem, TextField, Typography, LinearProgress, IconButton } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header';
import DeleteIcon from '@mui/icons-material/Delete';
import Loader from '../../components/Loader';
import { submitMobileService } from '../../services/allApi';

export default function ContactDetailsForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialState = location.state || {
    name: '',
    mobileNumber: '',
    houseName: '',
    state: '',
    description: '',
    district: '',
    pincode: '',
    mobileModel: '',
    mobileCompany: '',
    mobile_img: null,
  };

  const [formData, setFormData] = useState(initialState);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStates(['Kerala']);
      setDistricts(['Alappuzha', 'Ernakulam','Idukki','Kannur','Kasaragod','Kollam','Kottayam','Kozhikode','Malappuram','Palakkad','Pathanamthitta','Thiruvananthapuram','Thrissur','Wayanad']);
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, mobile_img: file });
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setFormData({ ...formData, mobile_img: null });
    setPreviewImage(null);
  };

  const handleSubmit = async () => {
    const { mobileModel, mobileCompany, description, name, mobileNumber, houseName, state, district, pincode, mobile_img } = formData;

    if (!mobileModel || !mobileCompany || !name || !mobileNumber || !state || !district || !pincode) {
      toast.error('Please fill all required fields');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('model_name', mobileModel);
    formDataToSend.append('company_name', mobileCompany);
    formDataToSend.append('description', description);
    formDataToSend.append('name', name);
    formDataToSend.append('mobileNumber', mobileNumber);
    formDataToSend.append('houseName', houseName);
    formDataToSend.append('state', state);
    formDataToSend.append('district', district);
    formDataToSend.append('pincode', pincode);
    if (mobile_img) formDataToSend.append('mobile_img', mobile_img);

    try {
      await submitMobileService(formDataToSend);
      toast.success('Mobile service submitted successfully');
      navigate('/submission');
    } catch (error) {
      toast.error('Failed to submit mobile service');
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Header />
      <ToastContainer />
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%', 
          margin: '0 auto',
          padding: 4,
          marginTop: 4,
          boxSizing: 'border-box',
        }}
      >
        <LinearProgress
          variant="determinate"
          value={50}
          sx={{
            mb: 3,
            height: 8,
            borderRadius: 5,
            backgroundColor: '#E0E0E0',
            '& .MuiLinearProgress-bar': { backgroundColor: '#7AA37A' },
          }}
        />

        <Typography variant="h5" sx={{ mb: 2 }}>
          I need to understand your mobile phone first
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Mobile Model"
              name="mobileModel"
              fullWidth
              variant="outlined"
              value={formData.mobileModel}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Mobile Company"
              name="mobileCompany"
              fullWidth
              variant="outlined"
              value={formData.mobileCompany}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              name="description"
              fullWidth
              variant="outlined"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Upload Mobile Image
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button variant="contained" component="label" sx={{ backgroundColor: '#7AA37A' }}>
                Upload
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
              {previewImage && (
                <Box sx={{ position: 'relative', width: 100, height: 100 }}>
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 5,
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={handleImageDelete}
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: -10,
                      backgroundColor: 'white',
                      boxShadow: 1,
                      '&:hover': { backgroundColor: '#f5f5f5' },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          We would appreciate it if you could share your contact details with us
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Mobile Number"
              name="mobileNumber"
              fullWidth
              variant="outlined"
              value={formData.mobileNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              name="houseName"
              fullWidth
              variant="outlined"
              value={formData.houseName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="State"
              name="state"
              fullWidth
              select
              variant="outlined"
              value={formData.state}
              onChange={handleInputChange}
            >
              <MenuItem value="">Select State</MenuItem>
              {states.map((state, index) => (
                <MenuItem key={index} value={state}>
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
              value={formData.district}
              onChange={handleInputChange}
            >
              <MenuItem value="">Select District</MenuItem>
              {districts.map((district, index) => (
                <MenuItem key={index} value={district}>
                  {district}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Pincode"
              name="pincode"
              fullWidth
              variant="outlined"
              value={formData.pincode}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          
          sx={{ mt: 3 , backgroundColor:"#7AA37A",color:"white" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}

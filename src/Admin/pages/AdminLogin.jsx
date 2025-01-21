import React, { useState } from 'react';
import { TextField, Button, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';
import { adminLogin } from '../../services/allApi';

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reqBody = {
      email,
      password,
    };

    try {
      const response = await adminLogin(reqBody); 
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        window.location.href = '/admin-overview'; 
      } else {
        setError(response.message || 'Invalid email or password'); // Fallback message
      }
    } catch (error) {
      // Handle different types of errors
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Invalid email or password');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f6fa',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: { xs: '100%', md: '60%' },
          boxShadow: 3,
          borderRadius: '10px',
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#ffffff',
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center',
            alignItems: 'center',
            p: 4,
          }}
        >
          <img
            src="https://i.postimg.cc/9M4B3t14/6343825.jpg" 
            alt="Login illustration"
            style={{ width: '100%', maxWidth: '350px' }}
          />
        </Box>

        <Box sx={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
            Admin Login
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
              {error}
            </Typography>
          )}

          <TextField
            fullWidth
            placeholder="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2, backgroundColor: '#F6F6F9', borderRadius: '5px' }}
          />

          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2, backgroundColor: '#F6F6F9', borderRadius: '5px' }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{
              mb: 2,
              backgroundColor: '#6C63FF',
              fontWeight: 'bold',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              '&:hover': {
                backgroundColor: '#5a53e2',
              },
            }}
          >
            LOGIN
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;

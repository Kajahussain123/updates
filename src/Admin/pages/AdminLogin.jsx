import React from 'react';
import { TextField, Button, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';

function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

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
        {/* Left Section with Image */}
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
            src="https://i.postimg.cc/9M4B3t14/6343825.jpg" // Replace this with your image URL
            alt="Login illustration"
            style={{ width: '100%', maxWidth: '350px' }}
          />
        </Box>

        {/* Right Section with Form */}
        <Box sx={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
            Admin Login
          </Typography>

          {/* Email Input */}
          <TextField
            fullWidth
            placeholder='Username'
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2, backgroundColor: '#F6F6F9', borderRadius: '5px' }}
          />

          {/* Password Input */}
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
          placeholder='Password'
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
          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
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

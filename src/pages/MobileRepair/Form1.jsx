import React from 'react';
import { Box, Button, Grid, TextField, Typography, LinearProgress, IconButton } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import Header from '../../components/Header';

export default function MobilePhoneForm() {
  return (
    <div>
      <Header />
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          margin: '0 auto',
          padding: 4, // Added more padding
          marginTop: 4, // Added marginTop for spacing from top
        }}
      >
        {/* Progress bar */}
        <LinearProgress
          variant="determinate"
          value={30}
          sx={{
            mb: 3,
            height: 8,
            borderRadius: 5,
            backgroundColor: '#E0E0E0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#7AA37A', // Changed the progress line color to green
            },
          }}
        />

        {/* Title */}
        <Typography variant="h4" sx={{ mb: 2 }}>
          I need to understand your mobile phone first
        </Typography>

        {/* Small heading before input fields */}
        <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem' }}>
          What is your mobile phone?
        </Typography>

        {/* Form */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Model name" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Company name" fullWidth variant="outlined" />
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
                      <input type="file" hidden />
                    </IconButton>
                  ),
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Continue button */}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, backgroundColor: '#7AA37A' }} // Same green color as progress bar
        >
          Continue
        </Button>
      </Box>
    </div>
  );
}

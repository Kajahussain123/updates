import React from 'react';
import { Box, Button, Grid, MenuItem, TextField, Typography, LinearProgress } from '@mui/material';
import Header from '../../components/Header';

export default function ContactAC() {
  return (
    <div>
        <Header></Header>
        <Box
          sx={{
            width: '100%',
            maxWidth: 800,
            margin: '0 auto',
            padding: 4, // Added more padding for better spacing
            marginTop: 4, // Added marginTop for better spacing from the top
          }}
        >
          {/* Progress bar */}
          <LinearProgress
            variant="determinate"
            value={50}
            sx={{
              mb: 3,
              height: 8,
              borderRadius: 5,
              backgroundColor: '#E0E0E0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#7AA37A', // Green color for the progress bar
              },
            }}
          />
    
          {/* Title */}
          <Typography variant="h5" sx={{ mb: 2 }}>
            We would appreciate it if you could share your contact details with us
          </Typography>
    
          {/* Form */}
          <Grid container spacing={3}> {/* Increased spacing for better layout */}
            {/* Name and Mobile number */}
            <Grid item xs={12} sm={6}>
              <TextField label="Name" fullWidth variant="outlined"  />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Mobile number" fullWidth variant="outlined"  />
            </Grid>
    
            {/* House name and State */}
            <Grid item xs={12} sm={6}>
              <TextField label="House name" fullWidth variant="outlined"  />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                fullWidth
                select
                variant="outlined"
                defaultValue=""
              >
                {/* Placeholder options */}
                <MenuItem value="">Select State</MenuItem>
                <MenuItem value="State1">State1</MenuItem>
                <MenuItem value="State2">State2</MenuItem>
              </TextField>
            </Grid>
    
            {/* District and PIN Code */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="District"
                fullWidth
                select
                variant="outlined"
                defaultValue=""
              >
                {/* Placeholder options */}
                <MenuItem value="">Select District</MenuItem>
                <MenuItem value="District1">District1</MenuItem>
                <MenuItem value="District2">District2</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="PIN Code" fullWidth variant="outlined"  />
            </Grid>
          </Grid>
    
          {/* Submit Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: '#7AA37A', // Green color for the button
            }}
          >
            Submit
          </Button>
        </Box>
    </div>
  );
}

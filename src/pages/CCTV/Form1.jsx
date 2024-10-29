import React from 'react';
import { Box, Button, Grid, TextField, Typography, LinearProgress, MenuItem } from '@mui/material';
import Header from '../../components/Header';

export default function CCTVForm() {
  return (
   <div>
    <Header></Header>
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
                backgroundColor: '#7AA37A', // Green progress bar
              },
            }}
          />
    
          {/* Title */}
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
            First we make sure which type of service you need
          </Typography>
    
          {/* Form */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Select Service"
                fullWidth
                select
                variant="outlined"
              >
                <MenuItem value="Service1">Service 1</MenuItem>
                <MenuItem value="Service2">Service 2</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Select CCTV"
                fullWidth
                select
                variant="outlined"
              >
                <MenuItem value="CCTV1">CCTV 1</MenuItem>
                <MenuItem value="CCTV2">CCTV 2</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Write about your Needs"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
    
          {/* Continue button */}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3, backgroundColor: '#7AA37A', color: '#fff', padding: '10px 0' }}
          >
            Continue
          </Button>
        </Box>
   </div>
  );
}

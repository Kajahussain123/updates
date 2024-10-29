import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Header from '../../components/Header';

export default function ACSubmission() {
  return (
<div>
    <Header></Header>
        <Box sx={{ textAlign: 'center', padding: 4 }}>
          {/* Success Message */}
          <Typography variant="h5" sx={{ color: '#FF5C5C', mb: 2 }}>
            Your Request Has Been Submitted.
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Our Team will Catch you Soon!
          </Typography>
    
          {/* Success Image */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <img 
              src="https://i.ibb.co/y03FfKH/Young-woman-pointing-at-checkmark.png" 
              alt="Success" 
              style={{ width: '200px' }} 
            />
          </Box>
    
          {/* Back to Home Button */}
          <Button 
            variant="contained" 
            sx={{ backgroundColor: '#7AA37A', padding: '10px 40px' }}
            onClick={() => window.location.href = '/'}  // Navigates to home
          >
            Back to Home
          </Button>
        </Box>
</div>
  );
}

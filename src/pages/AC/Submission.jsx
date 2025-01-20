import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Header from '../../components/Header';
import Loader from '../../components/Loader';

export default function ACSubmission() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 2000);
  }, []);

  if (loading) {
    return <Loader />; 
  }

  return (
    <div>
      <Header />
      <Box sx={{ textAlign: 'center', padding: 4 }}>
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
          onClick={() => (window.location.href = '/')} 
        >
          Back to Home
        </Button>
      </Box>
    </div>
  );
}

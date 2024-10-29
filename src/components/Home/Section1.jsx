import React, { useEffect } from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import AOS from 'aos';
import 'aos/dist/aos.css';

const services = [
  {
    title: 'Fix your mobile at your',
    highlighted: 'Home',
    icon: '📱',
    highlightColor: '#ff7273',
  },
  {
    title: 'Find top-quality',
    highlighted: 'Mobile Accessories',
    icon: '🔌',
    highlightColor: '#94c6b1',
  },
  {
    title: 'Secure your space with',
    highlighted: 'CCTV',
    icon: '📷',
    highlightColor: '#95d6a4',
  },
  {
    title: 'Air Conditioner repair, and installation',
    highlighted: 'Air Conditioner',
    icon: '❄️',
    highlightColor: '#ff8183',
  },
];

// Custom styles for the highlighted text
const HighlightedText = styled('span')(({ color }) => ({
  color: color,
}));

// Service card component with hover effect
const ServiceCard = ({ title, highlighted, icon, highlightColor }) => (
  <Paper
    elevation={0}
    style={{
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: '12px',
      border: '1px solid #e0e0e0',
      transition: 'transform 0.3s, background-color 0.3s',
    }}
    data-aos="fade-up"
    // Hover effect for the card
    sx={{
      '&:hover': {
        backgroundColor: '#f7f7f7', // Light background color on hover
        transform: 'scale(1.05)', // Slight scaling effect
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', // Subtle shadow effect
      },
    }}
  >
    <Typography variant="body1" component="div">
      {title}{' '}
      <HighlightedText color={highlightColor}>{highlighted}</HighlightedText>
    </Typography>
    <Typography variant="h3" component="div">
      {icon}
    </Typography>
  </Paper>
);

const ServiceHub = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Box sx={{ padding: '40px' }}>
      {/* Main Heading aligned to the left */}
      <Typography
        variant="h3"
        component="h1"
        sx={{ fontWeight: 'bold', textAlign: 'left' }}
        data-aos="fade-down"
      >
        <span style={{ color: '#ff7273' }}>Your Trusted</span> <br />
        Tech Repair & Service Hub
      </Typography>

      {/* Service Grid */}
      <Grid container spacing={4} sx={{ marginTop: '40px' }}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <ServiceCard
              title={service.title}
              highlighted={service.highlighted}
              icon={service.icon}
              highlightColor={service.highlightColor}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ServiceHub;

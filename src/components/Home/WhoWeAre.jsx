import React, { useEffect } from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import AOS from 'aos';
import 'aos/dist/aos.css';

const technicians = [
  {
    title: 'Professional technicians',
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    icon: '👷‍♂️', // Placeholder for the icon
  },
  {
    title: 'Professional technicians',
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    icon: '👷‍♀️', // Placeholder for the icon
  },
  {
    title: 'Professional technicians',
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    icon: '👨‍🔧', // Placeholder for the icon
  },
  {
    title: 'Professional technicians',
    description:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    icon: '👩‍🔧', // Placeholder for the icon
  },
];

// Custom styles for the cards with hover effect
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '20px',
  borderRadius: '8px',
  border: '2px solid #FFD600', // Yellow border for all cards
  marginBottom: '16px',
  textAlign: 'left', // Align text to the left
  transition: 'transform 0.3s, background-color 0.3s', // Smooth hover transition

  // Hover effect
  '&:hover': {
    backgroundColor: '#f9f9f9', // Lighten background on hover
    transform: 'scale(1.05)', // Slight scaling effect
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', // Subtle shadow effect
  },
}));

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Box sx={{ padding: '40px' }}>
      <Grid container spacing={4}>
        {/* Left Side: Who We Are Section */}
        <Grid item xs={12} md={7} data-aos="fade-down">
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
            Who we are
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ marginTop: '16px', marginBottom: '24px' }}
          >
            Contrary to popular belief, Lorem Ipsum is not simply random text. It
            has roots in a piece of classical Latin literature from 45 BC, making
            it over 2000 years old. Richard McClintock, a Latin professor at
            Hampden-Sydney College in Virginia, looked up one of the more obscure
            Latin words, consectetur, from a Lorem Ipsum passage, and going
            through the cites of the word in classical literature, discovered the
            undoubtable source.
          </Typography>
          {/* Image */}
          <img
            src="https://i.ibb.co/0jwRczg/image.png" // Replace with actual image
            alt="About us"
            style={{ width: '100%', borderRadius: '8px' }}
            data-aos="fade-up"
          />
        </Grid>

        {/* Right Side: Technicians Cards */}
        <Grid item xs={12} md={5}>
          {technicians.map((technician, index) => (
            <StyledPaper key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <Box sx={{ marginBottom: '8px' }}>
                <Typography variant="h3" component="div" sx={{ fontSize: '40px' }}>
                  {technician.icon}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                  {technician.title}
                </Typography>
                <Typography variant="body2" component="p" sx={{ marginTop: '8px' }}>
                  {technician.description}
                </Typography>
              </Box>
            </StyledPaper>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;

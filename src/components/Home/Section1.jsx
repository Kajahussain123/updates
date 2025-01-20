import React, { useEffect } from 'react';
import { Box, Grid, Typography, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

// Sample services data
const services = [
  {
    title: 'Secure your space with',
    highlighted: 'CCTV',
    icon: 'https://i.postimg.cc/G2dg9kDs/06june22-cctv-icon-02-removebg-preview.png',
    highlightColor: '#95d6a4',
    link: '/cctv-form',
  },
  {
    title: 'Pick your mobile at your',
    highlighted: 'Home for Repair',
    icon: 'https://i.postimg.cc/K8CV8hr2/rb-3783.png',
    highlightColor: '#ff7273',
    link: '/contact',
  },
  {
    title: 'Air Conditioner repair, and installation',
    highlighted: 'Air Conditioner',
    icon: 'https://i.postimg.cc/MG7xhmxc/dc2589f2-1e63-435f-b1af-80f4e694d8e6-removebg-preview.png',
    highlightColor: '#ff8183',
    link: '/ac-form',
  },
  
  {
    title: 'Find top-quality',
    highlighted: 'Mobile Accessories',
    icon: 'https://i.ibb.co/HY8D5fz/image-26.png',
    highlightColor: '#94c6b1',
    link: '/products',
  },
];

const HighlightedText = styled('span')(({ color }) => ({
  color: color,
}));

const ServiceCard = ({ title, highlighted, icon, highlightColor, link, disabled }) => (
  <Link to={disabled ? "#" : link} style={{ textDecoration: 'none', pointerEvents: disabled ? 'none' : 'auto' }}>
    <Paper
      elevation={0}
      style={{
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '12px',
        border: '2px solid black',
        transition: 'transform 0.3s, background-color 0.3s',
        backgroundColor: disabled ? 'rgba(200, 200, 200, 0.5)' : 'rgba(227, 226, 225, 0.5)',
        position: 'relative',
        opacity: disabled ? 0.7 : 1,
      }}
      data-aos="fade-up"
      sx={{
        '&:hover': disabled
          ? {}
          : {
            backgroundColor: '#f7f7f7', // Light background color on hover
            transform: 'scale(1.05)', // Slight scaling effect
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', // Subtle shadow effect
          },
      }}
    >
      {/* Image positioned outside the box */}
      <Box
        component="img"
        src={icon}
        alt="service-icon"
        sx={{
          position: 'absolute',
          top: '-20px',
          left: '90%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: 'auto',
        }}/>
      <Typography variant="body1" component="div" sx={{
        fontFamily: "'Montserrat', sans-serif",
        fontOpticalSizing: 'auto',
        fontWeight: 700,
        fontStyle: 'normal',
        fontVariationSettings: "'wdth' 100",
        textAlign: 'left',
      }}>
        <b>{title}{' '}</b>
        <HighlightedText color="red">
          <b>{highlighted}</b>
        </HighlightedText>
      </Typography>

      {disabled && (
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            color: 'red',
            fontWeight: 'bold',
          }}
        >
          Coming Soon
        </Typography>
      )}
    </Paper>
  </Link>
);

const ServiceHub = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Box
      sx={{
        padding: '40px',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Main Heading aligned to the left */}
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontFamily: 'Playfair Display, serif',
          fontWeight: 700,
          textAlign: 'left',
        }}
        data-aos="fade-down"
      >
        <span style={{ color: '#ff7273' }}>Your Trusted</span> <br />
        <span> Tech Repair & Service Hub</span>
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
              link={service.link}
              disabled={index > 0}
              />
          </Grid>
        ))}
      </Grid>

      {/* View More Button */}
      <Box sx={{ marginTop: '40px', textAlign: 'center' }}>
        <Link to="/viewmore">
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              padding: '10px 30px',
              borderRadius: '25px',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            View More
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default ServiceHub;

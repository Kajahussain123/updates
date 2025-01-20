import React, { useEffect } from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import AOS from 'aos';
import 'aos/dist/aos.css';
import acimage from '../../assets/ac.png'
import cctvimage from '../../assets/cctv.png'
import mobileImg from '../../assets/mobile.png'
import backgroundImg from '../../assets/updates solution.webp'

const technicians = [
  {
    title: 'AC Repair & Installation',
    description:
      'Our technicians are skilled in providing efficient and reliable AC repair and installation services for all brands and models.',
    icon: acimage,
  },
  {
    title: 'CCTV Installation & Repair',
    description:
      'We specialize in the installation, repair, and maintenance of CCTV systems, ensuring top-notch security for your home or business.',
    icon: cctvimage
  },
  {
    title: 'Mobile Repair Services',
    description:
      'Our experts offer fast and reliable mobile repair services, fixing broken screens, battery issues, and more for all mobile brands.',
    icon: mobileImg
  },
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '20px',
  borderRadius: '8px',
  border: '2px solid #FFD600',
  marginBottom: '16px',
  textAlign: 'left',
  transition: 'transform 0.3s, background-color 0.3s',
  '&:hover': {
    backgroundColor: '#f9f9f9',
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
  },
}));

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Box sx={{ padding: '40px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7} data-aos="fade-down">
          <Typography variant="h4" component="h2" sx={{
            fontWeight: 400,
            mb: 1,
            fontFamily: "'Montserrat', sans-serif",
          }}>
            <b>Who We Are</b>
          </Typography>
          <Typography
            variant="body1"
            component="p"

            sx={{
              fontWeight: 400,
              mb: 1,
              fontFamily: "'Montserrat', sans-serif",
              marginTop: '16px', marginBottom: '24px'
            }}
          >
            We are a dedicated team offering high-quality services in AC repair and installation, CCTV system installation and repair, and mobile phone repairs. With years of experience, we provide reliable and efficient services tailored to your needs.
          </Typography>
          {/* Image */}
          <img
            // src="https://i.ibb.co/0jwRczg/image.png"
            src={backgroundImg}
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
                {/* Technician Image */}
                <img
                  src={technician.icon}
                  alt={technician.title}
                  style={{ width: '50px', height: '50px', marginBottom: '10px' }}
                />
              </Box>
              <Box>
                <Typography variant="h6" component="h3"
                  sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    fontFamily: "'Montserrat', sans-serif",
                  }}>
                 <b> {technician.title}</b>
                </Typography>
                <Typography variant="body2" component="p"
                 sx={{
                  fontWeight: 400,
                  mb: 1,
                  fontFamily: "'Montserrat', sans-serif",
                  marginTop: '8px'
                }}>
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

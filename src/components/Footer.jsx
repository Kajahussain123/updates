import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Link,
} from '@mui/material';
import { Facebook, Instagram, YouTube, Twitter, Send } from '@mui/icons-material';
import logo from '../assets/updates_logo.png'

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#000', color: '#fff', padding: '50px 0', overflowX: 'hidden' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
              Stay Connected With Us
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="name@gmail.com"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        backgroundColor: '#333',
                        color: '#fff',
                        borderRadius: '50%',
                        padding: '10px',
                      }}
                    >
                      <Send />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: '#333',
                  borderRadius: '5px',
                  color: '#fff',
                },
              }}
              sx={{
                input: { color: '#fff' },
                '& fieldset': { border: 'none' },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
              Follow us on
            </Typography>
            <Box sx={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <IconButton href="https://facebook.com" sx={{ color: '#fff' }}>
                <Facebook />
              </IconButton>
              <IconButton href="https://instagram.com" sx={{ color: '#fff' }}>
                <Instagram />
              </IconButton>
              <IconButton href="https://youtube.com" sx={{ color: '#fff' }}>
                <YouTube />
              </IconButton>
              <IconButton href="https://twitter.com" sx={{ color: '#fff' }}>
                <Twitter />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
              Services
            </Typography>
            <Box>
              {['Mobile Fix', 'CCTV', 'AC', 'Accessories','Home Automation','Solar Panels','Idiminnal Reksha Jalakam'].map((service, index) => (
                <Typography key={index}>
                  <Link href="" color="inherit" underline="none">
                    {service}
                  </Link>
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
              Contact Us
            </Typography>
            <Typography>Whatsapp: +91 9207060879</Typography>
            <Typography>Phone: +91 80787 04733</Typography>
            <Typography>Email: updatessolutions9@gmail.com
            </Typography>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box sx={{ marginTop: '40px', textAlign: 'center' }}>
          {/* Logo Section */}
          <Box sx={{ marginBottom: '20px' }}>
            <img
              src={logo}  // Replace with your logo path
              alt="Logo"
              style={{ maxWidth: '300px', display: 'block', margin: '0 auto' }}
            />
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 'bold',
              opacity: 0.1,
              fontSize: { xs: '3rem', sm: '4rem', md: '6rem' },
              wordBreak: 'break-word',
            }}
          >
            Updates Solutions
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

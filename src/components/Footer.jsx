import React from 'react';
import { Box, Container, Grid, Typography, TextField, InputAdornment, IconButton, Link } from '@mui/material';
import { Facebook, Instagram, YouTube, Twitter, Send } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#000', color: '#fff', padding: '50px 0' }}>
      <Container>
        <Grid container spacing={4}>
          {/* Newsletter Subscription */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
              Stay Connect With Us
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="name@gmail.com"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton sx={{ backgroundColor: '#333', color: '#fff', borderRadius: '50%', padding: '10px' }}>
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
              sx={{ input: { color: '#fff' }, '& fieldset': { border: 'none' } }}
            />
          </Grid>

          {/* Social Media Icons */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
              Follow us on
            </Typography>
            <Box sx={{ display: 'flex', gap: '15px' }}>
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

          {/* Services */}
          <Grid item xs={12} md={2} sx={{marginLeft:"30px"}}>
            <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
              Services
            </Typography>
            <Box>
              <Typography>
                <Link href="#" color="inherit" underline="none">
                  Mobile Fix
                </Link>
              </Typography>
              <Typography>
                <Link href="#" color="inherit" underline="none">
                  CCTV
                </Link>
              </Typography>
              <Typography>
                <Link href="#" color="inherit" underline="none">
                  SIM
                </Link>
              </Typography>
              <Typography>
                <Link href="#" color="inherit" underline="none">
                  Accessories
                </Link>
              </Typography>
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
              Contact Us
            </Typography>
            <Typography>Whatsapp: +91 7242732109</Typography>
            <Typography>Email: Info@UpdatesSolution.com</Typography>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box sx={{ marginTop: '40px', textAlign: 'center' }}>
          <Typography variant="h1" sx={{ fontWeight: 'bold', opacity: 0.1, fontSize: '6rem' }}>
            Updates Solutions
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

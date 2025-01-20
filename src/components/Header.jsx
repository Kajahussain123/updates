import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/updates_logo.png'

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (state) => setOpenDrawer(state);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#fff',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          maxWidth: '100%',
          overflowX: 'hidden',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left side: Title */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            component={RouterLink}
            to="/"
          >
            <img
              src={logo} // Replace with the correct logo path
              alt="Updates Solutions Logo"
              style={{
                height: '50px',
                objectFit: 'contain',
              }}
            />
          </Box>

          {/* Right side: Links */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 4 }}>
            <RouterLink
              to="/"
              smooth={true}
              duration={500}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Button
                color="inherit"
                sx={{
                  fontWeight: 400,
                  mb: 1,
                  fontFamily: "'Montserrat', sans-serif",
                  color: '#000',
                  textTransform: 'none',
                }}
              >
                <b>Home</b>
              </Button>
            </RouterLink>
            <ScrollLink to="aboutUs" smooth={true} duration={500}>
              <Button
                color="inherit"
                sx={{
                  fontWeight: 400,
                  mb: 1,
                  fontFamily: "'Montserrat', sans-serif",
                  color: '#000',
                  textTransform: 'none',
                }}
              >
                <b>About Us</b>
              </Button>
            </ScrollLink>

            <ScrollLink to="services" smooth={true} duration={500}>
              <Button
                color="inherit"
                sx={{
                  fontWeight: 400,
                  mb: 1,
                  fontFamily: "'Montserrat', sans-serif",
                  color: '#000',
                  textTransform: 'none',
                }}
              >
                <b>Services</b>
              </Button>
            </ScrollLink>
            <RouterLink to="/contactus" style={{ textDecoration: 'none' }}>
              <Button
                color="inherit"
                sx={{
                  fontWeight: 400,
                  mb: 1,
                  fontFamily: "'Montserrat', sans-serif",
                  color: '#000',
                  textTransform: 'none',
                }}
              >
                <b>Contact Us</b>
              </Button>
            </RouterLink>
          </Box>

          {/* Menu Icon for Mobile */}
          <IconButton
            edge="end"
            sx={{ display: { xs: 'block', sm: 'none' } }}
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon style={{ color: '#000' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Menu */}
      <Drawer anchor="right" open={openDrawer} onClose={() => toggleDrawer(false)}>
        <Box sx={{ width: 250, paddingTop: 2, overflow: 'hidden' }}>
          <List>
            <ListItem button onClick={() => toggleDrawer(false)}>
              <RouterLink to="/" smooth={true} duration={500}>
                <ListItemText primary="Home" />
              </RouterLink>
            </ListItem>
            <ListItem button onClick={() => toggleDrawer(false)}>
              <ScrollLink to="aboutUs" smooth={true} duration={500}>
                <ListItemText primary="About Us" />
              </ScrollLink>
            </ListItem>
            <ListItem button onClick={() => toggleDrawer(false)}>
              <ScrollLink to="services" smooth={true} duration={500}>
                <ListItemText primary="Services" />
              </ScrollLink>
            </ListItem>
            <ListItem button onClick={() => toggleDrawer(false)}>
              <RouterLink to="/contactus" style={{ textDecoration: 'none' }}>
                <ListItemText primary="Contact Us" />
              </RouterLink>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Add margin-top to the content */}
      <Box sx={{ marginTop: '80px', overflowX: 'hidden' }}></Box>
    </>
  );
};

export default Header;

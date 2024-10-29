import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  return (
    <AppBar 
      position="static" 
      style={{ backgroundColor: '#fff', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }} // Added shadow here
    >
      <Toolbar>
        {/* Left side: Title */}
        <Typography variant="h6" component="div" style={{ flexGrow: 1, color: '#000', fontWeight: 'bold' }}>
          Updates Solutions
        </Typography>

        {/* Right side: Hamburger Menu */}
        <IconButton edge="end" color="inherit" aria-label="menu">
          <MenuIcon style={{ color: '#000' }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

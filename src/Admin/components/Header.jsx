import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const AdminHeader = () => {
  // States for managing dropdown menus
  const [anchorElMobileCCTV, setAnchorElMobileCCTV] = useState(null);
  const [anchorElAC, setAnchorElAC] = useState(null);
  const [anchorElProducts, setAnchorElProducts] = useState(null);
  const [anchorElAdmin, setAnchorElAdmin] = useState(null);

  // Handlers for opening/closing menus
  const handleMenuOpen = (event, setAnchor) => setAnchor(event.currentTarget);
  const handleMenuClose = (setAnchor) => setAnchor(null);

  return (
    <AppBar 
      position="static" 
      style={{ backgroundColor: '#fff', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
    >
      <Toolbar>
        {/* Left-aligned title */}
        <Typography variant="h6" component="div" style={{ color: '#000', fontWeight: 'bold', marginRight: 'auto' }}>
          Updates Solutions
        </Typography>

        {/* Centered container for links */}
        <Box 
          display="flex" 
          flexDirection="row" 
          justifyContent="center" 
          alignItems="center" 
          gap={6} // Adds space between links
          style={{ flexGrow: 1 }}
        >
          <Button component={Link} to="/admin-overview" style={{ color: '#000', textTransform: 'none' }}>
            <b>Home</b>
          </Button>
          <Button component={Link} to="/admin-mobile" style={{ color: '#000', textTransform: 'none' }}>
            <b>Mobile</b>
          </Button>

          <Button
            style={{ color: '#000', textTransform: 'none' }}
            onClick={(e) => handleMenuOpen(e, setAnchorElMobileCCTV)}
          >
             <b>CCTV</b>
          </Button>
          <Menu
            anchorEl={anchorElMobileCCTV}
            open={Boolean(anchorElMobileCCTV)}
            onClose={() => handleMenuClose(setAnchorElMobileCCTV)}
          >
            <MenuItem component={Link} to="/admin-cctv" onClick={() => handleMenuClose(setAnchorElMobileCCTV)}>View Orders</MenuItem>
            <MenuItem component={Link} to="/admin-cctv-add" onClick={() => handleMenuClose(setAnchorElMobileCCTV)}>Add Brands</MenuItem>
            <MenuItem component={Link} to="/admin-cctv-services" onClick={() => handleMenuClose(setAnchorElMobileCCTV)}>Add Services</MenuItem>
          </Menu>

          <Button
            style={{ color: '#000', textTransform: 'none' }}
            onClick={(e) => handleMenuOpen(e, setAnchorElAC)}
          >
            <b>AC</b>
          </Button>
          <Menu
            anchorEl={anchorElAC}
            open={Boolean(anchorElAC)}
            onClose={() => handleMenuClose(setAnchorElAC)}
          >
            <MenuItem component={Link} to="/admin-ac" onClick={() => handleMenuClose(setAnchorElAC)}>View Orders</MenuItem>
            <MenuItem component={Link} to="/admin-ac-add" onClick={() => handleMenuClose(setAnchorElAC)}>Add Brands</MenuItem>
            <MenuItem component={Link} to="/admin-ac-services" onClick={() => handleMenuClose(setAnchorElAC)}>Add Services</MenuItem>
          </Menu>

          <Button
            style={{ color: '#000', textTransform: 'none' }}
            onClick={(e) => handleMenuOpen(e, setAnchorElProducts)}
          >
            <b>Products</b>
          </Button>
          <Menu
            anchorEl={anchorElProducts}
            open={Boolean(anchorElProducts)}
            onClose={() => handleMenuClose(setAnchorElProducts)}
          >
            <MenuItem component={Link} to="/admin-addProduct" onClick={() => handleMenuClose(setAnchorElProducts)}>Add Product</MenuItem>
            <MenuItem component={Link} to="/admin-viewProducts" onClick={() => handleMenuClose(setAnchorElProducts)}>View Products</MenuItem>
            <MenuItem component={Link} to="/admin-addProducts-category" onClick={() => handleMenuClose(setAnchorElProducts)}>Add Category</MenuItem>
            <MenuItem component={Link} to="/admin-addProducts-brand" onClick={() => handleMenuClose(setAnchorElProducts)}>Add Brands</MenuItem>
          </Menu>
        </Box>

        {/* Right-aligned Admin dropdown */}
        <Box>
          <Button
            style={{ color: '#000', textTransform: 'none' }}
            onClick={(e) => handleMenuOpen(e, setAnchorElAdmin)}
          >
            <b><u>Admin Name</u></b>
          </Button>
          <Menu
            anchorEl={anchorElAdmin}
            open={Boolean(anchorElAdmin)}
            onClose={() => handleMenuClose(setAnchorElAdmin)}
          >
            <MenuItem component={Link} to="/admin-login" onClick={() => handleMenuClose(setAnchorElAdmin)}>Login</MenuItem>
            <MenuItem component={Link} to="/logout" onClick={() => handleMenuClose(setAnchorElAdmin)}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import logo from '../../assets/updates_logo.png'

const AdminHeader = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // States for managing dropdown menus
  const [anchorElMobileCCTV, setAnchorElMobileCCTV] = useState(null);
  const [anchorElAC, setAnchorElAC] = useState(null);
  const [anchorElProducts, setAnchorElProducts] = useState(null);
  const [anchorElAdmin, setAnchorElAdmin] = useState(null);

  // Mobile Drawer State
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = (event, setAnchor) => setAnchor(event.currentTarget);
  const handleMenuClose = (setAnchor) => setAnchor(null);

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  const renderMenuLinks = () => (
    <>
      <Button component={Link} to="/admin-overview" style={{ color: '#000', textTransform: 'none' }}>
        <b>Home</b>
      </Button>
      <Button component={Link} to="/admin-mobile" style={{ color: '#000', textTransform: 'none' }}>
        <b>Mobile</b>
      </Button>
      <Button component={Link} to="/admin-testimonials" style={{ color: '#000', textTransform: 'none' }}>
        <b>Testimonials</b>
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
        <MenuItem component={Link} to="/admin-vieworders" onClick={() => handleMenuClose(setAnchorElProducts)}>View Orders</MenuItem>
        <MenuItem component={Link} to="/admin-addProducts-category" onClick={() => handleMenuClose(setAnchorElProducts)}>Add Category</MenuItem>
      </Menu>
      <Button
        style={{ color: '#000', textTransform: 'none' }}
        onClick={(e) => handleMenuOpen(e, setAnchorElAdmin)}
      >
        <b>Admin Name</b>
      </Button>
      <Menu
        anchorEl={anchorElAdmin}
        open={Boolean(anchorElAdmin)}
        onClose={() => handleMenuClose(setAnchorElAdmin)}
      >
        <MenuItem component={Link} to="/admin-login" onClick={() => handleMenuClose(setAnchorElAdmin)}>Login</MenuItem>
        <MenuItem component={Link} to="/admin-login" onClick={() => handleMenuClose(setAnchorElAdmin)}>Logout</MenuItem>
      </Menu>
    </>
  );

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: '#fff', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
    >
      <Toolbar>
      <Box
          style={{ color: '#000', fontWeight: 'bold', marginRight: 'auto' }}
            
            
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

        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="black"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              sx={{
                '& .MuiDrawer-paper': {
                  width: '300px', // Set your desired width here
                },
              }}
            >              <List>
                <ListItem>
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                    Menu
                  </Typography>
                </ListItem>
                <ListItemButton component={Link} to="/admin-overview">
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/admin-mobile">
                  <ListItemText primary="Mobile" />
                </ListItemButton>
                <ListItemButton component={Link} to="/admin-testimonials">
                  <ListItemText primary="Testimonial" />
                </ListItemButton>
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
                </Menu> <br />
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
                {/* Add more menu items as needed */}
                <br />
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
                  <MenuItem component={Link} to="/admin-vieworders" onClick={() => handleMenuClose(setAnchorElProducts)}>View Orders</MenuItem>
                  <MenuItem component={Link} to="/admin-addProducts-category" onClick={() => handleMenuClose(setAnchorElProducts)}>Add Category</MenuItem>
                </Menu> <br />
                <Button
                  style={{ color: '#000', textTransform: 'none' }}
                  onClick={(e) => handleMenuOpen(e, setAnchorElAdmin)}
                >
                  <b>Admin Name</b>
                </Button>
                <Menu
                  anchorEl={anchorElAdmin}
                  open={Boolean(anchorElAdmin)}
                  onClose={() => handleMenuClose(setAnchorElAdmin)}
                >
                  <MenuItem component={Link} to="/admin-login" onClick={() => handleMenuClose(setAnchorElAdmin)}>Login</MenuItem>
                  <MenuItem component={Link} to="/admin-login" onClick={() => handleMenuClose(setAnchorElAdmin)}>Logout</MenuItem>
                </Menu>
              </List>
            </Drawer>
          </>
        ) : (
          <Box display="flex" gap={6}>
            {renderMenuLinks()}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;

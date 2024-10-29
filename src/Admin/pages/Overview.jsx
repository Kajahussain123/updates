import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import AdminHeader from '../components/Header';

const Dashboard = () => {
  return (
    <div>
        <AdminHeader></AdminHeader>
        <Box sx={{ flexGrow: 1, padding: 2 ,mt:4}}>
          <Grid container spacing={2}>
            {/* Total Products Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h5">Total Products</Typography>
                <Typography variant="h2">1,000</Typography>
              </Paper>
            </Grid>
    
            {/* Total Mobile Orders Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h5">Total Mobile Orders</Typography>
                <Typography variant="h2">200</Typography>
              </Paper>
            </Grid>
    
            {/* Total CCTV Orders Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h5">Total CCTV Orders</Typography>
                <Typography variant="h2">150</Typography>
              </Paper>
            </Grid>
    
            {/* Total AC Orders Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                <Typography variant="h5">Total AC Orders</Typography>
                <Typography variant="h2">100</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
    </div>
  );
};

export default Dashboard;

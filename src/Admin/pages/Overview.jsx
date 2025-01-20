import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/Header';
import { getCounts } from '../../services/allApi';

const Dashboard = () => {
  const [counts, setCounts] = useState({
    accessoryOrderCount: 0,
    mobileServiceCount: 0,
    cctvOrderCount: 0,
    acOrderCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        const data = await getCounts();
        const cctvOrderCount = data.allserviceDetails.filter(
          (order) => order.Ac_cctvId.product_type === 'CCTV'
        ).length;

        const acOrderCount = data.allserviceDetails.filter(
          (order) => order.Ac_cctvId.product_type === 'AC'
        ).length;

        setCounts({
          accessoryOrderCount: data.accessoryOrderCount,
          mobileServiceCount: data.mobileServiceCount,
          cctvOrderCount,
          acOrderCount,
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  // Define paths for each box
  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <div>
      <AdminHeader />
      <Box sx={{ flexGrow: 1, padding: 2, mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
          Dashboard
        </Typography>

        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
            }}
          >
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {/* Accessory Orders Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => handleRedirect('/admin-vieworders')}
              >
                <Typography variant="h5">Accessory Orders</Typography>
                <Typography variant="h2">{counts.accessoryOrderCount}</Typography>
              </Paper>
            </Grid>

            {/* Mobile Orders Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => handleRedirect('/admin-mobile')}
              >
                <Typography variant="h5">Total Mobile Orders</Typography>
                <Typography variant="h2">{counts.mobileServiceCount}</Typography>
              </Paper>
            </Grid>

            {/* CCTV Orders Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => handleRedirect('/admin-cctv')}
              >
                <Typography variant="h5">Total CCTV Orders</Typography>
                <Typography variant="h2">{counts.cctvOrderCount}</Typography>
              </Paper>
            </Grid>

            {/* AC Orders Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => handleRedirect('/admin-ac')}
              >
                <Typography variant="h5">Total AC Orders</Typography>
                <Typography variant="h2">{counts.acOrderCount}</Typography>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </div>
  );
};

export default Dashboard;

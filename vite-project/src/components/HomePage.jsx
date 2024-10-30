import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Grid, Paper } from '@mui/material';
import Products from './Products';

const HomePage = () => {
  // Get username either from Redux state or localStorage
  const username = useSelector((state) => state.auth.user?.username) || localStorage.getItem('username');

  return (
    <Container  sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa', py: 4 }}>
      {/* Conditional rendering based on username */}
      {username ? (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome, {username}!
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            Available Products
          </Typography>
        
        </>
      ) : (
        <Typography variant="h5" align="center">
          Please log in to see your products.
        </Typography>
      )}
      <Products />
    </Container>
  );
};

export default HomePage;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productsSlice';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Grid, Paper, Typography, CircularProgress, Box } from '@mui/material';

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <CircularProgress />; // Show loading spinner
  if (error) return <Typography color="error">{error}</Typography>; // Show error message

  return (
    <Grid container spacing={3}>
      {items.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body2">{product.description}</Typography>
            <Typography variant="h6">${product.price}</Typography>
            {product.image && (
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  objectFit: 'cover',
                  marginTop: 1,
                }}
              />
            )}
            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary" sx={{ marginTop: 1 }}>
                View Details
              </Typography>
            </Link>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
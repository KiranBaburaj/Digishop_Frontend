import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../store/slices/productsSlice';
import { Container, Typography, Paper, Box, Button, CircularProgress } from '@mui/material';

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProduct(id)); // Fetch product details using the ID
  }, [dispatch, id]);

  if (loading) return <CircularProgress />; // Show loading spinner
  if (error) return <Typography color="error">{error}</Typography>; // Show error message

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {product?.name}
        </Typography>
        <Typography variant="body1" paragraph>
          {product?.description}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Price: ${product?.price}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Stock: {product?.stock}
        </Typography>
        {product?.image && (
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              maxWidth: '100%',
              height: 'auto',
              marginTop: 2,
              marginBottom: 2,
            }}
          />
        )}
        <Button variant="contained" color="primary" fullWidth>
          Add to Cart
        </Button>
      </Paper>
    </Container>
  );
};

export default ProductDetail;
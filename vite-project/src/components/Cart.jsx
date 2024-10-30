import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../store/slices/cartSlice';
import { Container, Typography, List, ListItem, ListItemText, Button, CircularProgress } from '@mui/material';

const Cart = () => {
  const dispatch = useDispatch();
  const { items = [], loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart()); // Fetch cart items on component mount
  }, [dispatch]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">Error: {error}</Typography>
      </Container>
    );
  }

  if (!items || items.length === 0) {
    return (
      <Container>
        <Typography variant="h6">Your cart is empty.</Typography>
      </Container>
    );
  }

  // Aggregate items by product ID
  const aggregatedItems = items.reduce((acc, item) => {
    const existingItem = acc.find(i => i.product.id === item.product.id);
    if (existingItem) {
      existingItem.quantity += item.quantity; // Aggregate quantity
    } else {
      acc.push({ ...item }); // Add new item
    }
    return acc;
  }, []);

  const totalPrice = aggregatedItems.reduce((total, item) => total + item.quantity * parseFloat(item.product.price), 0);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      <List>
        {aggregatedItems.map((item) => (
          <ListItem key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <ListItemText
              primary={item.product.name}
              secondary={`Quantity: ${item.quantity} - Price: $${(item.quantity * item.product.price).toFixed(2)}`}
            />
            <Button variant="contained" color="primary" onClick={() => {/* Handle increase quantity */}}>
              +
            </Button>
            <Button variant="contained" color="secondary" onClick={() => {/* Handle remove item */}}>
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
      <Typography variant="h5" sx={{ marginTop: '16px' }}>
        Total Price: ${totalPrice.toFixed(2)}
      </Typography>
    </Container>
  );
};

export default Cart;

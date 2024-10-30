// Cart.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../store/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { items = [], loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart()); // Fetch cart items on component mount
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!items || items.length === 0) { // Add fallback check
    return <div>Your cart is empty.</div>;
  }

  const totalPrice = items.reduce((total, item) => total + item.quantity * parseFloat(item.product.price), 0);

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div>
              <h2>{item.product.name}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.product.price}</p>
            </div>
          </li>
        ))}
      </ul>
      <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
    </div>
  );
};

export default Cart;

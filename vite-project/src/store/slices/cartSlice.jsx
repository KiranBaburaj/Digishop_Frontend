import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define API endpoints
const CART_API_URL = 'http://localhost:8000/api/carts/';
const CART_ITEM_API_URL = 'http://localhost:8000/api/cart-items/';

// Get the authentication token from local storage
const getAuthToken = () => {
  return localStorage.getItem('token'); // Adjust this if you store the token elsewhere
};

// Thunk to fetch cart items for the authenticated user
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(CART_API_URL, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Include token in the header
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Thunk to add an item to the cart
export const addToCart = createAsyncThunk('cart/addToCart', async (product, { rejectWithValue }) => {
  try {
    const response = await axios.post(CART_ITEM_API_URL, { product_id: product.id }, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // Include token in the header
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can add other non-async actions here if needed, e.g., clearCart
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchCart actions
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle addToCart actions
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const item = action.payload;
        const existingItem = state.items.find((cartItem) => cartItem.product.id === item.product.id);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push(item);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;

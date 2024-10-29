import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute'; // Import the PublicRoute component
import Login from '../components/Login';
import Layout from '../components/Layout';
import Register from '../components/Register';
import HomePage from '../components/HomePage';
import ProductDetail from '../components/ProductDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: '/register',
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: '/home',
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
  

      {
        path: '/products/:id',
        element: (
          <PrivateRoute>
           <ProductDetail />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

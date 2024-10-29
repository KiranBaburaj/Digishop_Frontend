import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../components/Login';
import Layout from '../components/Layout';
import Register from '../components/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },


    ],
  },
]);
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const Layout = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <AppBar position="static" sx={{ background: 'linear-gradient(to right, #3f51b5, #2196f3)' }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" component={Link} to="/home" sx={{ flexGrow: 1, color: 'white', textDecoration: 'none' }}>
              Digishop
            </Typography>
            <div>
              <Button component={Link} to="/products" color="inherit">Products</Button>
              {token && (
                <>
                  <Button component={Link} to="/cart" color="inherit">Cart</Button>
                  <Button component={Link} to="/manage-products" color="inherit">Manage Products</Button>
                </>
              )}
              {token ? (
                <Button onClick={handleLogout} color="inherit">Logout</Button>
              ) : (
                <>
                  <Button component={Link} to="/login" color="inherit">Login</Button>
                  <Button component={Link} to="/register" variant="contained" color="secondary">Register</Button>
                </>
              )}
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      <main className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="bg-white shadow-md mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center">
          <p className="text-gray-600 text-sm">© 2023 Digishop. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link>
            <Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
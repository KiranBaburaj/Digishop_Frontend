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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(to right, #3f51b5, #2196f3)' }}>
        <Container sx={{ width: '100%', maxWidth: 'none' }}> {/* Change here */}
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

      <main style={{ flexGrow: 1 }}>
        <Container sx={{ py: 6, width: '100%', maxWidth: 'none' }}> {/* Change here */}
          <Outlet />
        </Container>
      </main>

      <footer style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginTop: 'auto' }}>
        <Container sx={{ py: 4, textAlign: 'center', width: '100%', maxWidth: 'none' }}> {/* Change here */}
          <Typography variant="body2" color="textSecondary">
            © 2024 Digishop. All rights reserved.
          </Typography>
          <div style={{ marginTop: '8px' }}>
            <Link to="/terms" style={{ marginRight: '16px', color: '#3f51b5' }}>Terms of Service</Link>
            <Link to="/privacy" style={{ color: '#3f51b5' }}>Privacy Policy</Link>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../store/slices/authSlice';
import { Container, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const validateForm = () => {
    const newErrors = {};
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please check all fields');
      return;
    }

    try {
      const resultAction = await dispatch(register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      })).unwrap();

      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      if (error.username) {
        setErrors(prevErrors => ({
          ...prevErrors,
          username: error.username[0]
        }));
      }
      if (error.email) {
        setErrors(prevErrors => ({
          ...prevErrors,
          email: error.email[0]
        }));
      }
      toast.error(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Container component="main"  sx={{ mt: 8 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Create your account
        </Typography>
        <Typography variant="body2" align="center" sx={{ mb: 2 }}>
          Or{' '}
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Typography color="primary" component="span">
              sign in to your account
            </Typography>
          </Link>
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {/* Username Field */}
          <TextField
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            required
            fullWidth
            margin="normal"
            error={Boolean(errors.username)}
            helperText={errors.username}
            value={formData.username}
            onChange={handleChange}
          />

          {/* Email Field */}
          <TextField
            id="email"
            name="email"
            label="Email Address"
            type="email"
            variant="outlined"
            required
            fullWidth
            margin="normal"
            error={Boolean(errors.email)}
            helperText={errors.email}
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password Field */}
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            required
            fullWidth
            margin="normal"
            error={Boolean(errors.password)}
            helperText={errors.password}
            value={formData.password}
            onChange={handleChange}
          />

          {/* Confirm Password Field */}
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            required
            fullWidth
            margin="normal"
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
           {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
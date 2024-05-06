import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function SignUp() {
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can submit the form data to your backend
    console.log(formData);
    // Reset form fields
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
      <Button variant="contained" onClick={() => setShowSignUpForm(!showSignUpForm)}>
        {showSignUpForm ? 'Sign Up' : 'Sign Up!'}
      </Button>
      {showSignUpForm && (
        <>
          <Typography variant="h5" gutterBottom>Sign Up</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth sx={{ mt: 2 }}>
              Sign Up
            </Button>
          </form>
          <Typography variant="body1" mt={2}>
            Already have an account? <Link to="/login">Log in</Link>
          </Typography>
        </>
      )}
    </Box>
  );
}

export default SignUp;

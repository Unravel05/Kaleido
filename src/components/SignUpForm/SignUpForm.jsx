import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StreamIcon from '@mui/icons-material/Stream';


function SignUp({setUser}) {
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
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

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData)
    console.log(formData);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    navigate('/')

  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4, marginLeft: 4, marginRight: 4}}>
      <Button variant="contained" sx={{ bgcolor: '#5E3914', color: 'white', mt: 2 }} onClick={() => setShowSignUpForm(!showSignUpForm)}>
        {showSignUpForm ? 'Sign Up' : 'Sign Up'}
      </Button>
      {showSignUpForm && (
        <>
        <form onSubmit={handleSubmit}>
          <TextField
            label="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: '#C8A382'}}
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
            sx={{ backgroundColor: '#C8A382'}}
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
            sx={{ backgroundColor: '#C8A382'}}
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
            sx={{ backgroundColor: '#C8A382'}}
            required
          />
          <Button type="submit" variant="contained" color="primary" size="large" fullWidth sx={{ bgcolor: '#5E3914', color: 'white', mt: 2 }}>
            <StreamIcon/>
          </Button>
        </form>
        <Typography variant="body1" mt={2}>
          Already have an account? <Link to="/login" style={{ color: '#5E3914' }}>Log in </Link>
        </Typography>
      </>
      )}
    </Box>
  );
}

export default SignUp;

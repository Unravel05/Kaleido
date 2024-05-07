import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as usersService from '../../utilities/users-service';
import LoginIcon from '@mui/icons-material/Login';


export default function LoginForm({ setUser }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

const navigate = useNavigate()

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the login service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
      navigate('/')
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
      <Button variant="contained" sx={{ bgcolor: '#5E3914', color: 'white', mt: 2 }} onClick={() => setShowLoginForm(!showLoginForm)}>
        {showLoginForm ? 'Log In' : 'Log In'}
      </Button>
      {showLoginForm && (
        <>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="text"
            name="email"
            value={credentials.email}
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
            value={credentials.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: '#C8A382'}}
            required
          />
          <Button type="submit" variant="contained" sx={{ bgcolor: '#5E3914', color: 'white', mt: 2 }} size="large" fullWidth >
            <LoginIcon/>
          </Button>
        </form>
        <Typography variant="body1" mt={2}>
          Don't have an account? <Link to="/signup" style={{ color: '#5E3914' }}>Sign up</Link>
        </Typography>
        <Typography variant="body1" mt={1} color="error">
          {error}
        </Typography>
      </>
      )}
    </Box>
  );
}

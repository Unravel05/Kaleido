import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as usersService from '../../utilities/users-service';

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

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the login service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
      <Button variant="contained" onClick={() => setShowLoginForm(!showLoginForm)}>
        {showLoginForm ? 'Log In' : 'Log In!'}
      </Button>
      {showLoginForm && (
        <>
          <Typography variant="h5" gutterBottom>Log In</Typography>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="text"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
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
              required
            />
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth sx={{ mt: 2 }}>
              Log In
            </Button>
          </form>
          <Typography variant="body1" mt={2}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Typography>
          <Typography variant="body1" mt={1} color="error">
            {error}
          </Typography>
        </>
      )}
    </Box>
  );
}

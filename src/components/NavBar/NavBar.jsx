import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function NavBar({ user, setUser }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    userService.logOut();
    setUser(null);
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <img src="https://i.imgur.com/CnL6mkj.png" alt="Logo" className="logo" />
        </Link>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          
        </Typography>
        <Button onClick={handleMenuClick} color="inherit">
          Welcome {user.name}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={Link} to="/artists" onClick={handleMenuClose}>
            Artist
          </MenuItem>
          <MenuItem component={Link} to={`/user/${user.name}`} onClick={handleMenuClose}>
            User
          </MenuItem>
          <MenuItem component={Link} to="/characters" onClick={handleMenuClose}>
            Characters
          </MenuItem>
          <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

import React from 'react';
import './MainPage.css'; // Import your CSS file for styling
import * as character from '../../utilities/characters-api';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';

function MainPage() {
  // Check if the user is logged in
  const user = getUser();

  return (
    <div className="main-page-container"> 
      <div className="content-box"> 
        <h1>Welcome to Kaleido</h1>
        <h2>Where you can craft captivating characters, showcase your art, and seamlessly integrate them into your storytelling adventures, all in one vibrant platform!</h2>
        
        <img className='mari' src="https://64.media.tumblr.com/94279afd77f01a259ecd8d109ed662fd/tumblr_mhgcnwdAij1rnwo2vo1_500.gif" alt="" />
        
        {/* Render buttons only if the user is not logged in */}
        {!user && (
          <div className="button-container">
            <Link to='/login'>
              <Button 
                sx={{ 
                  backgroundColor: '#5E3914', 
                  color: 'white',
                  marginRight: '10px' 
                }} 
              >
                Log in
              </Button>
            </Link>
            <Link to='/signup'>
              <Button 
                sx={{ 
                  backgroundColor: '#5E3914', 
                  color: 'white',
                  marginLeft: '10px' 
                }} 
              >
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;

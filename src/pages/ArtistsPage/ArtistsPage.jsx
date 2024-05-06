import AddCircleIcon from '@mui/icons-material/AddCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState, useEffect } from "react";
import * as artist from '../../utilities/artists-api';
import * as userService from '../../utilities/users-service';
import { Link } from "react-router-dom";
import CreateArtist from "../../components/CreateArtist/CreateArtist";
import Button from '@mui/material/Button';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PinterestIcon from '@mui/icons-material/Pinterest';
import NotesIcon from '@mui/icons-material/Notes';
import Grid from '@mui/material/Grid';

function ArtistsPage({ handleEditArtist }) {
  const [artists, setArtists] = useState([]);
  const [artistData, setArtistData] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [expandedNotesId, setExpandedNotesId] = useState(null);
  const [user, setUser] = useState(userService.getUser());
 
  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const data = await artist.getArtist();
      setArtists(data || []); // Initialize with an empty array if data is undefined
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  const handleSubmitArtist = async (newArtist) => {
      try {
          await artist.saveArtist(newArtist);
          setArtists(prevArtists => [...prevArtists, newArtist]);
          setShowCreateForm(false); // Hide the form after submission
      } catch (error) {
          console.error('Error saving artist:', error);
      }
  };

  const deleteArtist = async (artistId) => {
      console.log(artistId)
      try {
          await artist.deleteArtist(artistId);
          setArtists(prevArtists => prevArtists.filter(artist => artist._id !== artistId));
      } catch (error) {
          console.error('Error deleting artist:', error);
      }
  };

  const handleSave = (updatedArtist) => {
      setArtistData(updatedArtist);
  };

  const handleEditSuccess = () => {
      // Redirect to artistsPage
      window.location.reload(); // Refresh the page
  };

  const handleExpandPersonalityClick = (cardId) => {
      setExpandedNotesId(expandedNotesId === cardId ? null : cardId);
  };

  return (
    <div>
      <h1>Artists</h1>
      <Button 
        onClick={() => setShowCreateForm(!showCreateForm)}
        sx={{
          color: "#69482B"
        }}
      >
        <AddCircleIcon sx={{ mr: 1, color: "#5E3914" }} /> {/* Add margin to the right of the icon */}
        Add Art
      </Button>
      {showCreateForm && <CreateArtist handleSubmitartist={handleSubmitArtist} handleEditArtist={handleEditArtist} onEditSuccess={() => window.location.href = '/artists'}/>}
      <Grid container spacing={3} padding={1}>
        {artists.map((artist, index) => (
          <Grid item key={artist._id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 345, bgcolor: "#B28D62" }}>
              <CardHeader
                action={
                  user._id === artist.user._id &&
                  <Link to={`/artists/edit/${artist._id}`}>
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  </Link>
                }
                title={artist.title}
                subheader={artist.user.name}
              />
              <CardMedia
                component="img"
                image={artist.imageUrl}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">{artist.relationships}</Typography>
              </CardContent>
              <CardActions disableSpacing>
                {user._id === artist.user._id &&
                  <IconButton onClick={() => deleteArtist(artist._id)} aria-label="delete">
                    <DeleteForeverRoundedIcon />
                  </IconButton>
                }
                <Link to={artist.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <IconButton aria-label="share">
                    <PinterestIcon sx={{ color: "#5E3914" }} />
                  </IconButton>
                </Link>
                <IconButton
                  onClick={() => handleExpandPersonalityClick(artist._id)}
                  aria-expanded={expandedNotesId === artist._id}
                  aria-label="show personality"
                >
                  <NotesIcon sx={{ color: "#5E3914" }} />
                </IconButton>
              </CardActions>
              <Collapse in={expandedNotesId === artist._id} timeout="auto" unmountOnExit>
                <CardContent>  
                  <Typography paragraph>{artist.notes}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ArtistsPage;



import React, { useState, useEffect } from "react";
import * as artist from '../../utilities/artists-api';
import * as userService from '../../utilities/users-service';
import { Link } from "react-router-dom";
import CreateArtist from "../../components/CreateArtist/CreateArtist";
import Button from '@mui/material/Button';
import { brown } from "@mui/material/colors";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';



function ArtistsPage({ handleEditArtist }) {
  const [artists, setArtists] = useState([]);
  const [artistData, setArtistData] = useState(null);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [expandedPersonalityId, setExpandedPersonalityId] = useState(null);
  const [expandedHistoryId, setExpandedHistoryId] = useState(null);
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
      setExpandedPersonalityId(expandedPersonalityId === cardId ? null : cardId);
  };

  const handleExpandHistoryClick = (cardId) => {
      setExpandedHistoryId(expandedHistoryId === cardId ? null : cardId);
  };

  const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
  }));

  return (
      <div>
          <h1>Artists</h1>
          <Button onClick={() => setShowCreateForm(!showCreateForm)}><AddCircleIcon/>Add Art</Button>
          {showCreateForm && <CreateArtist handleSubmitartist={handleSubmitArtist} handleEditArtist={handleEditArtist} onEditSuccess={() => window.location.href = '/artists'}/>}
          <Grid container spacing={3} padding={1}>
              {artists.map((artist, index) => (
                  <Grid item key={artist._id} xs={12} sm={6} md={4} lg={3}>
                      <Card sx={{ maxWidth: 345 }}>
                          <CardHeader
                              action={
                                  user._id === artist.user &&
                                  <Link to={`/artists/edit/${artist._id}`}>
                                      <IconButton aria-label="settings">
                                          <MoreVertIcon />
                                      </IconButton>
                                  </Link>
                              }
                              title={user.name}
                              subheader={artist.title}
                          />
                          <CardMedia
                              component="img"
                              image={artist.imageUrl}
                          />
                          <CardContent>
                              <Typography variant="body2" color="text.secondary">{artist.relationships}</Typography>
                          </CardContent>
                          <CardActions disableSpacing>
                              {user._id === artist.user &&
                                  <IconButton onClick={() => deleteArtist(artist._id)} aria-label="delete">
                                      <DeleteForeverRoundedIcon />
                                  </IconButton>
                              }
                              <Link to={artist.sourceUrl} target="_blank" rel="noopener noreferrer">
                                  <IconButton aria-label="share">
                                      <ShareIcon />
                                  </IconButton>
                              </Link>
                              <IconButton
                                  onClick={() => handleExpandPersonalityClick(artist._id)}
                                  aria-expanded={expandedPersonalityId === artist._id}
                                  aria-label="show personality"
                              >
                                  <PersonIcon />
                              </IconButton>
                              <IconButton
                                  onClick={() => handleExpandHistoryClick(artist._id)}
                                  aria-expanded={expandedHistoryId === artist._id}
                                  aria-label="show history"
                              >
                                  <HistoryEduIcon />
                              </IconButton>
                          </CardActions>
                          <Collapse in={expandedPersonalityId === artist._id} timeout="auto" unmountOnExit>
                              <CardContent>  
                                  <Typography paragraph>Personality:</Typography>
                                  <Typography paragraph>{artist.personality}</Typography>
                              </CardContent>
                          </Collapse>
                          <Collapse in={expandedHistoryId === artist._id} timeout="auto" unmountOnExit>
                              <CardContent>
                                  <Typography paragraph>History:</Typography>
                                  <Typography paragraph>{artist.history}</Typography>
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
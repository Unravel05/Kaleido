import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PinterestIcon from '@mui/icons-material/Pinterest';

function EditArtist({ artist, handleEditArtist, onEditSuccess }) {
  const [editedArtist, setEditedArtist] = useState(artist);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedArtist(prevArtist => ({
      ...prevArtist,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await handleEditArtist(artist._id, editedArtist);
    
    // Call the onEditSuccess callback to redirect
    if (onEditSuccess) {
      onEditSuccess();
    }
  };

  return (
    <div className="EditArt">
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Title"
            type="text"
            name="title"
            value={editedArtist.title}
            onChange={handleChange}
            fullWidth
            sx={{ backgroundColor: '#C8A382'}}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Tags"
            type="text"
            value={editedArtist.tags}
            name="tags"
            className="tags-input"
            onChange={handleChange}
            fullWidth
            sx={{ backgroundColor: '#C8A382'}}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Notes"
            type="text"
            value={editedArtist.notes}
            name="tags"
            className="tags-input"
            onChange={handleChange}
            fullWidth
            sx={{ backgroundColor: '#C8A382'}}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Image URL"
            type="text"
            placeholder="Link"
            name="imageUrl"
            value={editedArtist.imageUrl}
            onChange={handleChange}
            fullWidth
            sx={{ backgroundColor: '#C8A382'}}
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label={<PinterestIcon />}
            type="text"
            placeholder="Link"
            name="sourceUrl"
            value={editedArtist.sourceUrl}
            onChange={handleChange}
            fullWidth
            sx={{ backgroundColor: '#C8A382'}}
          />
        </Box>
        
        <Button variant="contained" type="submit" sx={{ bgcolor: '#5E3914', color: 'white' }}>Save Changes</Button>
      </form>
    </div>
  );
}

export default EditArtist;

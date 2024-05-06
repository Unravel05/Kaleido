import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function EditCharacter({ character, handleEditCharacter, onEditSuccess }) {
  const [editedCharacter, setEditedCharacter] = useState(character);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCharacter(prevCharacter => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await handleEditCharacter(character._id, editedCharacter);
    
    // Call the onEditSuccess callback to redirect
    if (onEditSuccess) {
      onEditSuccess();
    }
  };

  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField 
            label="Name" 
            type="text" 
            name="name" 
            value={editedCharacter.name} 
            onChange={handleChange} 
            fullWidth 
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField 
            label="Tags" 
            type="text" 
            name="tags" 
            value={editedCharacter.tags} 
            onChange={handleChange} 
            fullWidth 
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField 
            label="Personality" 
            type="text" 
            name="personality" 
            value={editedCharacter.personality} 
            onChange={handleChange} 
            fullWidth 
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField 
            label="Relationships" 
            type="text" 
            name="relationships" 
            value={editedCharacter.relationships} 
            onChange={handleChange} 
            fullWidth 
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField 
            label="History" 
            type="text" 
            name="history" 
            value={editedCharacter.history} 
            onChange={handleChange} 
            fullWidth 
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField 
            label="Image URL" 
            type="text" 
            name="imageUrl" 
            value={editedCharacter.imageUrl} 
            onChange={handleChange} 
            fullWidth 
            sx={{ color: '#5E3914' }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField 
            label="Source URL" 
            type="text" 
            name="sourceUrl" 
            value={editedCharacter.sourceUrl} 
            onChange={handleChange} 
            fullWidth 
            sx={{ color: '#5E3914' }}
          />
        </Box>
        
        <Button variant="contained" type="submit" sx={{ mb: 2, bgcolor: '#5E3914', color: 'white' }}>Save Changes</Button>
        {/* If you want to use Link for redirection */}
        {/* <Button component={Link} to="/characters" variant="contained">Cancel</Button> */}
      </form>
    </div>
  );
}

export default EditCharacter;

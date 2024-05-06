import React, { useState } from 'react';
import * as characterAPI from '../../utilities/characters-api';
import './createCharacter.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { InputAdornment } from '@mui/material';


function CreateCharacter({ userId }) {
    const [character, setCharacter] = useState({
        name: '',
        tags: [''],
        personality: '',
        relationships: '',
        history: '',
        user: userId 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCharacter(prevCharacter => ({
            ...prevCharacter,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        characterAPI.saveCharacter(character)
        .then(() => {
            window.location.reload();
        })
        .catch(error => {
            console.error('Error saving character:', error);
        });
    }

    return (
        <div className="ficha">
            <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 2 }}>
                        
                    <TextField label="Name" type="text" name="name" value={character.name} onChange={handleChange} fullWidth />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField label="Tags" type="text" value={character.tags} name="tags" className="tags-input" onChange={handleChange} fullWidth />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField label="Personality" type="text" name="personality" value={character.personality} onChange={handleChange} fullWidth />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField label="Relationships" type="text" name='relationships' value={character.relationships} onChange={handleChange} fullWidth />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField label="History" type="text" name="history" value={character.history} onChange={handleChange} fullWidth />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField label="Image URL" type="text" name="imageUrl" value={character.imageUrl} onChange={handleChange} fullWidth sx={{ bgcolor: 'lightbrown', color: 'white' }} />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField label="Source URL" type="text" name="sourceUrl" value={character.sourceUrl} onChange={handleChange} fullWidth sx={{ bgcolor: 'lightbrown', color: 'white' }} />
                </Box>
                
                <Button variant="contained" type="submit">Create your own!</Button>
            </form>
        </div>
    );
}

export default CreateCharacter;

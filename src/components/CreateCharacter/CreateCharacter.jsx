import React, { useState } from 'react';
import * as characterAPI from '../../utilities/characters-api';
import './createCharacter.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import TitleIcon from '@mui/icons-material/Title';
import LabelIcon from '@mui/icons-material/Label';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import PanoramaIcon from '@mui/icons-material/Panorama';
import ShareIcon from '@mui/icons-material/Share';

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
                <Box sx={{ mb: 2, marginTop: '1rem' }}> 
                    <TextField 
                        label= <TitleIcon/>
                        placeholder="Name" 
                        type="text" 
                        name="name" 
                        value={character.name} 
                        onChange={handleChange} 
                        fullWidth 
                        sx={{ backgroundColor: '#C8A382'}} 
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField 
                        label= <LabelIcon/> 
                        placeholder="Tags" 
                        type="text" 
                        name="tags" 
                        value={character.tags} 
                        className="tags-input" 
                        onChange={handleChange} 
                        fullWidth 
                        sx={{ backgroundColor: '#C8A382'}}
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField 
                        label=<EmojiPeopleIcon/>
                        placeholder="Personality" 
                        type="text" 
                        name="personality" 
                        value={character.personality} 
                        onChange={handleChange} 
                        fullWidth 
                        sx={{ backgroundColor: '#C8A382'}} 
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField 
                        label=<FavoriteIcon/> 
                        placeholder="Relationships" 
                        type="text" 
                        name='relationships' 
                        value={character.relationships} 
                        onChange={handleChange} 
                        fullWidth 
                        sx={{ backgroundColor: '#C8A382'}} 
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField 
                        label=<HistoryEduIcon/>
                        placeholder="History" 
                        type="text" 
                        name="history" 
                        value={character.history} 
                        onChange={handleChange} 
                        fullWidth 
                        sx={{ backgroundColor: '#C8A382'}} 
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField 
                        label=<PanoramaIcon/> 
                        placeholder="Image URL" 
                        type="text" 
                        name="imageUrl" 
                        value={character.imageUrl} 
                        onChange={handleChange} 
                        fullWidth 
                        sx={{ backgroundColor: '#C8A382'}} 
                    />
                </Box>
                <Box sx={{ mb: 2 }}>
                    <TextField 
                        label=<ShareIcon/>
                        placeholder="Source URL" 
                        type="text" 
                        name="sourceUrl" 
                        value={character.sourceUrl} 
                        onChange={handleChange} 
                        fullWidth 
                        sx={{ backgroundColor: '#C8A382'}} 
                    />
                </Box>
                <Button variant="contained" type="submit" sx={{ backgroundColor: '#5E3914', color: 'white' }}>Create your own!</Button>
            
            </form>
        </div>
    );
}

export default CreateCharacter;

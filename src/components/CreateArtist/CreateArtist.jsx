import React, { useState } from 'react';
import * as artistAPI from '../../utilities/artists-api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PinterestIcon from '@mui/icons-material/Pinterest';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import LabelIcon from '@mui/icons-material/Label';
import TitleIcon from '@mui/icons-material/Title';
import NotesIcon from '@mui/icons-material/Notes';

function CreateArtist({ userId }) {
    const [artist, setArtist] = useState({
        title: '',
        tags: [''],
        imageUrl: '',
        notes: '',
        sourceUrl: '',
        user: userId 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArtist(prevArtist => ({
            ...prevArtist,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        artistAPI.saveArtist(artist) 
            .then(() => {
                window.location.reload();
            })
            .catch(error => {
                console.error('Error saving artist:', error);
            });
    }

    return (
        <div className="ficha">
            <form onSubmit={handleSubmit}>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        label= <TitleIcon/>
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={artist.title}
                        onChange={handleChange}
                        sx={{ backgroundColor: '#C8A382'}}
                        fullWidth
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        label= <LabelIcon/>
                        type="text"
                        value={artist.tags}
                        name="tags"
                        className="tags-input"
                        onChange={handleChange}
                        sx={{ backgroundColor: '#C8A382'}}
                        fullWidth
                        
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        label= <NotesIcon/>
                        type="text"
                        value={artist.notes}
                        name="notes"
                        className="tags-input"
                        onChange={handleChange}
                        sx={{ backgroundColor: '#C8A382'}}
                        fullWidth
                        
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        label= <CropOriginalIcon/>
                        type="text"
                        placeholder="Link"
                        name="imageUrl"
                        value={artist.imageUrl}
                        onChange={handleChange}
                        sx={{ backgroundColor: '#C8A382'}}
                        fullWidth
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        label= <PinterestIcon/>
                        type="text"
                        placeholder="Link"
                        name="sourceUrl"
                        value={artist.sourceUrl}
                        onChange={handleChange}
                        sx={{ backgroundColor: '#C8A382'}}
                        fullWidth
                    />
                </Box>
                <Button variant="contained" type="submit" sx={{ backgroundColor: '#5E3914', color: 'white' }} >Create your own!</Button>
            </form>
        </div>
    );
}

export default CreateArtist;

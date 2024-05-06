import React, { useState } from 'react';
import * as artistAPI from '../../utilities/artists-api';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function CreateArtist({ userId }) {
    const [artist, setArtist] = useState({
        title: '',
        tags: [''],
        imageUrl: '',
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
        artistAPI.saveArtist(artist) // Changed from saveCharacter to saveArtist
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
                        label="Title"
                        type="text"
                        name="title"
                        value={artist.title}
                        onChange={handleChange}
                        fullWidth
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        label="Tags"
                        type="text"
                        value={artist.tags}
                        name="tags"
                        className="tags-input"
                        onChange={handleChange}
                        fullWidth
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        label="Image URL"
                        type="text"
                        placeholder="Link"
                        name="imageUrl"
                        value={artist.imageUrl}
                        onChange={handleChange}
                        fullWidth
                    />
                </Box>
                <Button variant="contained" type="submit">Create your own!</Button>
            </form>
        </div>
    );
}

export default CreateArtist;

import React, { useState } from 'react';
import * as characterAPI from '../../utilities/characters-api'
import './createCharacter.css'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function CreateCharacter({ userId }) {
    const [character, setCharacter] = useState({
        name: '',
        tags: [''],
        personality: '',
        relationships: '',
        history: '',
        imageUrl: [''],
        user: userId 
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setCharacter(prevCharacter => ({
            ...prevCharacter,
            [name]: value,
        }));
    }

    function handleAddImage() {
        setCharacter(prevCharacter => ({
            ...prevCharacter,
            imageUrls: [...prevCharacter.imageUrls, '']
        }));
    }

    function handleRemoveImage(index) {
        setCharacter(prevCharacter => ({
            ...prevCharacter,
            imageUrls: prevCharacter.imageUrls.filter((_, i) => i !== index)
        }));
    }

    function handleSubmit(e) {
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
                <p>Name: <input type="text" name="name" value={character.name} onChange={handleChange} /></p>
                <p>Tags: <input type="text" value={character.tags} name="tags" className="tags-input" onChange={handleChange}/></p>
                <p>Personality: <input type="text" name="personality" value={character.personality} onChange={handleChange} /></p>
                <p>Relationships: <input type="text" name='relationships' value={character.relationships} onChange={handleChange}/></p>
                <p>History: <input type="text" name="history" value={character.history} onChange={handleChange} /></p>
                <p>Images: <input type="text" placeholder="Link" name="imageUrl" value={character.imageUrl} onChange={handleChange} /></p>
                
                <Button onClick={handleAddImage} variant="contained">Add Image</Button>

                <Button variant="contained" type="submit" >Create your own!</Button>
            </form>
        </div>
    );
}

export default CreateCharacter;
import React, { useState } from 'react';

function CreateCharacter({ userId }) {
    const [character, setCharacter] = useState({
        name: '',
        tags: [''],
        personality: '',
        relationship: '',
        history: '',
        imageUrl: '',
        user: userId 
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setCharacter(prevCharacter => ({
            ...prevCharacter,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="ficha">
            <form onSubmit={handleSubmit}>
                <p>Name: <input type="text" name="name" value={character.name} onChange={handleChange} /></p>
                <p>Tags: <input type="text" value={character.tags} name="tags" className="tags-input" onChange={handleChange}/></p>
                <p>Personality: <input type="text" name="personality" value={character.personality} onChange={handleChange} /></p>
                <p>Relationship: <input type="text" name='relationship' value={character.relationship} onChange={handleChange}/></p>
                <p>History: <input type="text" name="history" value={character.history} onChange={handleChange} /></p>
                <p>Images: <input type="text" placeholder="Link" name="imageUrl" value={character.imageUrl} onChange={handleChange} /></p>
                
                <button type="submit">Create your own!</button>
            </form>
        </div>
    );
}

export default CreateCharacter;
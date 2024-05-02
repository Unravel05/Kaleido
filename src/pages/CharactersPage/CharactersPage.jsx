import React, { useState, useEffect } from "react";
import CreateCharacter from '../../components/CreateCharacter/CreateCharacter'
import * as character from '../../utilities/characters-api'
import { Link } from "react-router-dom";
import EditCharacter from "../../components/EditCharacter/EditCharacter";

function CharactersPage({characters, setCharacters, handleEditCharacter}) {
    const [characterData, setCharacterData] = React.useState(null)

    useEffect(() => {
        fetchCharacters();
    }, []);

    const fetchCharacters = async () => {
        try {
            const data = await character.getCharacter();
            setCharacters(data);
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    };

    const handleSubmitCharacter = async (newCharacter) => {
        try {
            await character.saveCharacter(newCharacter);
            setCharacters(prevCharacters => [...prevCharacters, newCharacter]);
        } catch (error) {
            console.error('Error saving character:', error);
        }
    };

    const deleteCharacter = async (characterId) => {
      console.log(characterId)
      try {
          await character.deleteCharacter(characterId);
          setCharacters(prevCharacters => prevCharacters.filter(character => character._id !== characterId));
      } catch (error) {
          console.error('Error deleting character:', error);
      }
    };

    const handleSave = (updatedCharacter) => {
        setCharacterData(updatedCharacter);
      };
    return (
        <div>
            <h1>Characters!</h1>
            <CreateCharacter 
              handleSubmitCharacter={handleSubmitCharacter} 
              handleEditCharacter={handleEditCharacter}
            />
            <div>
                {characters.map((character, index) => (
                    <div key={index}>
                        <h1>Character Details</h1>
                            <p>Name: {character.name}</p>
                            <p>Tags: {character.tags}</p>
                            <p>Personality: {character.personality}</p>
                            <p>Relationships: {character.relationships}</p>
                            <p>History: {character.history}</p>
                            <p>Images: <img src={character.imageUrl} alt={character.name} style={{ maxWidth: '50%' }} /></p>
                    <button onClick={()=> deleteCharacter(character._id)}>Delete</button>
                    <Link to={`/characters/edit/${character._id}`}><button>Edit</button></Link>
                    
                    {characterData && <EditCharacter character={characterData} handleEditCharacter={handleEditCharacter} />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CharactersPage

import React, { useState, useEffect } from "react";
import CreateCharacter from '../../components/CreateCharacter/CreateCharacter'
import * as character from '../../utilities/characters-api'
import { Link } from "react-router-dom";

function CharactersPage() {
    const [characters, setCharacters] = useState([]);

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

  const handleEditCharacter = async (characterId, updatedCharacter) => {
    try {
        await character.editCharacter(characterId, updatedCharacter);
        setCharacters(prevCharacters =>
            prevCharacters.map(character =>
                character._id === characterId ? updatedCharacter : character
            )
        );
    } catch (error) {
        console.error('Error editing character:', error);
    }
  }
    console.log(characters)
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
                        <p>{character.name}</p>
                        <p>Tags: {character.tags}</p>
                        <p>Personality: {character.personality}</p>
                        <p>Relashionships: {character.relationship}</p>
                        <p>History: {character.history}</p>
                        <p>Images: <img src={character.imageUrl} alt="" /></p>
                    <button onClick={()=> deleteCharacter(character._id)}>Delete</button>
                    <Link to={`edit/${character._id}`}><button>Edit</button></Link>

                    
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CharactersPage

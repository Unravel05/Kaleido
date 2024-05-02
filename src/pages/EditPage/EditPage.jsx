import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as character from '../../utilities/characters-api'
import EditCharacter from '../../components/EditCharacter/EditCharacter'

function EditPage({handleEditCharacter}) {
  const { characterId } = useParams();
  const [characterData, setCharacterData] = React.useState(null);
  

  React.useEffect(() => {
    character.getCharacterById(characterId)
      .then(data => setCharacterData(data))
    fetchCharacter();
}, [characterId]);

  const fetchCharacter = async () => {
    try {
        const fetchedCharacter = await character.getCharacterById(characterId);
        setCharacterData(fetchedCharacter);
    } catch (error) {
        console.error('Error fetching character details:', error);
    }
};

  const handleSave = async (updatedCharacter) => {
    try {
        await character.editCharacter(characterId, updatedCharacter);
        setCharacterData(updatedCharacter); 
    } catch (error) {
        console.error('Error updating character:', error);
    }
};

  return (
    <div>
      <h1>Edit character!</h1>
      {characterData && <EditCharacter character={characterData} handleEditCharacter={handleEditCharacter}/>}
    </div>
  )

}

export default EditPage;


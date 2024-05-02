import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as character from '../../utilities/characters-api'
import EditCharacter from '../../components/EditCharacter/EditCharacter'

function EditPage() {
  const { characterId } = useParams();
  const [characterData, setCharacterData] = React.useState(null);

  React.useEffect(() => {
    character.getCharacterById(characterId)
      .then(data => setCharacterData(data))
      .catch(error => console.error('Error fetching character:', error));
  }, [characterId]);

  return (
    <div>
      <h1>Edit character!</h1>
      {characterData && <EditCharacter character={characterData} />}
    </div>
  )

}

export default EditPage


import React, { useState, useEffect } from "react";
import * as characterAPI from '../../utilities/characters-api';
import * as userAPI from '../../utilities/users-api'
import CharactersPage from '../../components/CharactersPage';

function UserPage() {
  const [user, setUser] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await userAPI.getUser();
        setUser(userData);
        const charactersData = await characterAPI.getCharactersByUserId(userData._id);
        setCharacters(charactersData);
      } catch (error) {
        console.error('Error fetching user and characters:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Hola!</h2>
      <h1>{user && user.name}</h1>
      <p>{user && user.email}</p>
      <p>{user && user.password}</p>

      <CharactersPage characters={characters} setCharacters={setCharacters} handleEditCharacter={handleEditCharacter} />
    </div>
  );
}

export default UserPage;

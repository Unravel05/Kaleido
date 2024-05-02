import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import ArtistsPage from '../ArtistsPage/ArtistsPage'
import CharactersPage from '../CharactersPage/CharactersPage'
import NavBar from '../../components/NavBar/NavBar';
import { getUser } from '../../utilities/users-service';
import EditCharacter from '../../components/EditCharacter/EditCharacter';
import * as charactersApi from '../../utilities/characters-api'
import EditPage from '../EditPage/EditPage';


export default function App() {
  const [user, setUser] = useState(getUser());
  const [characters, setCharacters] = useState([]);


  const handleEditCharacter = async (characterId, updatedCharacter) => {
    console.log(characterId)
    try {
        await charactersApi.editCharacter(characterId, updatedCharacter);
        setCharacters(prevCharacters =>
            prevCharacters.map(char =>
                char._id === characterId ? {...char, ...updatedCharacter} : char
            )
        );
    } catch (error) {
        console.error('Error editing character:', error);
    }
  };
  
  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser}/>
            <Routes>
              {/* Route components in here */}
              <Route path="/artits" element={<ArtistsPage />} />
              <Route path="/characters" element={<CharactersPage characters={characters} setCharacters={setCharacters} handleEditCharacter={handleEditCharacter}/>} />
              <Route path="/characters/edit/:characterId" element={<EditPage handleEditCharacter={handleEditCharacter}/>} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser}/>
      }
    </main>
  );
}

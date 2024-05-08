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
import EditArtistPage from '../EditArtistPage/EditArtistPage';
import * as artistApi from '../../utilities/artists-api'
import MainPage from '../MainPage/MainPage';
import Login from '../Login/Login';
import UserPage from '../UserPage/UserPage';
import * as userApi from '../../utilities/users-api'




export default function App() {
  const [user, setUser] = useState(getUser());
  const [characters, setCharacters] = useState([]);
  const [artists, setArtists] = useState([]);


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
  
  const handleEditArtist = async (artistId, updatedArtist) => {
    console.log(artistId)
    try {
        await artistApi.editArtist(artistId, updatedArtist);
        setArtists(prevArtists =>
            prevArtists.map(art =>
                art._id === artistId ? {...art, ...updatedArtist} : art
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
            <NavBar className="navLinks" user={user} setUser={setUser}/>
            <Routes>
              {/* Route components in here */}
              <Route path="/" element={<MainPage />} />
              <Route path="/artists" element={<ArtistsPage />} />
              <Route path="/users" element={<UserPage />} />
              <Route path="/characters" element={<CharactersPage characters={characters} setCharacters={setCharacters} handleEditCharacter={handleEditCharacter}/>} />
              <Route path="/characters/edit/:characterId" element={<EditPage handleEditCharacter={handleEditCharacter}/>} />
              <Route path="/artists/edit/:artistId" element={<EditArtistPage handleEditArtist={handleEditArtist}/>} />
            </Routes>
          </>
          :
          <>
          <NavBar className="navLinks" user={user} setUser={setUser}/>
          
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login setUser={setUser}/>} />
            <Route path="/signup" element={<AuthPage setUser={setUser}/>} />
            <Route path="/artists" element={<ArtistsPage />} />
            <Route path="/characters" element={<CharactersPage characters={characters} setCharacters={setCharacters} handleEditCharacter={handleEditCharacter}/>} />
          </Routes>
          </>
          // <AuthPage setUser={setUser}/>
          
      }
    </main>
  );
}

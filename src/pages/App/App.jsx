import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import ArtistsPage from '../ArtistsPage/ArtistsPage'
import CharactersPage from '../CharactersPage/CharactersPage'
import NavBar from '../../components/NavBar/NavBar';
import { getUser } from '../../utilities/users-service';
import EditCharacter from '../../components/EditCharacter/EditCharacter';


export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser}/>
            <Routes>
              {/* Route components in here */}
              <Route path="/artits" element={<ArtistsPage />} />
              <Route path="/characters" element={<CharactersPage />} />
              <Route path="/edit/:id" element={<EditCharacter/>} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser}/>
      }
    </main>
  );
}

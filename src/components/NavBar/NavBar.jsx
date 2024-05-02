import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service'

export default function NavBar({user, setUser}) {
  function handleLogOut() {
    userService.logOut()
    setUser(null)
  }

  return (
    <div className='nav'>
     <nav> <Link to="/"><img src="https://i.imgur.com/CnL6mkj.png" alt="Logo" className="logo" />
    </Link>
      <span>Welcome {user.name}</span>
      &nbsp; | &nbsp;
      <Link to="/artits">Artist</Link>
      &nbsp; | &nbsp;
      <Link to="/characters">Characters</Link>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav></div>
  );
}
import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav>
      {user ?
        <ul>
          <li>Welcome, {user.name}</li>
          <li><Link to="/profiles">Profiles</Link></li>
          <li><Link to="" onClick={handleLogout}>LOG OUT</Link></li>
          <li><Link to="/auth/change-password">Change Password</Link></li>
        </ul>
      :
        <ul>
          <li><Link to="/auth/login">Log In</Link></li>
          <li><Link to="/auth/signup">Sign Up</Link></li>
        </ul>
      }
    </nav>
  )
}

export default NavBar
import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('userDetails');
    alert('Logged out successfully');
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Eatzilla</h1>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li onClick={handleLogout} className='lg'>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;

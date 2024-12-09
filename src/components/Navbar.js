import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import './Navbar.css';
import { useState, useEffect } from "react";
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('userDetails');
    alert('Logged out successfully');
    navigate("/login");
  };
    const [isAdmin, setAdmin] = useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {
      const userDetails = sessionStorage.getItem('userDetails');
      if (userDetails) {
        setUser(JSON.parse(userDetails));
      }
    }, []);

    useEffect(() => {
      if (user !== null) {
        setAdmin(
          user.name === "udhavvinaik" &&
          user.email === "udhavvinaik@gmail.com" &&
          user.password === "qw12er34ty56"
        );
      }
    }, [user]);
    
  

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Eatzilla</h1>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        {isAdmin && <li><Link to="/admin">Admin</Link></li>}
        <li><Link to="/profile">Profile</Link></li>
        <li onClick={handleLogout} className='lg'>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;

import React from 'react'
import axios from 'axios';
import {useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import "./login.css";
export default function Login() {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/users/login',formData);
            sessionStorage.setItem('userDetails', JSON.stringify(res.data));
            alert('Logged in successfully');
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" className="auth-button">Log In</button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

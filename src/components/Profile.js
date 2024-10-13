import React, { useEffect, useState } from 'react';
import "./Profile.css"
import profile from '../name.png';
export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userDetails = sessionStorage.getItem('userDetails');
    if (userDetails) {
      setUser(JSON.parse(userDetails));
    }
  }, []);

  return (
    <div className='Profile'>
      {user ? (
        <div className='profile-details'>
          <h1>Profile</h1>
          <img src={profile} alt='not found'></img>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Password:</strong> {user.password}</p>
        </div>
      ) : (
        <p>No user details available.</p>
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Menu.css';
const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('http://localhost:5000/restaurants');
        setMenuItems(response.data);
        setFilteredMenuItems(response.data); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchMenu();
  }, []);

  const addToCart = async (item) => {
    try {
      await axios.post('http://localhost:5000/cart/add', {
        name: item.name,
        price: item.price
      });
      alert(`${item.name} added to cart`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterMenuItems(e.target.value);
  };

  const filterMenuItems = (query) => {
    if (!query) {
      setFilteredMenuItems(menuItems);
    } else {
      const filteredItems = menuItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMenuItems(filteredItems);
    }
  };

  return (
    <div className="menu">
      <input
      
        type="text"
        placeholder="Search menu..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="menu-search-input"
      />

      <h1>Menu</h1>
      <div className="menu-grid">
        {filteredMenuItems.map(item => (
          <div className="menu-card" key={item._id}>
            <img src={item.image} alt={item.name} className="menu-image" />
            <div className="menu-details">
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <p>Rating: {item.rating} ⭐</p>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;

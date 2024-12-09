import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Menu.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useInView } from 'react-intersection-observer';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterMenuItems(e.target.value, selectedRating, minPrice, maxPrice);
  };

  const handleRatingChange = (e) => {
    setSelectedRating(Number(e.target.value));
    filterMenuItems(searchQuery, Number(e.target.value), minPrice, maxPrice);
  };

  const handlePriceChange = (e) => {
    if (e.target.name === 'minPrice') {
      setMinPrice(Number(e.target.value));
    } else if (e.target.name === 'maxPrice') {
      setMaxPrice(Number(e.target.value));
    }
    filterMenuItems(searchQuery, selectedRating, minPrice, maxPrice);
  };

  const filterMenuItems = (query, rating, minPrice, maxPrice) => {
    let filtered = menuItems;

    if (rating > 0) {
      filtered = filtered.filter((item) => item.rating >= rating);
    }

    filtered = filtered.filter((item) => item.price >= minPrice && item.price <= maxPrice);

    if (query) {
      filtered = filtered.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
    }

    setFilteredMenuItems(filtered);
  };

  const addToCart = async (item) => {
    try {
      await axios.post('http://localhost:5000/cart/add', {
        name: item.name,
        price: item.price,
        img: item.image,
      });
      toast.success(`${item.name} added to cart`);
    } catch (error) {
      console.error(error);
    }
  };

  const MenuCard = ({ item }) => {
    const { ref, inView } = useInView({ triggerOnce: true });

    return (
      <div className={`menu-card ${inView ? 'visible' : ''}`} ref={ref}>
        <div className="menu-card-inner">
          <div className="menu-card-front">
            <img src={item.image} alt={item.name} className="menu-image" />
            <h3>{item.name}</h3>
          </div>
          <div className="menu-card-back">
            <p>Price: ₹{item.price}</p>
            <p>Rating: {item.rating} ⭐</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="menu">
      <div className="filter-container">
        <label htmlFor="rating">Filter by Rating: </label>
        <select id="rating" onChange={handleRatingChange}>
          <option value="0">All</option>
          <option value="1">1 Star and above</option>
          <option value="2">2 Stars and above</option>
          <option value="3">3 Stars and above</option>
          <option value="4">4 Stars and above</option>
          <option value="5">5 Stars</option>
        </select>
      </div>

      <div className="filter-container">
        <label htmlFor="minPrice">Min Price: ₹</label>
        <input
          type="number"
          name="minPrice"
          id="minPrice"
          value={minPrice}
          onChange={handlePriceChange}
          min="0"
        />
        <label htmlFor="maxPrice">Max Price: ₹</label>
        <input
          type="number"
          name="maxPrice"
          id="maxPrice"
          value={maxPrice}
          onChange={handlePriceChange}
          min="0"
        />
      </div>

      <input
        type="text"
        placeholder="Search menu..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="menu-search-input"
      />

      <h1>Menu</h1>
      <div className="menu-grid">
        {filteredMenuItems.length === 0 ? (
          <p>No restaurants found with the selected filter.</p>
        ) : (
          filteredMenuItems.map((item) => <MenuCard key={item._id} item={item} />)
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Menu;

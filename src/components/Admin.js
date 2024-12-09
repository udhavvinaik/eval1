import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminPage.css';

const AdminPage = () => {
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newDish, setNewDish] = useState({
    name: '',
    image: '',
    price: '',
    rating: '',
  });
  
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/restaurants');
        setDishes(response.data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };
    fetchDishes();
  }, []);

 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDish({
      ...newDish,
      [name]: value,
    });
  };

  
  const handleAddDish = async () => {
    try {
      await axios.post('http://localhost:5000/restaurants/publish', newDish);
      toast.success('Dish added successfully!');
      setNewDish({ name: '', image: '', price: '', rating: '' }); 
      
      const response = await axios.get('http://localhost:5000/restaurants');
      setDishes(response.data);
    } catch (error) {
      console.error('Error adding dish:', error);
      toast.error('Failed to add dish!');
    }
  };

  
  const handleDeleteDish = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/restaurants/delete/${id}`);
      toast.success('Dish deleted successfully!');
      
      const response = await axios.get('http://localhost:5000/restaurants');
      setDishes(response.data);
    } catch (error) {
      console.error('Error deleting dish:', error);
      toast.error('Failed to delete dish!');
    }
  };

  
  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/orders/${id}`);
      setOrders(orders.filter(order => order._id !== id));
      toast.success('Order marked as prepared and deleted successfully!');
    } catch (error) {
      toast.error('Error deleting order:', error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      <div className="section">
        <h2>Manage Menu</h2>
        <div className="form">
        <input
          type="text"
          name="name"
          placeholder="Dish Name"
          value={newDish.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newDish.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newDish.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (0-5)"
          value={newDish.rating}
          onChange={handleChange}
        />
        <button onClick={handleAddDish}>Add Dish</button>
        </div>

        <div className="menu-list">
          {dishes.map(dish => (
            <div key={dish._id} className="menu-item">
            <img src={dish.image} alt={dish.name} className="menu-image" />
              <h3>{dish.name}</h3>
              <p>Price: ₹{dish.price}</p>
              <button onClick={() => handleDeleteDish(dish._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>View Orders</h2>
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <h3><b>Order by: </b>{order.customerName}</h3>
              <h3><b>Delivery address:</b> {order.deliveryAddress.address}, {order.deliveryAddress.city}, {order.deliveryAddress.pincode}</h3>
              <p><b>Dishes:</b></p>
              <ul>
                {order.dishes.map((dish, index) => (
                  <li key={index}>{dish.name} - ₹{dish.price}</li>
                ))}
              </ul>
              <button onClick={() => deleteOrder(order._id)}>Mark as Prepared</button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
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

export default AdminPage;

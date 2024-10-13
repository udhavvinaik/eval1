import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const price = cartItems.reduce((acc, item) => acc + item.price, 0);
      setTotalPrice(price);
    };

    calculateTotalPrice();
  }, [cartItems]);

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cart/delete/${id}`);
      setCartItems(cartItems.filter(item => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const removeAll = async () => {
    try {
      await axios.delete(`http://localhost:5000/cart/deleteAll`);
      setCartItems([]);
      setTotalPrice(0);
      alert("Successfully placed order");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      <div className="cart-grid">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map(item => (
            <div className="cart-card" key={item._id}>
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <button onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>

      <button onClick={removeAll}>CheckOut: ₹{totalPrice.toFixed(2)}</button>
    </div>
  );
};

export default Cart;

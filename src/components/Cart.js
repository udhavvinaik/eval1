import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userDetails = sessionStorage.getItem('userDetails');
    if (userDetails) {
      setUser(JSON.parse(userDetails));
    }
  }, []);


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
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
      console.error('Failed to remove item:', error);
    }
  };


  const placeOrder = async () => {
    try {
      
      const order = {
        customerName: user.name,
        dishes: cartItems.map(item => ({
          name: item.name,
          price: item.price,
          image: item.image,
        })),
      };


      await axios.post('http://localhost:5000/orders/add', order);


      await axios.delete('http://localhost:5000/cart/deleteAll');
      setCartItems([]);
      setTotalPrice(0);

      alert('Order placed successfully!');
    } catch (error) {
      console.error('Failed to place order:', error);
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

      {cartItems.length > 0 && (
        <button className="checkout-button" onClick={placeOrder}>
          Check Out: ₹{totalPrice.toFixed(2)}
        </button>
      )}
    </div>
  );
};

export default Cart;

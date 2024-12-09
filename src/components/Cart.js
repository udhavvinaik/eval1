import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(null);

  const [showDeliveryPage, setShowDeliveryPage] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    address: '',
    phone: '',
    city: '',
    pincode: '',
  });

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

  const handleDeliveryInput = (e) => {
    setDeliveryDetails({ ...deliveryDetails, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      
      const order = {
        customerName: deliveryDetails.name,
        deliveryAddress: deliveryDetails,
        dishes: cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          image: item.image,
        })),
        totalPrice: totalPrice,
      };


      await axios.post('http://localhost:5000/orders/add', order);


      await axios.delete('http://localhost:5000/cart/deleteAll');
      setCartItems([]);
      setTotalPrice(0);

      alert('Order placed successfully!');
      setShowDeliveryPage(false);
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (showDeliveryPage) {
    return (
      <div className="delivery-container">
        <div className="delivery-box">
          <h2>Delivery Details</h2>
          <form>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={deliveryDetails.name}
              onChange={handleDeliveryInput}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={deliveryDetails.address}
              onChange={handleDeliveryInput}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={deliveryDetails.city}
              onChange={handleDeliveryInput}
              required
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={deliveryDetails.pincode}
              onChange={handleDeliveryInput}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={deliveryDetails.phone}
              onChange={handleDeliveryInput}
              required
            />
            <button
              type="button"
              className="delivery-button"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    );
  }




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
        <button
          className="checkout-button"
          onClick={() => setShowDeliveryPage(true)}
        >
          Check Out: ₹{totalPrice.toFixed(2)}
        </button>
      )}
    </div>
  );
};

export default Cart;

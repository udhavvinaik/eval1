import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

const Home = () => {
  useEffect(() => {
    toast.success("Welcome to Eatzilla! Enjoy your meal!");
  }, []);

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to Eatzilla</h1>
          <p>Order your favorite meals delivered to your doorstep.</p>
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
    </motion.div>
  );
};

export default Home;

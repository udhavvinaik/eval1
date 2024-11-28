import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Admin from './components/Admin';

const App = () => {


const ProtectedRoute = ({ children }) => {
  const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
  return userDetails ? children : <Navigate to="/login" />;
};



  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

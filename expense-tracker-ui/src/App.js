import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, CssBaseline } from '@mui/material'; // Import Box for our container

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';



function App() {
  return (
    <BrowserRouter>
      <CssBaseline /> {/* Normalizes styles */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />

      {/* This Box is our new global canvas with a consistent background */}
      <Box sx={{ bgcolor: '#121212', color: 'white', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;

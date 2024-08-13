import React from 'react';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './Login/SignUp';
import SliderCarousel from './Slider/ SliderCarousel';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <Box>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route
            path="/slider"
            element={<ProtectedRoute element={<SliderCarousel />} />}
          />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;

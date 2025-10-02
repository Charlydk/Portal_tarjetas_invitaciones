import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DemoPage from './pages/DemoPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <> 
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo/:templateId" element={<DemoPage />} />
      </Routes>
      <Footer /> 
    </>
  );
}

export default App;
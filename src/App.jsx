import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Crearemos este archivo ahora
import DemoPage from './pages/DemoPage'; // Crearemos este archivo ahora

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/demo/:templateId" element={<DemoPage />} />
    </Routes>
  );
}

export default App;
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DemoPage from './pages/DemoPage';
import PreviewPage from './pages/PreviewPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/preview/:themeId" element={<PreviewPage />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo/:templateId" element={<DemoPage />} />
      </Route>
    </Routes>
  );
}

export default App;

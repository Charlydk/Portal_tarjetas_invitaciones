import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          InvitaWeb
        </a>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#templates" className="nav-link">Modelos</a>
          </li>
          <li className="nav-item">
            <a href="#features" className="nav-link">Características</a>
          </li>
          <li className="nav-item">
            <a href="#faq" className="nav-link">Preguntas</a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link nav-button">¡La quiero!</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
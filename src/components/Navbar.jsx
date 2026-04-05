import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const scrollToSection = (id) => {
    if (isHome) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          InvitaWeb
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            {isHome ? (
              <a href="#templates" className="nav-link" onClick={() => scrollToSection('templates')}>Modelos</a>
            ) : (
              <Link to="/#templates" className="nav-link">Modelos</Link>
            )}
          </li>
          <li className="nav-item">
             {isHome ? (
              <a href="#features" className="nav-link" onClick={() => scrollToSection('features')}>Características</a>
            ) : (
              <Link to="/#features" className="nav-link">Características</Link>
            )}
          </li>
          <li className="nav-item">
             {isHome ? (
              <a href="#faq" className="nav-link" onClick={() => scrollToSection('faq')}>Preguntas</a>
            ) : (
              <Link to="/#faq" className="nav-link">Preguntas</Link>
            )}
          </li>
          <li className="nav-item">
             {isHome ? (
              <a href="#contact" className="nav-link btn-primary" onClick={() => scrollToSection('contact')}>¡La quiero!</a>
            ) : (
              <Link to="/#contact" className="nav-link btn-primary">¡La quiero!</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
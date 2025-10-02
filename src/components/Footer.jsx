import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        <p className="footer-text">
          InvitaWeb © {currentYear} | Todos los derechos reservados.
        </p>
        <p className="footer-text">
          Desarrollado con ❤️ en Tucumán, Argentina.
        </p>
        {/* Aquí podrías añadir íconos de redes sociales en el futuro */}
      </div>
    </footer>
  );
}

export default Footer;
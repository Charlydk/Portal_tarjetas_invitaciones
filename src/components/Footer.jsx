import React from 'react';
import { FaWhatsapp, FaInstagram, FaEnvelope } from 'react-icons/fa';
import Logo from './Logo';
import { waLink, hasWhatsApp } from '../lib/whatsapp';
import './Footer.css';

// Datos de contacto. Dejar vacío lo que todavía no exista: cada enlace se
// renderiza sólo si tiene valor.
//
// Instagram a propósito vacío por ahora. Un perfil sin publicaciones enlazado
// desde el sitio le confirma al cliente que el estudio es nuevo, así que
// conviene cargarlo recién cuando tenga los diseños publicados.
const INSTAGRAM = '';        // ej: 'fxestudio.ar'
const EMAIL = 'fxestudio1@gmail.com';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        <Logo tagline className="fx-logo--light footer-logo" />

        <p className="footer-tagline">
          Contanos cómo soñaste tu evento y te lo entregamos hecho invitación.
        </p>

        {/* Quien baja hasta el final ya está interesado: acá tiene que
            encontrar cómo escribirte, no un aviso legal. */}
        <div className="footer-contact">
          {hasWhatsApp && (
            <a
              href={waLink('¡Hola! Vi el sitio y quiero mi invitación. ¿Me contás cómo es?')}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-cta"
            >
              <FaWhatsapp aria-hidden="true" /> Escribinos por WhatsApp
            </a>
          )}

          <div className="footer-social">
            {INSTAGRAM && (
              <a
                href={`https://instagram.com/${INSTAGRAM}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon"
                aria-label="Instagram"
              >
                <FaInstagram aria-hidden="true" />
              </a>
            )}
            {EMAIL && (
              <a href={`mailto:${EMAIL}`} className="footer-icon" aria-label="Correo">
                <FaEnvelope aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <p className="footer-text">
          © {currentYear} FX Estudio · Hecho en Tucumán, Argentina
        </p>
      </div>
    </footer>
  );
}

export default Footer;

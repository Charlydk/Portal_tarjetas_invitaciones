import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

export const renderIcon = (asset) => {
  if (!asset) return null;
  if (typeof asset === 'string' && asset.length > 3) {
    return <img src={asset} alt="Icono" className="section-icon" />;
  }
  return <span className="section-icon-emoji">{asset}</span>;
};

export function CeremonyBox({ icon, place, address, date, time, mapUrl }) {
  return (
    <motion.section className="card-section" {...fadeInUp}>
      {renderIcon(icon)}
      <h2>Ceremonia Religiosa</h2>
      <div className="card-content">
          <p><strong>LUGAR:</strong> {place}</p>
          <p><strong>UBICACIÓN:</strong> {address}</p>
          <p><strong>DÍA:</strong> {date}</p>
          <p><strong>HORARIO:</strong> {time}</p>
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn-action">CÓMO LLEGAR</a>
      </div>
    </motion.section>
  );
}

export function PartyBox({ icon, place, eventVenue, address, date, time, mapUrl }) {
  return (
    <motion.section className="card-section" {...fadeInUp}>
      {renderIcon(icon)}
      <h2>Fiesta</h2>
      <div className="card-content">
          <p><strong>SALÓN:</strong> {eventVenue || place}</p>
          <p><strong>UBICACIÓN:</strong> {address}</p>
          <p><strong>DÍA:</strong> {date}</p>
          <p><strong>HORARIO:</strong> {time} ¡Puntual!</p>
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn-action">VER UBICACIÓN</a>
      </div>
    </motion.section>
  );
}

export function DressCodeBox({ icon }) {
  return (
    <motion.section className="card-section" {...fadeInUp}>
      {renderIcon(icon)}
      <h2>Dress Code</h2>
      <div className="card-content">
          <p>Pedimos asistir con vestimenta <br/><strong>** Elegante **</strong></p>
      </div>
    </motion.section>
  );
}

export function GiftsBox({ icon, alias }) {
  return (
    <motion.section className="card-section" {...fadeInUp}>
      {renderIcon(icon)}
      <h2>Regalos</h2>
      <div className="card-content">
          <p>Tu presencia es el mejor regalo en este día tan especial.</p>
          <p>Si querés acompañarme con un detalle para esta nueva etapa, lo voy a recibir con mucho cariño.</p>
          <div className="gift-box">
              <p>💌 Cofre a disposición en el salón</p>
              <p className="alias-text">Alias: <strong>{alias}</strong></p>
          </div>
      </div>
    </motion.section>
  );
}

export function GalleryBox({ themeId }) {
  return (
    <motion.section className="slider-section" {...fadeInUp}>
      <h2>Un momento único ♥</h2>
      <p>Entre luces, risas y sueños, este día se convierte en recuerdo.</p>
      <div className="slider">
          <ul>
          {[...Array(5)].map((_, i) => (
              <li key={i}>
                  <img src={`https://picsum.photos/seed/${themeId}${i}/400/500`} alt={`Foto ${i}`} />
              </li>
          ))}
          </ul>
      </div>
      <a href="#" className="btn-action photo-btn">Compartí tus fotos</a>
    </motion.section>
  );
}

export function RSVPBox({ whatsappNumber }) {
  return (
    <motion.section className="card-section" {...fadeInUp}>
      <h2>Confirmación</h2>
      <p>¡Espero contar con tu presencia!</p>
      <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Confirmo mi asistencia.')}`} target="_blank" rel="noopener noreferrer" className="btn-action">CONFIRMAR ASISTENCIA</a>
    </motion.section>
  );
}

export function MusicBox({ musicUrl }) {
  return (
    <motion.section className="card-section" {...fadeInUp}>
      <h2>Música</h2>
      <p>¿Qué canciones querés escuchar?</p>
      <a href={musicUrl} target="_blank" rel="noopener noreferrer" className="btn-action">SUGERIR CANCIÓN</a>
    </motion.section>
  );
}

export function InvitationFooter({ title }) {
  return (
    <motion.footer className="footer-skeleton1" {...fadeInUp}>
      <h2>¡Gracias!</h2>
      <h3>{title}</h3>
      <p>© 2025 - Todos los derechos reservados.</p>
      <p className="dev-credit">Desarrollo web por InvitaWeb</p>
    </motion.footer>
  );
}

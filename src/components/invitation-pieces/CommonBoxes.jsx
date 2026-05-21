import React from 'react';
import { motion } from 'framer-motion';
import { OrnamentDivider } from './Decoratives';

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: 'easeOut' },
};

export const renderIcon = (asset) => {
  if (!asset) return null;
  if (typeof asset === 'string' && asset.length > 3) {
    return <img src={asset} alt="Icono" className="section-icon" />;
  }
  return <span className="section-icon-emoji">{asset}</span>;
};

const GALLERY_SAMPLES = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=600',
  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600',
  'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?q=80&w=600',
];

export function CeremonyBox({ id, icon, place, address, date, time, mapUrl }) {
  return (
    <motion.section id={id} className="card-section" {...fadeInUp}>
      {renderIcon(icon)}
      <OrnamentDivider />
      <h2>Ceremonia Religiosa</h2>
      <div className="card-content">
        {place    && <p><strong>Lugar</strong><br />{place}</p>}
        {address  && <p><strong>Ubicación</strong><br />{address}</p>}
        {date     && <p><strong>Día</strong><br />{date}</p>}
        {time     && <p><strong>Horario</strong><br />{time}</p>}
        {mapUrl   && (
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn-action">
            Cómo llegar
          </a>
        )}
      </div>
    </motion.section>
  );
}

export function CivilBox({ id, icon, place, address, date, time, mapUrl }) {
  return (
    <motion.section id={id} className="card-section" {...fadeInUp}>
      {renderIcon(icon)}
      <OrnamentDivider />
      <h2>Ceremonia Civil</h2>
      <div className="card-content">
        {place    && <p><strong>Lugar</strong><br />{place}</p>}
        {address  && <p><strong>Ubicación</strong><br />{address}</p>}
        {date     && <p><strong>Día</strong><br />{date}</p>}
        {time     && <p><strong>Horario</strong><br />{time}</p>}
        {mapUrl   && (
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn-action">
            Cómo llegar
          </a>
        )}
      </div>
    </motion.section>
  );
}

export function PartyBox({ id, icon, place, eventVenue, address, date, time, mapUrl }) {
  return (
    <motion.section id={id} className="card-section" {...fadeInUp}>
      {renderIcon(icon)}
      <OrnamentDivider />
      <h2>Fiesta</h2>
      <div className="card-content">
        {(eventVenue || place) && <p><strong>Salón</strong><br />{eventVenue || place}</p>}
        {address && <p><strong>Ubicación</strong><br />{address}</p>}
        {date    && <p><strong>Día</strong><br />{date}</p>}
        {time    && <p><strong>Horario</strong><br />{time} · ¡Puntual!</p>}
        {mapUrl  && (
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn-action">
            Ver ubicación
          </a>
        )}
      </div>
    </motion.section>
  );
}

export function DressCodeBox({ id, icon, description }) {
  return (
    <motion.section id={id} className="card-section" {...fadeInUp}>
      {renderIcon(icon)}
      <OrnamentDivider />
      <h2>Dress Code</h2>
      <div className="card-content">
        <p>{description || 'Elegante'}</p>
      </div>
    </motion.section>
  );
}

export function GiftsBox({ id, icon, alias, bankCbu, giftMode = 'cbu' }) {
  return (
    <motion.section id={id} className="card-section" {...fadeInUp}>
      {renderIcon(icon)}
      <OrnamentDivider />
      <h2>Regalos</h2>
      <div className="card-content">
        <p>Tu presencia es el mejor regalo en este día tan especial.</p>
        <p>Si querés acompañarme con un detalle, lo recibo con todo el cariño.</p>
        <div className="gift-box">
          {(giftMode === 'cofre' || giftMode === 'both') && (
            <p>💌 Cofre a disposición en el salón</p>
          )}
          {(giftMode === 'cbu'   || giftMode === 'both') && alias && (
            <p className="alias-text">Alias: <strong>{alias}</strong></p>
          )}
          {(giftMode === 'cbu'   || giftMode === 'both') && bankCbu && (
            <p className="alias-text">CBU: <strong>{bankCbu}</strong></p>
          )}
        </div>
      </div>
    </motion.section>
  );
}

export function GalleryBox({ id, photos = [] }) {
  const displayPhotos = photos.length > 0 ? photos : GALLERY_SAMPLES;
  return (
    <motion.section id={id} className="gallery-section card-section" {...fadeInUp}>
      <OrnamentDivider />
      <h2>Galería</h2>
      <p className="section-tagline">Un momento único ♥</p>
      <div className="gallery-grid-modern">
        {displayPhotos.slice(0, 6).map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Foto ${i + 1}`}
            className="gallery-img-modern"
          />
        ))}
      </div>
    </motion.section>
  );
}

export function RSVPBox({ id, whatsappNumber }) {
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Confirmo mi asistencia 🎉')}`;
  return (
    <motion.section id={id} className="card-section" {...fadeInUp}>
      <OrnamentDivider />
      <h2>Confirmación</h2>
      <div className="card-content">
        <p>¡Esperamos contar con tu presencia!</p>
        {whatsappNumber && (
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-action">
            Confirmar asistencia
          </a>
        )}
      </div>
    </motion.section>
  );
}

export function MusicBox({ id, musicUrl }) {
  return (
    <motion.section id={id} className="card-section" {...fadeInUp}>
      <OrnamentDivider />
      <h2>Música</h2>
      <div className="card-content">
        <p>¿Qué canciones no pueden faltar?</p>
        {musicUrl && (
          <a href={musicUrl} target="_blank" rel="noopener noreferrer" className="btn-action">
            Sugerir canción
          </a>
        )}
      </div>
    </motion.section>
  );
}

export function InvitationFooter({ id, title }) {
  return (
    <motion.footer id={id} className="footer-skeleton1" {...fadeInUp}>
      <h2>¡Gracias!</h2>
      <h3>{title}</h3>
      <p className="dev-credit">InvitaWeb © 2025</p>
    </motion.footer>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';
import './Skeleton6.css';

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&q=80',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&q=80',
  'https://images.unsplash.com/photo-1522673607200-1648832cee98?w=300&q=80',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=300&q=80',
];

function Skeleton6({ data, theme }) {
  const {
    name1 = 'Nombre',
    name2 = '',
    eventDate = '2025-11-15T22:00:00',
    welcomePhrase = '',
    ceremonyPlace = 'Parroquia',
    ceremonyDate = '11/11/2025',
    ceremonyTime = '19:30 HS',
    partyPlace = 'Salón',
    partyDateString = '15/11/2025',
    partyTime = '22:00 HS',
    whatsappNumber = '',
    eventVenue = '',
    alias = 'Alias.Bancario',
    dressCodeDescription = 'Elegante',
    musicPlaylistUrl = '',
    galleryPhotos = [],

    showCeremony = true,
    showParty = true,
    showCountdown = true,
    showDressCode = true,
    showGifts = true,
    showGallery = true,
    showRSVP = true,
    showMusic = true,
  } = data || {};

  const themeConfig = theme || {};
  const displayPhotos = galleryPhotos.length > 0 ? galleryPhotos : SAMPLE_PHOTOS;

  const dynamicStyles = {
    '--primary-color': themeConfig.styles?.primaryColor || 'var(--primary-color)',
    '--secondary-color': themeConfig.styles?.secondaryColor || 'var(--secondary-color)',
    '--font-title': themeConfig.styles?.fontFamilyTitle || 'var(--font-title)',
    '--font-body': themeConfig.styles?.fontFamilyBody || 'var(--font-body)',
    '--text-color': themeConfig.styles?.textColor || '#ffffff',
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div id="skeleton6-template" style={dynamicStyles}>
      <div className="s6-video-bg">
        <video autoPlay loop muted playsInline key={themeConfig.assets?.headerVideo}>
          <source src={themeConfig.assets?.headerVideo} type="video/mp4" />
        </video>
        <div className="s6-gradient-overlay"></div>
      </div>

      <div className="s6-content s6-scroll-container">
        <motion.header
          className="s6-header s6-full-height"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="s6-title"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {name1} {name2 && `& ${name2}`}
          </motion.h1>
          <p className="s6-subtitle">{welcomePhrase || '¡ESTÁS INVITADO!'}</p>
          <div className="s6-scroll-hint">
            <p>Desliza para ver detalles</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </motion.div>
          </div>
        </motion.header>

        {showCountdown && (
          <motion.section className="s6-info-card-section" {...fadeInUp}>
            <div className="s6-card-blur">
              <h3>FALTAN...</h3>
              <CountdownMini targetDate={eventDate} />
            </div>
          </motion.section>
        )}

        {showCeremony && (
          <motion.section className="s6-info-card-section" {...fadeInUp}>
            <div className="s6-card-blur">
              <h3>CEREMONIA</h3>
              <p className="s6-place">{ceremonyPlace}</p>
              <p>{ceremonyDate} — {ceremonyTime}</p>
            </div>
          </motion.section>
        )}

        {showParty && (
          <motion.section className="s6-info-card-section" {...fadeInUp}>
            <div className="s6-card-blur">
              <h3>FIESTA</h3>
              <p className="s6-place">{eventVenue || partyPlace}</p>
              <p>{partyDateString} — {partyTime}</p>
            </div>
          </motion.section>
        )}

        {showDressCode && (
          <motion.section className="s6-info-card-section" {...fadeInUp}>
            <div className="s6-card-blur">
              <h3>DRESS CODE</h3>
              <p className="s6-place">{dressCodeDescription || 'Elegante'}</p>
            </div>
          </motion.section>
        )}

        {showGallery && (
          <motion.section className="s6-info-card-section" {...fadeInUp}>
            <div className="s6-card-blur">
              <h3>GALERÍA</h3>
              <div className="s6-gallery-grid">
                {displayPhotos.slice(0, 4).map((src, i) => (
                  <motion.img
                    key={i}
                    src={src}
                    alt={`Foto ${i + 1}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', aspectRatio: '1' }}
                  />
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {showMusic && musicPlaylistUrl && (
          <motion.section className="s6-info-card-section" {...fadeInUp}>
            <div className="s6-card-blur">
              <h3>MÚSICA</h3>
              <p>Escuchá nuestra playlist especial</p>
              <a
                href={musicPlaylistUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: '10px',
                  padding: '10px 24px',
                  background: '#1DB954',
                  color: 'white',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '0.9rem'
                }}
              >
                Abrir en Spotify
              </a>
            </div>
          </motion.section>
        )}

        {showGifts && (
          <motion.section className="s6-info-card-section" {...fadeInUp}>
            <div className="s6-card-blur">
              <h3>REGALOS</h3>
              <p>Tu presencia es lo más importante.</p>
              <p style={{ marginTop: '8px' }}>Alias: <strong>{alias}</strong></p>
            </div>
          </motion.section>
        )}

        <motion.div
          className="s6-center-box s6-full-height"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="s6-floating-info">
            <p>Vive esta experiencia inolvidable junto a nosotros.</p>
            {showRSVP && (
              <motion.div
                className="s6-pulse-btn"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">CONFIRMAR ASISTENCIA</a>
              </motion.div>
            )}
          </div>
        </motion.div>

        <footer className="s6-footer-minimal">
          <p>© 2025 {name1}</p>
        </footer>
      </div>
    </div>
  );
}

function CountdownMini({ targetDate }) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);
  return (
    <div className="s6-countdown-mini">
      <div><span>{days}</span><p>D</p></div>
      <div><span>{hours}</span><p>H</p></div>
      <div><span>{minutes}</span><p>M</p></div>
      <div><span>{seconds}</span><p>S</p></div>
    </div>
  );
}

export default Skeleton6;

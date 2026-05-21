import React from 'react';
import { motion } from 'framer-motion';
import { CountdownBox } from '../../components/invitation-pieces/CountdownBox';
import './Skeleton13.css';

const DEFAULT_IMAGES = {
  heroImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200',
  accentImage: 'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=1200',
};

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=500',
  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=500',
  'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=500',
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.85, ease: 'easeOut' },
};

function Skeleton13({ data, theme }) {
  const {
    name1 = 'Nombre',
    name2 = '',
    welcomePhrase = '',
    invitePhrase = 'Con todo el amor del mundo, los invitamos a celebrar',
    eventDate = '',

    civilDate = '', civilTime = '', civilPlace = '', civilAddress = '',
    civilMapUrl = '#', civilMapUnknown = false,

    ceremonyDate = '', ceremonyTime = '', ceremonyPlace = '', ceremonyAddress = '',
    ceremonyMapUrl = '#', ceremonyMapUnknown = false,

    partyDateString = '', partyTime = '', partyPlace = '', eventVenue = '',
    partyAddress = '', partyMapUrl = '#', partyMapUnknown = false,

    alias = '', giftMode = 'cbu', bankCbu = '',
    whatsappNumber = '',
    musicPlaylistUrl = '',
    dressCodeDescription = '',
    galleryPhotos = [],

    showCivil = false, showCeremony = true, showParty = true,
    showCountdown = true, showDressCode = true, showGifts = true,
    showGallery = true, showRSVP = true, showMusic = true,
  } = data || {};

  const th = theme?.styles || {};
  const assets = { ...DEFAULT_IMAGES, ...(theme?.assets || {}) };

  const dynamicStyles = {
    '--s13-accent':      th.primaryColor    || '#8B7355',
    '--s13-dark':        th.secondaryColor  || '#1A1A1A',
    '--s13-bg':          th.bgColor         || '#FFFFFF',
    '--s13-font-title':  th.fontFamilyTitle || "'Cormorant Garamond', serif",
    '--s13-font-body':   th.fontFamilyBody  || "'Lato', sans-serif",
    '--s13-overlay':     th.overlayColor    || 'rgba(0,0,0,0.5)',
  };

  const displayPhotos = galleryPhotos.length > 0 ? galleryPhotos : SAMPLE_PHOTOS;

  return (
    <div id="skeleton13-template" style={dynamicStyles}>

      {/* ── HERO PANORÁMICO ── */}
      <section
        id="section-protagonists"
        className="s13-hero"
        style={{ backgroundImage: `url(${assets.heroImage})` }}
      >
        <div className="s13-hero-overlay" />
        <div className="s13-hero-inner">
          {welcomePhrase && (
            <motion.p
              className="s13-eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
            >
              {welcomePhrase}
            </motion.p>
          )}
          <motion.h1
            className="s13-names"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7 }}
          >
            {name1}
            {name2 && (
              <>
                <br />
                <span className="s13-amp">&amp;</span>
                <br />
                {name2}
              </>
            )}
          </motion.h1>
          <motion.p
            className="s13-invite"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {invitePhrase}
          </motion.p>
          <motion.div
            className="s13-scroll-arrow"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ↓
          </motion.div>
        </div>
      </section>

      {/* ── SECCIONES LIMPIAS ── */}
      <div className="s13-body">

        {showCivil && (
          <motion.section id="section-civil" className="s13-event-row" {...fadeUp}>
            <div className="s13-event-num">01</div>
            <div className="s13-event-info">
              <p className="s13-event-label">Ceremonia Civil</p>
              {civilPlace   && <h2 className="s13-event-name">{civilPlace}</h2>}
              {civilAddress && <p className="s13-event-addr">{civilAddress}</p>}
              {civilDate    && <p className="s13-event-time">{civilDate}{civilTime && ` · ${civilTime}`}</p>}
              {!civilMapUnknown && civilMapUrl && civilMapUrl !== '#' && (
                <a href={civilMapUrl} target="_blank" rel="noopener noreferrer" className="s13-link">Ver mapa →</a>
              )}
            </div>
          </motion.section>
        )}

        {showCeremony && (
          <motion.section id="section-venue" className="s13-event-row" {...fadeUp}>
            <div className="s13-event-num">0{showCivil ? 2 : 1}</div>
            <div className="s13-event-info">
              <p className="s13-event-label">Ceremonia</p>
              {ceremonyPlace   && <h2 className="s13-event-name">{ceremonyPlace}</h2>}
              {ceremonyAddress && <p className="s13-event-addr">{ceremonyAddress}</p>}
              {ceremonyDate    && <p className="s13-event-time">{ceremonyDate}{ceremonyTime && ` · ${ceremonyTime}`}</p>}
              {!ceremonyMapUnknown && ceremonyMapUrl && ceremonyMapUrl !== '#' && (
                <a href={ceremonyMapUrl} target="_blank" rel="noopener noreferrer" className="s13-link">Ver mapa →</a>
              )}
            </div>
          </motion.section>
        )}

        {showParty && (
          <motion.section
            id={!showCeremony ? 'section-venue' : undefined}
            className="s13-event-row"
            {...fadeUp}
          >
            <div className="s13-event-num">0{(showCivil ? 1 : 0) + (showCeremony ? 1 : 0) + 1}</div>
            <div className="s13-event-info">
              <p className="s13-event-label">Recepción</p>
              {(eventVenue || partyPlace) && <h2 className="s13-event-name">{eventVenue || partyPlace}</h2>}
              {partyAddress && <p className="s13-event-addr">{partyAddress}</p>}
              {partyDateString && <p className="s13-event-time">{partyDateString}{partyTime && ` · ${partyTime}`}</p>}
              {!partyMapUnknown && partyMapUrl && partyMapUrl !== '#' && (
                <a href={partyMapUrl} target="_blank" rel="noopener noreferrer" className="s13-link">Ver mapa →</a>
              )}
            </div>
          </motion.section>
        )}

        {showCountdown && (
          <motion.div className="s13-countdown" {...fadeUp}>
            <CountdownBox eventDate={eventDate} />
          </motion.div>
        )}

        {/* ACCENT IMAGE DIVIDER */}
        <motion.div
          className="s13-accent-image"
          style={{ backgroundImage: `url(${assets.accentImage})` }}
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <div className="s13-accent-overlay" />
        </motion.div>

        {showDressCode && (
          <motion.section id="section-sections" className="s13-info-row" {...fadeUp}>
            <h3 className="s13-info-title">Dress Code</h3>
            <p className="s13-info-text">{dressCodeDescription || 'Elegante'}</p>
          </motion.section>
        )}

        {showGallery && (
          <motion.section id="section-gallery" className="s13-gallery" {...fadeUp}>
            <h3 className="s13-info-title">Nuestra Historia</h3>
            <div className="s13-gallery-grid">
              {displayPhotos.slice(0, 4).map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt={`Foto ${i + 1}`}
                  className="s13-gallery-img"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.09 }}
                />
              ))}
            </div>
          </motion.section>
        )}

        {showGifts && (
          <motion.section id="section-gifts" className="s13-info-row" {...fadeUp}>
            <h3 className="s13-info-title">Regalos</h3>
            <p className="s13-info-text">Tu presencia es el mejor regalo.</p>
            {(giftMode === 'cofre' || giftMode === 'both') && <p className="s13-info-text">Cofre en el salón.</p>}
            {(giftMode === 'cbu' || giftMode === 'both') && alias && <p className="s13-info-text">Alias: <strong>{alias}</strong></p>}
            {(giftMode === 'cbu' || giftMode === 'both') && bankCbu && <p className="s13-info-text">CBU: <strong>{bankCbu}</strong></p>}
          </motion.section>
        )}

        {showMusic && musicPlaylistUrl && (
          <motion.section className="s13-info-row" {...fadeUp}>
            <h3 className="s13-info-title">Playlist</h3>
            <a href={musicPlaylistUrl} target="_blank" rel="noopener noreferrer" className="s13-link">
              Escuchar playlist →
            </a>
          </motion.section>
        )}

        {showRSVP && (
          <motion.section id="section-confirm" className="s13-rsvp" {...fadeUp}>
            <h3 className="s13-rsvp-title">Confirmá tu asistencia</h3>
            <p className="s13-info-text">¡Te esperamos!</p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Confirmo mi asistencia 🎉')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="s13-btn"
            >
              Confirmar por WhatsApp
            </a>
          </motion.section>
        )}

      </div>

      <footer className="s13-footer">
        <p>{name1}{name2 && ` & ${name2}`}</p>
      </footer>
    </div>
  );
}

export default Skeleton13;

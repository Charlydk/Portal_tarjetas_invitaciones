import React from 'react';
import { motion } from 'framer-motion';
import { CountdownBox } from '../../components/invitation-pieces/CountdownBox';
import './Skeleton11.css';

const DEFAULT_IMAGES = {
  heroImage:     'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
  civilImage:    'https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=1200',
  ceremonyImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200',
  partyImage:    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200',
  countdownBg:   'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1200',
  galleryBg:     'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=1200',
  rsvpImage:     'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200',
};

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=500',
  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=500',
  'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=500',
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.85, ease: 'easeOut' },
};

function PhotoSection({ id, className, bgImage, overlay, children }) {
  return (
    <section
      id={id}
      className={`s11-photo-section ${className || ''}`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="s11-overlay" style={{ background: overlay }} />
      <motion.div className="s11-section-content" {...fadeUp}>
        {children}
      </motion.div>
    </section>
  );
}

function Skeleton11({ data, theme }) {
  const {
    name1 = 'Nombre',
    name2 = '',
    welcomePhrase = '',
    invitePhrase = 'Con todo nuestro amor te invitamos a celebrar',
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

  const overlay      = th.overlayColor    || 'rgba(0,0,0,0.45)';
  const accentColor  = th.primaryColor    || '#D4AF37';
  const fontTitle    = th.fontFamilyTitle || "'Cormorant Garamond', serif";
  const fontBody     = th.fontFamilyBody  || "'Lato', sans-serif";

  const dynamicStyles = {
    '--s11-accent':     accentColor,
    '--s11-font-title': fontTitle,
    '--s11-font-body':  fontBody,
    '--s11-overlay':    overlay,
  };

  const displayPhotos = galleryPhotos.length > 0 ? galleryPhotos : SAMPLE_PHOTOS;

  return (
    <div id="skeleton11-template" style={dynamicStyles}>

      {/* ── HERO ── */}
      <section
        id="section-protagonists"
        className="s11-hero"
        style={{ backgroundImage: `url(${assets.heroImage})` }}
      >
        <div className="s11-overlay" style={{ background: overlay }} />
        <div className="s11-hero-content">
          {welcomePhrase && (
            <motion.p
              className="s11-eyebrow"
              initial={{ opacity: 0, letterSpacing: '0.4em' }}
              animate={{ opacity: 1, letterSpacing: '0.22em' }}
              transition={{ duration: 1.4, delay: 0.3 }}
            >
              {welcomePhrase}
            </motion.p>
          )}
          <motion.h1
            className="s11-names"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.6 }}
          >
            {name1}
            {name2 && <><span className="s11-amp"> & </span>{name2}</>}
          </motion.h1>
          <motion.div
            className="s11-hero-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          />
          <motion.p
            className="s11-invite"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.4 }}
          >
            {invitePhrase}
          </motion.p>
          <motion.div
            className="s11-scroll-hint"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            ↓
          </motion.div>
        </div>
      </section>

      {/* ── CIVIL ── */}
      {showCivil && (
        <PhotoSection
          id="section-civil"
          bgImage={assets.civilImage}
          overlay={overlay}
        >
          <p className="s11-label">Ceremonia Civil</p>
          {civilPlace   && <h2 className="s11-venue">{civilPlace}</h2>}
          {civilAddress && <p className="s11-addr">{civilAddress}</p>}
          {civilDate    && <p className="s11-datetime">{civilDate}{civilTime && ` · ${civilTime}`}</p>}
          {!civilMapUnknown && civilMapUrl && civilMapUrl !== '#' && (
            <a href={civilMapUrl} target="_blank" rel="noopener noreferrer" className="s11-btn-ghost">
              Ver ubicación
            </a>
          )}
        </PhotoSection>
      )}

      {/* ── CEREMONIA ── */}
      {showCeremony && (
        <PhotoSection
          id="section-venue"
          bgImage={assets.ceremonyImage}
          overlay={overlay}
        >
          <p className="s11-label">Ceremonia Religiosa</p>
          {ceremonyPlace   && <h2 className="s11-venue">{ceremonyPlace}</h2>}
          {ceremonyAddress && <p className="s11-addr">{ceremonyAddress}</p>}
          {ceremonyDate    && <p className="s11-datetime">{ceremonyDate}{ceremonyTime && ` · ${ceremonyTime}`}</p>}
          {!ceremonyMapUnknown && ceremonyMapUrl && ceremonyMapUrl !== '#' && (
            <a href={ceremonyMapUrl} target="_blank" rel="noopener noreferrer" className="s11-btn-ghost">
              Ver ubicación
            </a>
          )}
        </PhotoSection>
      )}

      {/* ── FIESTA ── */}
      {showParty && (
        <PhotoSection
          id={!showCeremony ? 'section-venue' : undefined}
          bgImage={assets.partyImage}
          overlay={overlay}
        >
          <p className="s11-label">Recepción</p>
          {(eventVenue || partyPlace) && <h2 className="s11-venue">{eventVenue || partyPlace}</h2>}
          {partyAddress && <p className="s11-addr">{partyAddress}</p>}
          {partyDateString && <p className="s11-datetime">{partyDateString}{partyTime && ` · ${partyTime}`}</p>}
          {!partyMapUnknown && partyMapUrl && partyMapUrl !== '#' && (
            <a href={partyMapUrl} target="_blank" rel="noopener noreferrer" className="s11-btn-ghost">
              Ver ubicación
            </a>
          )}
        </PhotoSection>
      )}

      {/* ── COUNTDOWN ── */}
      {showCountdown && (
        <section
          className="s11-photo-section s11-countdown-section"
          style={{ backgroundImage: `url(${assets.countdownBg})` }}
        >
          <div className="s11-overlay" style={{ background: overlay }} />
          <motion.div className="s11-section-content" {...fadeUp}>
            <CountdownBox eventDate={eventDate} />
          </motion.div>
        </section>
      )}

      {/* ── INFO CARDS (dress code, gifts, music) ── */}
      <div className="s11-info-strip">
        {showDressCode && (
          <motion.div className="s11-info-card" id="section-sections" {...fadeUp}>
            <span className="s11-info-icon">👗</span>
            <h3>Dress Code</h3>
            <p>{dressCodeDescription || 'Elegante'}</p>
          </motion.div>
        )}

        {showGifts && (
          <motion.div className="s11-info-card" id="section-gifts" {...fadeUp}>
            <span className="s11-info-icon">💍</span>
            <h3>Regalos</h3>
            <p>Tu presencia es el mejor regalo.</p>
            {(giftMode === 'cofre' || giftMode === 'both') && <p>Cofre en el salón.</p>}
            {(giftMode === 'cbu' || giftMode === 'both') && alias && <p>Alias: <strong>{alias}</strong></p>}
            {(giftMode === 'cbu' || giftMode === 'both') && bankCbu && <p>CBU: <strong>{bankCbu}</strong></p>}
          </motion.div>
        )}

        {showMusic && musicPlaylistUrl && (
          <motion.div className="s11-info-card" {...fadeUp}>
            <span className="s11-info-icon">🎵</span>
            <h3>Playlist</h3>
            <a href={musicPlaylistUrl} target="_blank" rel="noopener noreferrer" className="s11-link">
              Escuchar →
            </a>
          </motion.div>
        )}
      </div>

      {/* ── GALERÍA ── */}
      {showGallery && (
        <section
          id="section-gallery"
          className="s11-photo-section s11-gallery-section"
          style={{ backgroundImage: `url(${assets.galleryBg})` }}
        >
          <div className="s11-overlay" style={{ background: 'rgba(0,0,0,0.6)' }} />
          <motion.div className="s11-section-content" {...fadeUp}>
            <p className="s11-label">Nuestra Historia</p>
            <div className="s11-gallery-grid">
              {displayPhotos.slice(0, 4).map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt={`Foto ${i + 1}`}
                  className="s11-gallery-img"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* ── RSVP ── */}
      {showRSVP && (
        <PhotoSection
          id="section-confirm"
          bgImage={assets.rsvpImage}
          overlay={overlay}
        >
          <p className="s11-label">¿Venís?</p>
          <h2 className="s11-venue">Confirmá tu asistencia</h2>
          <p className="s11-addr">¡Esperamos contar con tu presencia!</p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Confirmo mi asistencia 🎉')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="s11-btn-main"
          >
            Confirmar por WhatsApp
          </a>
        </PhotoSection>
      )}

      <footer className="s11-footer">
        <p>{name1}{name2 && ` & ${name2}`}</p>
      </footer>
    </div>
  );
}

export default Skeleton11;

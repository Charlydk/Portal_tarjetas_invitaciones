import React from 'react';
import { motion } from 'framer-motion';
import { CountdownBox } from '../../components/invitation-pieces/CountdownBox';
import './Skeleton7.css';

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=600',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600',
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

function Skeleton7({ data, theme }) {
  const {
    name1 = 'Nombre',
    name2 = '',
    welcomePhrase = '',
    invitePhrase = 'Te invitamos a compartir este día tan especial',
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

  const themeConfig = theme || {
    assets: {
      backgroundImage: '',
      ceremonyIcon: '💒', partyIcon: '🥂', dressCodeIcon: '🎩', giftIcon: '💎',
    },
    styles: {
      primaryColor: '#C8A400',
      secondaryColor: '#0d0d14',
      fontFamilyTitle: "'Playfair Display', serif",
      fontFamilyBody: "'Lato', sans-serif",
      textColor: '#f5f0e8',
    },
  };

  const { primaryColor, secondaryColor, fontFamilyTitle, fontFamilyBody, textColor } = themeConfig.styles;
  const { backgroundImage, ceremonyIcon, partyIcon, dressCodeIcon, giftIcon } = themeConfig.assets;

  const displayPhotos = galleryPhotos.length > 0 ? galleryPhotos : SAMPLE_PHOTOS;

  const dynamicStyles = {
    '--s7-gold':        primaryColor  || '#C8A400',
    '--s7-dark':        secondaryColor || '#0d0d14',
    '--s7-text':        textColor     || '#f5f0e8',
    '--s7-font-title':  fontFamilyTitle,
    '--s7-font-body':   fontFamilyBody,
  };

  let eventCount = 0;

  return (
    <div id="skeleton7-template" style={dynamicStyles}>

      {/* ── HERO ── */}
      <motion.div id="section-protagonists" className="s7-hero" {...fadeUp}>
        {backgroundImage && (
          <div className="s7-hero-bg" style={{ backgroundImage: `url(${backgroundImage})` }} />
        )}
        <div className="s7-hero-overlay" />
        <div className="s7-hero-content">
          {welcomePhrase && <p className="s7-eyebrow">{welcomePhrase}</p>}
          <h1 className="s7-names">
            {name1}
            {name2 && <><br /><span className="s7-and">&</span><br />{name2}</>}
          </h1>
          {invitePhrase && <p className="s7-invite">{invitePhrase}</p>}
        </div>
      </motion.div>

      {/* ── CUERPO ── */}
      <div className="s7-body">

        {showCivil && (() => { eventCount++; const n = eventCount; return (
          <motion.section id="section-civil" className="s7-event-card" key="civil" {...fadeUp}>
            <div className="s7-card-num">0{n}</div>
            <div className="s7-card-body">
              <h3 className="s7-card-title">Ceremonia Civil</h3>
              {civilPlace && <p>{civilPlace}</p>}
              {civilAddress && <p className="s7-addr">{civilAddress}</p>}
              {civilDate && <p className="s7-date-time">{civilDate}{civilTime && ` · ${civilTime}`}</p>}
              {!civilMapUnknown && civilMapUrl && civilMapUrl !== '#' && (
                <a href={civilMapUrl} target="_blank" rel="noopener noreferrer" className="s7-link">Ver mapa →</a>
              )}
            </div>
          </motion.section>
        )})()}

        {showCeremony && (() => { eventCount++; const n = eventCount; return (
          <motion.section id="section-venue" className="s7-event-card" key="ceremony" {...fadeUp}>
            <div className="s7-card-num">0{n}</div>
            <div className="s7-card-body">
              <span className="s7-icon">{ceremonyIcon}</span>
              <h3 className="s7-card-title">Ceremonia Religiosa</h3>
              {ceremonyPlace && <p>{ceremonyPlace}</p>}
              {ceremonyAddress && <p className="s7-addr">{ceremonyAddress}</p>}
              {ceremonyDate && <p className="s7-date-time">{ceremonyDate}{ceremonyTime && ` · ${ceremonyTime}`}</p>}
              {!ceremonyMapUnknown && ceremonyMapUrl && ceremonyMapUrl !== '#' && (
                <a href={ceremonyMapUrl} target="_blank" rel="noopener noreferrer" className="s7-link">Ver mapa →</a>
              )}
            </div>
          </motion.section>
        )})()}

        {showParty && (() => { eventCount++; const n = eventCount; return (
          <motion.section id={!showCeremony ? 'section-venue' : undefined} className="s7-event-card" key="party" {...fadeUp}>
            <div className="s7-card-num">0{n}</div>
            <div className="s7-card-body">
              <span className="s7-icon">{partyIcon}</span>
              <h3 className="s7-card-title">Fiesta</h3>
              {(eventVenue || partyPlace) && <p>{eventVenue || partyPlace}</p>}
              {partyAddress && <p className="s7-addr">{partyAddress}</p>}
              {partyDateString && <p className="s7-date-time">{partyDateString}{partyTime && ` · ${partyTime}`}</p>}
              {!partyMapUnknown && partyMapUrl && partyMapUrl !== '#' && (
                <a href={partyMapUrl} target="_blank" rel="noopener noreferrer" className="s7-link">Ver mapa →</a>
              )}
            </div>
          </motion.section>
        )})()}

        {showCountdown && (
          <div className="s7-countdown-wrap">
            <CountdownBox eventDate={eventDate} />
          </div>
        )}

        {showDressCode && (
          <motion.section id="section-sections" className="s7-info-card" {...fadeUp}>
            <span className="s7-icon">{dressCodeIcon}</span>
            <h3 className="s7-card-title">Dress Code</h3>
            <p>{dressCodeDescription || 'Elegante'}</p>
          </motion.section>
        )}

        {showGallery && (
          <motion.section id="section-gallery" className="s7-gallery-section" {...fadeUp}>
            <h3 className="s7-section-heading">Galería</h3>
            <div className="s7-gallery-grid">
              {displayPhotos.slice(0, 4).map((src, i) => (
                <img key={i} src={src} alt={`Foto ${i + 1}`} className="s7-gallery-img" />
              ))}
            </div>
          </motion.section>
        )}

        {showGifts && (
          <motion.section id="section-gifts" className="s7-info-card" {...fadeUp}>
            <span className="s7-icon">{giftIcon}</span>
            <h3 className="s7-card-title">Regalos</h3>
            <p>Tu presencia es el mejor regalo.</p>
            {(giftMode === 'cofre' || giftMode === 'both') && <p>💌 Cofre a disposición en el salón</p>}
            {(giftMode === 'cbu' || giftMode === 'both') && alias && <p>Alias: <strong>{alias}</strong></p>}
            {(giftMode === 'cbu' || giftMode === 'both') && bankCbu && <p>CBU: <strong>{bankCbu}</strong></p>}
          </motion.section>
        )}

        {showRSVP && (
          <motion.section id="section-confirm" className="s7-rsvp" {...fadeUp}>
            <h3 className="s7-card-title">Confirmá tu asistencia</h3>
            <p>¡Esperamos contar con tu presencia!</p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Confirmo mi asistencia 🎉')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="s7-btn"
            >
              Confirmar por WhatsApp
            </a>
          </motion.section>
        )}

        {showMusic && musicPlaylistUrl && (
          <motion.section id={!showRSVP ? 'section-confirm' : undefined} className="s7-info-card" {...fadeUp}>
            <h3 className="s7-card-title">🎵 Playlist</h3>
            <p>¿Qué canciones no pueden faltar?</p>
            <a
              href={musicPlaylistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="s7-btn s7-btn-outline"
            >
              Sugerir canción
            </a>
          </motion.section>
        )}

      </div>

      {/* ── FOOTER ── */}
      <motion.footer className="s7-footer" {...fadeUp}>
        <p className="s7-footer-names">{name1}{name2 && ` & ${name2}`}</p>
        <p className="s7-footer-credit">InvitaWeb © 2025</p>
      </motion.footer>

    </div>
  );
}

export default Skeleton7;

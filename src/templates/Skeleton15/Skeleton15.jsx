import React from 'react';
import { motion } from 'framer-motion';
import { CountdownBox } from '../../components/invitation-pieces/CountdownBox';
import ParticlesBackground from '../../components/ParticlesBackground';
import './Skeleton15.css';

const GOLD_PARTICLES = [
  [201, 169, 110],  // gold
  [220, 190, 140],  // light gold
  [160, 120,  64],  // dark gold
  [250, 247, 242],  // cream
  [235, 220, 190],  // warm white
];

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=600',
  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600',
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, ease: 'easeOut' },
};

function Divider() {
  return (
    <div className="s15-divider">
      <motion.div
        className="s15-divider-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ transformOrigin: 'right center' }}
      />
      <div className="s15-divider-dot" />
      <motion.div
        className="s15-divider-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ transformOrigin: 'left center' }}
      />
    </div>
  );
}

function Skeleton15({ data, theme }) {
  const {
    name1 = 'Valentina',
    name2 = 'Maximiliano',
    welcomePhrase = '',
    invitePhrase = 'Junto a sus familias, tienen el honor de invitarte a celebrar su matrimonio',
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
  const dynamicStyles = {
    '--s15-gold':       th.primaryColor    || '#C9A96E',
    '--s15-dark':       th.secondaryColor  || '#2C2416',
    '--s15-font-title': th.fontFamilyTitle || "'Playfair Display', serif",
    '--s15-font-body':  th.fontFamilyBody  || "'EB Garamond', serif",
  };

  const displayPhotos = galleryPhotos.length > 0 ? galleryPhotos : SAMPLE_PHOTOS;

  const bandDateLabel = partyDateString || ceremonyDate || '';
  const eventDay = eventDate ? new Date(eventDate).getDate() : '';

  return (
    <div id="skeleton15-template" style={dynamicStyles}>

      <ParticlesBackground colors={GOLD_PARTICLES} count={60} />

      {/* ── HERO ── */}
      <section id="section-protagonists" className="s15-hero">
        <div className="s15-hero-frame" />
        <div className="s15-hero-frame-inner" />

        <motion.div
          className="s15-hero-top-label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="s15-label">{welcomePhrase || 'Nos Casamos'}</span>
        </motion.div>

        <motion.h1
          className="s15-names"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          {name1}
          {name2 && <span className="s15-amp">&</span>}
          {name2}
        </motion.h1>

        <Divider />

        <motion.p
          className="s15-hero-invite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {invitePhrase}
        </motion.p>

        <motion.div
          className="s15-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <span>Deslizá</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >↓</motion.span>
        </motion.div>
      </section>

      {/* ── DATE BAND ── */}
      <motion.div className="s15-date-band" {...fadeUp}>
        <span className="s15-band-label">{ceremonyDate ? 'Ceremonia' : 'Fecha del evento'}</span>
        {eventDay && (
          <p className="s15-band-date-day">{String(eventDay).padStart(2, '0')}</p>
        )}
        {bandDateLabel && (
          <span className="s15-band-date-full">{bandDateLabel}</span>
        )}
      </motion.div>

      {/* ── BODY ── */}
      <div className="s15-body">

        {showCountdown && eventDate && (
          <motion.div className="s15-section" id="section-countdown" {...fadeUp}>
            <CountdownBox eventDate={eventDate} />
          </motion.div>
        )}

        {showCivil && (
          <motion.section id="section-civil" className="s15-section" {...fadeUp}>
            <span className="s15-label">Ceremonia Civil</span>
            <Divider />
            <h3 className="s15-section-title">{civilPlace}</h3>
            {civilAddress  && <p className="s15-addr">{civilAddress}</p>}
            {civilDate     && <p className="s15-datetime">{civilDate}{civilTime && ` · ${civilTime}`}</p>}
            {!civilMapUnknown && civilMapUrl && civilMapUrl !== '#' && (
              <a href={civilMapUrl} target="_blank" rel="noopener noreferrer" className="s15-map-link">Ver ubicación →</a>
            )}
          </motion.section>
        )}

        {showCeremony && (
          <motion.section id="section-venue" className="s15-section" {...fadeUp}>
            <span className="s15-label">Ceremonia Religiosa</span>
            <Divider />
            <h3 className="s15-section-title">{ceremonyPlace}</h3>
            {ceremonyAddress && <p className="s15-addr">{ceremonyAddress}</p>}
            {ceremonyDate   && <p className="s15-datetime">{ceremonyDate}{ceremonyTime && ` · ${ceremonyTime}`}</p>}
            {!ceremonyMapUnknown && ceremonyMapUrl && ceremonyMapUrl !== '#' && (
              <a href={ceremonyMapUrl} target="_blank" rel="noopener noreferrer" className="s15-map-link">Ver ubicación →</a>
            )}
          </motion.section>
        )}

        {showParty && (
          <motion.section
            id={!showCeremony ? 'section-venue' : undefined}
            className="s15-section"
            {...fadeUp}
          >
            <span className="s15-label">Recepción</span>
            <Divider />
            <h3 className="s15-section-title">{eventVenue || partyPlace}</h3>
            {partyAddress    && <p className="s15-addr">{partyAddress}</p>}
            {partyDateString && <p className="s15-datetime">{partyDateString}{partyTime && ` · ${partyTime}`}</p>}
            {!partyMapUnknown && partyMapUrl && partyMapUrl !== '#' && (
              <a href={partyMapUrl} target="_blank" rel="noopener noreferrer" className="s15-map-link">Ver ubicación →</a>
            )}
          </motion.section>
        )}

        {showDressCode && (
          <motion.section id="section-dresscode" className="s15-section" {...fadeUp}>
            <span className="s15-label">Dress Code</span>
            <Divider />
            <p className="s15-body-text">{dressCodeDescription || 'Formal · Tonos neutros y pasteles'}</p>
          </motion.section>
        )}

        {showGallery && (
          <motion.section id="section-gallery" className="s15-section" {...fadeUp}>
            <span className="s15-label">Galería</span>
            <Divider />
            <div className="s15-gallery-grid">
              {displayPhotos.slice(0, 4).map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt={`Foto ${i + 1}`}
                  className="s15-gallery-img"
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                />
              ))}
            </div>
          </motion.section>
        )}

        {showGifts && (
          <motion.section id="section-gifts" className="s15-section" {...fadeUp}>
            <span className="s15-label">Regalos</span>
            <Divider />
            <p className="s15-body-text">Tu presencia es el mejor regalo.</p>
            {(giftMode === 'cofre' || giftMode === 'both') && (
              <p className="s15-body-text">Cofre a disposición en el salón.</p>
            )}
            {(giftMode === 'cbu' || giftMode === 'both') && alias && (
              <p className="s15-body-text">Alias: <strong>{alias}</strong></p>
            )}
            {(giftMode === 'cbu' || giftMode === 'both') && bankCbu && (
              <p className="s15-body-text">CBU: <strong>{bankCbu}</strong></p>
            )}
          </motion.section>
        )}

        {showMusic && musicPlaylistUrl && (
          <motion.section id="section-music" className="s15-section" {...fadeUp}>
            <span className="s15-label">Playlist</span>
            <Divider />
            <a
              href={musicPlaylistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="s15-btn-outline"
            >
              Escuchar playlist
            </a>
          </motion.section>
        )}

        {showRSVP && (
          <motion.section id="section-confirm" className="s15-section" {...fadeUp}>
            <span className="s15-label">Confirmar Asistencia</span>
            <Divider />
            <p className="s15-body-text">¡Esperamos contar con tu presencia!</p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Confirmo mi asistencia 🎉')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="s15-btn"
            >
              Confirmar por WhatsApp
            </a>
          </motion.section>
        )}

      </div>

      <footer className="s15-footer">
        <p>{name1}{name2 && ` & ${name2}`}</p>
      </footer>
    </div>
  );
}

export default Skeleton15;

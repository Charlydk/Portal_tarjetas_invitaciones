import React from 'react';
import { motion } from 'framer-motion';
import { CountdownBox } from '../../components/invitation-pieces/CountdownBox';
import './Skeleton12.css';

const DEFAULT_IMAGES = {
  heroImage:     'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?q=80&w=1200',
  civilImage:    'https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=900',
  ceremonyImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900',
  partyImage:    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=900',
  rsvpImage:     'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=900',
};

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=500',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=500',
  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=500',
  'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=500',
];

const slideLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.85, ease: 'easeOut' },
};

const slideRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.85, ease: 'easeOut', delay: 0.15 },
};

// imagen izquierda, texto derecha (o invertido)
function SplitSection({ id, image, imageLeft = true, overlay = 'rgba(0,0,0,0.3)', children }) {
  return (
    <section id={id} className={`s12-split ${imageLeft ? '' : 's12-split--reversed'}`}>
      <motion.div
        className="s12-split-image"
        style={{ backgroundImage: `url(${image})` }}
        {...(imageLeft ? slideLeft : slideRight)}
      >
        <div className="s12-split-overlay" style={{ background: overlay }} />
      </motion.div>
      <motion.div
        className="s12-split-text"
        {...(imageLeft ? slideRight : slideLeft)}
      >
        {children}
      </motion.div>
    </section>
  );
}

function Skeleton12({ data, theme }) {
  const {
    name1 = 'Nombre',
    name2 = '',
    welcomePhrase = '',
    invitePhrase = 'Queremos que seas parte de este momento único',
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
  const overlay = th.overlayColor || 'rgba(0,0,0,0.3)';

  const dynamicStyles = {
    '--s12-accent':      th.primaryColor    || '#C4A35A',
    '--s12-bg':          th.secondaryColor  || '#FAFAF8',
    '--s12-text':        th.textColor       || '#2C2C2C',
    '--s12-font-title':  th.fontFamilyTitle || "'Playfair Display', serif",
    '--s12-font-body':   th.fontFamilyBody  || "'Lato', sans-serif",
  };

  const displayPhotos = galleryPhotos.length > 0 ? galleryPhotos : SAMPLE_PHOTOS;

  return (
    <div id="skeleton12-template" style={dynamicStyles}>

      {/* ── HERO ── */}
      <section
        id="section-protagonists"
        className="s12-hero"
        style={{ backgroundImage: `url(${assets.heroImage})` }}
      >
        <div className="s12-hero-overlay" />
        <motion.div
          className="s12-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
        >
          {welcomePhrase && <p className="s12-eyebrow">{welcomePhrase}</p>}
          <h1 className="s12-names">
            {name1}
            {name2 && <><span className="s12-amp"> & </span>{name2}</>}
          </h1>
          <p className="s12-invite">{invitePhrase}</p>
        </motion.div>
      </section>

      {/* ── CIVIL ── */}
      {showCivil && (
        <SplitSection id="section-civil" image={assets.civilImage} imageLeft overlay={overlay}>
          <span className="s12-tag">Civil</span>
          {civilPlace   && <h2 className="s12-event-title">{civilPlace}</h2>}
          {civilAddress && <p className="s12-detail">{civilAddress}</p>}
          {civilDate    && <p className="s12-date">{civilDate}{civilTime && ` · ${civilTime}`}</p>}
          {!civilMapUnknown && civilMapUrl && civilMapUrl !== '#' && (
            <a href={civilMapUrl} target="_blank" rel="noopener noreferrer" className="s12-link">Ver mapa →</a>
          )}
        </SplitSection>
      )}

      {/* ── CEREMONIA ── */}
      {showCeremony && (
        <SplitSection id="section-venue" image={assets.ceremonyImage} imageLeft={false} overlay={overlay}>
          <span className="s12-tag">Ceremonia</span>
          {ceremonyPlace   && <h2 className="s12-event-title">{ceremonyPlace}</h2>}
          {ceremonyAddress && <p className="s12-detail">{ceremonyAddress}</p>}
          {ceremonyDate    && <p className="s12-date">{ceremonyDate}{ceremonyTime && ` · ${ceremonyTime}`}</p>}
          {!ceremonyMapUnknown && ceremonyMapUrl && ceremonyMapUrl !== '#' && (
            <a href={ceremonyMapUrl} target="_blank" rel="noopener noreferrer" className="s12-link">Ver mapa →</a>
          )}
        </SplitSection>
      )}

      {/* ── FIESTA ── */}
      {showParty && (
        <SplitSection
          id={!showCeremony ? 'section-venue' : undefined}
          image={assets.partyImage}
          imageLeft
          overlay={overlay}
        >
          <span className="s12-tag">Recepción</span>
          {(eventVenue || partyPlace) && <h2 className="s12-event-title">{eventVenue || partyPlace}</h2>}
          {partyAddress && <p className="s12-detail">{partyAddress}</p>}
          {partyDateString && <p className="s12-date">{partyDateString}{partyTime && ` · ${partyTime}`}</p>}
          {!partyMapUnknown && partyMapUrl && partyMapUrl !== '#' && (
            <a href={partyMapUrl} target="_blank" rel="noopener noreferrer" className="s12-link">Ver mapa →</a>
          )}
        </SplitSection>
      )}

      {/* ── COUNTDOWN ── */}
      {showCountdown && (
        <motion.div
          className="s12-countdown-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <CountdownBox eventDate={eventDate} />
        </motion.div>
      )}

      {/* ── EXTRAS ── */}
      <div className="s12-extras" id="section-sections">
        {showDressCode && (
          <motion.div
            className="s12-extra-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3>Dress Code</h3>
            <p>{dressCodeDescription || 'Elegante'}</p>
          </motion.div>
        )}
        {showGifts && (
          <motion.div
            className="s12-extra-card"
            id="section-gifts"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h3>Regalos</h3>
            <p>Tu presencia es nuestro mejor regalo.</p>
            {(giftMode === 'cofre' || giftMode === 'both') && <p>Cofre en el salón.</p>}
            {(giftMode === 'cbu' || giftMode === 'both') && alias && <p>Alias: <strong>{alias}</strong></p>}
            {(giftMode === 'cbu' || giftMode === 'both') && bankCbu && <p>CBU: <strong>{bankCbu}</strong></p>}
          </motion.div>
        )}
        {showMusic && musicPlaylistUrl && (
          <motion.div
            className="s12-extra-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3>Playlist</h3>
            <a href={musicPlaylistUrl} target="_blank" rel="noopener noreferrer" className="s12-link">
              Escuchar →
            </a>
          </motion.div>
        )}
      </div>

      {/* ── GALERÍA ── */}
      {showGallery && (
        <motion.section
          id="section-gallery"
          className="s12-gallery"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <h3 className="s12-gallery-title">Nuestra Historia</h3>
          <div className="s12-gallery-grid">
            {displayPhotos.slice(0, 4).map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt={`Foto ${i + 1}`}
                className="s12-gallery-img"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              />
            ))}
          </div>
        </motion.section>
      )}

      {/* ── RSVP ── */}
      {showRSVP && (
        <SplitSection id="section-confirm" image={assets.rsvpImage} imageLeft={false} overlay={overlay}>
          <span className="s12-tag">¿Venís?</span>
          <h2 className="s12-event-title">Confirmá tu asistencia</h2>
          <p className="s12-detail">¡Te esperamos!</p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Confirmo mi asistencia 🎉')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="s12-btn"
          >
            Confirmar por WhatsApp
          </a>
        </SplitSection>
      )}

      <footer className="s12-footer">
        <p>{name1}{name2 && ` & ${name2}`}</p>
      </footer>
    </div>
  );
}

export default Skeleton12;

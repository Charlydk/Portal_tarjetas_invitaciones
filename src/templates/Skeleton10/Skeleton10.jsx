import React from 'react';
import { motion } from 'framer-motion';
import { CountdownBox } from '../../components/invitation-pieces/CountdownBox';
import './Skeleton10.css';

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=600',
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=600',
  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600',
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: 'easeOut' },
};

// Rama izquierda — eucaliptus entrando desde la izquierda
function BranchLeft({ delay = 0, viewport = false }) {
  const motionProps = viewport
    ? {
        initial: { x: -110, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        viewport: { once: true },
        transition: { duration: 1.1, ease: 'easeOut', delay },
      }
    : {
        initial: { x: -110, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration: 1.1, ease: 'easeOut', delay },
      };

  return (
    <motion.div className="s10-branch-left" {...motionProps}>
      <svg viewBox="0 0 140 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Tallo principal */}
        <path d="M8 280 Q30 220 50 160 Q70 100 90 40" stroke="#7A6B5A" strokeWidth="2" fill="none"/>
        {/* Ramitas secundarias */}
        <path d="M35 210 Q55 190 75 175" stroke="#7A6B5A" strokeWidth="1.2" fill="none" opacity="0.7"/>
        <path d="M55 155 Q80 130 105 120" stroke="#7A6B5A" strokeWidth="1.2" fill="none" opacity="0.7"/>
        <path d="M70 105 Q95 85 118 75" stroke="#7A6B5A" strokeWidth="1" fill="none" opacity="0.65"/>
        {/* Hojas eucaliptus — izquierda */}
        <ellipse cx="30" cy="235" rx="16" ry="8" fill="#8FAF7E" opacity="0.75" transform="rotate(-25 30 235)"/>
        <ellipse cx="20" cy="255" rx="14" ry="7" fill="#9CBD8A" opacity="0.65" transform="rotate(-40 20 255)"/>
        <ellipse cx="50" cy="185" rx="15" ry="7" fill="#7A9B6E" opacity="0.7" transform="rotate(-15 50 185)"/>
        <ellipse cx="65" cy="170" rx="13" ry="6" fill="#8FAF7E" opacity="0.65" transform="rotate(-30 65 170)"/>
        <ellipse cx="80" cy="140" rx="14" ry="6" fill="#9CBD8A" opacity="0.7" transform="rotate(-20 80 140)"/>
        <ellipse cx="95" cy="128" rx="13" ry="6" fill="#7A9B6E" opacity="0.65" transform="rotate(-35 95 128)"/>
        <ellipse cx="100" cy="100" rx="15" ry="7" fill="#8FAF7E" opacity="0.7" transform="rotate(-15 100 100)"/>
        <ellipse cx="112" cy="85" rx="12" ry="5" fill="#9CBD8A" opacity="0.65" transform="rotate(-25 112 85)"/>
        <ellipse cx="88" cy="52" rx="13" ry="6" fill="#7A9B6E" opacity="0.7" transform="rotate(-10 88 52)"/>
        <ellipse cx="102" cy="38" rx="11" ry="5" fill="#8FAF7E" opacity="0.65" transform="rotate(-30 102 38)"/>
        {/* Hojas pequeñas dispersas */}
        <ellipse cx="42" cy="205" rx="10" ry="5" fill="#9CBD8A" opacity="0.55" transform="rotate(20 42 205)"/>
        <ellipse cx="72" cy="120" rx="9" ry="4" fill="#8FAF7E" opacity="0.5" transform="rotate(-45 72 120)"/>
      </svg>
    </motion.div>
  );
}

// Rama derecha — espejada
function BranchRight({ delay = 0, viewport = false }) {
  const motionProps = viewport
    ? {
        initial: { x: 110, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        viewport: { once: true },
        transition: { duration: 1.1, ease: 'easeOut', delay },
      }
    : {
        initial: { x: 110, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration: 1.1, ease: 'easeOut', delay },
      };

  return (
    <motion.div className="s10-branch-right" {...motionProps}>
      <svg viewBox="0 0 140 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
        <path d="M8 280 Q30 220 50 160 Q70 100 90 40" stroke="#7A6B5A" strokeWidth="2" fill="none"/>
        <path d="M35 210 Q55 190 75 175" stroke="#7A6B5A" strokeWidth="1.2" fill="none" opacity="0.7"/>
        <path d="M55 155 Q80 130 105 120" stroke="#7A6B5A" strokeWidth="1.2" fill="none" opacity="0.7"/>
        <path d="M70 105 Q95 85 118 75" stroke="#7A6B5A" strokeWidth="1" fill="none" opacity="0.65"/>
        <ellipse cx="30" cy="235" rx="16" ry="8" fill="#8FAF7E" opacity="0.75" transform="rotate(-25 30 235)"/>
        <ellipse cx="20" cy="255" rx="14" ry="7" fill="#9CBD8A" opacity="0.65" transform="rotate(-40 20 255)"/>
        <ellipse cx="50" cy="185" rx="15" ry="7" fill="#7A9B6E" opacity="0.7" transform="rotate(-15 50 185)"/>
        <ellipse cx="65" cy="170" rx="13" ry="6" fill="#8FAF7E" opacity="0.65" transform="rotate(-30 65 170)"/>
        <ellipse cx="80" cy="140" rx="14" ry="6" fill="#9CBD8A" opacity="0.7" transform="rotate(-20 80 140)"/>
        <ellipse cx="95" cy="128" rx="13" ry="6" fill="#7A9B6E" opacity="0.65" transform="rotate(-35 95 128)"/>
        <ellipse cx="100" cy="100" rx="15" ry="7" fill="#8FAF7E" opacity="0.7" transform="rotate(-15 100 100)"/>
        <ellipse cx="112" cy="85" rx="12" ry="5" fill="#9CBD8A" opacity="0.65" transform="rotate(-25 112 85)"/>
        <ellipse cx="88" cy="52" rx="13" ry="6" fill="#7A9B6E" opacity="0.7" transform="rotate(-10 88 52)"/>
        <ellipse cx="102" cy="38" rx="11" ry="5" fill="#8FAF7E" opacity="0.65" transform="rotate(-30 102 38)"/>
        <ellipse cx="42" cy="205" rx="10" ry="5" fill="#9CBD8A" opacity="0.55" transform="rotate(20 42 205)"/>
        <ellipse cx="72" cy="120" rx="9" ry="4" fill="#8FAF7E" opacity="0.5" transform="rotate(-45 72 120)"/>
      </svg>
    </motion.div>
  );
}

// Separador con hojita central
function LeafDivider() {
  return (
    <div className="s10-leaf-divider">
      <div className="s10-ld-line" />
      <span className="s10-ld-leaf">🌿</span>
      <div className="s10-ld-line" />
    </div>
  );
}

function Skeleton10({ data, theme }) {
  const {
    name1 = 'Nombre',
    name2 = '',
    welcomePhrase = '',
    invitePhrase = 'Queremos compartir con vos el día más especial de nuestras vidas',
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
    '--s10-sage':      th.primaryColor   || '#7A8C6E',
    '--s10-brown':     th.secondaryColor || '#5C3D2E',
    '--s10-bg':        '#F5F0E8',
    '--s10-font-title':th.fontFamilyTitle || "'Playfair Display', serif",
    '--s10-font-body': th.fontFamilyBody  || "'Lato', sans-serif",
  };

  const displayPhotos = galleryPhotos.length > 0 ? galleryPhotos : SAMPLE_PHOTOS;

  return (
    <div id="skeleton10-template" style={dynamicStyles}>

      {/* HERO — ramas en modo animate (siempre visibles desde el inicio) */}
      <section id="section-protagonists" className="s10-hero">
        <BranchLeft delay={0.3} viewport={false} />
        <BranchRight delay={0.5} viewport={false} />

        <div className="s10-hero-content">
          {welcomePhrase && (
            <motion.p className="s10-eyebrow" {...fadeUp}>{welcomePhrase}</motion.p>
          )}
          <motion.h1
            className="s10-names"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.7 }}
          >
            {name1}
            {name2 && <><span className="s10-amp"> & </span>{name2}</>}
          </motion.h1>
          <LeafDivider />
          <motion.p
            className="s10-invite-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.1 }}
          >
            {invitePhrase}
          </motion.p>
        </div>
      </section>

      {/* BODY */}
      <div className="s10-body">

        {showCountdown && (
          <motion.div className="s10-section" {...fadeUp}>
            <CountdownBox eventDate={eventDate} />
          </motion.div>
        )}

        {showCivil && (
          <motion.section id="section-civil" className="s10-section s10-event-wrap" {...fadeUp}>
            <BranchLeft delay={0} viewport />
            <BranchRight delay={0.2} viewport />
            <div className="s10-event-content">
              <LeafDivider />
              <h3 className="s10-section-title">Ceremonia Civil</h3>
              {civilPlace   && <p className="s10-venue">{civilPlace}</p>}
              {civilAddress && <p className="s10-addr">{civilAddress}</p>}
              {civilDate    && <p className="s10-datetime">{civilDate}{civilTime && ` · ${civilTime}`}</p>}
              {!civilMapUnknown && civilMapUrl && civilMapUrl !== '#' && (
                <a href={civilMapUrl} target="_blank" rel="noopener noreferrer" className="s10-link">Ver ubicación →</a>
              )}
              <LeafDivider />
            </div>
          </motion.section>
        )}

        {showCeremony && (
          <motion.section id="section-venue" className="s10-section s10-event-wrap" {...fadeUp}>
            <BranchLeft delay={0} viewport />
            <BranchRight delay={0.2} viewport />
            <div className="s10-event-content">
              <LeafDivider />
              <h3 className="s10-section-title">Ceremonia</h3>
              {ceremonyPlace   && <p className="s10-venue">{ceremonyPlace}</p>}
              {ceremonyAddress && <p className="s10-addr">{ceremonyAddress}</p>}
              {ceremonyDate    && <p className="s10-datetime">{ceremonyDate}{ceremonyTime && ` · ${ceremonyTime}`}</p>}
              {!ceremonyMapUnknown && ceremonyMapUrl && ceremonyMapUrl !== '#' && (
                <a href={ceremonyMapUrl} target="_blank" rel="noopener noreferrer" className="s10-link">Ver ubicación →</a>
              )}
              <LeafDivider />
            </div>
          </motion.section>
        )}

        {showParty && (
          <motion.section
            id={!showCeremony ? 'section-venue' : undefined}
            className="s10-section s10-event-wrap"
            {...fadeUp}
          >
            <BranchLeft delay={0} viewport />
            <BranchRight delay={0.2} viewport />
            <div className="s10-event-content">
              <LeafDivider />
              <h3 className="s10-section-title">Recepción</h3>
              {(eventVenue || partyPlace) && <p className="s10-venue">{eventVenue || partyPlace}</p>}
              {partyAddress && <p className="s10-addr">{partyAddress}</p>}
              {partyDateString && <p className="s10-datetime">{partyDateString}{partyTime && ` · ${partyTime}`}</p>}
              {!partyMapUnknown && partyMapUrl && partyMapUrl !== '#' && (
                <a href={partyMapUrl} target="_blank" rel="noopener noreferrer" className="s10-link">Ver ubicación →</a>
              )}
              <LeafDivider />
            </div>
          </motion.section>
        )}

        {showDressCode && (
          <motion.section id="section-sections" className="s10-section" {...fadeUp}>
            <h3 className="s10-section-title">Dress Code</h3>
            <p className="s10-body-text">{dressCodeDescription || 'Elegante natural'}</p>
          </motion.section>
        )}

        {showGallery && (
          <motion.section id="section-gallery" className="s10-section" {...fadeUp}>
            <h3 className="s10-section-title">Nuestra Historia</h3>
            <div className="s10-gallery-grid">
              {displayPhotos.slice(0, 4).map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt={`Foto ${i + 1}`}
                  className="s10-gallery-img"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                />
              ))}
            </div>
          </motion.section>
        )}

        {showGifts && (
          <motion.section id="section-gifts" className="s10-section" {...fadeUp}>
            <h3 className="s10-section-title">Regalos</h3>
            <p className="s10-body-text">Tu presencia es el mejor regalo.</p>
            {(giftMode === 'cofre' || giftMode === 'both') && (
              <p className="s10-body-text">Cofre a disposición en el salón.</p>
            )}
            {(giftMode === 'cbu' || giftMode === 'both') && alias && (
              <p className="s10-body-text">Alias: <strong>{alias}</strong></p>
            )}
            {(giftMode === 'cbu' || giftMode === 'both') && bankCbu && (
              <p className="s10-body-text">CBU: <strong>{bankCbu}</strong></p>
            )}
          </motion.section>
        )}

        {showMusic && musicPlaylistUrl && (
          <motion.section className="s10-section" {...fadeUp}>
            <h3 className="s10-section-title">Playlist</h3>
            <a href={musicPlaylistUrl} target="_blank" rel="noopener noreferrer" className="s10-btn-outline">
              Escuchar playlist
            </a>
          </motion.section>
        )}

        {showRSVP && (
          <motion.section id="section-confirm" className="s10-section s10-rsvp" {...fadeUp}>
            <LeafDivider />
            <h3 className="s10-section-title">Confirmá tu asistencia</h3>
            <p className="s10-body-text">¡Esperamos contar con tu presencia!</p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Confirmo mi asistencia 🌿')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="s10-btn"
            >
              Confirmar por WhatsApp
            </a>
            <LeafDivider />
          </motion.section>
        )}

      </div>

      <footer className="s10-footer">
        <span>🌿</span>
        <p>{name1}{name2 && ` & ${name2}`}</p>
        <span>🌿</span>
      </footer>
    </div>
  );
}

export default Skeleton10;

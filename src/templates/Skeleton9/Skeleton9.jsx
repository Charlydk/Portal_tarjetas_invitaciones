import React from 'react';
import { motion } from 'framer-motion';
import { CountdownBox } from '../../components/invitation-pieces/CountdownBox';
import './Skeleton9.css';

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=600',
  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600',
  'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=600',
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.75, ease: 'easeOut' },
};

// Flor SVG inline — rose top-left corner
function FlowerCornerLeft({ animate }) {
  return (
    <motion.div
      className="s9-flower-left"
      initial={{ x: -80, opacity: 0 }}
      animate={animate ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
      transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
    >
      <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ramas */}
        <path d="M10 200 Q40 140 80 100 Q110 70 140 20" stroke="#8B6B5E" strokeWidth="1.5" fill="none" opacity="0.6"/>
        <path d="M30 190 Q55 150 70 110" stroke="#8B6B5E" strokeWidth="1" fill="none" opacity="0.5"/>
        {/* Hojas */}
        <ellipse cx="70" cy="110" rx="14" ry="8" fill="#9CAF88" opacity="0.7" transform="rotate(-30 70 110)"/>
        <ellipse cx="100" cy="75" rx="12" ry="7" fill="#9CAF88" opacity="0.65" transform="rotate(-50 100 75)"/>
        <ellipse cx="55" cy="140" rx="10" ry="6" fill="#9CAF88" opacity="0.6" transform="rotate(-20 55 140)"/>
        {/* Rosa grande */}
        <circle cx="130" cy="28" r="14" fill="#D4A5B0" opacity="0.85"/>
        <circle cx="130" cy="28" r="10" fill="#C4819B" opacity="0.9"/>
        <circle cx="130" cy="28" r="6" fill="#B87093" opacity="0.95"/>
        {/* Pétalos rosa grande */}
        <ellipse cx="130" cy="14" rx="7" ry="10" fill="#D4A5B0" opacity="0.6"/>
        <ellipse cx="144" cy="28" rx="10" ry="7" fill="#D4A5B0" opacity="0.6"/>
        <ellipse cx="116" cy="28" rx="10" ry="7" fill="#D4A5B0" opacity="0.6"/>
        <ellipse cx="130" cy="42" rx="7" ry="10" fill="#D4A5B0" opacity="0.6"/>
        {/* Rosa pequeña */}
        <circle cx="82" cy="95" r="9" fill="#E8C5CE" opacity="0.8"/>
        <circle cx="82" cy="95" r="5" fill="#C4819B" opacity="0.85"/>
        {/* Botones florales */}
        <circle cx="50" cy="148" r="4" fill="#D4A5B0" opacity="0.7"/>
        <circle cx="63" cy="128" r="3" fill="#E8C5CE" opacity="0.7"/>
      </svg>
    </motion.div>
  );
}

function FlowerCornerRight({ animate }) {
  return (
    <motion.div
      className="s9-flower-right"
      initial={{ x: 80, opacity: 0 }}
      animate={animate ? { x: 0, opacity: 1 } : { x: 80, opacity: 0 }}
      transition={{ duration: 1.1, ease: 'easeOut', delay: 0.4 }}
    >
      <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ramas (espejadas) */}
        <path d="M150 200 Q120 140 80 100 Q50 70 20 20" stroke="#8B6B5E" strokeWidth="1.5" fill="none" opacity="0.6"/>
        <path d="M130 190 Q105 150 90 110" stroke="#8B6B5E" strokeWidth="1" fill="none" opacity="0.5"/>
        {/* Hojas */}
        <ellipse cx="90" cy="110" rx="14" ry="8" fill="#9CAF88" opacity="0.7" transform="rotate(30 90 110)"/>
        <ellipse cx="60" cy="75" rx="12" ry="7" fill="#9CAF88" opacity="0.65" transform="rotate(50 60 75)"/>
        <ellipse cx="105" cy="140" rx="10" ry="6" fill="#9CAF88" opacity="0.6" transform="rotate(20 105 140)"/>
        {/* Rosa grande */}
        <circle cx="30" cy="28" r="14" fill="#D4A5B0" opacity="0.85"/>
        <circle cx="30" cy="28" r="10" fill="#C4819B" opacity="0.9"/>
        <circle cx="30" cy="28" r="6" fill="#B87093" opacity="0.95"/>
        <ellipse cx="30" cy="14" rx="7" ry="10" fill="#D4A5B0" opacity="0.6"/>
        <ellipse cx="44" cy="28" rx="10" ry="7" fill="#D4A5B0" opacity="0.6"/>
        <ellipse cx="16" cy="28" rx="10" ry="7" fill="#D4A5B0" opacity="0.6"/>
        <ellipse cx="30" cy="42" rx="7" ry="10" fill="#D4A5B0" opacity="0.6"/>
        {/* Rosa pequeña */}
        <circle cx="78" cy="95" r="9" fill="#E8C5CE" opacity="0.8"/>
        <circle cx="78" cy="95" r="5" fill="#C4819B" opacity="0.85"/>
        <circle cx="110" cy="148" r="4" fill="#D4A5B0" opacity="0.7"/>
        <circle cx="97" cy="128" r="3" fill="#E8C5CE" opacity="0.7"/>
      </svg>
    </motion.div>
  );
}

// Flores laterales para secciones (más pequeñas, entran desde el lado)
function SideFloralLeft() {
  return (
    <motion.div
      className="s9-side-left"
      initial={{ x: -60, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 120 Q30 80 55 40" stroke="#8B6B5E" strokeWidth="1.2" fill="none" opacity="0.5"/>
        <ellipse cx="40" cy="75" rx="10" ry="6" fill="#9CAF88" opacity="0.65" transform="rotate(-35 40 75)"/>
        <ellipse cx="55" cy="50" rx="8" ry="5" fill="#9CAF88" opacity="0.6" transform="rotate(-50 55 50)"/>
        <circle cx="58" cy="38" r="10" fill="#E8C5CE" opacity="0.8"/>
        <circle cx="58" cy="38" r="6" fill="#C4819B" opacity="0.85"/>
        <circle cx="25" cy="100" r="5" fill="#D4A5B0" opacity="0.65"/>
      </svg>
    </motion.div>
  );
}

function SideFloralRight() {
  return (
    <motion.div
      className="s9-side-right"
      initial={{ x: 60, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
    >
      <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M75 120 Q50 80 25 40" stroke="#8B6B5E" strokeWidth="1.2" fill="none" opacity="0.5"/>
        <ellipse cx="40" cy="75" rx="10" ry="6" fill="#9CAF88" opacity="0.65" transform="rotate(35 40 75)"/>
        <ellipse cx="25" cy="50" rx="8" ry="5" fill="#9CAF88" opacity="0.6" transform="rotate(50 25 50)"/>
        <circle cx="22" cy="38" r="10" fill="#E8C5CE" opacity="0.8"/>
        <circle cx="22" cy="38" r="6" fill="#C4819B" opacity="0.85"/>
        <circle cx="55" cy="100" r="5" fill="#D4A5B0" opacity="0.65"/>
      </svg>
    </motion.div>
  );
}

function Skeleton9({ data, theme }) {
  const {
    name1 = 'Nombre',
    name2 = '',
    welcomePhrase = '',
    invitePhrase = 'Con todo el amor del mundo te invitamos a celebrar',
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
    '--s9-rose':       th.primaryColor   || '#C4819B',
    '--s9-dark':       th.secondaryColor || '#5A3D45',
    '--s9-bg':         '#FFF8F8',
    '--s9-font-title': th.fontFamilyTitle || "'Dancing Script', cursive",
    '--s9-font-body':  th.fontFamilyBody  || "'Lato', sans-serif",
  };

  const displayPhotos = galleryPhotos.length > 0 ? galleryPhotos : SAMPLE_PHOTOS;

  return (
    <div id="skeleton9-template" style={dynamicStyles}>

      {/* HERO con flores de esquina */}
      <section id="section-protagonists" className="s9-hero">
        <FlowerCornerLeft animate />
        <FlowerCornerRight animate />

        <div className="s9-hero-content">
          {welcomePhrase && (
            <motion.p className="s9-eyebrow" {...fadeUp}>{welcomePhrase}</motion.p>
          )}
          <motion.h1
            className="s9-names"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.6 }}
          >
            {name1}
            {name2 && <><br /><span className="s9-amp">&</span><br />{name2}</>}
          </motion.h1>
          <motion.div
            className="s9-divider"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 1 }}
          />
          <motion.p
            className="s9-invite-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.2 }}
          >
            {invitePhrase}
          </motion.p>
        </div>
      </section>

      {/* BODY */}
      <div className="s9-body">

        {showCountdown && (
          <motion.div className="s9-section" {...fadeUp}>
            <CountdownBox eventDate={eventDate} />
          </motion.div>
        )}

        {showCivil && (
          <motion.section id="section-civil" className="s9-section s9-event-block" {...fadeUp}>
            <SideFloralLeft /><SideFloralRight />
            <h3 className="s9-section-title">Ceremonia Civil</h3>
            {civilPlace   && <p className="s9-venue">{civilPlace}</p>}
            {civilAddress && <p className="s9-addr">{civilAddress}</p>}
            {civilDate    && <p className="s9-datetime">{civilDate}{civilTime && ` · ${civilTime}`}</p>}
            {!civilMapUnknown && civilMapUrl && civilMapUrl !== '#' && (
              <a href={civilMapUrl} target="_blank" rel="noopener noreferrer" className="s9-link">Ver ubicación →</a>
            )}
          </motion.section>
        )}

        {showCeremony && (
          <motion.section id="section-venue" className="s9-section s9-event-block" {...fadeUp}>
            <SideFloralLeft /><SideFloralRight />
            <h3 className="s9-section-title">Ceremonia</h3>
            {ceremonyPlace   && <p className="s9-venue">{ceremonyPlace}</p>}
            {ceremonyAddress && <p className="s9-addr">{ceremonyAddress}</p>}
            {ceremonyDate    && <p className="s9-datetime">{ceremonyDate}{ceremonyTime && ` · ${ceremonyTime}`}</p>}
            {!ceremonyMapUnknown && ceremonyMapUrl && ceremonyMapUrl !== '#' && (
              <a href={ceremonyMapUrl} target="_blank" rel="noopener noreferrer" className="s9-link">Ver ubicación →</a>
            )}
          </motion.section>
        )}

        {showParty && (
          <motion.section
            id={!showCeremony ? 'section-venue' : undefined}
            className="s9-section s9-event-block"
            {...fadeUp}
          >
            <SideFloralLeft /><SideFloralRight />
            <h3 className="s9-section-title">Recepción</h3>
            {(eventVenue || partyPlace) && <p className="s9-venue">{eventVenue || partyPlace}</p>}
            {partyAddress && <p className="s9-addr">{partyAddress}</p>}
            {partyDateString && <p className="s9-datetime">{partyDateString}{partyTime && ` · ${partyTime}`}</p>}
            {!partyMapUnknown && partyMapUrl && partyMapUrl !== '#' && (
              <a href={partyMapUrl} target="_blank" rel="noopener noreferrer" className="s9-link">Ver ubicación →</a>
            )}
          </motion.section>
        )}

        {showDressCode && (
          <motion.section id="section-sections" className="s9-section" {...fadeUp}>
            <h3 className="s9-section-title">Dress Code</h3>
            <p className="s9-body-text">{dressCodeDescription || 'Elegante'}</p>
          </motion.section>
        )}

        {showGallery && (
          <motion.section id="section-gallery" className="s9-section" {...fadeUp}>
            <h3 className="s9-section-title">Nuestra Historia</h3>
            <div className="s9-gallery-grid">
              {displayPhotos.slice(0, 4).map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt={`Foto ${i + 1}`}
                  className="s9-gallery-img"
                  initial={{ opacity: 0, scale: 0.93 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                />
              ))}
            </div>
          </motion.section>
        )}

        {showGifts && (
          <motion.section id="section-gifts" className="s9-section" {...fadeUp}>
            <h3 className="s9-section-title">Regalos</h3>
            <p className="s9-body-text">Tu presencia es el mejor regalo.</p>
            {(giftMode === 'cofre' || giftMode === 'both') && (
              <p className="s9-body-text">Cofre a disposición en el salón.</p>
            )}
            {(giftMode === 'cbu' || giftMode === 'both') && alias && (
              <p className="s9-body-text">Alias: <strong>{alias}</strong></p>
            )}
            {(giftMode === 'cbu' || giftMode === 'both') && bankCbu && (
              <p className="s9-body-text">CBU: <strong>{bankCbu}</strong></p>
            )}
          </motion.section>
        )}

        {showMusic && musicPlaylistUrl && (
          <motion.section className="s9-section" {...fadeUp}>
            <h3 className="s9-section-title">🎵 Nuestra Playlist</h3>
            <a href={musicPlaylistUrl} target="_blank" rel="noopener noreferrer" className="s9-btn-outline">
              Escuchar playlist
            </a>
          </motion.section>
        )}

        {showRSVP && (
          <motion.section id="section-confirm" className="s9-section s9-rsvp" {...fadeUp}>
            <h3 className="s9-section-title">Confirmá tu asistencia</h3>
            <p className="s9-body-text">¡Esperamos contar con tu presencia!</p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Confirmo mi asistencia 🌸')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="s9-btn"
            >
              Confirmar por WhatsApp
            </a>
          </motion.section>
        )}

      </div>

      <footer className="s9-footer">
        <p>{name1}{name2 && ` & ${name2}`}</p>
      </footer>
    </div>
  );
}

export default Skeleton9;

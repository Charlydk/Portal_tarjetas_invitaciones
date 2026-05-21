import React from 'react';
import { motion } from 'framer-motion';
import { CountdownBox } from '../../components/invitation-pieces/CountdownBox';
import './Skeleton8.css';

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=600',
  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600',
  'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=600',
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.85, ease: 'easeOut' },
};

const ornamentExpand = {
  initial: { scaleX: 0, opacity: 0 },
  whileInView: { scaleX: 1, opacity: 1 },
  viewport: { once: true },
  transition: { duration: 1.1, ease: 'easeOut' },
};

function Ornament() {
  return (
    <div className="s8-ornament">
      <motion.div className="s8-orn-line" {...ornamentExpand} />
      <span className="s8-orn-diamond">◆</span>
      <motion.div className="s8-orn-line" {...ornamentExpand} />
    </div>
  );
}

function Skeleton8({ data, theme }) {
  const {
    name1 = 'Nombre',
    name2 = '',
    welcomePhrase = '',
    invitePhrase = 'Con inmensa alegría te invitamos a celebrar',
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
    '--s8-gold':       th.primaryColor   || '#B8960C',
    '--s8-dark':       th.secondaryColor || '#3D2B1F',
    '--s8-bg':         '#FDF8F0',
    '--s8-font-title': th.fontFamilyTitle || "'Playfair Display', serif",
    '--s8-font-body':  th.fontFamilyBody  || "'Lato', sans-serif",
  };

  const displayPhotos = galleryPhotos.length > 0 ? galleryPhotos : SAMPLE_PHOTOS;

  return (
    <div id="skeleton8-template" style={dynamicStyles}>

      {/* HERO */}
      <section id="section-protagonists" className="s8-hero">
        <div className="s8-hero-border-top" />
        {welcomePhrase && (
          <motion.p className="s8-eyebrow" {...fadeUp}>{welcomePhrase}</motion.p>
        )}
        <motion.h1
          className="s8-names"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          {name1}
          {name2 && <><span className="s8-amp"> & </span>{name2}</>}
        </motion.h1>
        <Ornament />
        <motion.p className="s8-invite-text" {...fadeUp} transition={{ duration: 0.9, delay: 0.3 }}>
          {invitePhrase}
        </motion.p>
        <div className="s8-hero-border-bot" />
      </section>

      {/* BODY */}
      <div className="s8-body">

        {showCountdown && (
          <motion.div className="s8-section" id="section-countdown" {...fadeUp}>
            <CountdownBox eventDate={eventDate} />
          </motion.div>
        )}

        {showCivil && (
          <motion.section id="section-civil" className="s8-section s8-event" {...fadeUp}>
            <Ornament />
            <h3 className="s8-section-title">Ceremonia Civil</h3>
            {civilPlace    && <p className="s8-venue">{civilPlace}</p>}
            {civilAddress  && <p className="s8-addr">{civilAddress}</p>}
            {civilDate     && <p className="s8-datetime">{civilDate}{civilTime && ` · ${civilTime}`}</p>}
            {!civilMapUnknown && civilMapUrl && civilMapUrl !== '#' && (
              <a href={civilMapUrl} target="_blank" rel="noopener noreferrer" className="s8-link">Ver ubicación →</a>
            )}
            <Ornament />
          </motion.section>
        )}

        {showCeremony && (
          <motion.section id="section-venue" className="s8-section s8-event" {...fadeUp}>
            <Ornament />
            <h3 className="s8-section-title">Ceremonia Religiosa</h3>
            {ceremonyPlace   && <p className="s8-venue">{ceremonyPlace}</p>}
            {ceremonyAddress && <p className="s8-addr">{ceremonyAddress}</p>}
            {ceremonyDate    && <p className="s8-datetime">{ceremonyDate}{ceremonyTime && ` · ${ceremonyTime}`}</p>}
            {!ceremonyMapUnknown && ceremonyMapUrl && ceremonyMapUrl !== '#' && (
              <a href={ceremonyMapUrl} target="_blank" rel="noopener noreferrer" className="s8-link">Ver ubicación →</a>
            )}
            <Ornament />
          </motion.section>
        )}

        {showParty && (
          <motion.section
            id={!showCeremony ? 'section-venue' : undefined}
            className="s8-section s8-event"
            {...fadeUp}
          >
            <Ornament />
            <h3 className="s8-section-title">Recepción</h3>
            {(eventVenue || partyPlace) && <p className="s8-venue">{eventVenue || partyPlace}</p>}
            {partyAddress && <p className="s8-addr">{partyAddress}</p>}
            {partyDateString && <p className="s8-datetime">{partyDateString}{partyTime && ` · ${partyTime}`}</p>}
            {!partyMapUnknown && partyMapUrl && partyMapUrl !== '#' && (
              <a href={partyMapUrl} target="_blank" rel="noopener noreferrer" className="s8-link">Ver ubicación →</a>
            )}
            <Ornament />
          </motion.section>
        )}

        {showDressCode && (
          <motion.section id="section-sections" className="s8-section" {...fadeUp}>
            <h3 className="s8-section-title">Dress Code</h3>
            <p className="s8-body-text">{dressCodeDescription || 'Elegante formal'}</p>
          </motion.section>
        )}

        {showGallery && (
          <motion.section id="section-gallery" className="s8-section" {...fadeUp}>
            <h3 className="s8-section-title">Galería</h3>
            <div className="s8-gallery-grid">
              {displayPhotos.slice(0, 4).map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt={`Foto ${i + 1}`}
                  className="s8-gallery-img"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                />
              ))}
            </div>
          </motion.section>
        )}

        {showGifts && (
          <motion.section id="section-gifts" className="s8-section" {...fadeUp}>
            <h3 className="s8-section-title">Regalos</h3>
            <p className="s8-body-text">Tu presencia es el mejor regalo.</p>
            {(giftMode === 'cofre' || giftMode === 'both') && (
              <p className="s8-body-text">Cofre a disposición en el salón.</p>
            )}
            {(giftMode === 'cbu' || giftMode === 'both') && alias && (
              <p className="s8-body-text">Alias: <strong>{alias}</strong></p>
            )}
            {(giftMode === 'cbu' || giftMode === 'both') && bankCbu && (
              <p className="s8-body-text">CBU: <strong>{bankCbu}</strong></p>
            )}
          </motion.section>
        )}

        {showMusic && musicPlaylistUrl && (
          <motion.section className="s8-section" {...fadeUp}>
            <h3 className="s8-section-title">Playlist</h3>
            <a
              href={musicPlaylistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="s8-btn-outline"
            >
              Escuchar playlist
            </a>
          </motion.section>
        )}

        {showRSVP && (
          <motion.section id="section-confirm" className="s8-section s8-rsvp" {...fadeUp}>
            <Ornament />
            <h3 className="s8-section-title">Confirmá tu asistencia</h3>
            <p className="s8-body-text">¡Esperamos contar con tu presencia!</p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Confirmo mi asistencia 🎉')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="s8-btn"
            >
              Confirmar por WhatsApp
            </a>
            <Ornament />
          </motion.section>
        )}

      </div>

      <footer className="s8-footer">
        <p>{name1}{name2 && ` & ${name2}`}</p>
      </footer>
    </div>
  );
}

export default Skeleton8;

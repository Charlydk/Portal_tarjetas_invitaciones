import React from 'react';
import { motion } from 'framer-motion';
import { CountdownBox } from '../../components/invitation-pieces/CountdownBox';
import './Skeleton14.css';

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=600',
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600',
  'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=600',
];

const DEFAULT_COUPLE_PHOTO = 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800';

/* ── SVG ornamentos ── */
function CornerOrnament({ pos }) {
  const transforms = {
    tl: 'rotate(0)',
    tr: 'rotate(90)',
    br: 'rotate(180)',
    bl: 'rotate(270)',
  };
  return (
    <svg
      className={`s14-corner s14-corner-${pos}`}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={transforms[pos]} transform-origin="30 30" style={{ transformOrigin: '30px 30px' }}>
        {/* Línea horizontal */}
        <line x1="0" y1="4" x2="32" y2="4" stroke="#C9A84C" strokeWidth="0.8" />
        {/* Línea vertical */}
        <line x1="4" y1="0" x2="4" y2="32" stroke="#C9A84C" strokeWidth="0.8" />
        {/* Curl pequeño horizontal */}
        <path d="M28 4 Q34 4 34 10 Q34 4 40 4" stroke="#C9A84C" strokeWidth="0.7" fill="none" />
        {/* Curl pequeño vertical */}
        <path d="M4 28 Q4 34 10 34 Q4 34 4 40" stroke="#C9A84C" strokeWidth="0.7" fill="none" />
        {/* Flor/diamante en esquina */}
        <circle cx="4" cy="4" r="2" fill="#C9A84C" opacity="0.9" />
        <circle cx="4" cy="4" r="1" fill="#6B0F2A" />
        {/* Pétalo arriba */}
        <ellipse cx="4" cy="1.5" rx="1" ry="1.5" fill="#C9A84C" opacity="0.6" />
        {/* Pétalo derecha */}
        <ellipse cx="6.5" cy="4" rx="1.5" ry="1" fill="#C9A84C" opacity="0.6" />
      </g>
    </svg>
  );
}

function GoldDroplet() {
  return (
    <svg className="s14-droplet" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2 Q16 10 16 16 A6 6 0 0 1 4 16 Q4 10 10 2Z" fill="#C9A84C" opacity="0.85" />
      <path d="M10 6 Q14 12 14 16 A4 4 0 0 1 6 16 Q6 12 10 6Z" fill="#6B0F2A" opacity="0.5" />
    </svg>
  );
}

function GoldScroll() {
  return (
    <svg className="s14-scroll" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="10" x2="35" y2="10" stroke="#C9A84C" strokeWidth="0.8" opacity="0.7" />
      <path d="M35 10 Q40 4 45 10 Q50 16 55 10 Q60 4 65 10 Q70 16 75 10 Q80 4 85 10" stroke="#C9A84C" strokeWidth="0.8" fill="none" opacity="0.9" />
      <line x1="85" y1="10" x2="120" y2="10" stroke="#C9A84C" strokeWidth="0.8" opacity="0.7" />
    </svg>
  );
}

function GoldDivider() {
  return (
    <div className="s14-divider">
      <svg viewBox="0 0 300 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="4" x2="120" y2="4" stroke="#C9A84C" strokeWidth="0.6" strokeDasharray="3 4" opacity="0.5" />
        <path d="M125 4 L130 1 L135 4 L130 7Z" fill="#C9A84C" opacity="0.7" />
        <line x1="140" y1="4" x2="300" y2="4" stroke="#C9A84C" strokeWidth="0.6" strokeDasharray="3 4" opacity="0.5" />
      </svg>
    </div>
  );
}

function FramedCard({ icon, title, children, id }) {
  return (
    <motion.div
      id={id}
      className="s14-framed-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <CornerOrnament pos="tl" />
      <CornerOrnament pos="tr" />
      <CornerOrnament pos="br" />
      <CornerOrnament pos="bl" />
      <div className="s14-card-inner">
        {icon && <div className="s14-card-icon">{icon}</div>}
        <h3 className="s14-card-title">{title}</h3>
        {children}
      </div>
    </motion.div>
  );
}

/* ── SVG íconos para tarjetas ── */
const RingIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="22" r="9" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
    <circle cx="26" cy="22" r="9" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
    <path d="M14 13 L14 9 Q14 6 17 6 Q20 6 20 9" stroke="#C9A84C" strokeWidth="1.2" fill="none" />
  </svg>
);
const BellIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6 Q28 8 28 18 L30 26 H10 L12 18 Q12 8 20 6Z" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
    <path d="M17 26 Q17 30 20 30 Q23 30 23 26" stroke="#C9A84C" strokeWidth="1.2" fill="none" />
    <line x1="20" y1="4" x2="20" y2="6" stroke="#C9A84C" strokeWidth="1.5" />
  </svg>
);
const GiftIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="18" width="24" height="16" rx="1" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
    <rect x="6" y="13" width="28" height="6" rx="1" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
    <line x1="20" y1="13" x2="20" y2="34" stroke="#C9A84C" strokeWidth="1.2" />
    <path d="M20 13 Q16 8 12 10 Q10 14 20 13Z" stroke="#C9A84C" strokeWidth="1" fill="none" />
    <path d="M20 13 Q24 8 28 10 Q30 14 20 13Z" stroke="#C9A84C" strokeWidth="1" fill="none" />
  </svg>
);
const DressIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 6 L10 18 L6 34 H34 L30 18 L25 6 Q20 10 15 6Z" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
    <path d="M15 6 Q20 12 25 6" stroke="#C9A84C" strokeWidth="1.2" fill="none" />
  </svg>
);

function Skeleton14({ data, theme }) {
  const {
    name1 = 'Nombre',
    name2 = '',
    welcomePhrase = '',
    invitePhrase = 'Todos somos mortales, hasta el primer beso y la segunda copa de vino.',
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

    partyDateFormatted = '',
  } = data || {};

  const th = theme?.styles || {};
  const assets = theme?.assets || {};

  const wine   = th.primaryColor   || '#6B0F2A';
  const gold   = th.secondaryColor || '#C9A84C';
  const couple = assets.couplePhoto || DEFAULT_COUPLE_PHOTO;

  const dynamicStyles = {
    '--s14-wine': wine,
    '--s14-gold': gold,
    '--s14-font-script': th.fontFamilyTitle || "'Great Vibes', cursive",
    '--s14-font-body':   th.fontFamilyBody  || "'Lato', sans-serif",
  };

  const displayPhotos = galleryPhotos.length > 0 ? galleryPhotos : SAMPLE_PHOTOS;

  /* fecha formateada del hero */
  const heroDate = partyDateFormatted || partyDateString || ceremonyDate || '';

  return (
    <div id="skeleton14-template" style={dynamicStyles}>

      {/* ── HERO SPLIT ── */}
      <section id="section-protagonists" className="s14-hero">
        {/* Foto pareja izquierda */}
        <motion.div
          className="s14-hero-photo"
          style={{ backgroundImage: `url(${couple})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        {/* Panel derecho vino */}
        <div className="s14-hero-panel">
          <CornerOrnament pos="tl" />
          <CornerOrnament pos="tr" />
          <CornerOrnament pos="br" />
          <CornerOrnament pos="bl" />

          <div className="s14-hero-content">
            {welcomePhrase && (
              <motion.p
                className="s14-eyebrow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.4 }}
              >
                {welcomePhrase}
              </motion.p>
            )}

            {heroDate && (
              <motion.p
                className="s14-hero-date"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {heroDate}
              </motion.p>
            )}

            <motion.h1
              className="s14-names"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              {name1}
              {name2 && <><span className="s14-amp"> &amp; </span>{name2}</>}
            </motion.h1>

            <GoldDroplet />

            <motion.p
              className="s14-quote"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.1 }}
            >
              {invitePhrase}
            </motion.p>

            <GoldScroll />
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ── COUNTDOWN ── */}
      {showCountdown && (
        <>
          <motion.section
            className="s14-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="s14-section-script">Falta</h2>
            <CountdownBox eventDate={eventDate} />
            <div className="s14-heart">♥</div>
          </motion.section>
          <GoldDivider />
        </>
      )}

      {/* ── EVENTOS (civil + ceremonia + fiesta como tarjetas con marco) ── */}
      <section className="s14-events-grid" id="section-venue">
        {showCivil && (
          <FramedCard id="section-civil" icon={<RingIcon />} title="Civil">
            {civilPlace   && <p className="s14-card-venue">{civilPlace}</p>}
            {civilAddress && <p className="s14-card-addr">{civilAddress}</p>}
            {civilDate    && <p className="s14-card-time">{civilDate}{civilTime && ` · ${civilTime}`}</p>}
            {!civilMapUnknown && civilMapUrl && civilMapUrl !== '#' && (
              <a href={civilMapUrl} target="_blank" rel="noopener noreferrer" className="s14-card-link">Ver mapa</a>
            )}
          </FramedCard>
        )}

        {showCeremony && (
          <FramedCard icon={<RingIcon />} title="Ceremonia">
            {ceremonyPlace   && <p className="s14-card-venue">{ceremonyPlace}</p>}
            {ceremonyAddress && <p className="s14-card-addr">{ceremonyAddress}</p>}
            {ceremonyDate    && <p className="s14-card-time">{ceremonyDate}{ceremonyTime && ` · ${ceremonyTime}`}</p>}
            {!ceremonyMapUnknown && ceremonyMapUrl && ceremonyMapUrl !== '#' && (
              <a href={ceremonyMapUrl} target="_blank" rel="noopener noreferrer" className="s14-card-link">Ver mapa</a>
            )}
          </FramedCard>
        )}

        {showParty && (
          <FramedCard icon={<BellIcon />} title="Fiesta">
            {(eventVenue || partyPlace) && <p className="s14-card-venue">{eventVenue || partyPlace}</p>}
            {partyAddress && <p className="s14-card-addr">{partyAddress}</p>}
            {partyDateString && <p className="s14-card-time">{partyDateString}{partyTime && ` · ${partyTime}`}</p>}
            {!partyMapUnknown && partyMapUrl && partyMapUrl !== '#' && (
              <a href={partyMapUrl} target="_blank" rel="noopener noreferrer" className="s14-card-link">Ver mapa</a>
            )}
          </FramedCard>
        )}

        {showDressCode && (
          <FramedCard id="section-sections" icon={<DressIcon />} title="Dress Code">
            <p className="s14-card-text">{dressCodeDescription || 'Elegante'}</p>
          </FramedCard>
        )}

        {showGifts && (
          <FramedCard id="section-gifts" icon={<GiftIcon />} title="Regalos">
            <p className="s14-card-text">Tu presencia es el mejor regalo.</p>
            {(giftMode === 'cofre' || giftMode === 'both') && <p className="s14-card-text">Cofre en el salón.</p>}
            {(giftMode === 'cbu' || giftMode === 'both') && alias && <p className="s14-card-text">Alias: <strong>{alias}</strong></p>}
            {(giftMode === 'cbu' || giftMode === 'both') && bankCbu && <p className="s14-card-text">CBU: <strong>{bankCbu}</strong></p>}
          </FramedCard>
        )}
      </section>

      <GoldDivider />

      {/* ── GALERÍA ── */}
      {showGallery && (
        <>
          <motion.section
            id="section-gallery"
            className="s14-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="s14-section-script">Galería</h2>
            <div className="s14-gallery-grid">
              {displayPhotos.slice(0, 4).map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt={`Foto ${i + 1}`}
                  className="s14-gallery-img"
                  initial={{ opacity: 0, scale: 0.93 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              ))}
            </div>
          </motion.section>
          <GoldDivider />
        </>
      )}

      {/* ── MÚSICA ── */}
      {showMusic && musicPlaylistUrl && (
        <>
          <motion.section
            className="s14-section"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="s14-section-script">Canciones</h2>
            <p className="s14-section-text">¿Qué canciones no pueden faltar?</p>
            <a href={musicPlaylistUrl} target="_blank" rel="noopener noreferrer" className="s14-ghost-btn">
              Sugerir canción
            </a>
          </motion.section>
          <GoldDivider />
        </>
      )}

      {/* ── RSVP ── */}
      {showRSVP && (
        <motion.section
          id="section-confirm"
          className="s14-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="s14-section-script">Confirmá</h2>
          <p className="s14-section-text">¡Esperamos contar con tu presencia!</p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Confirmo mi asistencia 🎉')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="s14-gold-btn"
          >
            Confirmar asistencia
          </a>
        </motion.section>
      )}

      <footer className="s14-footer">
        <GoldScroll />
        <p>{name1}{name2 && ` & ${name2}`}</p>
      </footer>
    </div>
  );
}

export default Skeleton14;

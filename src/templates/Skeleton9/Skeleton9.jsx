import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CountdownBox } from '../../components/invitation-pieces/CountdownBox';
import './Skeleton9.css';

// ── Google Calendar URL ────────────────────────────────────────────────────────
function buildCalendarUrl(title, isoDate, location) {
  if (!isoDate) return null;
  try {
    const d = new Date(isoDate);
    if (isNaN(d)) return null;
    const pad = n => String(n).padStart(2, '0');
    const fmt = dt =>
      `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`;
    const end = new Date(d.getTime() + 4 * 3600000);
    const params = new URLSearchParams({
      action: 'TEMPLATE', text: title,
      dates: `${fmt(d)}/${fmt(end)}`, location: location || '',
    });
    return `https://calendar.google.com/calendar/render?${params}`;
  } catch { return null; }
}

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=800',
  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800',
  'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=800',
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: 'easeOut' },
};

// ── SVG Flores de esquina ──────────────────────────────────────────────────────
function FlowerCornerLeft({ animate }) {
  return (
    <motion.div className="s9-flower-left"
      initial={{ x: -80, opacity: 0 }}
      animate={animate ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
    >
      <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 200 Q40 140 80 100 Q110 70 140 20" stroke="#8B6B5E" strokeWidth="1.5" fill="none" opacity="0.5"/>
        <path d="M30 190 Q55 150 70 110" stroke="#8B6B5E" strokeWidth="1" fill="none" opacity="0.4"/>
        <path d="M5 170 Q35 130 60 90" stroke="#8B6B5E" strokeWidth="0.8" fill="none" opacity="0.3"/>
        <ellipse cx="70" cy="110" rx="14" ry="8" fill="#9CAF88" opacity="0.65" transform="rotate(-30 70 110)"/>
        <ellipse cx="100" cy="75" rx="12" ry="7" fill="#9CAF88" opacity="0.6" transform="rotate(-50 100 75)"/>
        <ellipse cx="55" cy="140" rx="10" ry="6" fill="#9CAF88" opacity="0.55" transform="rotate(-20 55 140)"/>
        <ellipse cx="45" cy="100" rx="9" ry="5" fill="#B5C9A0" opacity="0.5" transform="rotate(-40 45 100)"/>
        <circle cx="130" cy="28" r="16" fill="#E8C5CE" opacity="0.7"/>
        <circle cx="130" cy="28" r="12" fill="#D4A5B0" opacity="0.85"/>
        <circle cx="130" cy="28" r="7" fill="#C4819B" opacity="0.9"/>
        <circle cx="130" cy="28" r="3.5" fill="#B06080" opacity="0.95"/>
        <ellipse cx="130" cy="12" rx="8" ry="11" fill="#E8C5CE" opacity="0.55"/>
        <ellipse cx="146" cy="28" rx="11" ry="8" fill="#E8C5CE" opacity="0.55"/>
        <ellipse cx="114" cy="28" rx="11" ry="8" fill="#E8C5CE" opacity="0.55"/>
        <ellipse cx="130" cy="44" rx="8" ry="11" fill="#E8C5CE" opacity="0.55"/>
        <circle cx="82" cy="95" r="10" fill="#F0D5DC" opacity="0.75"/>
        <circle cx="82" cy="95" r="6" fill="#D4A5B0" opacity="0.8"/>
        <circle cx="82" cy="95" r="3" fill="#C4819B" opacity="0.85"/>
        <circle cx="50" cy="148" r="5" fill="#E8C5CE" opacity="0.65"/>
        <circle cx="63" cy="128" r="3.5" fill="#F0D5DC" opacity="0.6"/>
        <circle cx="38" cy="165" r="3" fill="#D4A5B0" opacity="0.5"/>
      </svg>
    </motion.div>
  );
}

function FlowerCornerRight({ animate }) {
  return (
    <motion.div className="s9-flower-right"
      initial={{ x: 80, opacity: 0 }}
      animate={animate ? { x: 0, opacity: 1 } : { x: 80, opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
    >
      <svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M150 200 Q120 140 80 100 Q50 70 20 20" stroke="#8B6B5E" strokeWidth="1.5" fill="none" opacity="0.5"/>
        <path d="M130 190 Q105 150 90 110" stroke="#8B6B5E" strokeWidth="1" fill="none" opacity="0.4"/>
        <path d="M155 170 Q125 130 100 90" stroke="#8B6B5E" strokeWidth="0.8" fill="none" opacity="0.3"/>
        <ellipse cx="90" cy="110" rx="14" ry="8" fill="#9CAF88" opacity="0.65" transform="rotate(30 90 110)"/>
        <ellipse cx="60" cy="75" rx="12" ry="7" fill="#9CAF88" opacity="0.6" transform="rotate(50 60 75)"/>
        <ellipse cx="105" cy="140" rx="10" ry="6" fill="#9CAF88" opacity="0.55" transform="rotate(20 105 140)"/>
        <ellipse cx="115" cy="100" rx="9" ry="5" fill="#B5C9A0" opacity="0.5" transform="rotate(40 115 100)"/>
        <circle cx="30" cy="28" r="16" fill="#E8C5CE" opacity="0.7"/>
        <circle cx="30" cy="28" r="12" fill="#D4A5B0" opacity="0.85"/>
        <circle cx="30" cy="28" r="7" fill="#C4819B" opacity="0.9"/>
        <circle cx="30" cy="28" r="3.5" fill="#B06080" opacity="0.95"/>
        <ellipse cx="30" cy="12" rx="8" ry="11" fill="#E8C5CE" opacity="0.55"/>
        <ellipse cx="46" cy="28" rx="11" ry="8" fill="#E8C5CE" opacity="0.55"/>
        <ellipse cx="14" cy="28" rx="11" ry="8" fill="#E8C5CE" opacity="0.55"/>
        <ellipse cx="30" cy="44" rx="8" ry="11" fill="#E8C5CE" opacity="0.55"/>
        <circle cx="78" cy="95" r="10" fill="#F0D5DC" opacity="0.75"/>
        <circle cx="78" cy="95" r="6" fill="#D4A5B0" opacity="0.8"/>
        <circle cx="78" cy="95" r="3" fill="#C4819B" opacity="0.85"/>
        <circle cx="110" cy="148" r="5" fill="#E8C5CE" opacity="0.65"/>
        <circle cx="97" cy="128" r="3.5" fill="#F0D5DC" opacity="0.6"/>
        <circle cx="122" cy="165" r="3" fill="#D4A5B0" opacity="0.5"/>
      </svg>
    </motion.div>
  );
}

function SideFloralLeft() {
  return (
    <motion.div className="s9-side-left"
      initial={{ x: -60, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      <svg viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 130 Q28 85 52 45" stroke="#8B6B5E" strokeWidth="1.2" fill="none" opacity="0.45"/>
        <path d="M15 120 Q35 85 45 55" stroke="#8B6B5E" strokeWidth="0.8" fill="none" opacity="0.3"/>
        <ellipse cx="40" cy="78" rx="11" ry="7" fill="#9CAF88" opacity="0.6" transform="rotate(-35 40 78)"/>
        <ellipse cx="52" cy="54" rx="9" ry="6" fill="#9CAF88" opacity="0.55" transform="rotate(-50 52 54)"/>
        <circle cx="55" cy="40" r="12" fill="#F0D5DC" opacity="0.75"/>
        <circle cx="55" cy="40" r="8" fill="#D4A5B0" opacity="0.82"/>
        <circle cx="55" cy="40" r="4.5" fill="#C4819B" opacity="0.88"/>
        <circle cx="22" cy="105" r="6" fill="#E8C5CE" opacity="0.6"/>
        <circle cx="35" cy="88" r="4" fill="#F0D5DC" opacity="0.55"/>
      </svg>
    </motion.div>
  );
}

function SideFloralRight() {
  return (
    <motion.div className="s9-side-right"
      initial={{ x: 60, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
    >
      <svg viewBox="0 0 80 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M75 130 Q52 85 28 45" stroke="#8B6B5E" strokeWidth="1.2" fill="none" opacity="0.45"/>
        <path d="M65 120 Q45 85 35 55" stroke="#8B6B5E" strokeWidth="0.8" fill="none" opacity="0.3"/>
        <ellipse cx="40" cy="78" rx="11" ry="7" fill="#9CAF88" opacity="0.6" transform="rotate(35 40 78)"/>
        <ellipse cx="28" cy="54" rx="9" ry="6" fill="#9CAF88" opacity="0.55" transform="rotate(50 28 54)"/>
        <circle cx="25" cy="40" r="12" fill="#F0D5DC" opacity="0.75"/>
        <circle cx="25" cy="40" r="8" fill="#D4A5B0" opacity="0.82"/>
        <circle cx="25" cy="40" r="4.5" fill="#C4819B" opacity="0.88"/>
        <circle cx="58" cy="105" r="6" fill="#E8C5CE" opacity="0.6"/>
        <circle cx="45" cy="88" r="4" fill="#F0D5DC" opacity="0.55"/>
      </svg>
    </motion.div>
  );
}

function FloralDivider() {
  return (
    <motion.div className="s9-floral-divider"
      initial={{ opacity: 0, scaleX: 0.5 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <svg viewBox="0 0 240 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="14" x2="98" y2="14" stroke="#C4819B" strokeWidth="0.6" opacity="0.35"/>
        <circle cx="120" cy="14" r="4" fill="#C4819B" opacity="0.45"/>
        <ellipse cx="120" cy="6" rx="4" ry="6" fill="#E8C5CE" opacity="0.4"/>
        <circle cx="108" cy="14" r="2.5" fill="#D4A5B0" opacity="0.3"/>
        <circle cx="132" cy="14" r="2.5" fill="#D4A5B0" opacity="0.3"/>
        <circle cx="98" cy="14" r="1.5" fill="#C4819B" opacity="0.25"/>
        <circle cx="142" cy="14" r="1.5" fill="#C4819B" opacity="0.25"/>
        <line x1="142" y1="14" x2="240" y2="14" stroke="#C4819B" strokeWidth="0.6" opacity="0.35"/>
      </svg>
    </motion.div>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────────
function FloralModal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="s9-modal-overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }} onClick={onClose}
        >
          <motion.div className="s9-modal"
            initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            onClick={e => e.stopPropagation()}
          >
            <button className="s9-modal-close" onClick={onClose}>✕</button>
            <h3 className="s9-modal-title">{title}</h3>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Template ───────────────────────────────────────────────────────────────────
function Skeleton9({ data, theme }) {
  const {
    name1 = 'Valentina', name2 = 'Maximiliano',
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
    whatsappNumber = '', musicPlaylistUrl = '',
    dressCodeDescription = '', dressCodeColorNote = '',
    galleryPhotos = [],

    showCivil = false, showCeremony = true, showParty = true,
    showCountdown = true, showDressCode = true, showGifts = true,
    showGallery = true, showRSVP = true, showMusic = true,
  } = data || {};

  const [dressCodeOpen, setDressCodeOpen] = useState(false);
  const [giftsOpen, setGiftsOpen] = useState(false);

  const th = theme?.styles || {};
  const heroImage = theme?.assets?.heroImage;

  const dynamicStyles = {
    '--s9-rose':       th.primaryColor    || '#C4819B',
    '--s9-dark':       th.secondaryColor  || '#5A3D45',
    '--s9-bg':         '#FFF8F8',
    '--s9-font-title': th.fontFamilyTitle || "'Dancing Script', cursive",
    '--s9-font-body':  th.fontFamilyBody  || "'Lato', sans-serif",
  };

  const displayPhotos = galleryPhotos.length > 0 ? galleryPhotos : SAMPLE_PHOTOS;
  const calendarTitle = `Boda de ${name1}${name2 ? ` & ${name2}` : ''}`;
  const calendarUrl = buildCalendarUrl(calendarTitle, eventDate, ceremonyPlace || partyPlace || '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `¡Hola! Confirmo mi asistencia a la boda de ${name1}${name2 ? ` & ${name2}` : ''} 🌸`
  )}`;

  const hasGiftInfo = (giftMode === 'cbu' || giftMode === 'both') && (alias || bankCbu);
  const hasCofre = giftMode === 'cofre' || giftMode === 'both';

  return (
    <div id="skeleton9-template" style={dynamicStyles}>

      {/* ── Modals (fuera del scroll, dentro del template root) ── */}
      <FloralModal isOpen={dressCodeOpen} onClose={() => setDressCodeOpen(false)} title="Dress Code">
        <p className="s9-modal-text">{dressCodeDescription || 'Elegante · Tonos pasteles y neutros'}</p>
        <p className="s9-modal-note">
          {dressCodeColorNote || 'Reservamos el blanco para la novia ✨'}
        </p>
      </FloralModal>

      <FloralModal isOpen={giftsOpen} onClose={() => setGiftsOpen(false)} title="Regalos">
        <p className="s9-modal-text">Tu presencia es nuestro mejor regalo.</p>
        {hasCofre && (
          <div className="s9-modal-gift-box">
            <span className="s9-modal-gift-icon">🎁</span>
            <p>Habrá un cofre de sobres en el salón</p>
          </div>
        )}
        {hasGiftInfo && (
          <div className="s9-modal-gift-box">
            <span className="s9-modal-gift-icon">💳</span>
            {alias   && <p><strong>Alias:</strong> {alias}</p>}
            {bankCbu && <p><strong>CBU:</strong> {bankCbu}</p>}
          </div>
        )}
      </FloralModal>

      {/* ── Scroll container ── */}
      <div className="s9-scroll">

        {/* HERO */}
        <section id="section-protagonists" className="s9-hero">
          {heroImage && (
            <div className="s9-hero-bg" style={{ backgroundImage: `url(${heroImage})` }} />
          )}
          <div className="s9-hero-overlay" />
          <FlowerCornerLeft animate />
          <FlowerCornerRight animate />

          <div className="s9-hero-content">
            <motion.p className="s9-eyebrow"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
            >
              {welcomePhrase || 'Nos Casamos'}
            </motion.p>

            <motion.h1 className="s9-names"
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.6 }}
            >
              {name1}
              {name2 && (<><br /><span className="s9-amp">&</span><br />{name2}</>)}
            </motion.h1>

            <motion.div className="s9-divider"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />

            <motion.p className="s9-invite-text"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.2 }}
            >
              {invitePhrase}
            </motion.p>

            {calendarUrl && (
              <motion.a
                href={calendarUrl} target="_blank" rel="noopener noreferrer"
                className="s9-calendar-btn"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.6 }}
                onClick={e => e.stopPropagation()}
              >
                📅 Agregar al calendario
              </motion.a>
            )}

            <motion.div className="s9-scroll-hint"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              <motion.span
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >↓</motion.span>
            </motion.div>
          </div>
        </section>

        {/* BODY */}
        <div className="s9-body">

          {showCountdown && eventDate && (
            <motion.div className="s9-section" {...fadeUp}>
              <CountdownBox eventDate={eventDate} />
            </motion.div>
          )}

          {showCivil && (
            <motion.section id="section-civil" className="s9-section s9-event-block" {...fadeUp}>
              <SideFloralLeft /><SideFloralRight />
              <span className="s9-section-label">Ceremonia Civil</span>
              <h3 className="s9-section-title">{civilPlace || 'Registro Civil'}</h3>
              <FloralDivider />
              {civilAddress && <p className="s9-addr">📍 {civilAddress}</p>}
              {civilDate    && <p className="s9-datetime">{civilDate}{civilTime && ` · ${civilTime}`}</p>}
              <div className="s9-event-actions">
                {!civilMapUnknown && civilMapUrl && civilMapUrl !== '#' && (
                  <a href={civilMapUrl} target="_blank" rel="noopener noreferrer" className="s9-action-link">Ver mapa</a>
                )}
              </div>
            </motion.section>
          )}

          {showCeremony && (
            <motion.section id="section-venue" className="s9-section s9-event-block" {...fadeUp}>
              <SideFloralLeft /><SideFloralRight />
              <span className="s9-section-label">Ceremonia</span>
              <h3 className="s9-section-title">{ceremonyPlace || 'Parroquia'}</h3>
              <FloralDivider />
              {ceremonyAddress && <p className="s9-addr">📍 {ceremonyAddress}</p>}
              {ceremonyDate    && <p className="s9-datetime">{ceremonyDate}{ceremonyTime && ` · ${ceremonyTime}`}</p>}
              <div className="s9-event-actions">
                {!ceremonyMapUnknown && ceremonyMapUrl && ceremonyMapUrl !== '#' && (
                  <a href={ceremonyMapUrl} target="_blank" rel="noopener noreferrer" className="s9-action-link">Ver mapa</a>
                )}
              </div>
            </motion.section>
          )}

          {showParty && (
            <motion.section
              id={!showCeremony ? 'section-venue' : undefined}
              className="s9-section s9-event-block" {...fadeUp}
            >
              <SideFloralLeft /><SideFloralRight />
              <span className="s9-section-label">Recepción</span>
              <h3 className="s9-section-title">{eventVenue || partyPlace || 'Salón'}</h3>
              <FloralDivider />
              {partyAddress    && <p className="s9-addr">📍 {partyAddress}</p>}
              {partyDateString && <p className="s9-datetime">{partyDateString}{partyTime && ` · ${partyTime}`}</p>}
              <div className="s9-event-actions">
                {!partyMapUnknown && partyMapUrl && partyMapUrl !== '#' && (
                  <a href={partyMapUrl} target="_blank" rel="noopener noreferrer" className="s9-action-link">Ver mapa</a>
                )}
              </div>
            </motion.section>
          )}

          {showDressCode && (
            <motion.section id="section-sections" className="s9-section s9-event-block" {...fadeUp}>
              <SideFloralLeft /><SideFloralRight />
              <span className="s9-section-label">Para la ocasión</span>
              <h3 className="s9-section-title">Dress Code</h3>
              <FloralDivider />
              <p className="s9-body-text">{dressCodeDescription || 'Elegante'}</p>
              <button className="s9-btn-soft" onClick={() => setDressCodeOpen(true)}>
                Ver indicaciones completas
              </button>
            </motion.section>
          )}

          {showGallery && (
            <motion.section id="section-gallery" className="s9-section" {...fadeUp}>
              <span className="s9-section-label">Nuestra historia</span>
              <h3 className="s9-section-title">Galería</h3>
              <FloralDivider />
              <div className="s9-carousel">
                {displayPhotos.map((src, i) => (
                  <motion.div key={i} className="s9-carousel-item"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <img src={src} alt={`Foto ${i + 1}`} />
                  </motion.div>
                ))}
              </div>
              <p className="s9-carousel-hint">Deslizá para ver más →</p>
            </motion.section>
          )}

          {showGifts && (
            <motion.section id="section-gifts" className="s9-section s9-event-block" {...fadeUp}>
              <SideFloralLeft /><SideFloralRight />
              <span className="s9-section-label">Con amor</span>
              <h3 className="s9-section-title">Regalos</h3>
              <FloralDivider />
              <p className="s9-body-text">Tu presencia es el mejor regalo 💐</p>
              {(hasGiftInfo || hasCofre) && (
                <button className="s9-btn-soft" onClick={() => setGiftsOpen(true)}>
                  Ver datos de transferencia
                </button>
              )}
            </motion.section>
          )}

          {showMusic && (
            <motion.section className="s9-section" {...fadeUp}>
              <span className="s9-section-label">Ambiente</span>
              <h3 className="s9-section-title">Música</h3>
              <FloralDivider />
              {musicPlaylistUrl ? (
                <a href={musicPlaylistUrl} target="_blank" rel="noopener noreferrer" className="s9-btn-outline">
                  🎵 Escuchar playlist
                </a>
              ) : (
                <p className="s9-body-text">Preparamos una playlist especial para este día</p>
              )}
            </motion.section>
          )}

          {showRSVP && (
            <motion.section id="section-confirm" className="s9-section s9-rsvp" {...fadeUp}>
              <SideFloralLeft /><SideFloralRight />
              <span className="s9-section-label">¿Nos acompañás?</span>
              <h3 className="s9-section-title">Confirmá tu asistencia</h3>
              <FloralDivider />
              <p className="s9-body-text">¡Esperamos contar con tu presencia!</p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="s9-btn">
                💬 Confirmar por WhatsApp
              </a>
            </motion.section>
          )}

        </div>

        <footer className="s9-footer">
          <p>{name1}{name2 && ` & ${name2}`}</p>
        </footer>

      </div>{/* end s9-scroll */}
    </div>
  );
}

export default Skeleton9;

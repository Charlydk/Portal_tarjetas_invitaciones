import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import InvitationPreview from '../features/preview/InvitationPreview';
import { invitationModels } from '../data/models';
import { invitationSegments } from '../data/segments';

const BUSINESS_WA = import.meta.env.VITE_BUSINESS_WHATSAPP || '5491100000000';

// ── Demo data ─────────────────────────────────────────────────────────────────
const demoEventDate = (() => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  d.setMonth(10, 14);
  d.setHours(19, 0, 0, 0);
  return d.toISOString();
})();
const demoYear = new Date(demoEventDate).getFullYear();

const DEMO_DATA = {
  name1: 'Valentina',
  name2: 'Maximiliano',
  welcomePhrase: 'Nos Casamos',
  invitePhrase: 'Junto a sus familias, tienen el honor de invitarte a celebrar su matrimonio',
  eventDate: demoEventDate,

  civilDate: `14 de Noviembre de ${demoYear}`,
  civilTime: '17:00 hs',
  civilPlace: 'Registro Civil de Las Heras',
  civilAddress: 'Las Heras 2344, CABA',
  civilMapUrl: '#',
  civilMapUnknown: true,

  ceremonyDate: `14 de Noviembre de ${demoYear}`,
  ceremonyTime: '19:00 hs',
  ceremonyPlace: 'Parroquia San Francisco de Asís',
  ceremonyAddress: 'Viamonte 1480, CABA',
  ceremonyMapUrl: '#',
  ceremonyMapUnknown: true,

  partyDateString: `14 de Noviembre de ${demoYear}`,
  partyTime: '21:00 hs',
  partyPlace: 'Salón Gran Palazzo',
  eventVenue: 'Salón Gran Palazzo',
  partyAddress: 'Av. del Libertador 4500, Buenos Aires',
  partyMapUrl: '#',
  partyMapUnknown: true,

  alias: 'valentina.maxi',
  giftMode: 'cbu',
  bankCbu: '',
  whatsappNumber: '5491100000000',
  musicPlaylistUrl: '',
  dressCodeDescription: 'Formal · Tonos neutros y pasteles',
  galleryPhotos: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
    'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=600',
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600',
    'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=600',
  ],

  showCivil: false,
  showCeremony: true,
  showParty: true,
  showCountdown: true,
  showDressCode: true,
  showGifts: true,
  showGallery: true,
  showRSVP: true,
  showMusic: false,
  askDiets: false,
};

// ── Pantalla de bienvenida ────────────────────────────────────────────────────
function WelcomeScreen({ name1, name2, hasAudio, onEnter }) {
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(160deg, #0e0b07 0%, #1c1508 55%, #0e0b07 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 32px',
        zIndex: 10,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.9, ease: 'easeOut' }}
        style={{ maxWidth: '360px', width: '100%' }}
      >
        <p style={{
          color: '#C9A96E',
          letterSpacing: '0.32em',
          fontSize: '0.68rem',
          textTransform: 'uppercase',
          fontFamily: "'EB Garamond', 'Garamond', serif",
          margin: '0 0 28px',
        }}>
          Bienvenido/a
        </p>

        <h1 style={{
          fontFamily: "'Playfair Display', 'Georgia', serif",
          fontWeight: 400,
          fontStyle: 'italic',
          fontSize: 'clamp(2.4rem, 9vw, 4.2rem)',
          color: '#FAF7F2',
          lineHeight: 1.1,
          margin: '0 0 6px',
        }}>
          {name1}
        </h1>
        {name2 && (
          <>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
              color: '#C9A96E',
              margin: '4px 0',
            }}>&</p>
            <h1 style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: 'clamp(2.4rem, 9vw, 4.2rem)',
              color: '#FAF7F2',
              lineHeight: 1.1,
              margin: '0 0 32px',
            }}>
              {name2}
            </h1>
          </>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto 32px', maxWidth: '220px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(201,169,110,0.4)' }} />
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C9A96E' }} />
          <div style={{ flex: 1, height: '1px', background: 'rgba(201,169,110,0.4)' }} />
        </div>

        {hasAudio ? (
          <>
            <p style={{
              color: 'rgba(250,247,242,0.6)',
              fontSize: '1rem',
              fontFamily: "'EB Garamond', 'Garamond', serif",
              lineHeight: 1.65,
              margin: '0 0 32px',
            }}>
              Esta invitación tiene música.<br />¿Querés escucharla?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => onEnter(true)}
                style={{
                  background: '#C9A96E', border: 'none', color: '#0e0b07',
                  padding: '14px 32px', borderRadius: '4px',
                  fontFamily: "'EB Garamond', serif", fontSize: '0.85rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  cursor: 'pointer', fontWeight: 600,
                }}
              >
                ♪ Sí, con música
              </button>
              <button
                onClick={() => onEnter(false)}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(250,247,242,0.25)',
                  color: 'rgba(250,247,242,0.55)',
                  padding: '13px 32px', borderRadius: '4px',
                  fontFamily: "'EB Garamond', serif", fontSize: '0.85rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Entrar sin música
              </button>
            </div>
          </>
        ) : (
          <>
            <p style={{
              color: 'rgba(250,247,242,0.55)',
              fontSize: '1rem',
              fontFamily: "'EB Garamond', serif",
              lineHeight: 1.65,
              margin: '0 0 32px',
            }}>
              Te invitamos a descubrir esta experiencia
            </p>
            <button
              onClick={() => onEnter(false)}
              style={{
                background: '#C9A96E', border: 'none', color: '#0e0b07',
                padding: '14px 40px', borderRadius: '4px',
                fontFamily: "'EB Garamond', serif", fontSize: '0.85rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                cursor: 'pointer', fontWeight: 600,
              }}
            >
              Ver invitación
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Modal de CTA ──────────────────────────────────────────────────────────────
function CTAModal({ templateName, themeId, onClose, onEdit }) {
  const waText = encodeURIComponent(
    `Hola! Vi la tarjeta "${templateName}" en el portal y me interesa. ¿Pueden ayudarme?`
  );
  const waUrl = `https://wa.me/${BUSINESS_WA}?text=${waText}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#FDFAF6',
          borderRadius: '16px',
          padding: '40px 32px 36px',
          maxWidth: '420px',
          width: '100%',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
          position: 'relative',
          textAlign: 'center',
          fontFamily: "'Lato', sans-serif",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '14px', right: '16px',
            background: 'none', border: 'none',
            fontSize: '1.2rem', cursor: 'pointer',
            color: '#aaa', lineHeight: 1,
          }}
        >
          ✕
        </button>

        {/* Heading */}
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A96E', margin: '0 0 10px', fontFamily: "'EB Garamond', serif" }}>
          {templateName}
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 400,
          fontSize: '1.7rem',
          color: '#1E1A14',
          margin: '0 0 8px',
        }}>
          ¡Querés esta tarjeta!
        </h2>
        <p style={{ color: '#7A6A52', fontSize: '0.95rem', margin: '0 0 32px', lineHeight: 1.6 }}>
          ¿Cómo preferís seguir?
        </p>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* Editar */}
          <button
            onClick={onEdit}
            style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              background: '#1E1A14', border: 'none', borderRadius: '10px',
              padding: '18px 20px', cursor: 'pointer', textAlign: 'left',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#2C2416'}
            onMouseLeave={e => e.currentTarget.style.background = '#1E1A14'}
          >
            <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>✏️</span>
            <div>
              <p style={{ margin: 0, color: '#FAF7F2', fontWeight: 700, fontSize: '0.95rem' }}>
                La edito yo mismo
              </p>
              <p style={{ margin: '3px 0 0', color: 'rgba(250,247,242,0.55)', fontSize: '0.82rem' }}>
                Personalizá todos los detalles a tu gusto
              </p>
            </div>
          </button>

          {/* WhatsApp */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              background: '#25D366', borderRadius: '10px',
              padding: '18px 20px', textDecoration: 'none', textAlign: 'left',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1ebe58'}
            onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
          >
            <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>💬</span>
            <div>
              <p style={{ margin: 0, color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                Hablar con un asesor
              </p>
              <p style={{ margin: '3px 0 0', color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem' }}>
                Te ayudamos a crear la invitación perfecta
              </p>
            </div>
          </a>

        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────
function PreviewPage() {
  const { themeId } = useParams();
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);
  const [withMusic, setWithMusic] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  const variant = invitationModels
    .flatMap(m => m.variants)
    .find(v => v.id === themeId);
  const hasAudio = Boolean(variant?.assets?.audio);

  const segmentTemplate = invitationSegments
    .flatMap(s => s.templates)
    .find(t => t.variantId === themeId);
  const templateName = segmentTemplate?.name || 'esta tarjeta';

  const handleEnter = (music) => {
    setWithMusic(music);
    setEntered(true);
  };

  const formData = { ...DEMO_DATA, variantId: themeId };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <AnimatePresence mode="wait">
        {!entered ? (
          <WelcomeScreen
            key="welcome"
            name1={DEMO_DATA.name1}
            name2={DEMO_DATA.name2}
            hasAudio={hasAudio}
            onEnter={handleEnter}
          />
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ minHeight: '100vh' }}
          >
            {/* Floating bar */}
            <div style={{
              position: 'fixed',
              top: 0, left: 0, right: 0,
              zIndex: 9999,
              background: 'rgba(10, 10, 10, 0.72)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 20px',
              gap: '12px',
            }}>
              <button
                onClick={() => navigate(-1)}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.28)',
                  color: 'white',
                  padding: '8px 18px',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  letterSpacing: '0.05em',
                  fontFamily: 'inherit',
                  flexShrink: 0,
                }}
              >
                ← Volver
              </button>

              <span style={{
                color: 'rgba(255,255,255,0.38)',
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
              }}>
                Muestra
              </span>

              <button
                onClick={() => setShowCTA(true)}
                style={{
                  background: '#C9A96E',
                  border: 'none',
                  color: '#1E1A14',
                  padding: '9px 20px',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  letterSpacing: '0.04em',
                  fontFamily: 'inherit',
                  flexShrink: 0,
                  boxShadow: '0 4px 14px rgba(201,169,110,0.4)',
                }}
              >
                ¡Quiero esta tarjeta!
              </button>
            </div>

            {/* Template */}
            <div style={{ paddingTop: '48px', minHeight: '100vh' }}>
              <InvitationPreview
                formData={formData}
                themeId={themeId}
                isEditorMode={false}
                fullScreen
                audioEnabled={withMusic}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Modal */}
      <AnimatePresence>
        {showCTA && (
          <CTAModal
            key="cta-modal"
            templateName={templateName}
            themeId={themeId}
            onClose={() => setShowCTA(false)}
            onEdit={() => {
              setShowCTA(false);
              navigate(`/demo/${themeId}`);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default PreviewPage;

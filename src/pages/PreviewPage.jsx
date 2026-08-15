import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import InvitationPreview from '../features/preview/InvitationPreview';
import LoadingVeil from '../features/invitation/LoadingVeil';
import { usePreload } from '../features/invitation/usePreload';
import { allegoryImages, resolveAllegory } from '../allegories';
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
  // Local: remote photos loading mid-scroll were a visible source of stutter.
  galleryPhotos: [
    '/allegories/_muestra/foto1.webp',
    '/allegories/_muestra/foto2.webp',
    '/allegories/_muestra/foto3.webp',
    '/allegories/_muestra/foto4.webp',
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

// The gate is the first thing a guest sees, so it has to wear the same costume
// as the card behind it. Allegory-backed variants theme it; every other variant
// keeps the original gold-on-black look untouched.
const DEFAULT_GATE = {
  accent: '#C9A96E',
  bg: 'linear-gradient(160deg, #0e0b07 0%, #1c1508 55%, #0e0b07 100%)',
  // `bg` may be a gradient, so text sitting on the accent needs its own token.
  accentInk: '#0e0b07',
  ink: '#FAF7F2',
  fontTitle: "'Playfair Display', 'Georgia', serif",
  fontBody: "'EB Garamond', 'Garamond', serif",
};

function gateThemeFor(variant) {
  const t = variant?.allegory?.tokens;
  if (!t) return DEFAULT_GATE;
  return {
    accent: t.accent,
    bg: t.bg,
    accentInk: t.accentInk,
    ink: t.ink,
    fontTitle: t.fontTitle,
    fontBody: t.fontBody,
    bgImage: t.backgroundImage,
    bgVideo: t.backgroundVideo,
    scrim: t.scrim,
  };
}

/** Adds alpha to a hex token so the gate can dim its own ink without a second token. */
function fade(color, alpha) {
  return `color-mix(in srgb, ${color} ${Math.round(alpha * 100)}%, transparent)`;
}

// ── Pantalla de bienvenida ────────────────────────────────────────────────────
function WelcomeScreen({ name1, name2, hasAudio, onEnter, theme = DEFAULT_GATE }) {
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
        background: theme.bgImage
          ? `${theme.scrim}, url("${theme.bgImage}") center / cover no-repeat`
          : theme.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 32px',
        zIndex: 10,
      }}
    >
      {theme.bgVideo && (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={theme.bgImage || undefined}
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              width: '100%', height: '100%', objectFit: 'cover',
            }}
          >
            <source src={theme.bgVideo} type="video/mp4" />
          </video>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: theme.scrim }} />
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.9, ease: 'easeOut' }}
        style={{ maxWidth: '360px', width: '100%', position: 'relative', zIndex: 1 }}
      >
        <p style={{
          color: theme.accent,
          letterSpacing: '0.32em',
          fontSize: '0.68rem',
          textTransform: 'uppercase',
          fontFamily: theme.fontBody,
          margin: '0 0 28px',
        }}>
          Bienvenido/a
        </p>

        <h1 style={{
          fontFamily: theme.fontTitle,
          fontWeight: 400,
          fontSize: 'clamp(2.4rem, 9vw, 4.2rem)',
          color: theme.ink,
          lineHeight: 1.1,
          margin: '0 0 6px',
          textShadow: '0 4px 40px rgba(0,0,0,0.55)',
        }}>
          {name1}
        </h1>
        {name2 && (
          <>
            <p style={{
              fontFamily: theme.fontTitle,
              fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
              color: theme.accent,
              margin: '4px 0',
            }}>&</p>
            <h1 style={{
              fontFamily: theme.fontTitle,
              fontWeight: 400,
              fontSize: 'clamp(2.4rem, 9vw, 4.2rem)',
              color: theme.ink,
              lineHeight: 1.1,
              margin: '0 0 32px',
              textShadow: '0 4px 40px rgba(0,0,0,0.55)',
            }}>
              {name2}
            </h1>
          </>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto 32px', maxWidth: '220px' }}>
          <div style={{ flex: 1, height: '1px', background: fade(theme.accent, 0.4) }} />
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: theme.accent }} />
          <div style={{ flex: 1, height: '1px', background: fade(theme.accent, 0.4) }} />
        </div>

        {hasAudio ? (
          <>
            <p style={{
              color: fade(theme.ink, 0.75),
              fontSize: '1rem',
              fontFamily: theme.fontBody,
              lineHeight: 1.65,
              margin: '0 0 32px',
            }}>
              Esta invitación tiene música.<br />¿Querés escucharla?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => onEnter(true)}
                style={{
                  background: theme.accent, border: 'none', color: theme.accentInk,
                  padding: '14px 32px', borderRadius: '4px',
                  fontFamily: theme.fontBody, fontSize: '0.85rem',
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
                  border: `1px solid ${fade(theme.ink, 0.3)}`,
                  color: fade(theme.ink, 0.7),
                  padding: '13px 32px', borderRadius: '4px',
                  fontFamily: theme.fontBody, fontSize: '0.85rem',
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
              color: fade(theme.ink, 0.7),
              fontSize: '1rem',
              fontFamily: theme.fontBody,
              lineHeight: 1.65,
              margin: '0 0 32px',
            }}>
              Te invitamos a descubrir esta experiencia
            </p>
            <button
              onClick={() => onEnter(false)}
              style={{
                background: theme.accent, border: 'none', color: theme.accentInk,
                padding: '14px 40px', borderRadius: '4px',
                fontFamily: theme.fontBody, fontSize: '0.85rem',
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
function CTAModal({ templateName, onClose, onEdit }) {
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
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get('embed') === 'true';

  const [entered, setEntered] = useState(isEmbed);
  const [waiting, setWaiting] = useState(false);
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

  // An allegory's own sample content wins over the generic wedding couple, so a
  // quinceañera design is previewed as a quinceañera.
  // `isDemo` lets the card show buttons whose destination only exists on a real
  // client's card (maps, shared album) instead of hiding the feature entirely.
  const formData = {
    ...DEMO_DATA,
    ...(variant?.allegory?.demo || {}),
    variantId: themeId,
    isDemo: true,
  };

  const allegory = useMemo(
    () => (variant?.allegory ? resolveAllegory(variant.allegory) : null),
    [variant]
  );

  // Warms images and video behind the welcome screen. The guest reading their
  // name is free time; spending it here is why the card scrolls clean later.
  const preloadImages = useMemo(
    () => (allegory ? [...allegoryImages(allegory), ...(formData.galleryPhotos || [])] : []),
    [allegory, formData.galleryPhotos]
  );
  const { ready } = usePreload({
    images: preloadImages,
    video: allegory?.tokens?.backgroundVideo || null,
    // Only once the guest has asked for music — nobody should pay for a track
    // they chose not to hear.
    audio: withMusic ? variant?.assets?.audio || null : null,
  });

  const handleEnter = (music) => {
    setWithMusic(music);
    // The video is the thing that sets these cards apart, so it is worth a
    // short wait — but only a short one, and never on a blank screen.
    if (ready) setEntered(true);
    else setWaiting(true);
  };

  const enterAnyway = useCallback(() => {
    setWaiting(false);
    setEntered(true);
  }, []);

  // Assets finished while the guest was on the wait screen.
  useEffect(() => {
    if (waiting && ready) enterAnyway();
  }, [waiting, ready, enterAnyway]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <AnimatePresence mode="wait">
        {waiting ? (
          <LoadingVeil
            key="loading"
            theme={gateThemeFor(variant)}
            allegory={allegory}
            slowAfter={5000}
            giveUpAfter={10000}
            onGiveUp={enterAnyway}
          />
        ) : !entered ? (
          <WelcomeScreen
            key="welcome"
            name1={formData.name1}
            name2={formData.name2}
            hasAudio={hasAudio}
            onEnter={handleEnter}
            theme={gateThemeFor(variant)}
          />
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ minHeight: '100vh' }}
          >
            {/* Floating bar — oculta en modo embed */}
            <div style={{
              display: isEmbed ? 'none' : 'flex',
              position: 'fixed',
              top: 0, left: 0, right: 0,
              zIndex: 9999,
              background: 'rgba(10, 10, 10, 0.72)',
              backdropFilter: 'blur(8px)',
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

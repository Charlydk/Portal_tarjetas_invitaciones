import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GuestCard from '../features/invitation/GuestCard';
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
  rsvpOnline: true,
  showMusic: false,
  askDiets: false,
};

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
  const [showCTA, setShowCTA] = useState(false);

  const variant = invitationModels
    .flatMap(m => m.variants)
    .find(v => v.id === themeId);

  const segmentTemplate = invitationSegments
    .flatMap(s => s.templates)
    .find(t => t.variantId === themeId);
  const templateName = segmentTemplate?.name || 'esta tarjeta';

  // El contenido de muestra de la alegoría gana sobre la pareja genérica, así
  // que un diseño de 15 años se previsualiza como uno de 15 años.
  // `isDemo` hace que se vean los botones cuyo destino sólo existe en la tarjeta
  // real de un cliente (mapas, álbum compartido) en vez de esconder la función.
  const formData = {
    ...DEMO_DATA,
    ...(variant?.allegory?.demo || {}),
    variantId: themeId,
    isDemo: true,
  };

  // Barra de venta: es lo único que distingue la muestra de una tarjeta
  // entregada. Se oculta en modo embed, donde la muestra va dentro del landing.
  const barraVenta = (
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
  );

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <GuestCard
        variant={variant}
        formData={formData}
        skipGate={isEmbed}
        topBar={barraVenta}
      />

      <AnimatePresence>
        {showCTA && (
          <CTAModal
            key="cta-modal"
            templateName={templateName}
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

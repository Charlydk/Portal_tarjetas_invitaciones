import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKELETON_MAP } from '../lib/skeletonMap';
import { invitationModels } from '../data/models';

// ── Demo data ─────────────────────────────────────────────────────────────────
const demoDate = (() => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  d.setMonth(10, 14);
  d.setHours(19, 0, 0, 0);
  return d.toISOString();
})();
const demoYear = new Date(demoDate).getFullYear();

const DEMO_DATA = {
  name1: 'Valentina',
  name2: 'Maximiliano',
  welcomePhrase: 'Nos Casamos',
  invitePhrase: 'Junto a sus familias, tienen el honor de invitarte a celebrar su matrimonio',
  eventDate: demoDate,
  ceremonyDate: `14 de Noviembre de ${demoYear}`,
  ceremonyTime: '19:00 hs',
  ceremonyPlace: 'Parroquia San Francisco de Asís',
  ceremonyAddress: 'Viamonte 1480, CABA',
  ceremonyMapUrl: 'https://maps.google.com', ceremonyMapUnknown: false,
  partyDateString: `14 de Noviembre de ${demoYear}`,
  partyTime: '21:00 hs',
  partyPlace: 'Salón Gran Palazzo',
  eventVenue: 'Salón Gran Palazzo',
  partyAddress: 'Av. del Libertador 4500, Buenos Aires',
  partyMapUrl: 'https://maps.google.com', partyMapUnknown: false,
  civilDate: '', civilTime: '', civilPlace: '', civilAddress: '',
  civilMapUrl: '#', civilMapUnknown: true,
  alias: 'valentina.maxi',
  giftMode: 'cbu', bankCbu: '',
  whatsappNumber: '5491100000000',
  musicPlaylistUrl: 'https://open.spotify.com',
  dressCodeDescription: 'Formal · Tonos neutros y pasteles',
  galleryPhotos: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400',
    'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=400',
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=400',
    'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=400',
  ],
  showCivil: false, showCeremony: true, showParty: true,
  showCountdown: true, showDressCode: true, showGifts: true,
  showGallery: true, showRSVP: true, showMusic: true, askDiets: false,
};

// ── Mensaje según el elemento clickeado ──────────────────────────────────────
function getToastMessage(el) {
  const href = el.getAttribute('href') || '';
  const text = (el.textContent || '').toLowerCase();

  if (href.includes('wa.me') || text.includes('whatsapp') || text.includes('confirmar'))
    return { icon: '💬', msg: 'Tus invitados podrán confirmar asistencia por WhatsApp' };
  if (href.includes('maps') || text.includes('ubicaci') || text.includes('ver en'))
    return { icon: '📍', msg: 'Se abrirá Google Maps con la ubicación del evento' };
  if (href.includes('spotify') || text.includes('playlist') || text.includes('spotify'))
    return { icon: '🎵', msg: 'Tu playlist de Spotify para compartir con los invitados' };
  if (text.includes('asistencia') || text.includes('rsvp'))
    return { icon: '✅', msg: 'Formulario de confirmación de asistencia para los invitados' };
  if (text.includes('regalo') || text.includes('alias') || text.includes('cbu'))
    return { icon: '🎁', msg: 'Los invitados verán los datos para enviar un regalo' };
  return { icon: '✨', msg: 'Este botón estará completamente funcional en tu invitación real' };
}

// ── Componente principal ──────────────────────────────────────────────────────
function DemoEmbed({ variantId = 'tarjeta4-belen-agustin' }) {
  const [toast, setToast] = useState(null);
  const toastTimer = React.useRef(null);

  const model = invitationModels.find(m => m.variants.some(v => v.id === variantId));
  const variant = model?.variants.find(v => v.id === variantId);
  const SkeletonComponent = model ? SKELETON_MAP[model.skeletonComponent] : null;

  const showToast = ({ icon, msg }) => {
    clearTimeout(toastTimer.current);
    setToast({ icon, msg });
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  };

  const handleClick = (e) => {
    const el = e.target.closest('a[href], button');
    if (!el) return;
    e.preventDefault();
    e.stopPropagation();
    showToast(getToastMessage(el));
  };

  if (!SkeletonComponent || !variant) return null;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {/* Template scrollable sin interacción real */}
      <div
        onClick={handleClick}
        style={{
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
        }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        <SkeletonComponent data={DEMO_DATA} theme={variant} />
      </div>

      {/* Toast informativo */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 12, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 8, x: '-50%' }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '50%',
              background: 'rgba(14, 11, 7, 0.92)',
              backdropFilter: 'blur(6px)',
              color: '#FAF7F2',
              padding: '10px 16px',
              borderRadius: '10px',
              fontSize: '0.78rem',
              lineHeight: 1.45,
              textAlign: 'center',
              zIndex: 200,
              width: '84%',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              pointerEvents: 'none',
            }}
          >
            <span style={{ fontSize: '1.1rem', display: 'block', marginBottom: '3px' }}>
              {toast.icon}
            </span>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DemoEmbed;

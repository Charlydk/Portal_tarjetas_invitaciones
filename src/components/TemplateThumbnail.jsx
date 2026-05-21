import React, { useRef, useState, useEffect } from 'react';
import { SKELETON_MAP } from '../lib/skeletonMap';
import { invitationModels } from '../data/models';

const TEMPLATE_WIDTH = 390;

const demoDate = (() => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  d.setMonth(10, 14);
  d.setHours(19, 0, 0, 0);
  return d.toISOString();
})();
const demoYear = new Date(demoDate).getFullYear();

const DEMO = {
  name1: 'Valentina',
  name2: 'Maximiliano',
  welcomePhrase: 'Nos Casamos',
  invitePhrase: 'Junto a sus familias, tienen el honor de invitarte a celebrar su matrimonio',
  eventDate: demoDate,
  ceremonyDate: `14 de Noviembre de ${demoYear}`,
  ceremonyTime: '19:00 hs',
  ceremonyPlace: 'Parroquia San Francisco de Asís',
  ceremonyAddress: 'Viamonte 1480, CABA',
  ceremonyMapUrl: '#', ceremonyMapUnknown: true,
  partyDateString: `14 de Noviembre de ${demoYear}`,
  partyTime: '21:00 hs',
  partyPlace: 'Salón Gran Palazzo',
  eventVenue: 'Salón Gran Palazzo',
  partyAddress: 'Av. del Libertador 4500, Buenos Aires',
  partyMapUrl: '#', partyMapUnknown: true,
  civilDate: '', civilTime: '', civilPlace: '', civilAddress: '',
  civilMapUrl: '#', civilMapUnknown: true,
  alias: 'valentina.maxi',
  giftMode: 'cbu', bankCbu: '',
  whatsappNumber: '5491100000000',
  musicPlaylistUrl: '',
  dressCodeDescription: 'Formal · Tonos neutros y pasteles',
  galleryPhotos: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400',
    'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=400',
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=400',
    'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=400',
  ],
  showCivil: false, showCeremony: true, showParty: true,
  showCountdown: true, showDressCode: true, showGifts: true,
  showGallery: true, showRSVP: true, showMusic: false, askDiets: false,
};

function TemplateThumbnail({ modelId, variantId }) {
  const wrapperRef = useRef(null);
  const [scale, setScale] = useState(null);
  const [visible, setVisible] = useState(false);

  // Lazy — solo renderizar cuando entra en viewport
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Escala reactiva al tamaño real del contenedor
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || !visible) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / TEMPLATE_WIDTH);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [visible]);

  const model = invitationModels.find(m => m.id === modelId);
  const variant = model?.variants.find(v => v.id === variantId);
  const SkeletonComponent = model ? SKELETON_MAP[model.skeletonComponent] : null;

  const ready = visible && scale !== null && SkeletonComponent && variant;

  return (
    <div
      ref={wrapperRef}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#f5f0ea' }}
    >
      {ready && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: TEMPLATE_WIDTH,
            transformOrigin: 'top left',
            transform: `scale(${scale})`,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <SkeletonComponent data={DEMO} theme={variant} />
        </div>
      )}
    </div>
  );
}

export default TemplateThumbnail;

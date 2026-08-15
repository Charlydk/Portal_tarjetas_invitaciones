import React, { Suspense, useRef, useState, useEffect } from 'react';
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
  // Local: a grid of thumbnails used to fire four remote image requests each.
  galleryPhotos: [
    '/allegories/_muestra/foto1.webp',
    '/allegories/_muestra/foto2.webp',
    '/allegories/_muestra/foto3.webp',
    '/allegories/_muestra/foto4.webp',
  ],
  showCivil: false, showCeremony: true, showParty: true,
  showCountdown: true, showDressCode: true, showGifts: true,
  showGallery: true, showRSVP: true, showMusic: false, askDiets: false,
};

/**
 * Preview tile for a design in the catalogue.
 *
 * Prefers a still (`image`). Falling back to a live render means mounting a
 * whole invitation per tile — countdown intervals, scroll observers and all —
 * and a segment like Bodas holds twenty-two of them. Any design meant to be
 * sold should ship a still.
 */
function TemplateThumbnail({ modelId, variantId, image, alt }) {
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

  if (image) {
    return (
      <img
        src={image}
        alt={alt || ''}
        loading="lazy"
        decoding="async"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          background: '#f5f0ea',
        }}
      />
    );
  }

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
          {/* Templates are code-split; without a boundary here a tile loading
              its chunk would suspend the whole page. */}
          <Suspense fallback={null}>
            <SkeletonComponent data={DEMO} theme={variant} />
          </Suspense>
        </div>
      )}
    </div>
  );
}

export default TemplateThumbnail;

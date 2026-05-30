import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';
import ParticlesBackground from '../../components/ParticlesBackground';
import './Skeleton5.css';

const GOLD_PARTICLES = [
  [212, 175,  55],
  [201, 169, 110],
  [220, 190, 140],
  [250, 235, 200],
  [240, 220, 165],
];

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&q=80',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&q=80',
  'https://images.unsplash.com/photo-1522673607200-1648832cee98?w=300&q=80',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=300&q=80',
];

function Skeleton5({ data, theme }) {
  const {
    name1 = 'Nombre',
    name2 = '',
    welcomePhrase = '',
    eventDate = '2025-11-15T22:00:00',
    partyDateString = '15/11/2025',
    ceremonyPlace = 'Parroquia',
    partyPlace = 'Salón',
    alias = 'Alias.Bancario',
    bankCbu = '',
    giftMode = 'cbu',
    whatsappNumber = '',
    musicPlaylistUrl = '',
    eventVenue = '',
    dressCodeDescription = 'Elegante',
    galleryPhotos = [],

    showCeremony = true,
    showParty = true,
    showCountdown = true,
    showDressCode = true,
    showGifts = true,
    showGallery = true,
    showRSVP = true,
    showMusic = true,
  } = data || {};

  const [activeCard, setActiveCard] = useState(null);
  const timeLeft = useCountdown(eventDate);
  const displayPhotos = galleryPhotos.length > 0 ? galleryPhotos : SAMPLE_PHOTOS;

  const giftContent = giftMode === 'cofre'
    ? 'Cofre en el salón'
    : (alias || bankCbu || 'Tu presencia es nuestro mejor regalo');

  const cards = [
    showCountdown && { id: 'countdown', title: 'FALTAN', icon: '⏳' },
    (showCeremony || showParty) && { id: 'when',     title: '¿CUÁNDO?',   icon: '📅', content: partyDateString },
    (showCeremony || showParty) && { id: 'where',    title: '¿DÓNDE?',    icon: '📍', content: ceremonyPlace || eventVenue || partyPlace },
    showDressCode               && { id: 'dresscode',title: 'DRESS CODE', icon: '👗', content: dressCodeDescription || 'Elegante' },
    showGallery                 && { id: 'album',    title: 'FOTOS',      icon: '📸', content: 'Nuestros momentos' },
    showGifts                   && { id: 'gifts',    title: 'REGALOS',    icon: '💍', content: giftContent },
  ].filter(Boolean);

  const dynamicStyles = {
    '--primary-color': theme?.styles?.primaryColor || '#C9A96E',
    '--bg-color':      theme?.styles?.cardBackground || '#FDF8F0',
  };

  const handleCardClick = (card) => {
    setActiveCard(activeCard === card.id ? null : card.id);
  };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Confirmo mi asistencia 🎉')}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    show:   { opacity: 1, transition: { staggerChildren: 0.09 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    show:   { opacity: 1, scale: 1 },
  };

  return (
    <div id="skeleton5-template" style={dynamicStyles}>
      <ParticlesBackground colors={GOLD_PARTICLES} count={35} />

      <div className="s5-wrapper s5-scroll-container">

        {/* ── Header ── */}
        <motion.header
          className="s5-header"
          initial={{ y: -36, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="s5-ring s5-ring-outer"
            animate={{ rotate: -360 }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="s5-ring s5-ring-inner"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
          <h1 className="s5-title">
            {name1}{name2 ? ` & ${name2}` : ''}
          </h1>
          <p className="s5-subtitle">{welcomePhrase || 'Nos Casamos'}</p>
        </motion.header>

        {/* ── Cards ── */}
        <motion.div
          className="s5-card-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {cards.map(card => (
            <motion.div
              key={card.id}
              variants={itemVariants}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`s5-card ${activeCard === card.id ? 'active' : ''}`}
              onClick={() => handleCardClick(card)}
            >
              <div className="s5-card-inner">
                <div className="s5-card-front">
                  <span className="s5-card-icon">{card.icon}</span>
                  <h3>{card.title}</h3>
                </div>
                <div className="s5-card-back">
                  {card.id === 'countdown' ? (
                    <div className="s5-timer-mini">
                      <div><span>{timeLeft.days}</span><p>D</p></div>
                      <div><span>{timeLeft.hours}</span><p>H</p></div>
                      <div><span>{timeLeft.minutes}</span><p>M</p></div>
                      <div><span>{timeLeft.seconds}</span><p>S</p></div>
                    </div>
                  ) : (
                    <p className="s5-card-text">{card.content}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Gallery expandible ── */}
        <AnimatePresence>
          {activeCard === 'album' && showGallery && (
            <motion.div
              className="s5-gallery-preview"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="s5-gallery-grid">
                {displayPhotos.slice(0, 4).map((src, i) => (
                  <motion.img
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.08 }}
                    src={src}
                    alt={`Foto ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CTA Buttons ── */}
        {(showRSVP || showMusic) && (
          <motion.div
            className="s5-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {showRSVP && whatsappNumber && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="s5-btn s5-btn-whatsapp"
              >
                💬 Confirmar asistencia
              </a>
            )}
            {showMusic && musicPlaylistUrl && (
              <a
                href={musicPlaylistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="s5-btn s5-btn-outline"
              >
                🎵 Ver playlist
              </a>
            )}
          </motion.div>
        )}

        <motion.p
          className="s5-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Toca las tarjetas para descubrir más
        </motion.p>

      </div>
    </div>
  );
}

export default Skeleton5;

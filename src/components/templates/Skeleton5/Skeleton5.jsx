import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '../../../hooks/useCountdown';
import './Skeleton5.css';

function Skeleton5({ data, theme }) {
  const {
    name1 = 'Nombre',
    eventDate = '2025-11-15T22:00:00',
    partyDateString = '15/11/2025',
    ceremonyPlace = 'Parroquia',
    partyPlace = 'Salón',
    alias = 'Alias.Bancario',
    whatsappNumber = '',
    musicUrl = '',
    eventVenue = '',
  } = data || {};

  const [activeCard, setActiveCard] = useState(null);
  const timeLeft = useCountdown(eventDate);

  const cards = [
    {
        id: 'countdown',
        title: 'FALTAN',
        icon: '⏳',
        content: `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
    },
    { id: 'when', title: '¿CUÁNDO?', icon: '📅', content: partyDateString },
    { id: 'where', title: '¿DÓNDE?', icon: '📍', content: `${ceremonyPlace} / ${eventVenue || partyPlace}` },
    { id: 'dresscode', title: 'DRESS CODE', icon: '👗', content: 'Elegante' },
    { id: 'album', title: 'ÁLBUM', icon: '📸', content: '¡Toca para ver nuestras fotos!' },
    { id: 'music', title: 'MÚSICA', icon: '🎵', content: '¿Qué canción no puede faltar?' },
    { id: 'gifts', title: 'REGALOS', icon: '🎁', content: `CBU/Alias: ${alias}` },
    { id: 'rsvp', title: 'ASISTENCIA', icon: '✅', content: 'Confirmar por WhatsApp' },
  ];

  const dynamicStyles = {
    '--primary-color': theme?.styles?.primaryColor || '#f39c12',
    '--bg-color': theme?.styles?.cardBackground || '#fdfcf0',
  };

  const handleCardClick = (card) => {
    if (activeCard === card.id) {
        setActiveCard(null);
    } else {
        setActiveCard(card.id);
    }

    // Actions for specific cards if needed
    if (card.id === 'rsvp' && activeCard === card.id) {
        window.open(`https://wa.me/${whatsappNumber}`, '_blank');
    }
    if (card.id === 'music' && activeCard === card.id) {
        window.open(musicUrl, '_blank');
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div id="skeleton5-template" style={dynamicStyles}>
      <div className="s5-wrapper s5-scroll-container">
        <motion.header
          className="s5-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
           <motion.div
             className="s5-circle-decoration"
             animate={{
               rotate: 360,
               scale: [1, 1.1, 1]
             }}
             transition={{
               rotate: { duration: 20, repeat: Infinity, ease: "linear" },
               scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
             }}
           ></motion.div>
           <h1 className="s5-title">{name1}</h1>
           <p className="s5-subtitle">¡FESTEJEMOS!</p>
        </motion.header>

        <motion.div
          className="s5-card-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
           {cards.map(card => (
             <motion.div
               key={card.id}
               variants={item}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className={`s5-card ${activeCard === card.id ? 'active' : ''}`}
               onClick={() => handleCardClick(card)}
             >
                <div className="s5-card-inner">
                    <div className="s5-card-front">
                        <span className="s5-card-icon">{card.icon}</span>
                        <h3>{card.title}</h3>
                    </div>
                    <div className="s5-card-back">
                        <div className="s5-card-content">
                            {card.id === 'countdown' ? (
                                <div className="s5-timer-mini">
                                    <div><span>{timeLeft.days}</span><p>D</p></div>
                                    <div><span>{timeLeft.hours}</span><p>H</p></div>
                                    <div><span>{timeLeft.minutes}</span><p>M</p></div>
                                    <div><span>{timeLeft.seconds}</span><p>S</p></div>
                                </div>
                            ) : (
                                <p>{card.content}</p>
                            )}
                            {(card.id === 'rsvp' || card.id === 'music' || card.id === 'album') && (
                                <span className="s5-tap-hint">Toca de nuevo</span>
                            )}
                        </div>
                    </div>
                </div>
             </motion.div>
           ))}
        </motion.div>

        <AnimatePresence>
          {activeCard === 'album' && (
              <motion.div
                className="s5-gallery-preview"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                  <div className="s5-gallery-grid">
                      {[...Array(4)].map((_, i) => (
                          <motion.img
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            src={`https://picsum.photos/seed/s5-${i}/200/200`}
                            alt="Gallery"
                          />
                      ))}
                  </div>
              </motion.div>
          )}
        </AnimatePresence>

        <motion.footer
          className="s5-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
           <p>Toca las tarjetas para descubrir más detalles</p>
        </motion.footer>
      </div>
    </div>
  );
}

export default Skeleton5;

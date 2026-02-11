import React from 'react';
import { motion } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';
import './Skeleton2.css';

function Skeleton2({ data, theme }) {
  const {
    name1 = 'Nombre',
    name2 = '',
    eventDate = '2025-11-15T22:00:00',
    ceremonyDate = '11/11/2025',
    ceremonyTime = '19:30 HS',
    ceremonyPlace = 'Parroquia',
    ceremonyMapUrl = '#',
    partyDateString = '15/11/2025',
    partyTime = '22:00 HS',
    partyPlace = 'Salón',
    eventVenue = '',
    partyMapUrl = '#',
    alias = 'Alias.Bancario',
    whatsappNumber = '',
    musicUrl = '',

    showCeremony = true,
    showParty = true,
    showCountdown = true,
    showDressCode = true,
    showGifts = true,
    showGallery = true,
    showRSVP = true,
    showMusic = true,
  } = data || {};

  const themeConfig = theme || {
    assets: {
      backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000',
      ceremonyIcon: '⛪',
      partyIcon: '🥂',
      dressCodeIcon: '👗',
      giftIcon: '🎁'
    },
    styles: {
      primaryColor: '#333333',
      secondaryColor: '#f4f4f4',
      fontFamilyTitle: "'Playfair Display', serif",
      fontFamilyBody: "'Lato', sans-serif",
      textColor: '#333333',
      cardBackground: '#ffffff'
    }
  };

  const timeLeft = useCountdown(eventDate);

  const dynamicStyles = {
    '--primary-color': themeConfig.styles.primaryColor,
    '--secondary-color': themeConfig.styles.secondaryColor,
    '--font-title': themeConfig.styles.fontFamilyTitle,
    '--font-body': themeConfig.styles.fontFamilyBody,
    '--text-color': themeConfig.styles.textColor,
    '--card-bg': themeConfig.styles.cardBackground,
    '--bg-image': `url(${themeConfig.assets.backgroundImage})`,
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div id="skeleton2-template" style={dynamicStyles}>
      <div className="s2-scroll-container">
        <header className="s2-hero">
          <motion.div
            className="s2-hero-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="s2-title">{name1} {name2 && `& ${name2}`}</h1>
            <p className="s2-subtitle">¡ESTÁS INVITADO!</p>
          </motion.div>
        </header>

        <div className="s2-container">
        {showCountdown && (
          <motion.section className="s2-section s2-countdown" {...fadeInUp}>
            <div className="s2-timer">
              <div className="s2-time-item"><span>{timeLeft.days}</span><p>DÍAS</p></div>
              <div className="s2-time-item"><span>{timeLeft.hours}</span><p>HRS</p></div>
              <div className="s2-time-item"><span>{timeLeft.minutes}</span><p>MIN</p></div>
              <div className="s2-time-item"><span>{timeLeft.seconds}</span><p>SEG</p></div>
            </div>
          </motion.section>
        )}

        <div className="s2-grid">
          {showCeremony && (
            <motion.div className="s2-card" {...fadeInUp}>
              <div className="s2-card-icon">{typeof themeConfig.assets.ceremonyIcon === 'string' && themeConfig.assets.ceremonyIcon.length > 2 ? <img src={themeConfig.assets.ceremonyIcon} alt=""/> : themeConfig.assets.ceremonyIcon}</div>
              <h3>CEREMONIA</h3>
              <div className="s2-card-content">
                <p className="s2-place">{ceremonyPlace}</p>
                <p className="s2-detail">{ceremonyDate} - {ceremonyTime}</p>
              </div>
              <a href={ceremonyMapUrl} target="_blank" rel="noopener noreferrer" className="s2-btn">CÓMO LLEGAR</a>
            </motion.div>
          )}

          {showParty && (
            <motion.div className="s2-card" {...fadeInUp}>
               <div className="s2-card-icon">{typeof themeConfig.assets.partyIcon === 'string' && themeConfig.assets.partyIcon.length > 2 ? <img src={themeConfig.assets.partyIcon} alt=""/> : themeConfig.assets.partyIcon}</div>
              <h3>FIESTA</h3>
              <div className="s2-card-content">
                <p className="s2-place">{eventVenue || partyPlace}</p>
                <p className="s2-detail">{partyDateString} - {partyTime}</p>
              </div>
              <a href={partyMapUrl} target="_blank" rel="noopener noreferrer" className="s2-btn">UBICACIÓN</a>
            </motion.div>
          )}
        </div>

        {showGallery && (
          <section className="s2-section gallery-section">
            <motion.h2 className="s2-section-title" {...fadeInUp}>NUESTROS MOMENTOS</motion.h2>
            <div className="s2-gallery-grid">
               {[...Array(6)].map((_, i) => (
                 <motion.div
                    key={i}
                    className="s2-gallery-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                 >
                    <img src={`https://picsum.photos/seed/${i+40}/400/400`} alt={`Momento ${i}`} />
                 </motion.div>
               ))}
            </div>
          </section>
        )}

        <div className="s2-grid secondary-grid">
            {showDressCode && (
              <motion.div className="s2-card info-card" {...fadeInUp}>
                <div className="s2-card-icon small">{typeof themeConfig.assets.dressCodeIcon === 'string' && themeConfig.assets.dressCodeIcon.length > 2 ? <img src={themeConfig.assets.dressCodeIcon} alt=""/> : themeConfig.assets.dressCodeIcon}</div>
                <h4>DRESS CODE</h4>
                <p>Elegante</p>
              </motion.div>
            )}
            {showGifts && (
              <motion.div className="s2-card info-card" {...fadeInUp}>
                <div className="s2-card-icon small">{typeof themeConfig.assets.giftIcon === 'string' && themeConfig.assets.giftIcon.length > 2 ? <img src={themeConfig.assets.giftIcon} alt=""/> : themeConfig.assets.giftIcon}</div>
                <h4>REGALOS</h4>
                <p>{alias}</p>
              </motion.div>
            )}
        </div>

        {showRSVP && (
          <motion.div className="s2-rsvp-box" {...fadeInUp}>
             <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="s2-btn primary">CONFIRMAR ASISTENCIA</a>
          </motion.div>
        )}

        {showMusic && (
          <motion.div className="s2-music-box" {...fadeInUp}>
             <p>¿Qué música no puede faltar?</p>
             <a href={musicUrl} target="_blank" rel="noopener noreferrer" className="s2-btn secondary">SUGERIR CANCIÓN</a>
          </motion.div>
        )}

          <motion.footer className="s2-footer" {...fadeInUp}>
            <p>CON AMOR, {name1}</p>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}

export default Skeleton2;

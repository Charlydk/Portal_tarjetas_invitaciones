import React from 'react';
import { motion } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';
import './Skeleton6.css';

function Skeleton6({ data, theme }) {
  const {
    name1 = 'Nombre',
    name2 = '',
    eventDate = '2025-11-15T22:00:00',
    eventSubtitle = '¡ESTÁS INVITADO!',
    ceremonyPlace = 'Parroquia',
    ceremonyDate = '11/11/2025',
    ceremonyTime = '19:30 HS',
    partyPlace = 'Salón',
    partyDateString = '15/11/2025',
    partyTime = '22:00 HS',
    whatsappNumber = '',
    eventVenue = '',

    showCeremony = true,
    showParty = true,
    showCountdown = true,
  } = data || {};

  const themeConfig = theme || {};

  const dynamicStyles = {
    '--primary-color': themeConfig.styles?.primaryColor || 'var(--primary-color)',
    '--secondary-color': themeConfig.styles?.secondaryColor || 'var(--secondary-color)',
    '--font-title': themeConfig.styles?.fontFamilyTitle || 'var(--font-title)',
    '--font-body': themeConfig.styles?.fontFamilyBody || 'var(--font-body)',
    '--text-color': themeConfig.styles?.textColor || '#ffffff',
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div id="skeleton6-template" style={dynamicStyles}>
      <div className="s6-video-bg">
         <video autoPlay loop muted playsInline key={themeConfig.assets?.headerVideo}>
            <source src={themeConfig.assets?.headerVideo} type="video/mp4" />
         </video>
         <div className="s6-gradient-overlay"></div>
      </div>

      <div className="s6-content s6-scroll-container">
         <motion.header
           className="s6-header s6-full-height"
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.5 }}
         >
            <motion.h1
              className="s6-title"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {name1} {name2 && `& ${name2}`}
            </motion.h1>
            <p className="s6-subtitle">{eventSubtitle}</p>

            <div className="s6-scroll-hint">
               <p>Desliza para ver detalles</p>
               <motion.div
                 animate={{ y: [0, 10, 0] }}
                 transition={{ duration: 1.5, repeat: Infinity }}
               >
                 ↓
               </motion.div>
            </div>
         </motion.header>

         {showCountdown && (
           <motion.section className="s6-info-card-section" {...fadeInUp}>
              <div className="s6-card-blur">
                 <h3>FALTAN...</h3>
                 <CountdownMini targetDate={eventDate} />
              </div>
           </motion.section>
         )}

         {showCeremony && (
           <motion.section className="s6-info-card-section" {...fadeInUp}>
              <div className="s6-card-blur">
                 <h3>CEREMONIA</h3>
                 <p className="s6-place">{ceremonyPlace}</p>
                 <p>{ceremonyDate} — {ceremonyTime}</p>
              </div>
           </motion.section>
         )}

         {showParty && (
           <motion.section className="s6-info-card-section" {...fadeInUp}>
              <div className="s6-card-blur">
                 <h3>FIESTA</h3>
                 <p className="s6-place">{eventVenue || partyPlace}</p>
                 <p>{partyDateString} — {partyTime}</p>
              </div>
           </motion.section>
         )}

         <motion.div
           className="s6-center-box s6-full-height"
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
         >
            <div className="s6-floating-info">
               <p>Vive esta experiencia inolvidable junto a nosotros.</p>
               <motion.div
                 className="s6-pulse-btn"
                 animate={{ scale: [1, 1.05, 1] }}
                 transition={{ duration: 2, repeat: Infinity }}
               >
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">CONFIRMAR ASISTENCIA</a>
               </motion.div>
            </div>
         </motion.div>

         <footer className="s6-footer-minimal">
            <p>© 2025 {name1}</p>
         </footer>
      </div>
    </div>
  );
}

function CountdownMini({ targetDate }) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);
  return (
    <div className="s6-countdown-mini">
       <div><span>{days}</span><p>D</p></div>
       <div><span>{hours}</span><p>H</p></div>
       <div><span>{minutes}</span><p>M</p></div>
       <div><span>{seconds}</span><p>S</p></div>
    </div>
  );
}

export default Skeleton6;

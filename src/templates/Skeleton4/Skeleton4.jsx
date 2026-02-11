import React from 'react';
import { motion } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';
import './Skeleton4.css';

function Skeleton4({ data, theme }) {
  const {
    name1 = 'Nombre',
    name2 = '',
    eventDate = '2025-11-15T22:00:00',
    eventVenue = 'Salón Eventos',
    ceremonyDate = '11/11/2025',
    ceremonyTime = '19:30 HS',
    ceremonyPlace = 'Parroquia',
    ceremonyMapUrl = '#',
    partyDateString = '15/11/2025',
    partyTime = '22:00 HS',
    partyPlace = 'Salón',
    partyMapUrl = '#',
    whatsappNumber = '',

    showCeremony = true,
    showParty = true,
    showCountdown = true,
    showDressCode = true,
    showGifts = true,
    showRSVP = true,
  } = data || {};

  const timeLeft = useCountdown(eventDate);

  const dynamicStyles = {
    '--primary-color': theme?.styles?.primaryColor || '#000000',
    '--font-title': theme?.styles?.fontFamilyTitle || "'Montserrat', sans-serif",
    '--font-body': theme?.styles?.fontFamilyBody || "'Montserrat', sans-serif",
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <div id="skeleton4-template" style={dynamicStyles}>
      <div className="s4-container s4-scroll-container">
        <motion.header
          className="s4-header"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
           <motion.h1
             className="s4-title"
             initial={{ letterSpacing: "0px" }}
             animate={{ letterSpacing: "4px" }}
             transition={{ duration: 1.5, delay: 0.5 }}
           >
             {name1} {name2 && `& ${name2}`}
           </motion.h1>
           <div className="s4-divider"></div>
           <p className="s4-date-header">{partyDateString}</p>
        </motion.header>

        {showCountdown && (
           <motion.div
             className="s4-countdown"
             {...fadeInUp}
           >
              <div className="s4-time">{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</div>
           </motion.div>
        )}

        <motion.main
          className="s4-main"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {showCeremony && (
            <motion.section className="s4-section" variants={fadeInUp}>
               <h3>CEREMONIA</h3>
               <p>{ceremonyPlace}</p>
               <p>{ceremonyDate} — {ceremonyTime}</p>
               <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={ceremonyMapUrl}
                className="s4-link"
               >
                 UBICACIÓN
               </motion.a>
            </motion.section>
          )}

          {showParty && (
            <motion.section className="s4-section" variants={fadeInUp}>
               <h3>FIESTA</h3>
               <p>{eventVenue || partyPlace}</p>
               <p>{partyDateString} — {partyTime}</p>
               <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={partyMapUrl}
                className="s4-link"
               >
                 UBICACIÓN
               </motion.a>
            </motion.section>
          )}

          {showDressCode && (
            <motion.section className="s4-section" variants={fadeInUp}>
               <h3>DRESS CODE</h3>
               <p>Elegante</p>
            </motion.section>
          )}

          {showGifts && (
            <motion.section className="s4-section" variants={fadeInUp}>
               <h3>REGALOS</h3>
               <p>Tu presencia es nuestro mejor regalo.</p>
               <p>CBU/Alias: <strong>{data.alias || 'Alias.Bancario'}</strong></p>
            </motion.section>
          )}
        </motion.main>

        {showRSVP && (
           <motion.footer
             className="s4-footer"
             {...fadeInUp}
           >
              <motion.a
                whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
                href={`https://wa.me/${whatsappNumber}`}
                className="s4-rsvp-btn"
              >
                CONFIRMAR ASISTENCIA
              </motion.a>
           </motion.footer>
        )}
      </div>
    </div>
  );
}

export default Skeleton4;

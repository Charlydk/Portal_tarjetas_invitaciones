import React from 'react';
import { motion } from 'framer-motion';
import './Skeleton6.css';

function Skeleton6({ data, theme }) {
  const {
    name1 = 'Nombre',
    eventSubtitle = '¡ESTÁS INVITADO!',
    whatsappNumber = '',
  } = data || {};

  const themeConfig = theme || {};

  return (
    <div id="skeleton6-template">
      <div className="s6-video-bg">
         <video autoPlay loop muted playsInline key={themeConfig.assets?.headerVideo}>
            <source src={themeConfig.assets?.headerVideo} type="video/mp4" />
         </video>
         <div className="s6-gradient-overlay"></div>
      </div>

      <div className="s6-content s6-scroll-container">
         <motion.header
           className="s6-header"
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
              {name1}
            </motion.h1>
            <p className="s6-subtitle">{eventSubtitle}</p>
         </motion.header>

         <motion.div
           className="s6-center-box"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 1 }}
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

         <motion.footer
           className="s6-footer"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 1.5 }}
         >
            <p>Desliza para descubrir más detalles</p>
            <motion.div
              className="s6-scroll-icon"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </motion.div>
         </motion.footer>
      </div>
    </div>
  );
}

export default Skeleton6;

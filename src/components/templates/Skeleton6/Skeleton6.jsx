import React from 'react';
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

      <div className="s6-content">
         <header className="s6-header">
            <h1 className="s6-title">{name1}</h1>
            <p className="s6-subtitle">{eventSubtitle}</p>
         </header>

         <div className="s6-center-box">
            <div className="s6-floating-info">
               <p>Vive esta experiencia inolvidable junto a nosotros.</p>
               <div className="s6-pulse-btn">
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">CONFIRMAR ASISTENCIA</a>
               </div>
            </div>
         </div>

         <footer className="s6-footer">
            <p>Desliza para descubrir más detalles</p>
            <div className="s6-scroll-icon">↓</div>
         </footer>
      </div>
    </div>
  );
}

export default Skeleton6;

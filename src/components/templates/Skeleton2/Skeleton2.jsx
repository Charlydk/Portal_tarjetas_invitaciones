import React from 'react';
import { useCountdown } from '../../../hooks/useCountdown';
import './Skeleton2.css';

function Skeleton2({ data, theme }) {
  const {
    name1 = 'Nombre',
    name2 = '',
    eventDate = '2025-11-15T22:00:00',
    ceremonyDate = '11/11/2025',
    ceremonyTime = '19:30 HS',
    ceremonyPlace = 'Parroquia',
    ceremonyAddress = 'Calle Falsa 123',
    ceremonyMapUrl = '#',
    partyDateString = '15/11/2025',
    partyTime = '22:00 HS',
    partyPlace = 'Salón',
    eventVenue = '',
    partyAddress = 'Dirección',
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

  return (
    <div id="skeleton2-template" style={dynamicStyles}>
      <div className="s2-scroll-container">
        <header className="s2-hero">
          <div className="s2-hero-content">
            <h1 className="s2-title">{name1} {name2 && `& ${name2}`}</h1>
            <p className="s2-subtitle">¡ESTÁS INVITADO!</p>
          </div>
        </header>

        <div className="s2-container">
        {showCountdown && (
          <section className="s2-section s2-countdown">
            <div className="s2-timer">
              <div className="s2-time-item"><span>{timeLeft.days}</span><p>DÍAS</p></div>
              <div className="s2-time-item"><span>{timeLeft.hours}</span><p>HRS</p></div>
              <div className="s2-time-item"><span>{timeLeft.minutes}</span><p>MIN</p></div>
              <div className="s2-time-item"><span>{timeLeft.seconds}</span><p>SEG</p></div>
            </div>
          </section>
        )}

        <div className="s2-grid">
          {showCeremony && (
            <div className="s2-card">
              <div className="s2-card-icon">{typeof themeConfig.assets.ceremonyIcon === 'string' && themeConfig.assets.ceremonyIcon.length > 2 ? <img src={themeConfig.assets.ceremonyIcon} alt=""/> : themeConfig.assets.ceremonyIcon}</div>
              <h3>CEREMONIA</h3>
              <p>{ceremonyPlace}</p>
              <p>{ceremonyDate} - {ceremonyTime}</p>
              <a href={ceremonyMapUrl} target="_blank" rel="noopener noreferrer" className="s2-btn">CÓMO LLEGAR</a>
            </div>
          )}

          {showParty && (
            <div className="s2-card">
               <div className="s2-card-icon">{typeof themeConfig.assets.partyIcon === 'string' && themeConfig.assets.partyIcon.length > 2 ? <img src={themeConfig.assets.partyIcon} alt=""/> : themeConfig.assets.partyIcon}</div>
              <h3>FIESTA</h3>
              <p>{eventVenue || partyPlace}</p>
              <p>{partyDateString} - {partyTime}</p>
              <a href={partyMapUrl} target="_blank" rel="noopener noreferrer" className="s2-btn">UBICACIÓN</a>
            </div>
          )}
        </div>

        {showGallery && (
          <section className="s2-section">
            <h2 className="s2-section-title">NUESTROS MOMENTOS</h2>
            <div className="s2-gallery-grid">
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="s2-gallery-item">
                    <img src={`https://picsum.photos/seed/${i+40}/400/400`} alt={`Momento ${i}`} />
                 </div>
               ))}
            </div>
          </section>
        )}

        <div className="s2-info-row">
            {showDressCode && (
              <div className="s2-info-item">
                <h4>DRESS CODE</h4>
                <p>Elegante</p>
              </div>
            )}
            {showGifts && (
              <div className="s2-info-item">
                <h4>REGALOS</h4>
                <p>CBU/Alias: {alias}</p>
              </div>
            )}
        </div>

        {showRSVP && (
          <div className="s2-rsvp-box">
             <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="s2-btn primary">CONFIRMAR ASISTENCIA</a>
          </div>
        )}

        {showMusic && (
          <div className="s2-music-box">
             <p>¿Qué música no puede faltar?</p>
             <a href={musicUrl} target="_blank" rel="noopener noreferrer" className="s2-btn secondary">SUGERIR CANCIÓN</a>
          </div>
        )}

          <footer className="s2-footer">
            <p>CON AMOR, {name1}</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Skeleton2;

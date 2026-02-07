import React from 'react';
import { useCountdown } from '../../../hooks/useCountdown';
import './Skeleton3.css';

function Skeleton3({ data, theme }) {
  const {
    name1 = 'Nombre',
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

    showCeremony = true,
    showParty = true,
    showCountdown = true,
    showGifts = true,
    showGallery = true,
    showRSVP = true,
  } = data || {};

  const timeLeft = useCountdown(eventDate);

  const themeConfig = theme || {
    assets: {
      backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552',
      sectionPhotos: [
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b',
        'https://images.unsplash.com/photo-1522673607200-1648832cee98'
      ]
    },
    styles: {
      primaryColor: '#8e44ad',
      textColor: '#ffffff',
      fontFamilyTitle: "'Dancing Script', cursive",
      fontFamilyBody: "'Raleway', sans-serif",
    }
  };

  const dynamicStyles = {
    '--primary-color': themeConfig.styles.primaryColor,
    '--font-title': themeConfig.styles.fontFamilyTitle,
    '--font-body': themeConfig.styles.fontFamilyBody,
    '--text-color': themeConfig.styles.textColor,
  };

  const sectionPhotos = themeConfig.assets.sectionPhotos || [];

  return (
    <div id="skeleton3-template" style={dynamicStyles}>
      <div className="s3-scroll-container">

        {/* SECTION 1: HERO */}
        <section className="s3-section s3-hero" style={{ backgroundImage: `url(${sectionPhotos[0] || themeConfig.assets.backgroundImage})` }}>
           <div className="s3-overlay">
              <h1 className="s3-title">{name1}</h1>
              <p className="s3-subtitle">MIS XV AÑOS</p>
           </div>
        </section>

        {/* SECTION 2: COUNTDOWN */}
        <section className="s3-info-section">
           {showCountdown && (
             <div className="s3-timer">
                <div className="s3-time-item"><span>{timeLeft.days}</span><p>DÍAS</p></div>
                <div className="s3-time-item"><span>{timeLeft.hours}</span><p>HRS</p></div>
                <div className="s3-time-item"><span>{timeLeft.minutes}</span><p>MIN</p></div>
                <div className="s3-time-item"><span>{timeLeft.seconds}</span><p>SEG</p></div>
             </div>
           )}
           <p className="s3-intro-text">Hay momentos que son especiales, pero compartirlos con vos los hace inolvidables.</p>
        </section>

        {/* SECTION 3: CEREMONY */}
        {showCeremony && (
          <>
            <div className="s3-divider-photo" style={{ backgroundImage: `url(${sectionPhotos[1] || themeConfig.assets.backgroundImage})` }}></div>
            <section className="s3-info-section">
                <h2 className="s3-section-title">Ceremonia</h2>
                <p><strong>{ceremonyPlace}</strong></p>
                <p>{ceremonyAddress}</p>
                <p>{ceremonyDate} - {ceremonyTime}</p>
                <a href={ceremonyMapUrl} className="s3-btn">¿CÓMO LLEGAR?</a>
            </section>
          </>
        )}

        {/* SECTION 4: PARTY */}
        {showParty && (
          <>
            <div className="s3-divider-photo" style={{ backgroundImage: `url(${sectionPhotos[2] || themeConfig.assets.backgroundImage})` }}></div>
            <section className="s3-info-section">
                <h2 className="s3-section-title">Fiesta</h2>
                <p><strong>{eventVenue || partyPlace}</strong></p>
                <p>{partyAddress}</p>
                <p>{partyDateString} - {partyTime}</p>
                <a href={partyMapUrl} className="s3-btn">UBICACIÓN</a>
            </section>
          </>
        )}

        {/* SECTION 5: GALLERY */}
        {showGallery && (
          <>
            <div className="s3-divider-photo" style={{ backgroundImage: `url(${sectionPhotos[3] || themeConfig.assets.backgroundImage})` }}></div>
            <section className="s3-info-section">
                <h2 className="s3-section-title">Galería</h2>
                <div className="s3-gallery">
                   {[...Array(4)].map((_, i) => (
                     <img key={i} src={`https://picsum.photos/seed/s3-${i}/300/300`} alt="Gallery" />
                   ))}
                </div>
            </section>
          </>
        )}

        {/* SECTION 6: RSVP & GIFTS */}
        <section className="s3-info-section s3-footer-section">
           {showGifts && (
             <div className="s3-gift-area">
                <h3>Regalos</h3>
                <p>Tu presencia es lo más importante.</p>
                <p>Si deseas hacerme un regalo: <br/> <strong>Alias: {alias}</strong></p>
             </div>
           )}
           {showRSVP && (
             <div className="s3-rsvp-area">
                <a href={`https://wa.me/${whatsappNumber}`} className="s3-btn primary">CONFIRMAR ASISTENCIA</a>
             </div>
           )}
           <footer className="s3-final-footer">
              <p>TE ESPERO PARA FESTEJAR JUNTOS</p>
              <h3>{name1}</h3>
           </footer>
        </section>

      </div>
    </div>
  );
}

export default Skeleton3;

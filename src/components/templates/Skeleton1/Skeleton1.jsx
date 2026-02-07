import React, { useState, useRef } from 'react';
import { useCountdown } from '../../../hooks/useCountdown';
import './Skeleton1.css';

function Skeleton1({ data, theme }) {
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
    musicUrl = '',
    eventSubtitle = '',

    showCeremony = true,
    showParty = true,
    showCountdown = true,
    showDressCode = true,
    showGifts = true,
    showGallery = true,
    showRSVP = true,
    showMusic = true,
  } = data || {};

  // Si no hay theme, usamos uno por defecto (Rapunzel)
  const themeConfig = theme || {
    assets: {
      headerVideo: '/assets/Rapunzel/video/Tangled_live_wallpaper.mp4',
      backgroundImage: '/assets/Rapunzel/img/main_section_background.png',
      ceremonyIcon: '/assets/Rapunzel/img/ceremonia.png',
      partyIcon: '/assets/Rapunzel/img/fiesta.png',
      dressCodeIcon: '/assets/Rapunzel/img/dresscode.jpg',
      giftIcon: '/assets/Rapunzel/img/regalo.gif',
      audio: '/assets/Rapunzel/audio/cancion.mp3'
    },
    styles: {
      primaryColor: '#FF69B4',
      secondaryColor: '#28a745',
      fontFamilyTitle: "'Great Vibes', cursive",
      fontFamilyBody: "'Montserrat', sans-serif",
      headerOverlay: 'rgba(0,0,0,0.4)',
      cardBackground: 'transparent',
      textColor: '#ffffff'
    }
  };

  const [showModal, setShowModal] = useState(true);
  const handleEnter = () => { setShowModal(false); toggleAudio(); };

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const toggleAudio = () => {
    if (audioRef.current && themeConfig.assets.audio) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch(() => console.log("Play bloqueado"));
      setIsPlaying(!isPlaying);
    }
  };

  const timeLeft = useCountdown(eventDate);

  // Estilos dinámicos basados en el theme
  const dynamicStyles = {
    '--primary-color': themeConfig.styles.primaryColor,
    '--secondary-color': themeConfig.styles.secondaryColor,
    '--font-title': themeConfig.styles.fontFamilyTitle,
    '--font-body': themeConfig.styles.fontFamilyBody,
    '--header-overlay': themeConfig.styles.headerOverlay,
    '--card-bg': themeConfig.styles.cardBackground,
    '--text-color': themeConfig.styles.textColor,
    '--bg-image': `url(${themeConfig.assets.backgroundImage})`,
    '--header-bg': `url(${themeConfig.assets.headerImage || themeConfig.assets.backgroundImage})`,
  };

  return (
    <div id="skeleton1-template" style={dynamicStyles}>
      
      <div className="skeleton1-fixed-bg"></div>

      <div className={`modal-overlay ${!showModal ? 'hidden' : ''}`}>
        <div className="modal-content">
          <h2 className="modal-title">¡Bienvenidos!</h2>
          <p>🎵 Hay un sonido que forma parte de esta experiencia... <br/> ¿Te gustaría escucharlo?</p>
          <div className="modal-buttons">
            <button onClick={handleEnter} className="btn-modal primary">Sí, ¡claro!</button>
            <button onClick={() => setShowModal(false)} className="btn-modal secondary">No, gracias</button>
          </div>
        </div>
      </div>

      {themeConfig.assets.audio && (
        <audio ref={audioRef} loop>
          <source src={themeConfig.assets.audio} type="audio/mpeg" />
        </audio>
      )}

      {themeConfig.assets.audio && (
        <button id="musicToggleButton" className={`${!showModal ? 'active' : ''} ${isPlaying ? 'playing' : ''}`} onClick={toggleAudio}>
          {isPlaying ? '⏸' : '▶'}
        </button>
      )}

      <div className="skeleton1-scroll-container">
        
          <header className="header">
             {themeConfig.assets.headerVideo ? (
                <video className="video-background" autoPlay loop muted playsInline key={themeConfig.assets.headerVideo}>
                   <source src={themeConfig.assets.headerVideo} type="video/mp4" />
                </video>
             ) : (
                <div
                  className="video-background"
                  style={{
                    backgroundImage: `url(${themeConfig.assets.headerImage || themeConfig.assets.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
             )}
             <div className="overlay">
                <h1 className="title">{name1}</h1>
                <h2 className="subtitle">{eventSubtitle || '¡ESTÁS INVITADO!'}</h2>
                <p className="hero-text">Con cariño te invito a compartir este día tan especial.</p>
                <div className="scroll-indicator">﹀ Desplazar hacia abajo</div>
             </div>
          </header>

          {showCeremony && (
            <section className="card-section">
                <img src={themeConfig.assets.ceremonyIcon} alt="Ceremonia" className="section-icon" />
                <h2>Ceremonia Religiosa</h2>
                <div className="card-content">
                    <p><strong>LUGAR:</strong> {ceremonyPlace}</p>
                    <p><strong>UBICACIÓN:</strong> {ceremonyAddress}</p>
                    <p><strong>DÍA:</strong> {ceremonyDate}</p>
                    <p><strong>HORARIO:</strong> {ceremonyTime}</p>
                    <a href={ceremonyMapUrl} target="_blank" rel="noopener noreferrer" className="btn-action">CÓMO LLEGAR</a>
                </div>
            </section>
          )}

          {showParty && (
            <section className="card-section">
                <img src={themeConfig.assets.partyIcon} alt="Fiesta" className="section-icon" />
                <h2>Fiesta</h2>
                <div className="card-content">
                    <p><strong>SALÓN:</strong> {eventVenue || partyPlace}</p>
                    <p><strong>UBICACIÓN:</strong> {partyAddress}</p>
                    <p><strong>DÍA:</strong> {partyDateString}</p>
                    <p><strong>HORARIO:</strong> {partyTime} ¡Puntual!</p>
                    <a href={partyMapUrl} target="_blank" rel="noopener noreferrer" className="btn-action">VER UBICACIÓN</a>
                </div>
            </section>
          )}

          {showCountdown && (
            <section className="countdown-section">
                <h3 className="countdown-title">¡Pronto el gran día!</h3>
                <div className="timer-container">
                    <div className="timer-box"><span>{timeLeft.days}</span><p>Días</p></div>
                    <div className="timer-box"><span>{timeLeft.hours}</span><p>Horas</p></div>
                    <div className="timer-box"><span>{timeLeft.minutes}</span><p>Min</p></div>
                    <div className="timer-box"><span>{timeLeft.seconds}</span><p>Seg</p></div>
                </div>
                <p className="countdown-footer">Con vos compartiendo este momento, será aún más significativo. ¡Te espero!</p>
            </section>
          )}

          {showDressCode && (
            <section className="card-section">
                <img src={themeConfig.assets.dressCodeIcon} alt="Dress Code" className="section-icon" />
                <h2>Dress Code</h2>
                <div className="card-content">
                    <p>Pedimos asistir con vestimenta <br/><strong>** Elegante **</strong></p>
                </div>
            </section>
          )}

          {showGifts && (
            <section className="card-section">
                <img src={themeConfig.assets.giftIcon} alt="Regalo" className="section-icon" />
                <h2>Regalos</h2>
                <div className="card-content">
                    <p>Tu presencia es el mejor regalo en este día tan especial.</p>
                    <p>Si querés acompañarme con un detalle para esta nueva etapa, lo voy a recibir con mucho cariño.</p>
                    <div className="gift-box">
                        <p>💌 Cofre a disposición en el salón</p>
                        <p className="alias-text">Alias: <strong>{alias}</strong></p>
                    </div>
                </div>
            </section>
          )}

          {showGallery && (
            <section className="slider-section">
                <h2>Un momento único ♥</h2>
                <p>Entre luces, risas y sueños, este día se convierte en recuerdo.</p>
                <div className="slider">
                    <ul>
                    {[...Array(5)].map((_, i) => (
                        <li key={i}>
                            <img src={`https://picsum.photos/seed/${themeConfig.id}${i}/400/500`} alt={`Foto ${i}`} />
                        </li>
                    ))}
                    </ul>
                </div>
                <a href="#" className="btn-action photo-btn">Compartí tus fotos</a>
            </section>
          )}

          {showRSVP && (
            <section className="card-section">
                <h2>Confirmación</h2>
                <p>¡Espero contar con tu presencia!</p>
                <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('¡Hola! Confirmo mi asistencia.')}`} target="_blank" rel="noopener noreferrer" className="btn-action">CONFIRMAR ASISTENCIA</a>
            </section>
          )}

          {showMusic && (
            <section className="card-section">
                <h2>Música</h2>
                <p>¿Qué canciones querés escuchar?</p>
                <a href={musicUrl} target="_blank" rel="noopener noreferrer" className="btn-action">SUGERIR CANCIÓN</a>
            </section>
          )}

          <footer className="footer-skeleton1">
             <h2>¡Gracias!</h2>
             <h3>{name1}</h3>
             <p>© 2025 - Todos los derechos reservados.</p>
             <p className="dev-credit">Desarrollo web por InvitaWeb</p>
          </footer>
      </div>

    </div>
  );
}

export default Skeleton1;

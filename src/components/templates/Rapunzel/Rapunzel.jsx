import React, { useState, useRef } from 'react';
import { useCountdown } from '../../../hooks/useCountdown';
import './Rapunzel.css';

function Rapunzel({ data }) {
  // --- 1. DATOS Y CONFIGURACIÓN (Destructuring) ---
  const {
    // Datos de texto
    name1 = 'Zoe',
    eventDate = '2025-11-15T22:00:00',
    ceremonyDate = '11/11/2025',
    ceremonyTime = '19:30 HS',
    ceremonyPlace = 'Parroquia Marcos Paz',
    ceremonyAddress = 'Florida Sur 251 - Yerba Buena',
    ceremonyMapUrl = 'https://goo.gl/maps/tu-link-aqui',
    partyDateString = '15/11/2025',
    partyTime = '22:00 HS',
    partyPlace = 'Salón La Soñada',
    eventVenue = '',
    partyAddress = 'Frias Silva 70, Yerba Buena',
    partyMapUrl = 'https://goo.gl/maps/tu-link-aqui-2',
    alias = 'Parra.Zoe.Mis.XV',
    whatsappNumber = '',
    musicUrl = '',

    // 👇 INTERRUPTORES DE VISIBILIDAD (Nuevos)
    showCeremony = true,
    showParty = true,
    showCountdown = true,
    showDressCode = true,
    showGifts = true,
    showGallery = true,
    showRSVP = true,
    showMusic = true,
  } = data || {};

  // --- 2. LÓGICA (Modal, Audio, Cuenta Regresiva) ---
  const [showModal, setShowModal] = useState(true);
  const handleEnter = () => { setShowModal(false); toggleAudio(); };

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch(() => console.log("Play bloqueado"));
      setIsPlaying(!isPlaying);
    }
  };

  const timeLeft = useCountdown(eventDate);

  // --- 3. RENDERIZADO (JSX) ---
  return (
    <div id="rapunzel-template">
      
      {/* CAPA 1: FONDO FIJO */}
      <div className="rapunzel-fixed-bg"></div>

      {/* ELEMENTOS FLOTANTES (Fuera del scroll) */}
      <div className={`modal-overlay ${!showModal ? 'hidden' : ''}`}>
        <div className="modal-content">
          <h2 className="modal-title">¡Bienvenidos!</h2>
          <p>🌺 Hay un sonido que forma parte de esta experiencia... <br/> ¿Te gustaría escucharlo?</p>
          <div className="modal-buttons">
            <button onClick={handleEnter} className="btn-modal primary">Sí, ¡claro!</button>
            <button onClick={() => setShowModal(false)} className="btn-modal secondary">No, gracias</button>
          </div>
        </div>
      </div>

      <audio ref={audioRef} loop>
        <source src="/assets/Rapunzel/audio/cancion.mp3" type="audio/mpeg" />
      </audio>

      <button id="musicToggleButton" className={`${!showModal ? 'active' : ''} ${isPlaying ? 'playing' : ''}`} onClick={toggleAudio}>
        {isPlaying ? '⏸' : '▶'}
      </button>


      {/* CAPA 2: CONTENEDOR CON SCROLL */}
      <div className="rapunzel-scroll-container">
        
          {/* HEADER / HERO (Siempre visible) */}
          <header className="header">
             <video className="video-background" autoPlay loop muted playsInline>
                <source src="/assets/Rapunzel/video/Tangled_live_wallpaper.mp4" type="video/mp4" />
             </video>
             <div className="overlay">
                <h1 className="title">{name1}</h1>
                <h2 className="subtitle">¡Mis 15 Años!</h2> 
                <p className="hero-text">Con cariño te invito a compartir este día tan especial.</p>
                <div className="scroll-indicator">﹀ Desplazar hacia abajo</div>
             </div>
          </header>

          {/* SECCIÓN CEREMONIA (Condicional) */}
          {showCeremony && (
            <section className="card-section">
                <img src="/assets/Rapunzel/img/ceremonia.png" alt="Iglesia" className="section-icon" />
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

          {/* SECCIÓN FIESTA (Condicional) */}
          {showParty && (
            <section className="card-section">
                <img src="/assets/Rapunzel/img/fiesta.png" alt="Fiesta" className="section-icon" />
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

          {/* SECCIÓN CUENTA REGRESIVA (Condicional) */}
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

          {/* SECCIÓN DRESS CODE (Condicional) */}
          {showDressCode && (
            <section className="card-section">
                <img src="/assets/Rapunzel/img/dresscode.jpg" alt="Dress Code" className="section-icon" />
                <h2>Dress Code</h2>
                <div className="card-content">
                    <p>Pedimos asistir con vestimenta <br/><strong>** Elegante **</strong></p>
                </div>
            </section>
          )}

          {/* SECCIÓN REGALOS (Condicional) */}
          {showGifts && (
            <section className="card-section">
                <img src="/assets/Rapunzel/img/regalo.gif" alt="Regalo" className="section-icon" />
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

          {/* SECCIÓN GALERÍA (Condicional) */}
          {showGallery && (
            <section className="slider-section">
                <h2>Un momento único ♥</h2>
                <p>Entre luces, risas y sueños, este día se convierte en recuerdo.</p>
                <div className="slider">
                    <ul>
                    {[...Array(10)].map((_, i) => (
                        <li key={i}>
                            <img src={`/assets/Rapunzel/img/foto_${(i % 5) + 1}.jpg`} alt={`Foto ${i}`} />
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

          <footer className="footer-rapunzel">
             <h2>¡Gracias!</h2>
             <h3>{name1}</h3>
             <p>© 2025 - Todos los derechos reservados.</p>
             <p className="dev-credit">Desarrollo web por InvitaWeb</p>
          </footer>
      </div>

    </div>
  );
}

export default Rapunzel;
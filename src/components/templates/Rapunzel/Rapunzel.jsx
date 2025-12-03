import React, { useState, useEffect, useRef } from 'react';
import './Rapunzel.css';

function Rapunzel({ data }) {
  // --- 1. DATOS POR DEFECTO ---
  const {
    name1 = 'Nombre Quinceañera',
    eventDate = '2025-12-15T21:00:00', // Formato ISO para que el contador funcione
    eventVenue = 'Salón Los Olivos',
  } = data || {};

  // --- 2. LÓGICA DEL MODAL DE BIENVENIDA ---
  const [showModal, setShowModal] = useState(true); // Empieza visible

  const handleEnter = () => {
    setShowModal(false); // Oculta el modal
    toggleAudio(); // Intenta reproducir música al entrar (algunos navegadores lo bloquean si no es click directo)
  };

  // --- 3. LÓGICA DEL AUDIO ---
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // Referencia al elemento <audio> invisible

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // 👇 AQUÍ ESTÁ EL CAMBIO: Cambiamos 'e' por '()'
        audioRef.current.play().catch(() => console.log("Auto-play bloqueado por el navegador, se requiere interacción"));
      }
      setIsPlaying(!isPlaying);
    }
  }

  // --- 4. LÓGICA DE LA CUENTA REGRESIVA ---
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(eventDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval); // Detener si ya pasó la fecha
      }
    }, 1000);

    return () => clearInterval(interval); // Limpieza al salir
  }, [eventDate]);


  // --- RENDERIZADO (JSX) ---
  return (
    <div id="rapunzel-template">
      
      {/* === MODAL DE BIENVENIDA === */}
      <div className={`modal-overlay ${!showModal ? 'hidden' : ''}`}>
        <div className="modal-content">
          <h2 style={{background: 'none', textShadow: 'none', color: '#333'}}>¡Bienvenido!</h2>
          <p style={{color: '#666', margin: '20px 0'}}>
             Hay un sonido que forma parte de esta experiencia... <br/>
             ¿Te gustaría escucharlo?
          </p>
          <button 
            onClick={handleEnter}
            style={{
              backgroundColor: '#FF69B4', color: 'white', border: 'none', 
              padding: '10px 20px', borderRadius: '20px', fontSize: '1rem', cursor: 'pointer'
            }}
          >
            Ingresar
          </button>
        </div>
      </div>

      {/* === AUDIO INVISIBLE === */}
      <audio ref={audioRef} loop>
        <source src="/assets/Rapunzel/audio/Veo_en_ti_la_luz-Chayanne.mp3" type="audio/mpeg" />
      </audio>

      {/* === BOTÓN FLOTANTE DE MÚSICA === */}
      <button 
        id="musicToggleButton" 
        className={`${!showModal ? 'active' : ''} ${isPlaying ? 'playing' : ''}`}
        onClick={toggleAudio}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>


      {/* === HEADER / PORTADA === */}
      <header className="header">
         <video className="video-background" autoPlay loop muted playsInline>
            <source src="/assets/Rapunzel/video/Tangled_live_wallpaper.mp4" type="video/mp4" />
         </video>

         <div className="overlay">
            <h1 className="title">Mis 15 Años</h1>
            <h2 className="subtitle">{name1}</h2> 
         </div>
      </header>

      {/* === SECCIÓN CUENTA REGRESIVA === */}
      <section className="countdown-section" style={{textAlign: 'center', padding: '40px 20px', backgroundColor: '#fff'}}>
         <h3 className="text-with-shadow" style={{fontSize: '2rem', color: '#FF69B4', fontFamily: 'Great Vibes'}}>Falta muy poco...</h3>
         
         {/* Renderizamos los números reales */}
         <div className="timer-container" style={{display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px'}}>
            <div className="timer-box">
               <span style={{fontSize: '2rem', fontWeight: 'bold', color: '#333'}}>{timeLeft.days}</span>
               <p style={{margin: 0, fontSize: '0.8rem'}}>Días</p>
            </div>
            <div className="timer-box">
               <span style={{fontSize: '2rem', fontWeight: 'bold', color: '#333'}}>{timeLeft.hours}</span>
               <p style={{margin: 0, fontSize: '0.8rem'}}>Hs</p>
            </div>
            <div className="timer-box">
               <span style={{fontSize: '2rem', fontWeight: 'bold', color: '#333'}}>{timeLeft.minutes}</span>
               <p style={{margin: 0, fontSize: '0.8rem'}}>Min</p>
            </div>
            <div className="timer-box">
               <span style={{fontSize: '2rem', fontWeight: 'bold', color: '#333'}}>{timeLeft.seconds}</span>
               <p style={{margin: 0, fontSize: '0.8rem'}}>Seg</p>
            </div>
         </div>
      </section>

      {/* === SECCIÓN DETALLES === */}
      <section className="details-section" style={{textAlign: 'center', padding: '20px'}}>
         <p>Te espero para celebrar este gran día</p>
         <h2 className="animate-pulse">{eventVenue}</h2>
         <p>Fecha: {new Date(eventDate).toLocaleDateString()}</p>
      </section>

      {/* === SLIDER DE FOTOS (Simplificado para el ejemplo) === */}
      {/* ⚠️ Nota: El CSS original espera 22 fotos para la animación perfecta. 
          Aquí pongo algunas repetidas para que veas el efecto. */}
      <div className="slider">
         <ul>
            {[1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2].map((num, i) => (
               <li key={i}>
                  <img src={`/assets/Rapunzel/img/foto_${num}.jpg`} alt="Foto" />
               </li>
            ))}
         </ul>
      </div>

    </div>
  );
}

export default Rapunzel;
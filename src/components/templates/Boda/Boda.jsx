import React, { useState, useEffect } from 'react';
import InfoCard from '../../shared/InfoCard';
import './Boda.css';

function Boda({ data }) {
  // Destructuring con valores por defecto para Boda
  const {
    name1 = 'Belén & Agustín', // Nombre de la pareja
    eventDate = '2025-12-20T18:00:00',
    
    ceremonyDate = '20/12/2025',
    ceremonyTime = '18:00 HS',
    ceremonyPlace = 'Parroquia Inmaculada',
    ceremonyAddress = 'Av. Principal 123',
    ceremonyMapUrl = '#',

    partyDateString = '20/12/2025',
    partyTime = '21:00 HS',
    partyPlace = 'Salón Los Jardines',
    partyAddress = 'Ruta 9 Km 50',
    partyMapUrl = '#',

    alias = 'Belen.Agustin.Boda',
    
    // Interruptores
    showCeremony = true,
    showParty = true,
    showCountdown = true,
    showDressCode = true,
    showGifts = true,
  } = data || {};

  // --- LÓGICA (Cuenta regresiva y Audio) ---
  // (Es la misma lógica que Rapunzel, idealmente luego la moveremos a un Hook 'useEventLogic')
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    const target = new Date(eventDate).getTime();
    const interval = setInterval(() => {
      const diff = target - new Date().getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      } else clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  return (
    <div id="boda-template"> {/* ID único para encapsular estilos */}
      
      {/* FONDO FIJO (Textura papel o color plano) */}
      <div className="boda-fixed-bg"></div>

      <div className="boda-scroll-container">
          
          {/* HEADER / PORTADA */}
          <header className="header">
             <div className="overlay">
                <p className="pre-title">Nos casamos</p>
                <h1 className="title">{name1}</h1>
                <div className="date-badge">{ceremonyDate}</div>
                <div className="scroll-indicator">❤</div>
             </div>
          </header>

          {/* CUENTA REGRESIVA (Estilo minimalista) */}
          {showCountdown && (
            <section className="countdown-section">
                <div className="timer-container">
                    <div className="timer-box"><span>{timeLeft.days}</span><p>DÍAS</p></div>
                    <div className="timer-box"><span>{timeLeft.hours}</span><p>HS</p></div>
                    <div className="timer-box"><span>{timeLeft.minutes}</span><p>MIN</p></div>
                </div>
            </section>
          )}

          {/* CEREMONIA (Usando InfoCard) */}
          {showCeremony && (
            <InfoCard icon="/assets/boda/icons/rings.png" title="Ceremonia">
                <p>{ceremonyPlace}</p>
                <p>{ceremonyAddress}</p>
                <p>{ceremonyTime}</p>
                <a href={ceremonyMapUrl} className="btn-action">Ver Mapa</a>
            </InfoCard>
          )}

          {/* FIESTA */}
          {showParty && (
            <InfoCard icon="/assets/boda/icons/cheers.png" title="Fiesta">
              <p>{partyPlace}</p>
              <p>{partyAddress}</p>
              <p>{partyDateString}</p> 
              <p>{partyTime}</p>
              <a href={partyMapUrl} className="btn-action">Ver Ubicación</a>
          </InfoCard>
          )}

          {/* DRESS CODE */}
          {showDressCode && (
            <InfoCard title="Dress Code">
                <p>Elegante Sport</p>
            </InfoCard>
          )}

          {/* REGALOS */}
          {showGifts && (
            <InfoCard title="Regalos">
                <p>Nuestro mejor regalo es tu presencia.</p>
                <div className="gift-box">
                    <p>CBU / Alias: {alias}</p>
                </div>
            </InfoCard>
          )}

          <footer className="footer-boda">
             <p>¡Te esperamos!</p>
             <h3>{name1}</h3>
          </footer>
      </div>
    </div>
  );
}

export default Boda;
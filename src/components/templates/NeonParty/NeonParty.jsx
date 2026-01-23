import React, { useState, useEffect } from 'react';
import './NeonParty.css';

function NeonParty({ data }) {
  const {
    name1 = 'FIESTA',
    name2 = 'NEÓN',
    eventDate = '2025-10-10T23:00:00',
    partyDateString = '10/10/2025',
    partyTime = '23:00 HS',
    partyPlace = 'CLUB GLOW',
    partyAddress = 'Calle Falsa 123',
    partyMapUrl = '#',
    alias = 'FIESTA.NEON',
    whatsappNumber = '',
    musicUrl = '',

    showParty = true,
    showCountdown = true,
    showDressCode = true,
    showGifts = true,
    showGallery = true,
    showRSVP = true,
    showMusic = true,
  } = data || {};

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
      } else clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  const rsvpMessage = encodeURIComponent(`¡Hola! Confirmo mi asistencia a la Fiesta Neón de ${name1}.`);

  return (
    <div id="neon-party-template">
      <div className="neon-bg">
        <div className="neon-circle-1"></div>
        <div className="neon-circle-2"></div>
      </div>

      <div className="neon-content">
        <header className="neon-header">
          <h1 className="neon-title">{name1} {name2}</h1>
          <div className="neon-divider"></div>
          <h2 className="neon-subtitle">¡VAMOS A FESTEJAR!</h2>
        </header>

        {showCountdown && (
          <section className="neon-section">
            <div className="timer-container-neon">
              <div className="timer-box-neon"><span>{timeLeft.days}</span><p>Días</p></div>
              <div className="timer-box-neon"><span>{timeLeft.hours}</span><p>Hrs</p></div>
              <div className="timer-box-neon"><span>{timeLeft.minutes}</span><p>Min</p></div>
              <div className="timer-box-neon"><span>{timeLeft.seconds}</span><p>Seg</p></div>
            </div>
          </section>
        )}

        {showParty && (
          <section className="neon-section neon-card">
            <h3 className="neon-card-title">CUÁNDO Y DÓNDE</h3>
            <p className="neon-text">{partyDateString} - {partyTime}</p>
            <p className="neon-text">{partyPlace}</p>
            <p className="neon-text-small">{partyAddress}</p>
            <a href={partyMapUrl} target="_blank" rel="noopener noreferrer" className="btn-neon">UBICACIÓN</a>
          </section>
        )}

        {showDressCode && (
          <section className="neon-section neon-card">
            <h3 className="neon-card-title">DRESS CODE</h3>
            <p className="neon-text neon-glow-text">¡MUCHO NEÓN!</p>
            <p className="neon-text-small">Ropa blanca o fluorescente</p>
          </section>
        )}

        {showGifts && (
          <section className="neon-section neon-card">
            <h3 className="neon-card-title">REGALOS</h3>
            <p className="neon-text">Tu buena onda es suficiente</p>
            <p className="neon-text-small">Si querés colaborar:</p>
            <p className="neon-alias">{alias}</p>
          </section>
        )}

        {showGallery && (
          <section className="neon-section neon-card">
            <h3 className="neon-card-title">GALERÍA</h3>
            <div className="neon-gallery-placeholder">
               <p>[ FOTOS ]</p>
            </div>
          </section>
        )}

        {showRSVP && (
          <section className="neon-section">
            <a href={`https://wa.me/${whatsappNumber}?text=${rsvpMessage}`} target="_blank" rel="noopener noreferrer" className="btn-neon primary">CONFIRMAR ASISTENCIA</a>
          </section>
        )}

        {showMusic && (
          <section className="neon-section">
             <p className="neon-text">Sugerí tus temas favoritos</p>
            <a href={musicUrl} target="_blank" rel="noopener noreferrer" className="btn-neon secondary">PLAYLIST</a>
          </section>
        )}

        <footer className="neon-footer">
          <p className="neon-glow-text">¡TE ESPERAMOS!</p>
        </footer>
      </div>
    </div>
  );
}

export default NeonParty;

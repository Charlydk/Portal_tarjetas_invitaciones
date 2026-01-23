import React, { useState, useEffect } from 'react';
import './WeddingClassic.css';

function WeddingClassic({ data }) {
  const {
    name1 = 'Ana',
    name2 = 'Juan',
    eventDate = '2025-12-20T18:00:00',
    ceremonyDate = '20/12/2025',
    ceremonyTime = '18:00 HS',
    ceremonyPlace = 'Parroquia San José',
    ceremonyAddress = 'Av. Principal 123',
    ceremonyMapUrl = '#',
    partyDateString = '20/12/2025',
    partyTime = '21:00 HS',
    partyPlace = 'Quinta Las Magnolias',
    partyAddress = 'Ruta 9 Km 1200',
    partyMapUrl = '#',
    alias = 'BODA.ANA.JUAN',
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

  const rsvpMessage = encodeURIComponent(`¡Hola! Confirmo mi asistencia a la boda de ${name1} y ${name2}.`);

  return (
    <div id="wedding-classic-template">
      <div className="wedding-content">
        <header className="wedding-header">
          <div className="wedding-ornament top"></div>
          <h1 className="names">{name1} & {name2}</h1>
          <p className="invite-text">Nos complace invitarte a celebrar nuestro amor</p>
          <div className="wedding-date-header">
             <span className="line"></span>
             <span className="date-text">{new Date(eventDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
             <span className="line"></span>
          </div>
          <div className="wedding-ornament bottom"></div>
        </header>

        {showCountdown && (
          <section className="wedding-section countdown">
            <h2 className="section-title-classic">Faltan</h2>
            <div className="timer-container-classic">
              <div className="timer-box-classic"><span>{timeLeft.days}</span><p>Días</p></div>
              <div className="timer-box-classic"><span>{timeLeft.hours}</span><p>Horas</p></div>
              <div className="timer-box-classic"><span>{timeLeft.minutes}</span><p>Min</p></div>
              <div className="timer-box-classic"><span>{timeLeft.seconds}</span><p>Seg</p></div>
            </div>
          </section>
        )}

        {showCeremony && (
          <section className="wedding-section">
            <h2 className="section-title-classic">Ceremonia</h2>
            <p>{ceremonyPlace}</p>
            <p>{ceremonyAddress}</p>
            <p>{ceremonyDate} - {ceremonyTime}</p>
            <a href={ceremonyMapUrl} target="_blank" rel="noopener noreferrer" className="btn-classic">CÓMO LLEGAR</a>
          </section>
        )}

        {showParty && (
          <section className="wedding-section">
            <h2 className="section-title-classic">Fiesta</h2>
            <p>{partyPlace}</p>
            <p>{partyAddress}</p>
            <p>{partyDateString} - {partyTime}</p>
            <a href={partyMapUrl} target="_blank" rel="noopener noreferrer" className="btn-classic">VER UBICACIÓN</a>
          </section>
        )}

        {showDressCode && (
          <section className="wedding-section">
            <h2 className="section-title-classic">Dress Code</h2>
            <p>Elegante</p>
          </section>
        )}

        {showGifts && (
          <section className="wedding-section">
            <h2 className="section-title-classic">Regalos</h2>
            <p>Tu presencia es nuestro mejor regalo.</p>
            <p>Si deseas hacernos un presente:</p>
            <p>Alias: <strong>{alias}</strong></p>
          </section>
        )}

        {showGallery && (
          <section className="wedding-section">
            <h2 className="section-title-classic">Galería</h2>
            <p>Momentos especiales</p>
            <div className="wedding-gallery-placeholder">
               <p>[ Galería de Fotos ]</p>
            </div>
          </section>
        )}

        {showRSVP && (
          <section className="wedding-section">
            <h2 className="section-title-classic">Confirmación</h2>
            <p>Por favor confirma tu asistencia antes del 10 de diciembre.</p>
            <a href={`https://wa.me/${whatsappNumber}?text=${rsvpMessage}`} target="_blank" rel="noopener noreferrer" className="btn-classic primary">CONFIRMAR POR WHATSAPP</a>
          </section>
        )}

        {showMusic && (
          <section className="wedding-section">
            <h2 className="section-title-classic">Música</h2>
            <p>¿Qué canciones no pueden faltar?</p>
            <a href={musicUrl} target="_blank" rel="noopener noreferrer" className="btn-classic">SUGERIR CANCIÓN</a>
          </section>
        )}

        <footer className="wedding-footer">
          <p>¡Te esperamos!</p>
        </footer>
      </div>
    </div>
  );
}

export default WeddingClassic;

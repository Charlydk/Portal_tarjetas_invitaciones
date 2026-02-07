import React from 'react';
import { useCountdown } from '../../../hooks/useCountdown';
import './Skeleton4.css';

function Skeleton4({ data, theme }) {
  const {
    name1 = 'Nombre',
    name2 = '',
    eventDate = '2025-11-15T22:00:00',
    eventVenue = 'Salón Eventos',
    ceremonyDate = '11/11/2025',
    ceremonyTime = '19:30 HS',
    ceremonyPlace = 'Parroquia',
    ceremonyMapUrl = '#',
    partyDateString = '15/11/2025',
    partyTime = '22:00 HS',
    partyPlace = 'Salón',
    partyMapUrl = '#',
    whatsappNumber = '',

    showCeremony = true,
    showParty = true,
    showCountdown = true,
    showRSVP = true,
  } = data || {};

  const timeLeft = useCountdown(eventDate);

  const dynamicStyles = {
    '--primary-color': theme?.styles?.primaryColor || '#000000',
    '--font-title': theme?.styles?.fontFamilyTitle || "'Montserrat', sans-serif",
    '--font-body': theme?.styles?.fontFamilyBody || "'Montserrat', sans-serif",
  };

  return (
    <div id="skeleton4-template" style={dynamicStyles}>
      <div className="s4-container">
        <header className="s4-header">
           <h1 className="s4-title">{name1} {name2 && `& ${name2}`}</h1>
           <div className="s4-divider"></div>
           <p className="s4-date-header">{partyDateString}</p>
        </header>

        {showCountdown && (
           <div className="s4-countdown">
              <div className="s4-time">{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</div>
           </div>
        )}

        <main className="s4-main">
          {showCeremony && (
            <section className="s4-section">
               <h3>CEREMONIA</h3>
               <p>{ceremonyPlace}</p>
               <p>{ceremonyDate} — {ceremonyTime}</p>
               <a href={ceremonyMapUrl} className="s4-link">UBICACIÓN</a>
            </section>
          )}

          {showParty && (
            <section className="s4-section">
               <h3>FIESTA</h3>
               <p>{eventVenue || partyPlace}</p>
               <p>{partyDateString} — {partyTime}</p>
               <a href={partyMapUrl} className="s4-link">UBICACIÓN</a>
            </section>
          )}
        </main>

        {showRSVP && (
           <footer className="s4-footer">
              <a href={`https://wa.me/${whatsappNumber}`} className="s4-rsvp-btn">CONFIRMAR ASISTENCIA</a>
           </footer>
        )}
      </div>
    </div>
  );
}

export default Skeleton4;

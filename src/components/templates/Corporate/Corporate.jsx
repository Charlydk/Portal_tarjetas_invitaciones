import React from 'react';
import { useCountdown } from '../../../hooks/useCountdown';
import './Corporate.css';

function Corporate({ data }) {
  const {
    name1 = 'Empresa S.A.',
    name2 = 'Aniversario',
    eventDate = '2025-12-01T09:00:00',
    partyDateString = '01/12/2025',
    partyTime = '09:00 HS',
    partyPlace = 'Centro de Convenciones',
    eventVenue = '',
    partyAddress = 'Av. Empresarial 500',
    partyMapUrl = '#',
    whatsappNumber = '',
    musicUrl = '',

    showParty = true,
    showCountdown = true,
    showRSVP = true,
    showMusic = true,
  } = data || {};

  const timeLeft = useCountdown(eventDate);

  return (
    <div id="corporate-template">
      <div className="corp-header">
        <h1 className="corp-company">{name1}</h1>
        <h2 className="corp-event">{name2}</h2>
      </div>

      {showCountdown && (
        <div className="corp-countdown">
          <div className="corp-timer">
            <div className="corp-unit"><span>{timeLeft.days}</span><p>DÍAS</p></div>
            <div className="corp-unit"><span>{timeLeft.hours}</span><p>HRS</p></div>
            <div className="corp-unit"><span>{timeLeft.minutes}</span><p>MIN</p></div>
            <div className="corp-unit"><span>{timeLeft.seconds}</span><p>SEG</p></div>
          </div>
        </div>
      )}

      {showParty && (
        <section className="corp-info">
          <h3>INFORMACIÓN DEL EVENTO</h3>
          <p><strong>FECHA:</strong> {partyDateString}</p>
          <p><strong>HORA:</strong> {partyTime}</p>
          <p><strong>LUGAR:</strong> {eventVenue || partyPlace}</p>
          <p className="corp-address">{partyAddress}</p>
          <a href={partyMapUrl} target="_blank" rel="noopener noreferrer" className="btn-corp">VER MAPA</a>
        </section>
      )}

      {showMusic && (
        <section className="corp-info">
          <h3>MÚSICA</h3>
          <p>Sugerí tus temas favoritos para el evento.</p>
          <a href={musicUrl} target="_blank" rel="noopener noreferrer" className="btn-corp">PLAYLIST DEL EVENTO</a>
        </section>
      )}

      {showRSVP && (
        <section className="corp-rsvp">
          <p>Se ruega confirmar asistencia</p>
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="btn-corp primary">CONFIRMAR ASISTENCIA</a>
        </section>
      )}

      <footer className="corp-footer">
        <p>Agradecemos su puntualidad.</p>
      </footer>
    </div>
  );
}

export default Corporate;

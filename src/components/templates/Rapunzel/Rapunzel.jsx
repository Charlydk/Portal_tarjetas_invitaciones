import React from 'react';
import './Rapunzel.css';

// Recibimos 'data' que tendrá la info del formulario (nombre, fecha, etc.)
function Rapunzel({ data }) {
  // Si no hay datos (por ejemplo, al cargar), ponemos valores por defecto para que no falle
  const {
    name1 = 'Nombre Quinceañera',
    eventDate = '2025-12-15T21:00:00',
    eventVenue = 'Salón Los Olivos',
  } = data || {};

  return (
    // 👇 Este ID es clave para que los estilos no se mezclen con el resto del portal
    <div id="rapunzel-template">
      
      {/* --- AQUÍ PEGAREMOS TU HTML (Header/Hero) --- */}
      <header className="header">
         <div className="overlay">
            {/* Fíjate cómo reemplazamos el texto fijo por la variable {name1} */}
            <h1 className="title">Mis 15 Años</h1>
            <h2 className="subtitle">{name1}</h2> 
         </div>
      </header>

      {/* --- SECCIÓN CUENTA REGRESIVA (Estática por ahora) --- */}
      <section className="countdown-section">
         <h3>Falta muy poco...</h3>
         <div className="timer-placeholder">00 Días : 00 Hs : 00 Min</div>
      </section>

      {/* --- SECCIÓN DETALLES --- */}
      <section className="details-section">
         <p>Te espero para celebrar este gran día</p>
         <h3>{eventVenue}</h3>
         {/* Aquí iría la fecha formateada */}
         <p>Fecha: {eventDate}</p>
      </section>

      {/* ... Pega el resto de tus secciones aquí (Regalos, Mapa, etc) ... */}

    </div>
  );
}

export default Rapunzel;
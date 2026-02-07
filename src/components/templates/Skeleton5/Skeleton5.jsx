import React, { useState } from 'react';
import './Skeleton5.css';

function Skeleton5({ data, theme }) {
  const {
    name1 = 'Nombre',
    partyDateString = '15/11/2025',
    ceremonyPlace = 'Parroquia',
    partyPlace = 'Salón',
    alias = 'Alias.Bancario',
  } = data || {};

  const [activeCard, setActiveCard] = useState(null);

  const cards = [
    { id: 'when', title: '¿CUÁNDO?', content: partyDateString, icon: '📅' },
    { id: 'where', title: '¿DÓNDE?', content: `${ceremonyPlace} / ${partyPlace}`, icon: '📍' },
    { id: 'gifts', title: 'REGALOS', content: `CBU/Alias: ${alias}`, icon: '🎁' },
    { id: 'rsvp', title: 'ASISTENCIA', content: 'Confirmar por WhatsApp', icon: '✅' },
  ];

  const dynamicStyles = {
    '--primary-color': theme?.styles?.primaryColor || '#f39c12',
    '--bg-color': theme?.styles?.cardBackground || '#fdfcf0',
  };

  return (
    <div id="skeleton5-template" style={dynamicStyles}>
      <div className="s5-wrapper">
        <header className="s5-header">
           <div className="s5-circle-decoration"></div>
           <h1 className="s5-title">{name1}</h1>
           <p className="s5-subtitle">¡FESTEJEMOS!</p>
        </header>

        <div className="s5-card-grid">
           {cards.map(card => (
             <div
               key={card.id}
               className={`s5-card ${activeCard === card.id ? 'active' : ''}`}
               onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
             >
                <div className="s5-card-front">
                   <span className="s5-card-icon">{card.icon}</span>
                   <h3>{card.title}</h3>
                </div>
                <div className="s5-card-back">
                   <p>{card.content}</p>
                </div>
             </div>
           ))}
        </div>

        <footer className="s5-footer">
           <p>Toca las tarjetas para ver más info</p>
        </footer>
      </div>
    </div>
  );
}

export default Skeleton5;

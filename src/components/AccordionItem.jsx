import React, { useState } from 'react';
import './AccordionItem.css';

function AccordionItem({ question, answer }) {
  // Cada item del acordeón tiene su propio estado para saber si está abierto o cerrado.
  const [isOpen, setIsOpen] = useState(false);

  // Esta función cambia el estado de 'false' a 'true' y viceversa.
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-question" onClick={toggleOpen}>
        <span>{question}</span>
        {/* Cambiamos el ícono dependiendo de si está abierto o cerrado */}
        <span className="accordion-icon">{isOpen ? '-' : '+'}</span>
      </div>
      {/* Usamos un renderizado condicional: el contenido solo se muestra si isOpen es true */}
      {isOpen && (
        <div className="accordion-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default AccordionItem;
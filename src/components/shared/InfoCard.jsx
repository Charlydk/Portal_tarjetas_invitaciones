import React from 'react';

/**
 * Componente reutilizable para secciones de información (Ceremonia, Fiesta, Dresscode, etc.)
 * @param {string} icon - Ruta de la imagen/icono
 * @param {string} title - Título de la sección
 * @param {ReactNode} children - El contenido específico (textos, botones, etc.)
 */
const InfoCard = ({ icon, title, children }) => {
  return (
    <section className="card-section">
      {/* Solo mostramos la imagen si nos pasan una ruta */}
      {icon && <img src={icon} alt={title} className="section-icon" />}
      
      <h2>{title}</h2>
      
      <div className="card-content">
        {children}
      </div>
    </section>
  );
};

export default InfoCard;
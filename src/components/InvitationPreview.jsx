import React from 'react';
import './InvitationPreview.css'; // Importamos los estilos específicos de este componente

function InvitationPreview({ formData }) {
  return (
    <div className="invitation-preview">
      <h1>{formData.name1} & {formData.name2}</h1>
      <p>Están felices de invitarte a celebrar su unión.</p>
      <h2>{formData.eventDate}</h2>
      <h3>En: {formData.eventVenue}</h3>
      
      <a href="mailto:tuemail@dominio.com" className="contact-button">
        ¡La quiero! Contactar
      </a>
    </div>
  );
}

export default InvitationPreview;
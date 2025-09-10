import React from 'react';
import { Link } from 'react-router-dom'; // Importamos el componente Link para la navegación

function TemplateCard({ title, thumbnailUrl, path }) {
  // 👆 Estas son las "props": datos que el componente recibe desde su padre.
  // Usamos {llaves} para desestructurar y obtener las props por su nombre.

  return (
    // Link funciona como una etiqueta <a> pero para rutas internas de la app.
    // Evita que la página se recargue por completo.
    <Link to={path} className="template-card">
      <img src={thumbnailUrl} alt={title} className="template-card-image" />
      <h3 className="template-card-title">{title}</h3>
    </Link>
  );
}

export default TemplateCard;
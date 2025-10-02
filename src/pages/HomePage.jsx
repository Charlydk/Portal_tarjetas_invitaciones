import React from 'react';
import TemplateCard from '../components/TemplateCard'; // 👈 Importamos nuestro nuevo componente
import './HomePage.css'; // Importamos los estilos específicos de esta página

// Datos Falsos (Mock Data)
// En una app real, esto vendría de una base de datos. Por ahora, es un simple array.
const templates = [
  { id: 1, title: 'Boda Clásica', thumbnailUrl: '/assets/boda-clasica.jpg', path: '/demo/boda-clasica' },
  { id: 2, title: 'Fiesta Neón', thumbnailUrl: '/assets/fiesta-neon.jpg', path: '/demo/fiesta-neon' },
  { id: 3, title: 'Evento Corporativo', thumbnailUrl: '/assets/evento-corp.jpg', path: '/demo/evento-corporativo' }
];

function HomePage() {
  return (
    <div className="homepage-container">
      <h1>Elige tu Invitación Interactiva</h1>
      <div className="templates-grid">
        {/* Aquí está la magia: usamos .map() para crear una tarjeta por cada plantilla */}
        {templates.map((template) => (
          <TemplateCard
            key={template.id} // 👈 "key" es una prop especial y obligatoria para React
            title={template.title}
            thumbnailUrl={template.thumbnailUrl}
            path={template.path}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
import React from 'react';
import TemplateCard from '../components/TemplateCard';
import { FaClock, FaMapMarkedAlt, FaImages, FaGift, FaMusic, FaCheckCircle } from 'react-icons/fa';
import './HomePage.css';

const templates = [
  // ... (el array de plantillas se mantiene igual)
  { id: 1, title: 'Boda Clásica', thumbnailUrl: '/assets/boda-clasica.jpg', path: '/demo/boda-clasica' },
  { id: 2, title: 'Fiesta Neón', thumbnailUrl: '/assets/fiesta-neon.jpg', path: '/demo/fiesta-neon' },
  { id: 3, title: 'Evento Corporativo', thumbnailUrl: '/assets/evento-corp.jpg', path: '/demo/evento-corporativo' },
  { id: 4, title: 'Bautizo Soñador', thumbnailUrl: '/assets/bautizo.jpg', path: '/demo/bautizo' },
  { id: 5, title: 'Cumpleaños Infantil', thumbnailUrl: '/assets/cumple-infantil.jpg', path: '/demo/cumple-infantil' },
  { id: 6, title: 'Quinceañera Mágica', thumbnailUrl: '/assets/quinceanera.jpg', path: '/demo/quinceanera' }
];

const features = [
  {
    icon: <FaCheckCircle />,
    title: 'Confirmación de Asistencia',
    description: 'Tus invitados confirman su presencia con un solo clic, facilitándote la organización.'
  },
  {
    icon: <FaClock />,
    title: 'Cuenta Regresiva',
    description: 'Un contador dinámico muestra cuánto falta para el gran día, generando expectativa.'
  },
  {
    icon: <FaImages />,
    title: 'Galería de Fotos y Videos',
    description: 'Comparte tus mejores momentos antes del evento y crea un álbum colaborativo después.'
  },
  {
    icon: <FaMapMarkedAlt />,
    title: 'Mapa Interactivo',
    description: 'Integración con Google Maps para que nadie se pierda cómo llegar a la ceremonia y a la fiesta.'
  },
  {
    icon: <FaGift />,
    title: 'Lista de Regalos',
    description: 'Informa a tus invitados sobre tu lista de regalos o datos bancarios de forma elegante.'
  },
  {
    icon: <FaMusic />,
    title: 'Sugerencia de Canciones',
    description: 'Deja que tus invitados te sugieran canciones para que la pista de baile no pare nunca.'
  }
];


function HomePage() {

  return (
    <div className="homepage">
      {/* ===== SECCIÓN HERO (Sin cambios) ===== */}
      <header className="hero-section">
        {/* ... (contenido del hero sin cambios) ... */}
        <div className="hero-content">
          <h1 className="hero-title">Invitaciones Web que Cautivan</h1>
          <p className="hero-subtitle">Crea y comparte invitaciones interactivas e inolvidables en minutos. Perfectas para cualquier ocasión y amigables con el planeta.</p>
          <a href="#templates" className="cta-button">Ver Plantillas</a>
        </div>
      </header>

      {/* ===== SECCIÓN DEMO ACTUALIZADA A MÓVIL ===== */}
      <section className="featured-demo-section">
        <h2 className="section-title">Una Experiencia Interactiva Completa</h2>
        <p className="section-subtitle">Navega por una de nuestras invitaciones de ejemplo. Siente la fluidez y descubre todas las posibilidades.</p>
        
        <div className="phone-mockup">
          <div className="phone-notch"></div>
          <div className="phone-screen-container">
            <iframe 
              src="https://belenagustin.netlify.app/" 
              className="phone-screen"
              title="Ejemplo de Invitación Web Interactiva"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ===== SECCIÓN CÓMO FUNCIONA (Sin cambios) ===== */}
      <section className="how-it-works-section">
        {/* ... (contenido sin cambios) ... */}
        <h2 className="section-title">Fácil, Rápido y Sorprendente</h2>
        <div className="steps-container">
          <div className="step">
            <h3>1. Elige</h3>
            <p>Explora nuestra galería y selecciona la plantilla que mejor se adapte a tu evento.</p>
          </div>
          <div className="step">
            <h3>2. Personaliza</h3>
            <p>Edita los textos, fechas y detalles en tiempo real con nuestro panel interactivo.</p>
          </div>
          <div className="step">
            <h3>3. Comparte</h3>
            <p>Recibe un enlace único para enviar a tus invitados por WhatsApp, email o redes sociales.</p>
          </div>
        </div>
      </section>

      {/* ===== SECCIÓN: CARACTERÍSTICAS ===== */}
      <section id="features" className="features-section">
          <h2 className="section-title">Todo lo que necesitas para un evento inolvidable</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
      </section>

      {/* ... SECCION PLANTILLAS */}
      <section id="templates" className="templates-section">
        <h2 className="section-title">Explora Nuestras Plantillas</h2>
        <div className="templates-grid">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              title={template.title}
              thumbnailUrl={template.thumbnailUrl}
              path={template.path}
            />
          ))}
        </div>
      </section>

       <section className="final-cta-section">
         <h2 className="section-title">¿Listo para crear tu invitación?</h2>
         <p>Elige una plantilla y empieza a personalizarla ahora mismo. ¡Es gratis!</p>
         <a href="#templates" className="cta-button cta-button-secondary">Comienza Ahora</a>
       </section>
    </div>
  );
}

export default HomePage;
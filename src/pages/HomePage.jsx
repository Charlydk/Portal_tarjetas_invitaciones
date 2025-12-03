import React from 'react';
import TemplateCard from '../components/TemplateCard';
import AccordionItem from '../components/AccordionItem';
import { FaClock, FaMapMarkedAlt, FaImages, FaGift, FaMusic, FaCheckCircle } from 'react-icons/fa';
import './HomePage.css';
import HeroCarousel from '../components/HeroCarousel';
import { templates } from '../data/templates';


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

const faqData = [
  {
    q: '¿Qué recibo exactamente cuando compro una invitación?',
    a: 'Recibirás un enlace web único (ej: tunomb.re/boda-ana-y-juan) que podrás compartir fácilmente con todos tus invitados. La página será visible en cualquier dispositivo con acceso a internet.'
  },
  {
    q: '¿Puedo modificar la invitación después de haberla comprado?',
    a: 'Sí, permitimos cambios menores en textos y fechas sin costo adicional hasta 48 horas antes del evento. Cambios de diseño mayores pueden tener un costo extra.'
  },
  {
    q: '¿Cómo confirman la asistencia mis invitados?',
    a: 'Tu invitación incluirá un formulario de confirmación de asistencia (RSVP). Cada vez que un invitado confirme, recibirás una notificación y los datos se añadirán a una lista de invitados que te compartiremos.'
  },
  {
    q: '¿Las invitaciones funcionan en cualquier celular?',
    a: '¡Absolutamente! Nuestras invitaciones están diseñadas para ser 100% compatibles con todos los smartphones, tablets y computadoras modernas, sin necesidad de instalar ninguna aplicación.'
  }
];

const pricingData = [
  {
    plan: 'Invitación Digital',
    price: '$7.000',
    description: 'Perfecto para empezar. Todas las funcionalidades esenciales para un evento increíble.',
    features: [
      'Cuenta Regresiva',
      'Galería de hasta 10 fotos',
      'Mapa de Ubicación (Google Maps)',
      'Confirmación de Asistencia (RSVP)',
      'Sugerencia de Canciones',
    ],
    popular: false,
  },
  {
    plan: 'Paquete Premium',
    price: '$9.500',
    description: 'La experiencia completa. Ideal para bodas y grandes eventos.',
    features: [
      'Todas las funcionalidades del plan Digital',
      'Galería de fotos y videos ilimitada',
      'Sección "Lista de Regalos"',
      'Dress Code (Código de Vestimenta)',
      'Frase del día y agradecimientos',
    ],
    popular: true,
  },
];

function HomePage() {

  return (
    <div className="homepage">
      {/* ===== SECCIÓN HERO (Sin cambios) ===== */}
      <header className="hero-section">
        {/* El carrusel ahora actúa como fondo */}
        <div className="hero-carousel-container">
          <HeroCarousel />
        </div>
        
        {/* El contenido se superpone */}
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

      {/* ===== SECCIÓN: PREGUNTAS FRECUENTES (FAQ) ===== */}
      <section id="faq" className="faq-section">
        <h2 className="section-title">¿Tienes Dudas? Las Resolvemos</h2>
        <div className="accordion-container">
          {faqData.map((item, index) => (
            <AccordionItem 
              key={index} 
              question={item.q} 
              answer={item.a} 
            />
          ))}
        </div>
      </section>

      {/* ===== NUEVA SECCIÓN: PRECIOS ===== */}
      <section id="pricing" className="pricing-section">
        <h2 className="section-title">Planes para cada tipo de evento</h2>
        <div className="pricing-container">
          {pricingData.map((plan, index) => (
            <div className={`pricing-card ${plan.popular ? 'popular' : ''}`} key={index}>
              {plan.popular && <div className="popular-badge">Más Popular</div>}
              <h3 className="plan-name">{plan.plan}</h3>
              <p className="plan-description">{plan.description}</p>
              <div className="plan-price">{plan.price} <span className="price-unit">ARS</span></div>
              <ul className="plan-features">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex}>✓ {feature}</li>
                ))}
              </ul>
              <a href="#contact" className="cta-button plan-cta">Elegir Plan</a>
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
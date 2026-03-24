import React from 'react';
import { FaClock, FaMapMarkedAlt, FaImages, FaGift, FaMusic, FaCheckCircle } from 'react-icons/fa';

export const features = [
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

export const faqData = [
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

export const pricingData = [
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

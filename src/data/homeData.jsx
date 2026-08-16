import React from 'react';
import { FaClock, FaMapMarkedAlt, FaImages, FaGift, FaMusic, FaCheckCircle, FaFilm, FaPalette } from 'react-icons/fa';

// Precios y plazo. Se cambian sólo acá.
//
// Referencia de mercado relevada en agosto 2026 para invitaciones digitales en
// Argentina: piso ~$25.000, premium ~$40.000 (Luno, Fiestly, Amo Invitar).
const PRECIO_CLASICA = 25000;
const PRECIO_PREMIUM = 40000;

// 48 h es más rápido que la competencia, que promete 3 días. Si algún día deja
// de cumplirse, hay que bajarlo del hero antes que prometer y fallar.
export const PLAZO_ENTREGA = '48 horas';

// "Desde" deja margen para las temáticas a medida, que son las que más trabajo
// llevan y las que el cliente pide más seguido.
const formatPrice = (valor) =>
  valor === null ? 'Consultanos' : `Desde $${valor.toLocaleString('es-AR')}`;

export const features = [
  {
    icon: <FaFilm />,
    title: 'Portada con video',
    description: 'La invitación abre con un video que se reproduce solo. Es lo primero que ve tu invitado y lo que la distingue de una tarjeta común.'
  },
  {
    icon: <FaPalette />,
    title: 'Ilustraciones personalizadas',
    description: 'Cada sección lleva su medallón diseñado a medida para tu evento. Nada de íconos genéricos.'
  },
  {
    icon: <FaCheckCircle />,
    title: 'Confirmación de asistencia',
    description: 'Tus invitados confirman con un toque y la confirmación te llega directo por WhatsApp.'
  },
  {
    icon: <FaClock />,
    title: 'Cuenta regresiva',
    description: 'Un contador en vivo muestra cuánto falta para el gran día y mantiene la expectativa.'
  },
  {
    icon: <FaImages />,
    title: 'Galería y álbum compartido',
    description: 'Tus fotos antes del evento, y un álbum donde tus invitados suben las suyas después.'
  },
  {
    icon: <FaMapMarkedAlt />,
    title: 'Cómo llegar',
    description: 'Un botón por cada lugar que abre la ubicación exacta en Google Maps. Nadie se pierde.'
  },
  {
    icon: <FaGift />,
    title: 'Datos para regalos',
    description: 'Alias, CBU o cofre en el salón, presentados con la elegancia que merece el momento.'
  },
  {
    icon: <FaMusic />,
    title: 'Música',
    description: 'La invitación suena con la canción que elijas, y tu invitado decide si quiere escucharla.'
  }
];

export const faqData = [
  {
    q: '¿Qué recibo exactamente?',
    a: 'Un enlace web propio para tu evento que compartís por WhatsApp con todos tus invitados. Se abre en cualquier dispositivo —celular, tablet o computadora— sin instalar nada y sin imprimir nada.'
  },
  {
    q: '¿Puedo pedir un diseño que no está en la galería?',
    a: 'Sí, y es lo que más hacemos. Los modelos que ves son el punto de partida: nos decís qué querés cambiar —los colores, la tipografía, los textos, las imágenes, o sacar una sección entera— y armamos tu versión. Si tenés una temática en mente que no está, contanos y la creamos.'
  },
  {
    q: '¿Tengo que cargar los datos yo?',
    a: 'No. Nos pasás la información por WhatsApp como te resulte más cómodo y nosotros armamos la invitación. Si preferís cargarla vos, también podemos darte acceso para hacerlo.'
  },
  {
    q: '¿Cómo confirman la asistencia mis invitados?',
    a: 'La invitación incluye un botón de confirmación que abre un WhatsApp hacia tu número con el mensaje ya escrito. Vos recibís las confirmaciones directamente en tu chat.'
  },
  {
    q: '¿Cuánto tarda?',
    a: `La entregamos en ${PLAZO_ENTREGA} desde que tenemos todos los datos de tu evento. Si tu fecha está muy cerca, avisanos y vemos cómo acomodarnos.`
  },
  {
    q: '¿Puedo cambiar algo después de que esté publicada?',
    a: 'Sí. Los cambios de textos, fechas y horarios no tienen costo. Un cambio de diseño mayor lo conversamos.'
  },
  {
    q: '¿Funciona en cualquier celular?',
    a: 'Sí. Se abre en cualquier celular, tablet o computadora con internet, sin instalar ninguna aplicación.'
  }
];

export const pricingData = [
  {
    plan: 'Clásica',
    price: formatPrice(PRECIO_CLASICA),
    description: 'Tu diseño elegido, adaptado a tu evento con tus datos, tus fotos y tus textos.',
    features: [
      `Entrega en ${PLAZO_ENTREGA}`,
      'Diseño adaptado a tu evento',
      'Temática a medida si la tenés en mente',
      'Música de fondo',
      'Confirmación por WhatsApp',
      'Galería, mapas y datos para regalos',
      'Cambios de textos sin costo'
    ],
    popular: false,
    ctaText: 'Quiero esta',
    ctaUrl: '#templates'
  },
  {
    plan: 'Premium',
    price: formatPrice(PRECIO_PREMIUM),
    description: 'Todo lo de la Clásica, más la portada con video, ilustraciones personalizadas y las animaciones que la hacen sentir viva.',
    features: [
      'Todo lo de la Clásica',
      'Portada con video',
      'Ilustraciones personalizadas',
      'Animaciones y ambientación propia',
      'Playlist de Spotify para tus invitados',
      'Álbum compartido para tus invitados'
    ],
    popular: true,
    ctaText: 'Hablemos',
    ctaUrl: '#contact'
  },
];

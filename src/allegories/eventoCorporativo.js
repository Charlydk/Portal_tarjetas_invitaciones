// Evento Corporativo — la invitación de una empresa, sin cuento ni romanticismo.
//
// Nació de una pregunta de quien organiza eventos para varias empresas: cada una
// tiene su equipo de diseño y su identidad, y lo que ella necesita de la tarjeta
// es poco y concreto — el logo de la empresa, fecha, horario, dirección y una
// confirmación que pregunte si el invitado tiene alguna restricción alimentaria.
// Lo demás (la lista, el envío, el listado de quién contestó) es la herramienta.
//
// Por eso es una base neutra y no un diseño con carácter: el azul sobrio y la
// tipografía sans entran en cualquier empresa, y el logo del cliente es lo que
// la vuelve suya. Si la empresa tiene su propio arte, va como imagen de portada
// (`heroImage`) y el resto se queda en el papel.
//
// Sin ilustración, sin video, sin música: una invitación de trabajo.

import { bodaSobria } from './bodaSobria';

const ICONOS = '/allegories/boda-sobria/iconos';

export const eventoCorporativo = {
  ...bodaSobria,
  id: 'evento-corporativo',
  name: 'Evento Corporativo',

  // Una invitación de empresa no suena. Vacío, el invitado nunca ve el
  // ofrecimiento de música.
  audio: '',

  // Sólo lo que un evento de empresa necesita. Sin historia, sin ceremonias, sin
  // regalos ni galería: cada sección de más es una pregunta que el invitado no
  // vino a responder.
  sections: ['hero', 'countdown', 'party', 'schedule', 'rsvp', 'dresscode', 'closing'],

  tokens: {
    ...bodaSobria.tokens,

    // Un gris azulado apenas tintado: más frío que el papel de las bodas.
    bg: '#F6F8FA',
    surface: 'rgba(31,78,121,0.06)',
    ink: '#1B2430',
    inkMuted: 'rgba(27,36,48,0.74)',
    heroInk: '#FFFFFF',

    // Azul marino: se lee como institucional sin ser el azul de ningún banco. El
    // dorado apagado queda para las marcas chicas.
    accent: '#1F4E79',
    accentInk: '#FFFFFF',
    accentAlt: '#B07D2B',

    // Todo en la misma sans: no hay nombres propios que merezcan una cursiva.
    fontDisplay: "'Montserrat', system-ui, sans-serif",
    fontTitle: "'Montserrat', system-ui, sans-serif",
    fontBody: "'Montserrat', system-ui, sans-serif",

    // El título es el nombre del evento, una frase, no dos nombres propios.
    // Un valor autónomo y no `var(--inv-step-3)`: la pantalla de bienvenida
    // también lo lee y vive fuera de la tarjeta, donde esas variables no existen.
    heroNameSize: 'clamp(1.9rem, 6vw, 2.8rem)',
    heroNameWeight: '600',

    radius: '6px',

    // Sin la rama de olivo de la base: es lo único que las bodas sobrias traen
    // como dibujo y acá no tiene nada que hacer.
    decorImage: '',
    heroEdge: '',
  },

  // Tres íconos de la base, los que sirven para una agenda y una confirmación.
  // Los de copas, regalo y cámara hablan de otra fiesta.
  icons: {
    schedule: `${ICONOS}/reloj.svg`,
    rsvp: `${ICONOS}/sobre.svg`,
    dresscode: `${ICONOS}/percha.svg`,
  },

  titles: {
    ...bodaSobria.titles,
    party: 'El evento',
    schedule: 'Agenda',
    countdown: 'Faltan',
    rsvp: 'Confirmá tu asistencia',
    dresscode: 'Vestimenta',
    closing: '¡Te esperamos!',
  },

  copy: {
    ...bodaSobria.copy,
    countdownFoot: '¡Te esperamos!',
    rsvpBody:
      'Confirmá tu asistencia y contanos si tenés alguna restricción alimentaria: nos ayuda a organizar todo.',
    rsvpCta: 'Confirmar asistencia',
    rsvpWhatsapp: '¡Hola! Confirmo mi asistencia al evento.',
  },

  // Empresa y evento inventados: la vidriera es pública, y la marca de un cliente
  // real no puede aparecer acá.
  demo: {
    ...bodaSobria.demo,
    logoUrl: '/allegories/evento-corporativo/logo-muestra.svg',
    logoAlt: 'Meridiano',
    name1: 'Inauguración de nuestra nueva sede',
    name2: '',
    welcomePhrase: 'Te invitamos a la',
    invitePhrase: 'Una tarde para conocer el nuevo espacio y brindar con quienes lo hicieron posible.',
    // El contador cuenta hasta `eventDate`: tiene que ser el mismo día que el
    // texto, y lo bastante lejano para que la vidriera no muestre "llegó el gran
    // día" a los pocos meses.
    eventDate: '2027-03-18T19:00:00',
    partyDateString: '18 de Marzo de 2027',
    partyTime: '19:00 hs',
    eventVenue: 'Sede Meridiano',
    partyAddress: 'Av. Libertador 1450, Buenos Aires',
    dressCodeDescription: 'Smart casual',
    dressCodeColorNote: '',
    heroImage: '',
    schedule: [
      { time: '19:00', label: 'Acreditación y recepción' },
      { time: '19:30', label: 'Palabras de bienvenida' },
      { time: '20:00', label: 'Recorrido por la sede' },
      { time: '20:45', label: 'Cóctel de cierre' },
    ],
    showCivil: false,
    showCeremony: false,
  },
};

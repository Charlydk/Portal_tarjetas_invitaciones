// Boda Sobria — la clásica sin cuento.
//
// Nació de un pedido textual del primer cliente real: "una tarjeta clásica, no
// con alegorías o temáticas de cuento. Sencilla y aburrida". El catálogo de
// bodas eran tres diseños ilustrados —Caricatura, Cenicienta, Bosque— y esta
// persona entró, los vio todos, y pidió justo lo que no había.
//
// No lleva ilustración ni video a propósito. Lo que sostiene la pieza es
// tipografía, aire y las fotos del cliente. "Sencilla y aburrida" en boca de un
// cliente quiere decir elegante y sobria; el trabajo está en el espacio, no en
// el dibujo.
//
// Los colores salen de su paleta: blanco, verde oliva y terracota.

export const bodaSobria = {
  id: 'boda-sobria',
  name: 'Boda Sobria',

  // Sin audio ni ambientación: cualquier movimiento delataría que no hay nada
  // que mirar salvo el texto, que es justamente la idea.

  // Están todas. Cuáles se ven lo deciden los módulos de cada tarjeta, así que
  // una pareja que se casa por civil y por iglesia usa este mismo diseño sin
  // tocar una línea.
  sections: [
    'hero',
    'story',
    'civil',
    'ceremony',
    'party',
    'schedule',
    'countdown',
    'rsvp',
    'dresscode',
    'gifts',
    'gallery',
    'closing',
  ],

  tokens: {
    // Papel, no pantalla. El blanco cálido evita el gris azulado de un #FFF
    // puro, que en un teléfono de noche encandila.
    bg: '#FBFAF6',
    surface: 'rgba(94,107,61,0.07)',      // verde oliva, apenas
    ink: '#2E2B26',
    inkMuted: 'rgba(46,43,38,0.76)',
    // El hero va sobre la foto del cliente, así que su texto es blanco.
    heroInk: '#FFFFFF',

    // Terracota para los títulos: sobre papel cálido tiene contraste de sobra y
    // es el color que la clienta nombró primero después del blanco.
    accent: '#9C4A2F',
    accentInk: '#FFFFFF',

    fontTitle: "'Cormorant Garamond', Garamond, serif",
    fontBody: "'Lato', system-ui, sans-serif",
    // Cinzel sólo para los nombres del hero. Es una capital romana: dicha una
    // vez y enorme sostiene la pieza entera; usada en párrafos, la arruina.
    fontDisplay: "'Cinzel', 'Cormorant Garamond', serif",

    // Versalitas espaciadas: el gesto de una invitación grabada de imprenta.
    titleTransform: 'uppercase',
    titleSpacing: '0.16em',
    // Sin sombra: acá los títulos van sobre papel, no sobre una foto.
    titleShadow: 'none',

    radius: '4px',
    maxWidth: '560px',

    // Sin fondo propio: el fondo es el papel. Si el cliente carga una portada,
    // se usa sólo en el hero.
    backgroundImage: '',
    backgroundVideo: '',
    heroVeil: 'rgba(46,43,38,0.42)',
    scrim: 'none',
  },

  titles: {
    story: 'Nuestra historia',
    civil: 'Ceremonia Civil',
    ceremony: 'Ceremonia',
    party: 'La Fiesta',
    schedule: 'Cronograma',
    countdown: 'Faltan',
    rsvp: 'Confirmación',
    dresscode: 'Dress Code',
    gifts: 'Regalos',
    gallery: 'Galería',
    closing: '¡Gracias!',
  },

  // Redacción neutra a propósito: sirve para dos novias, dos novios o una
  // pareja, sin tocar el archivo. Decir "los novios" obligaría a duplicar el
  // diseño para cada caso, que es exactamente lo que este sistema evita.
  copy: {
    scrollHint: 'Desplazá para ver más',
    scheduleBody: '',
    countdownFoot: '¡Los esperamos!',
    rsvpBody: 'Tu presencia es lo más importante para nosotros.',
    rsvpCta: 'Confirmar asistencia',
    rsvpWhatsapp: '¡Hola! Confirmo mi asistencia 🤍',
    giftsBody:
      'Tu presencia es el mejor regalo. Si querés acompañarnos con un detalle, lo recibimos con muchísimo cariño.',
    giftsChest: 'También habrá un cofre disponible en el salón.',
    galleryTagline: '',
    loading: 'Preparando la invitación…',
    mapCta: 'Cómo llegar',
  },

  // Contenido de muestra para la vidriera del catálogo.
  demo: {
    name1: 'Johana',
    name2: 'Yesica',
    welcomePhrase: 'Nos Casamos',
    invitePhrase: 'Nos encantaría que nos acompañes en este día',
    partyDateString: '6 de Febrero de 2027',
    partyTime: '21:00 hs',
    eventVenue: 'Salón Los Carolinos',
    partyAddress: 'Av. Bandera de los Andes 7510, Guaymallén, Mendoza',
    dressCodeDescription: 'Elegante · Formal',
    schedule: [
      { time: '21:00', label: 'Ceremonia' },
      { time: '21:20', label: 'Recepción' },
      { time: '22:00', label: 'Cena' },
      { time: '23:45', label: 'Baile' },
    ],
    showCivil: false,
    showCeremony: false,
  },
};

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
    // Apenas debajo de la portada: es lo primero que quiere saber alguien que
    // abre una invitación — cuánto falta.
    'countdown',
    'story',
    'civil',
    'ceremony',
    'party',
    'schedule',
    'rsvp',
    'dresscode',
    'gifts',
    'gallery',
    'closing',
  ],

  tokens: {
    // Papel, no pantalla. El blanco cálido evita el gris azulado de un #FFF
    // puro, que en un teléfono de noche encandila.
    bg: '#FCFBF8',
    surface: 'rgba(110,114,80,0.07)',
    ink: '#33322C',
    inkMuted: 'rgba(51,50,44,0.74)',
    // El hero va sobre la foto del cliente, así que su texto es blanco.
    heroInk: '#FFFFFF',

    // Verde oliva, el color que la clienta nombró y el que domina la tarjeta que
    // trajeron de referencia. Oscurecido respecto del oliva de esa muestra: allá
    // era fondo con texto blanco encima, acá es texto sobre papel, y el original
    // no llegaba a contraste legible en las etiquetas chicas.
    accent: '#6E7250',
    accentInk: '#FFFFFF',
    // Terracota para marcas chicas — los puntos del cronograma, el ornamento.
    // Es el tercer color de su paleta, y así entra sin pelearle al oliva.
    accentAlt: '#A9553A',

    // El sistema de la referencia, en tres piezas:
    //   una cursiva caligráfica, sólo para los nombres;
    //   una sans geométrica en versalitas espaciadas para todo título;
    //   la misma sans, liviana, para leer.
    // Que los títulos y el cuerpo compartan familia es lo que hace que la pieza
    // se lea como una sola voz, y deja que la cursiva sea EL gesto de la tarjeta.
    fontDisplay: "'Parisienne', 'Great Vibes', cursive",
    fontTitle: "'Montserrat', system-ui, sans-serif",
    fontBody: "'Montserrat', system-ui, sans-serif",

    titleTransform: 'uppercase',
    titleSpacing: '0.14em',
    // Sin sombra: acá los títulos van sobre papel, no sobre una foto.
    titleShadow: 'none',

    radius: '4px',
    maxWidth: '560px',

    // Sin fondo propio: el fondo es el papel. Si el cliente carga una portada,
    // se usa sólo en el hero.
    backgroundImage: '',
    backgroundVideo: '',
    // La foto arriba y los nombres abajo, sobre el papel. Es como lo resuelve
    // la tarjeta que trajo el cliente de referencia, y es lo único que funciona
    // en un monitor ancho: una foto vertical a sangre hay que recortarla tanto
    // para llenar la pantalla que termina siendo un primer plano de una oreja.
    heroLayout: 'stacked',
    heroVeil: 'transparent',
    scrim: 'none',
  },

  titles: {
    story: 'Nuestra historia',
    civil: 'Ceremonia Civil',
    ceremony: 'Ceremonia',
    party: 'La Fiesta',
    schedule: 'Itinerario',
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
    dressCodeColorNote: 'El blanco es de uso exclusivo de las novias.',
    heroImage: '/allegories/_muestra/foto1.webp',
    giftMode: 'alias',
    alias: 'johana.yesica',
    accountHolder: 'Yesica Marisol Díaz',
    giftsPhrase: 'Si deseás hacernos un regalo o contribuir a nuestra luna de miel, te dejamos nuestro alias.',
    sharedAlbumUrl: '#',
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

// src/data/templates.js

export const templates = [
    { 
      id: 1, 
      title: 'Boda Clásica', 
      thumbnailUrl: '/assets/boda-clasica.jpg', 
      path: '/demo/boda-clasica',
      theme: 'theme-wedding', // propiedad para controlar el estilo CSS
      slug: 'boda-clasica'    // Identificador para la URL
    },
    { 
      id: 2, 
      title: 'Fiesta Neón', 
      thumbnailUrl: '/assets/fiesta-neon.jpg', 
      path: '/demo/fiesta-neon',
      theme: 'theme-neon',
      slug: 'fiesta-neon'
    },
    { 
      id: 3, 
      title: 'Evento Corporativo', 
      thumbnailUrl: '/assets/evento-corp.jpg', 
      path: '/demo/evento-corporativo',
      theme: 'theme-corporate',
      slug: 'evento-corporativo'
    },

    { 
      id: 4, 
      title: 'Mis 15 - Rapunzel', 
      thumbnailUrl: '/assets/rapunzel/portada.jpg', // O la imagen que tengas
      path: '/demo/rapunzel',
      theme: 'theme-rapunzel', 
      slug: 'rapunzel',
      
      initialData: {
        name1: 'Zoe',
        eventDate: '2025-11-15T22:00:00',
        ceremonyDate: '11/11/2025',
        ceremonyTime: '19:30 HS',
        ceremonyPlace: 'Parroquia Marcos Paz',
        ceremonyAddress: 'Florida Sur 251 - Yerba Buena',
        ceremonyMapUrl: 'https://goo.gl/maps/tu-link-aqui',
        partyDateString: '15/11/2025',
        partyTime: '22:00 HS',
        partyPlace: 'Salón La Soñada',
        partyAddress: 'Frias Silva 70, Yerba Buena',
        partyMapUrl: 'https://goo.gl/maps/tu-link-aqui-2',
        alias: 'Parra.Zoe.Mis.XV',
        
        // Interruptores por defecto
        showCeremony: true,
        showParty: true,
        showCountdown: true,
        showDressCode: true,
        showGifts: true,
        showGallery: true,
      }
    }
  ];
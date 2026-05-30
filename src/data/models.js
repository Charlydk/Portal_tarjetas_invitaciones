// src/data/models.js

const SHARED_ASSETS = {
  video1: 'https://v1.padlet.pics/1/vids/0be6c84c7f0775d0b497042a197b0a70.mp4',
  // Canon en Re — Kevin MacLeod (CC Attribution 3.0) — demo para todas las tarjetas
  demoAudio: 'https://archive.org/download/Kevin-MacLeod_Famous-Classics_2008_FullAlbum/Famous%20Classics/Kevin%20MacLeod%20-%2002%20-%20Canon%20in%20D%20Major.mp3',
};

export const invitationModels = [
  {
    id: 'skeleton1',
    name: 'Retrato Clásico',
    skeletonComponent: 'Skeleton1',
    description: 'Estructura vertical clásica, ideal para bodas y recepciones formales. Incluye cuenta regresiva y mapa.',
    variants: [
      {
        id: 'rapunzel',
        name: 'Rapunzel Pink',
        assets: {
          headerVideo: SHARED_ASSETS.video1,
          headerImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000',
          backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000',
          ceremonyIcon: '🌸',
          partyIcon: '🏮',
          dressCodeIcon: '👗',
          giftIcon: '🎁',
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#FF69B4',
          secondaryColor: '#28a745',
          fontFamilyTitle: "'Great Vibes', cursive",
          fontFamilyBody: "'Montserrat', sans-serif",
          headerOverlay: 'rgba(0,0,0,0.4)',
          cardBackground: 'rgba(0,0,0,0.1)',
          textColor: '#ffffff'
        }
      },
      {
        id: 'cinderella',
        name: 'Cenicienta Celeste',
        assets: {
          headerVideo: '',
          headerImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000',
          backgroundImage: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=1000',
          ceremonyIcon: '👑',
          partyIcon: '👠',
          dressCodeIcon: '👔',
          giftIcon: '💎',
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#87CEEB',
          secondaryColor: '#FFD700',
          fontFamilyTitle: "'Great Vibes', cursive",
          fontFamilyBody: "'Montserrat', sans-serif",
          headerOverlay: 'rgba(0,0,40,0.5)',
          cardBackground: 'rgba(255,255,255,0.1)',
          textColor: '#ffffff'
        }
      },
      {
        id: 'wedding-classic',
        name: 'Boda Gold',
        assets: {
          headerVideo: '',
          headerImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000',
          backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000',
          ceremonyIcon: '💒',
          partyIcon: '🥂',
          dressCodeIcon: '🤵',
          giftIcon: '💍',
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#D4AF37',
          secondaryColor: '#F5ECD7',
          fontFamilyTitle: "'Great Vibes', cursive",
          fontFamilyBody: "'Montserrat', sans-serif",
          headerOverlay: 'rgba(10, 8, 4, 0.52)',
          cardBackground: 'rgba(12, 9, 3, 0.90)',
          textColor: '#F5ECD7'
        }
      },
      {
        id: 'boda-rosegold',
        name: 'Boda Rose Gold',
        assets: {
          headerVideo: '',
          headerImage: 'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1000',
          backgroundImage: 'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1000',
          ceremonyIcon: '💐',
          partyIcon: '🥂',
          dressCodeIcon: '👗',
          giftIcon: '💌',
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#D4AABB',
          secondaryColor: '#F4C2C2',
          fontFamilyTitle: "'Playfair Display', serif",
          fontFamilyBody: "'Lato', sans-serif",
          headerOverlay: 'rgba(22, 6, 12, 0.44)',
          cardBackground: 'rgba(22, 6, 12, 0.88)',
          textColor: '#FAE8EE'
        }
      },
      {
        id: 'boda-navy',
        name: 'Boda Navy & Gold',
        assets: {
          headerVideo: '',
          headerImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1000',
          backgroundImage: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?q=80&w=1000',
          ceremonyIcon: '⚓',
          partyIcon: '🥂',
          dressCodeIcon: '👔',
          giftIcon: '💍',
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#C8A400',
          secondaryColor: '#E8D88A',
          fontFamilyTitle: "'Playfair Display', serif",
          fontFamilyBody: "'Lato', sans-serif",
          headerOverlay: 'rgba(0, 10, 40, 0.55)',
          cardBackground: 'rgba(0, 12, 48, 0.92)',
          textColor: '#EEF2FF'
        }
      },
      {
        id: 'boda-verde-esmeralda',
        name: 'Boda Esmeralda',
        assets: {
          headerVideo: '',
          headerImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1000',
          backgroundImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000',
          ceremonyIcon: '🌿',
          partyIcon: '🍃',
          dressCodeIcon: '👗',
          giftIcon: '🎁',
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#5CBA8A',
          secondaryColor: '#C8F0DC',
          fontFamilyTitle: "'Great Vibes', cursive",
          fontFamilyBody: "'Montserrat', sans-serif",
          headerOverlay: 'rgba(0, 40, 20, 0.50)',
          cardBackground: 'rgba(6, 28, 14, 0.92)',
          textColor: '#E8F8EE'
        }
      },
      {
        id: 'quince-violeta',
        name: 'Quinceañera Violeta',
        assets: {
          headerVideo: '',
          headerImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1000',
          backgroundImage: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=1000',
          ceremonyIcon: '👑',
          partyIcon: '✨',
          dressCodeIcon: '💃',
          giftIcon: '🎀',
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#9B59B6',
          secondaryColor: '#F5CBA7',
          fontFamilyTitle: "'Dancing Script', cursive",
          fontFamilyBody: "'Raleway', sans-serif",
          headerOverlay: 'rgba(60,0,80,0.5)',
          cardBackground: 'rgba(155,89,182,0.2)',
          textColor: '#ffffff'
        }
      },
      {
        id: 'quince-coral',
        name: 'Quinceañera Coral',
        assets: {
          headerVideo: '',
          headerImage: 'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=1000',
          backgroundImage: 'https://images.unsplash.com/photo-1488116593952-f7ad27a60fc2?q=80&w=1000',
          ceremonyIcon: '🌸',
          partyIcon: '🎊',
          dressCodeIcon: '👗',
          giftIcon: '🎁',
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#FF6B6B',
          secondaryColor: '#FFF0F0',
          fontFamilyTitle: "'Dancing Script', cursive",
          fontFamilyBody: "'Raleway', sans-serif",
          headerOverlay: 'rgba(80,0,0,0.4)',
          cardBackground: 'rgba(255,107,107,0.15)',
          textColor: '#ffffff'
        }
      },
      {
        id: 'graduacion-dorada',
        name: 'Graduación Dorada',
        assets: {
          headerVideo: '',
          headerImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000',
          backgroundImage: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=1000',
          ceremonyIcon: '🎓',
          partyIcon: '🥂',
          dressCodeIcon: '👔',
          giftIcon: '🎁',
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#C8A400',
          secondaryColor: '#003366',
          fontFamilyTitle: "'Playfair Display', serif",
          fontFamilyBody: "'Lato', sans-serif",
          headerOverlay: 'rgba(0,30,80,0.55)',
          cardBackground: 'rgba(200,164,0,0.15)',
          textColor: '#ffffff'
        }
      },
      {
        id: 'bautismo-celeste',
        name: 'Bautismo Celeste',
        assets: {
          headerVideo: '',
          headerImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000',
          backgroundImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000',
          ceremonyIcon: '🕊️',
          partyIcon: '🎈',
          dressCodeIcon: '👗',
          giftIcon: '🎁',
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#5DADE2',
          secondaryColor: '#EBF5FB',
          fontFamilyTitle: "'Dancing Script', cursive",
          fontFamilyBody: "'Raleway', sans-serif",
          headerOverlay: 'rgba(30,100,180,0.35)',
          cardBackground: 'rgba(93,173,226,0.18)',
          textColor: '#ffffff'
        }
      },
      {
        id: 'cumpleanos-gala',
        name: 'Cumpleaños Gala',
        assets: {
          headerVideo: '',
          headerImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000',
          backgroundImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000',
          ceremonyIcon: '🎂',
          partyIcon: '🍾',
          dressCodeIcon: '💃',
          giftIcon: '🎁',
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#E74C3C',
          secondaryColor: '#F9EBEA',
          fontFamilyTitle: "'Great Vibes', cursive",
          fontFamilyBody: "'Montserrat', sans-serif",
          headerOverlay: 'rgba(60,0,0,0.5)',
          cardBackground: 'rgba(231,76,60,0.15)',
          textColor: '#ffffff'
        }
      },
      {
        id: 'aniversario-clasico',
        name: 'Aniversario Clásico',
        assets: {
          headerVideo: '',
          headerImage: 'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=1000',
          backgroundImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000',
          ceremonyIcon: '❤️',
          partyIcon: '🥂',
          dressCodeIcon: '👗',
          giftIcon: '💌',
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#C0392B',
          secondaryColor: '#F5EEF8',
          fontFamilyTitle: "'Great Vibes', cursive",
          fontFamilyBody: "'Lato', sans-serif",
          headerOverlay: 'rgba(80,0,0,0.45)',
          cardBackground: 'rgba(192,57,43,0.15)',
          textColor: '#ffffff'
        }
      }
    ]
  },
  {
    id: 'model-tarjeta4',
    name: 'Boda Premium Real',
    skeletonComponent: 'Tarjeta4',
    description: 'Estructura elegante y moderna con modales interactivos y fondo en video.',
    variants: [
      {
        id: 'tarjeta4-belen-agustin',
        name: 'Belen & Agustin (Original)',
        assets: {
          backgroundImage: '/templates/tarjeta4/img/main_section_background.jpg'
        },
        styles: {
          primaryColor: '#FF69B4',
          fontFamilyTitle: "'Great Vibes', cursive",
          fontFamilyBody: "'DM Sans', sans-serif"
        }
      }
    ]
  },
  {
    id: 'skeleton2',
    name: 'Tarjetero Moderno',
    skeletonComponent: 'Skeleton2',
    description: 'Estilo dinámico y llamativo perfecto para Quinceaños y eventos empresariales juveniles.',
    variants: [
      {
        id: 'modern-15',
        name: 'Quince Moderna',
        assets: {
          backgroundImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000',
          ceremonyIcon: '⛪',
          partyIcon: '🥂',
          dressCodeIcon: '👗',
          giftIcon: '✨',
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#FF1493',
          secondaryColor: '#f8f9fa',
          fontFamilyTitle: "'Montserrat', sans-serif",
          fontFamilyBody: "'Montserrat', sans-serif",
          textColor: '#333333',
          cardBackground: '#ffffff'
        }
      },
      {
        id: 'neon-party',
        name: 'Fiesta Neón',
        assets: {
          backgroundImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000',
          ceremonyIcon: '⚡',
          partyIcon: '🔊',
          dressCodeIcon: '👕',
          giftIcon: '💥',
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#00FFFF',
          secondaryColor: '#0a0a0a',
          fontFamilyTitle: "'Montserrat', sans-serif",
          fontFamilyBody: "'Montserrat', sans-serif",
          textColor: '#00FFFF',
          cardBackground: 'rgba(255,255,255,0.05)'
        }
      },
      {
        id: 'corporate-classic',
        name: 'Corporativo Platinum',
        assets: {
          backgroundImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000',
          ceremonyIcon: '💼',
          partyIcon: '🤝',
          dressCodeIcon: '🕴️',
          giftIcon: '📈',
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#2c3e50',
          secondaryColor: '#ecf0f1',
          fontFamilyTitle: "'Arial', sans-serif",
          fontFamilyBody: "'Arial', sans-serif",
          textColor: '#2c3e50',
          cardBackground: '#ffffff'
        }
      }
    ]
  },
  {
    id: 'skeleton3',
    name: 'Premium Sectional',
    skeletonComponent: 'Skeleton3',
    description: 'Un despliegue panorámico para lucir fotos de alta calidad.',
    variants: [
      {
        id: 'quince-sectional',
        name: 'Seccional Premium',
        assets: {
          backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552',
          sectionPhotos: [
            'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
            'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
            'https://images.unsplash.com/photo-1469334031218-e382a71b716b',
            'https://images.unsplash.com/photo-1522673607200-1648832cee98'
          ],
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#8e44ad',
          textColor: '#ffffff',
          fontFamilyTitle: "'Dancing Script', cursive",
          fontFamilyBody: "'Raleway', sans-serif",
        }
      }
    ]
  },
  {
    id: 'skeleton4',
    name: 'Elegancia Minimalista',
    skeletonComponent: 'Skeleton4',
    description: 'Pocos detalles, mucho lujo. Un diseño simple centrado en la tipografía.',
    variants: [
      {
        id: 'minimal-elegant',
        name: 'Blanco Negro Classic',
        assets: {
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#000000',
          fontFamilyTitle: "'Montserrat', sans-serif",
          fontFamilyBody: "'Montserrat', sans-serif",
        }
      }
    ]
  },
  {
    id: 'skeleton5',
    name: 'Tarjetas Interactivas',
    skeletonComponent: 'Skeleton5',
    description: 'Efectos en scroll y comportamiento en pop-up para una navegación diferente.',
    variants: [
      {
        id: 'interactive-cards',
        name: 'Golden Glow',
        assets: {
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#C9A96E',
          cardBackground: '#FDF8F0',
        }
      }
    ]
  },
  {
    id: 'skeleton6',
    name: 'Multimedia Reel',
    skeletonComponent: 'Skeleton6',
    description: 'Enfocado 100% en videos y media para invitaciones modernas estilo Reels/TikTok.',
    variants: [
      {
        id: 'multimedia-reel',
        name: 'Reel Urbano',
        assets: {
          headerVideo: SHARED_ASSETS.video1,
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {}
      }
    ]
  },
  {
    id: 'skeleton7',
    name: 'Dark Luxury',
    skeletonComponent: 'Skeleton7',
    description: 'Estilo oscuro y lujoso con tipografía editorial y acentos dorados. Elegancia máxima.',
    variants: [
      {
        id: 'dark-gold-boda',
        name: 'Dark Gold Wedding',
        assets: {
          backgroundImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1000',
          ceremonyIcon: '💒',
          partyIcon: '🥂',
          dressCodeIcon: '🎩',
          giftIcon: '💎',
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#C8A400',
          secondaryColor: '#0d0d14',
          fontFamilyTitle: "'Playfair Display', serif",
          fontFamilyBody: "'Lato', sans-serif",
          textColor: '#f5f0e8',
        }
      },
      {
        id: 'dark-violet-quince',
        name: 'Dark Violet Quinceañera',
        assets: {
          backgroundImage: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=1000',
          ceremonyIcon: '👑',
          partyIcon: '✨',
          dressCodeIcon: '💃',
          giftIcon: '🎀',
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#C39BD3',
          secondaryColor: '#0a0010',
          fontFamilyTitle: "'Dancing Script', cursive",
          fontFamilyBody: "'Raleway', sans-serif",
          textColor: '#f0e8ff',
        }
      },
      {
        id: 'dark-red-cumple',
        name: 'Dark Red Gala',
        assets: {
          backgroundImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000',
          ceremonyIcon: '🎂',
          partyIcon: '🍾',
          dressCodeIcon: '🕴️',
          giftIcon: '🎁',
          audio: SHARED_ASSETS.demoAudio
        },
        styles: {
          primaryColor: '#E74C3C',
          secondaryColor: '#0d0505',
          fontFamilyTitle: "'Montserrat', sans-serif",
          fontFamilyBody: "'Montserrat', sans-serif",
          textColor: '#fff5f5',
        }
      }
    ]
  },
  {
    id: 'skeleton8',
    name: 'Ivory Elegante',
    skeletonComponent: 'Skeleton8',
    description: 'Boda clásica atemporal en crema y dorado. Tipografía Playfair Display con ornamentos dorados que se expanden.',
    variants: [
      {
        id: 'ivory-gold-boda',
        name: 'Ivory & Gold',
        assets: {
          audio: SHARED_ASSETS.demoAudio,
          ceremonyIcon: '💒', partyIcon: '🥂', dressCodeIcon: '🎩', giftIcon: '💍',
        },
        styles: {
          primaryColor: '#B8960C',
          secondaryColor: '#3D2B1F',
          fontFamilyTitle: "'Playfair Display', serif",
          fontFamilyBody: "'Lato', sans-serif",
          textColor: '#3D2B1F',
        }
      },
      {
        id: 'ivory-blush-boda',
        name: 'Ivory & Blush',
        assets: {
          audio: SHARED_ASSETS.demoAudio,
          ceremonyIcon: '💒', partyIcon: '🌸', dressCodeIcon: '👗', giftIcon: '💌',
        },
        styles: {
          primaryColor: '#C4819B',
          secondaryColor: '#3D2B1F',
          fontFamilyTitle: "'Playfair Display', serif",
          fontFamilyBody: "'Lato', sans-serif",
          textColor: '#3D2B1F',
        }
      }
    ]
  },
  {
    id: 'skeleton9',
    name: 'Floral Romántico',
    skeletonComponent: 'Skeleton9',
    description: 'Ramos florales SVG animados que entran desde las esquinas. Rose gold y blush para bodas soñadoras.',
    variants: [
      {
        id: 'floral-rosegold-boda',
        name: 'Floral Rose Gold',
        assets: {
          heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200',
          audio: SHARED_ASSETS.demoAudio,
          ceremonyIcon: '🌸', partyIcon: '🥂', dressCodeIcon: '👗', giftIcon: '💐',
        },
        styles: {
          primaryColor: '#C4819B',
          secondaryColor: '#5A3D45',
          fontFamilyTitle: "'Dancing Script', cursive",
          fontFamilyBody: "'Lato', sans-serif",
          textColor: '#5A3D45',
        }
      },
      {
        id: 'floral-mauve-boda',
        name: 'Floral Mauve',
        assets: {
          audio: SHARED_ASSETS.demoAudio,
          ceremonyIcon: '💐', partyIcon: '🌹', dressCodeIcon: '👗', giftIcon: '💌',
        },
        styles: {
          primaryColor: '#A0687A',
          secondaryColor: '#4A2D38',
          fontFamilyTitle: "'Dancing Script', cursive",
          fontFamilyBody: "'Lato', sans-serif",
          textColor: '#4A2D38',
        }
      }
    ]
  },
  {
    id: 'skeleton10',
    name: 'Botánico Natural',
    skeletonComponent: 'Skeleton10',
    description: 'Ramas de eucaliptus SVG animadas que entran desde ambos costados al hacer scroll. Paleta lino, sage y marrón.',
    variants: [
      {
        id: 'botanico-sage-boda',
        name: 'Sage & Linen',
        assets: {
          audio: SHARED_ASSETS.demoAudio,
          ceremonyIcon: '🌿', partyIcon: '🍃', dressCodeIcon: '👗', giftIcon: '🎁',
        },
        styles: {
          primaryColor: '#7A8C6E',
          secondaryColor: '#5C3D2E',
          fontFamilyTitle: "'Playfair Display', serif",
          fontFamilyBody: "'Lato', sans-serif",
          textColor: '#5C3D2E',
        }
      },
      {
        id: 'botanico-olive-boda',
        name: 'Olive & Earth',
        assets: {
          audio: SHARED_ASSETS.demoAudio,
          ceremonyIcon: '🌱', partyIcon: '🍂', dressCodeIcon: '👔', giftIcon: '🎁',
        },
        styles: {
          primaryColor: '#6B7A5A',
          secondaryColor: '#4A3020',
          fontFamilyTitle: "'Playfair Display', serif",
          fontFamilyBody: "'Lato', sans-serif",
          textColor: '#4A3020',
        }
      }
    ]
  },

  // ── SKELETON 11: Inmersivo por Secciones (foto full-bleed en cada sección) ──
  {
    id: 'skeleton11',
    name: 'Cinematográfico',
    skeletonComponent: 'Skeleton11',
    description: 'Cada sección tiene su propia fotografía de fondo. Overlay oscuro, tipografía en blanco. Máximo impacto visual.',
    variants: [
      {
        id: 'cine-golden-boda',
        name: 'Golden Hour',
        assets: {
          heroImage:     'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200',
          civilImage:    'https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=1200',
          ceremonyImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
          partyImage:    'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?q=80&w=1200',
          countdownBg:   'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1200',
          galleryBg:     'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=1200',
          rsvpImage:     'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200',
          audio: SHARED_ASSETS.demoAudio,
        },
        styles: {
          primaryColor: '#D4AF37',
          overlayColor: 'rgba(20,10,0,0.52)',
          fontFamilyTitle: "'Cormorant Garamond', serif",
          fontFamilyBody: "'Lato', sans-serif",
        }
      },
      {
        id: 'cine-champagne-boda',
        name: 'Champagne & Ivory',
        assets: {
          heroImage:     'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=1200',
          civilImage:    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200',
          ceremonyImage: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=1200',
          partyImage:    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
          countdownBg:   'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200',
          galleryBg:     'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200',
          rsvpImage:     'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1200',
          audio: SHARED_ASSETS.demoAudio,
        },
        styles: {
          primaryColor: '#C8B08A',
          overlayColor: 'rgba(30,20,10,0.48)',
          fontFamilyTitle: "'Cormorant Garamond', serif",
          fontFamilyBody: "'Lato', sans-serif",
        }
      },
      {
        id: 'cine-midnight-boda',
        name: 'Midnight Blue',
        assets: {
          heroImage:     'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?q=80&w=1200',
          civilImage:    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
          ceremonyImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200',
          partyImage:    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200',
          countdownBg:   'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=1200',
          galleryBg:     'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1200',
          rsvpImage:     'https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=1200',
          audio: SHARED_ASSETS.demoAudio,
        },
        styles: {
          primaryColor: '#7BAFD4',
          overlayColor: 'rgba(0,10,40,0.60)',
          fontFamilyTitle: "'Cormorant Garamond', serif",
          fontFamilyBody: "'Lato', sans-serif",
        }
      },
      {
        id: 'cine-rosedust-boda',
        name: 'Rose Dust',
        assets: {
          heroImage:     'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1200',
          civilImage:    'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=1200',
          ceremonyImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
          partyImage:    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200',
          countdownBg:   'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200',
          galleryBg:     'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200',
          rsvpImage:     'https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=1200',
          audio: SHARED_ASSETS.demoAudio,
        },
        styles: {
          primaryColor: '#D4A5B0',
          overlayColor: 'rgba(60,10,20,0.50)',
          fontFamilyTitle: "'Cormorant Garamond', serif",
          fontFamilyBody: "'Lato', sans-serif",
        }
      },
      {
        id: 'cine-sage-boda',
        name: 'Sage Garden',
        assets: {
          heroImage:     'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200',
          civilImage:    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
          ceremonyImage: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=1200',
          partyImage:    'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?q=80&w=1200',
          countdownBg:   'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=1200',
          galleryBg:     'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1200',
          rsvpImage:     'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200',
          audio: SHARED_ASSETS.demoAudio,
        },
        styles: {
          primaryColor: '#9CBD8A',
          overlayColor: 'rgba(10,30,10,0.52)',
          fontFamilyTitle: "'Cormorant Garamond', serif",
          fontFamilyBody: "'Lato', sans-serif",
        }
      }
    ]
  },

  // ── SKELETON 12: Split Screen ──
  {
    id: 'skeleton12',
    name: 'Split Screen',
    skeletonComponent: 'Skeleton12',
    description: 'Cada sección divide la pantalla: imagen a la izquierda, texto a la derecha. Alternados. Estilo editorial moderno.',
    variants: [
      {
        id: 'split-editorial-boda',
        name: 'Editorial B&W',
        assets: {
          heroImage:     'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
          civilImage:    'https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=900',
          ceremonyImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=900',
          partyImage:    'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?q=80&w=900',
          rsvpImage:     'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=900',
          audio: SHARED_ASSETS.demoAudio,
        },
        styles: {
          primaryColor: '#1A1A1A',
          secondaryColor: '#FAFAFA',
          textColor: '#1A1A1A',
          overlayColor: 'rgba(0,0,0,0.35)',
          fontFamilyTitle: "'Playfair Display', serif",
          fontFamilyBody: "'Lato', sans-serif",
        }
      },
      {
        id: 'split-terracotta-boda',
        name: 'Boho Terracotta',
        assets: {
          heroImage:     'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1200',
          civilImage:    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900',
          ceremonyImage: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=900',
          partyImage:    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=900',
          rsvpImage:     'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=900',
          audio: SHARED_ASSETS.demoAudio,
        },
        styles: {
          primaryColor: '#C4773A',
          secondaryColor: '#FDF5EE',
          textColor: '#3D2010',
          overlayColor: 'rgba(60,20,0,0.40)',
          fontFamilyTitle: "'Playfair Display', serif",
          fontFamilyBody: "'Lato', sans-serif",
        }
      },
      {
        id: 'split-floral-boda',
        name: 'Floral Split',
        assets: {
          heroImage:     'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1200',
          civilImage:    'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=900',
          ceremonyImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900',
          partyImage:    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=900',
          rsvpImage:     'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=900',
          audio: SHARED_ASSETS.demoAudio,
        },
        styles: {
          primaryColor: '#B87A8A',
          secondaryColor: '#FFF8F8',
          textColor: '#3D1A28',
          overlayColor: 'rgba(80,10,30,0.35)',
          fontFamilyTitle: "'Playfair Display', serif",
          fontFamilyBody: "'Lato', sans-serif",
        }
      }
    ]
  },

  // ── SKELETON 13: Panorámico + Secciones Limpias ──
  {
    id: 'skeleton13',
    name: 'Panorámico Luxe',
    skeletonComponent: 'Skeleton13',
    description: 'Hero panorámico que ocupa toda la pantalla. Las secciones debajo son limpias y minimalistas con numeración editorial.',
    variants: [
      {
        id: 'pano-ivory-boda',
        name: 'Ivory & Sand',
        assets: {
          heroImage:   'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200',
          accentImage: 'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=1200',
          audio: SHARED_ASSETS.demoAudio,
        },
        styles: {
          primaryColor: '#8B7355',
          secondaryColor: '#1A1A1A',
          bgColor: '#FFFFFF',
          overlayColor: 'rgba(0,0,0,0.48)',
          fontFamilyTitle: "'Cormorant Garamond', serif",
          fontFamilyBody: "'Lato', sans-serif",
        }
      },
      {
        id: 'pano-night-boda',
        name: 'Black Tie Night',
        assets: {
          heroImage:   'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?q=80&w=1200',
          accentImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
          audio: SHARED_ASSETS.demoAudio,
        },
        styles: {
          primaryColor: '#C8A400',
          secondaryColor: '#0A0A0A',
          bgColor: '#F8F8F6',
          overlayColor: 'rgba(0,0,0,0.62)',
          fontFamilyTitle: "'Cormorant Garamond', serif",
          fontFamilyBody: "'Lato', sans-serif",
        }
      }
    ]
  },

  // ── SKELETON 15: Paper Luxe — Cream, banda oscura, EB Garamond ──
  {
    id: 'skeleton15',
    name: 'Paper Luxe',
    skeletonComponent: 'Skeleton15',
    description: 'Cream & gold con doble borde decorativo y banda oscura para la fecha. Tipografía EB Garamond serif. Inspirado en la tarjeta clásica de papel pero con interactividad web completa.',
    variants: [
      {
        id: 'paper-luxe-ivory',
        name: 'Ivory & Gold',
        assets: {
          audio: SHARED_ASSETS.demoAudio,
          ceremonyIcon: '💒', partyIcon: '🥂', dressCodeIcon: '🎩', giftIcon: '💍',
        },
        styles: {
          primaryColor:    '#C9A96E',
          secondaryColor:  '#2C2416',
          fontFamilyTitle: "'Playfair Display', serif",
          fontFamilyBody:  "'EB Garamond', serif",
          textColor:       '#2C2416',
        }
      },
      {
        id: 'paper-luxe-champagne',
        name: 'Champagne & Blush',
        assets: {
          audio: SHARED_ASSETS.demoAudio,
          ceremonyIcon: '💐', partyIcon: '🌸', dressCodeIcon: '👗', giftIcon: '💌',
        },
        styles: {
          primaryColor:    '#C4A882',
          secondaryColor:  '#3D2B30',
          fontFamilyTitle: "'Playfair Display', serif",
          fontFamilyBody:  "'EB Garamond', serif",
          textColor:       '#3D2B30',
        }
      },
      {
        id: 'paper-luxe-sage',
        name: 'Sage & Linen',
        assets: {
          audio: SHARED_ASSETS.demoAudio,
          ceremonyIcon: '🌿', partyIcon: '🍃', dressCodeIcon: '👗', giftIcon: '🎁',
        },
        styles: {
          primaryColor:    '#8A9E7A',
          secondaryColor:  '#2E3020',
          fontFamilyTitle: "'Playfair Display', serif",
          fontFamilyBody:  "'EB Garamond', serif",
          textColor:       '#2E3020',
        }
      }
    ]
  },

  // ── SKELETON 14: Deluxe Vino — Split Hero + Ornamentos Barrocos ──
  {
    id: 'skeleton14',
    name: 'Deluxe Vino',
    skeletonComponent: 'Skeleton14',
    description: 'Fondo vino oscuro, ornamentos barrocos dorados, hero split con foto de novios. Estilo palacio y lujo clásico.',
    variants: [
      {
        id: 'deluxe-vino-boda',
        name: 'Deluxe Vino & Gold',
        assets: {
          heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
          gallery1:  'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=600',
          gallery2:  'https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=600',
          gallery3:  'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?q=80&w=600',
          gallery4:  'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=600',
          audio: SHARED_ASSETS.demoAudio,
        },
        styles: {
          primaryColor: '#C9A84C',
          secondaryColor: '#6B0F2A',
          fontFamilyTitle: "'Great Vibes', cursive",
          fontFamilyBody: "'Lato', sans-serif",
          textColor: '#C9A84C',
        }
      },
      {
        id: 'deluxe-midnight-boda',
        name: 'Deluxe Midnight',
        assets: {
          heroImage: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?q=80&w=1200',
          gallery1:  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600',
          gallery2:  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600',
          gallery3:  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
          gallery4:  'https://images.unsplash.com/photo-1522673607200-1648832cee98?q=80&w=600',
          audio: SHARED_ASSETS.demoAudio,
        },
        styles: {
          primaryColor: '#B8A060',
          secondaryColor: '#0B0B1A',
          fontFamilyTitle: "'Great Vibes', cursive",
          fontFamilyBody: "'Lato', sans-serif",
          textColor: '#B8A060',
        }
      }
    ]
  }
];

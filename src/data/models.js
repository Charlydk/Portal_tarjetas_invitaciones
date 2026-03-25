// src/data/models.js

const SHARED_ASSETS = {
  video1: 'https://v1.padlet.pics/1/vids/0be6c84c7f0775d0b497042a197b0a70.mp4',
  audio1: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  audio2: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  audio3: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  audio4: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  audio5: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  audio6: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  audio8: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  audio9: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
  audio10: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
  audio11: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
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
          audio: SHARED_ASSETS.audio1
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
          audio: SHARED_ASSETS.audio2
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
          backgroundImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000',
          ceremonyIcon: '💒',
          partyIcon: '🥂',
          dressCodeIcon: '👔',
          giftIcon: '💍',
          audio: SHARED_ASSETS.audio9
        },
        styles: {
          primaryColor: '#D4AF37',
          secondaryColor: '#556B2F',
          fontFamilyTitle: "'Great Vibes', cursive",
          fontFamilyBody: "'Montserrat', sans-serif",
          headerOverlay: 'rgba(255,255,255,0.3)',
          cardBackground: 'rgba(255,255,255,0.1)',
          textColor: '#ffffff'
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
          audio: SHARED_ASSETS.audio8
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
          audio: SHARED_ASSETS.audio10
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
          audio: SHARED_ASSETS.audio11
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
          audio: SHARED_ASSETS.audio3
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
          audio: SHARED_ASSETS.audio4
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
          audio: SHARED_ASSETS.audio5
        },
        styles: {
          primaryColor: '#f39c12',
          cardBackground: '#fdfcf0',
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
          audio: SHARED_ASSETS.audio6
        },
        styles: {}
      }
    ]
  }
];

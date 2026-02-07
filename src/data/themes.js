// src/data/themes.js

export const themes = {
  'rapunzel': {
    id: 'rapunzel',
    name: 'Rapunzel',
    skeleton: 'Skeleton1',
    assets: {
      headerVideo: 'https://v1.padlet.pics/1/vids/0be6c84c7f0775d0b497042a197b0a70.mp4',
      headerImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000',
      backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000',
      ceremonyIcon: '🌸',
      partyIcon: '🏮',
      dressCodeIcon: '👗',
      giftIcon: '🎁',
      audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
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
  'cinderella': {
    id: 'cinderella',
    name: 'Cenicienta',
    skeleton: 'Skeleton1',
    assets: {
      headerVideo: '', // Removed flakey video
      headerImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000',
      backgroundImage: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=1000',
      ceremonyIcon: '👑',
      partyIcon: '👠',
      dressCodeIcon: '👔',
      giftIcon: '💎',
      audio: ''
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
  'modern-15': {
    id: 'modern-15',
    name: 'Moderna 15',
    skeleton: 'Skeleton2',
    assets: {
      backgroundImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000',
      ceremonyIcon: '⛪',
      partyIcon: '🥂',
      dressCodeIcon: '👗',
      giftIcon: '✨'
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
  'wedding-classic': {
    id: 'wedding-classic',
    name: 'Boda Clásica',
    skeleton: 'Skeleton1',
    assets: {
      headerVideo: '',
      headerImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000',
      backgroundImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000',
      ceremonyIcon: '💒',
      partyIcon: '🥂',
      dressCodeIcon: '👔',
      giftIcon: '💍',
      audio: ''
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
  },
  'neon-party': {
    id: 'neon-party',
    name: 'Fiesta Neón',
    skeleton: 'Skeleton2',
    assets: {
      backgroundImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000',
      ceremonyIcon: '⚡',
      partyIcon: '🔊',
      dressCodeIcon: '👕',
      giftIcon: '💥'
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
  'corporate-classic': {
    id: 'corporate-classic',
    name: 'Corporativo',
    skeleton: 'Skeleton2',
    assets: {
      backgroundImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000',
      ceremonyIcon: '💼',
      partyIcon: '🤝',
      dressCodeIcon: '🕴️',
      giftIcon: '📈'
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
};

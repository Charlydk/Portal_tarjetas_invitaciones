// src/data/themes.js

export const themes = {
  'rapunzel': {
    id: 'rapunzel',
    name: 'Rapunzel',
    skeleton: 'Skeleton1',
    assets: {
      headerVideo: '/assets/Rapunzel/video/Tangled_live_wallpaper.mp4',
      backgroundImage: '/assets/Rapunzel/img/main_section_background.png',
      ceremonyIcon: '/assets/Rapunzel/img/ceremonia.png',
      partyIcon: '/assets/Rapunzel/img/fiesta.png',
      dressCodeIcon: '/assets/Rapunzel/img/dresscode.jpg',
      giftIcon: '/assets/Rapunzel/img/regalo.gif',
      audio: '/assets/Rapunzel/audio/cancion.mp3'
    },
    styles: {
      primaryColor: '#FF69B4',
      secondaryColor: '#28a745',
      fontFamilyTitle: "'Great Vibes', cursive",
      fontFamilyBody: "'Montserrat', sans-serif",
      headerOverlay: 'rgba(0,0,0,0.4)',
      cardBackground: 'transparent',
      textColor: '#ffffff'
    }
  },
  'cinderella': {
    id: 'cinderella',
    name: 'Cenicienta',
    skeleton: 'Skeleton1',
    assets: {
      headerVideo: 'https://player.vimeo.com/external/371433846.sd.mp4?s=2315b631754407b3003f4c1e30927702444c1330&profile_id=139&oauth2_token_id=57447761',
      backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000',
      ceremonyIcon: '/assets/Rapunzel/img/ceremonia.png',
      partyIcon: '/assets/Rapunzel/img/fiesta.png',
      dressCodeIcon: '/assets/Rapunzel/img/dresscode.jpg',
      giftIcon: '/assets/Rapunzel/img/regalo.gif',
      audio: ''
    },
    styles: {
      primaryColor: '#87CEEB',
      secondaryColor: '#FFD700',
      fontFamilyTitle: "'Great Vibes', cursive",
      fontFamilyBody: "'Montserrat', sans-serif",
      headerOverlay: 'rgba(0,0,40,0.5)',
      cardBackground: 'transparent',
      textColor: '#ffffff'
    }
  },
  'modern-15': {
    id: 'modern-15',
    name: 'Moderna 15',
    skeleton: 'Skeleton2', // Cambiamos a Skeleton 2 para variar
    assets: {
      backgroundImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000',
      ceremonyIcon: '⛪',
      partyIcon: '🥂',
      dressCodeIcon: '👗',
      giftIcon: '🎁'
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
      backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000',
      ceremonyIcon: '/assets/Rapunzel/img/ceremonia.png',
      partyIcon: '/assets/Rapunzel/img/fiesta.png',
      dressCodeIcon: '/assets/Rapunzel/img/dresscode.jpg',
      giftIcon: '/assets/Rapunzel/img/regalo.gif',
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
      giftIcon: '💸'
    },
    styles: {
      primaryColor: '#00FFFF',
      secondaryColor: '#0a0a0a',
      fontFamilyTitle: "'Montserrat', sans-serif",
      fontFamilyBody: "'Montserrat', sans-serif",
      textColor: '#00FFFF',
      cardBackground: 'rgba(255,255,255,0.05)'
    }
  }
};

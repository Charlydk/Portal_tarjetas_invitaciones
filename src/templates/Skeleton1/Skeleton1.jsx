import React from 'react';
import { HeroHeader } from '../../components/invitation-pieces/HeroHeader';
import { CountdownBox } from '../../components/invitation-pieces/CountdownBox';
import {
  CeremonyBox,
  PartyBox,
  DressCodeBox,
  GiftsBox,
  GalleryBox,
  RSVPBox,
  MusicBox,
  InvitationFooter
} from '../../components/invitation-pieces/CommonBoxes';
import './Skeleton1.css';

function Skeleton1({ data, theme }) {
  const {
    name1 = 'Nombre',
    eventDate = '2025-11-15T22:00:00',
    ceremonyDate = '11/11/2025',
    ceremonyTime = '19:30 HS',
    ceremonyPlace = 'Parroquia',
    ceremonyAddress = 'Calle Falsa 123',
    ceremonyMapUrl = '#',
    partyDateString = '15/11/2025',
    partyTime = '22:00 HS',
    partyPlace = 'Salón',
    eventVenue = '',
    partyAddress = 'Dirección',
    partyMapUrl = '#',
    alias = 'Alias.Bancario',
    whatsappNumber = '',
    musicUrl = '',
    eventSubtitle = '',
    welcomePhrase = '',

    showCeremony = true,
    showParty = true,
    showCountdown = true,
    showDressCode = true,
    showGifts = true,
    showGallery = true,
    showRSVP = true,
    showMusic = true,
  } = data || {};

  const themeConfig = theme || {
    id: 'default',
    assets: {
      backgroundImage: '',
      ceremonyIcon: '🌺',
      partyIcon: '🍹',
      dressCodeIcon: '👗',
      giftIcon: '🎁',
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
  };

  const dynamicStyles = {
    '--primary-color': themeConfig.styles.primaryColor,
    '--secondary-color': themeConfig.styles.secondaryColor,
    '--font-title': themeConfig.styles.fontFamilyTitle,
    '--font-body': themeConfig.styles.fontFamilyBody,
    '--header-overlay': themeConfig.styles.headerOverlay,
    '--card-bg': themeConfig.styles.cardBackground,
    '--text-color': themeConfig.styles.textColor,
    '--bg-image': `url(${themeConfig.assets.backgroundImage})`,
    '--header-bg': `url(${themeConfig.assets.headerImage || themeConfig.assets.backgroundImage})`,
  };

  return (
    <div id="skeleton1-template" style={dynamicStyles}>
      <div className="skeleton1-fixed-bg"></div>

      <div className="skeleton1-scroll-container">
          <HeroHeader 
            videoUrl={themeConfig.assets.headerVideo}
            imageUrl={themeConfig.assets.headerImage || themeConfig.assets.backgroundImage}
            title={name1}
            subtitle={eventSubtitle}
            welcomePhrase={welcomePhrase}
          />

          {showCeremony && (
            <CeremonyBox 
              icon={themeConfig.assets.ceremonyIcon}
              place={ceremonyPlace}
              address={ceremonyAddress}
              date={ceremonyDate}
              time={ceremonyTime}
              mapUrl={ceremonyMapUrl}
            />
          )}

          {showParty && (
            <PartyBox 
              icon={themeConfig.assets.partyIcon}
              place={partyPlace}
              eventVenue={eventVenue}
              address={partyAddress}
              date={partyDateString}
              time={partyTime}
              mapUrl={partyMapUrl}
            />
          )}

          {showCountdown && <CountdownBox eventDate={eventDate} />}

          {showDressCode && <DressCodeBox icon={themeConfig.assets.dressCodeIcon} />}

          {showGifts && <GiftsBox icon={themeConfig.assets.giftIcon} alias={alias} />}

          {showGallery && <GalleryBox themeId={themeConfig.id} />}

          {showRSVP && <RSVPBox whatsappNumber={whatsappNumber} />}

          {showMusic && <MusicBox musicUrl={musicUrl} />}

          <InvitationFooter title={name1} />
      </div>
    </div>
  );
}

export default Skeleton1;

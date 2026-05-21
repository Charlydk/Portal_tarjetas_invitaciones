import React from 'react';
import { HeroHeader } from '../../components/invitation-pieces/HeroHeader';
import { CountdownBox } from '../../components/invitation-pieces/CountdownBox';
import {
  CivilBox,
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
    name2 = '',
    eventDate = '2025-11-15T22:00:00',
    ceremonyDate = '11/11/2025',
    ceremonyTime = '19:30 HS',
    ceremonyPlace = 'Parroquia',
    ceremonyAddress = 'Calle Falsa 123',
    ceremonyMapUrl = '#',
    ceremonyMapUnknown = false,
    partyDateString = '15/11/2025',
    partyTime = '22:00 HS',
    partyPlace = 'Salón',
    eventVenue = '',
    partyAddress = 'Dirección',
    partyMapUrl = '#',
    partyMapUnknown = false,
    alias = 'Alias.Bancario',
    bankCbu = '',
    giftMode = 'cbu',
    whatsappNumber = '',
    musicPlaylistUrl = '',
    welcomePhrase = '',
    invitePhrase = 'Con cariño te invito a compartir este día tan especial',
    dressCodeDescription = '',
    galleryPhotos = [],

    civilDate = '', civilTime = '', civilPlace = '', civilAddress = '',
    civilMapUrl = '#', civilMapUnknown = false,

    showCivil = false,
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
            id="section-protagonists"
            videoUrl={themeConfig.assets.headerVideo}
            imageUrl={themeConfig.assets.headerImage || themeConfig.assets.backgroundImage}
            title={name1}
            name2={name2}
            welcomePhrase={welcomePhrase}
            invitePhrase={invitePhrase}
          />

          {showCivil && (
            <CivilBox
              id="section-civil"
              icon={themeConfig.assets.ceremonyIcon}
              place={civilPlace}
              address={civilAddress}
              date={civilDate}
              time={civilTime}
              mapUrl={civilMapUnknown ? null : civilMapUrl}
            />
          )}

          {showCeremony && (
            <CeremonyBox
              id={!showCivil ? 'section-civil' : 'section-venue'}
              icon={themeConfig.assets.ceremonyIcon}
              place={ceremonyPlace}
              address={ceremonyAddress}
              date={ceremonyDate}
              time={ceremonyTime}
              mapUrl={ceremonyMapUnknown ? null : ceremonyMapUrl}
            />
          )}

          {showParty && (
            <PartyBox
              id={!showCeremony && !showCivil ? 'section-venue' : undefined}
              icon={themeConfig.assets.partyIcon}
              place={partyPlace}
              eventVenue={eventVenue}
              address={partyAddress}
              date={partyDateString}
              time={partyTime}
              mapUrl={partyMapUnknown ? null : partyMapUrl}
            />
          )}

          {showCountdown && <CountdownBox eventDate={eventDate} />}

          {showDressCode && (
            <DressCodeBox
              id="section-sections"
              icon={themeConfig.assets.dressCodeIcon}
              description={dressCodeDescription}
            />
          )}

          {showGifts && (
            <GiftsBox
              id={!showDressCode ? 'section-sections' : undefined}
              icon={themeConfig.assets.giftIcon}
              alias={alias}
              bankCbu={bankCbu}
              giftMode={giftMode}
            />
          )}

          {showGallery && <GalleryBox id="section-gallery" photos={galleryPhotos} />}

          {showRSVP && <RSVPBox id="section-confirm" whatsappNumber={whatsappNumber} />}

          {showMusic && (
            <MusicBox
              id={!showRSVP ? 'section-confirm' : undefined}
              musicUrl={musicPlaylistUrl}
            />
          )}

          <InvitationFooter title={name1} />
      </div>
    </div>
  );
}

export default Skeleton1;

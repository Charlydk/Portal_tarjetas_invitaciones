import React from 'react';
import { resolveAllegory, tokensToCssVars } from '../../allegories';
import AmbientParticles from './AmbientParticles';
import {
  HeroSection,
  StorySection,
  EventSection,
  CountdownSection,
  RsvpSection,
  DressCodeSection,
  GiftsSection,
  GallerySection,
  MusicSection,
  ClosingSection,
} from './Sections';
import './invitation.css';

/**
 * Renders an invitation from an allegory (costume) plus the client's data.
 *
 * Receives the same `{ data, theme }` contract as every other skeleton, so it
 * plugs into SKELETON_MAP unchanged. The difference is that a new design costs
 * a file in src/allegories/ instead of a new React component.
 */
function AllegoryCard({ data, theme }) {
  const allegory = resolveAllegory(theme?.allegory);

  // A client photo always beats the allegory's stock background.
  const backgroundImage = theme?.assets?.backgroundImage || allegory.tokens.backgroundImage;

  const style = {
    ...tokensToCssVars(allegory.tokens),
    '--inv-bg-image': backgroundImage ? `url("${backgroundImage}")` : 'none',
  };

  // The scroll-sync map in InvitationPreview points the "venue" step at
  // #section-civil, so whichever event renders first has to carry that id.
  let firstEventUsed = false;
  const eventId = () => {
    if (firstEventUsed) return undefined;
    firstEventUsed = true;
    return 'section-civil';
  };

  const renderers = {
    hero: () => <HeroSection key="hero" data={data} allegory={allegory} />,

    story: () => <StorySection key="story" data={data} allegory={allegory} />,

    civil: () =>
      data.showCivil && (
        <EventSection
          key="civil"
          id={eventId()}
          title={allegory.titles.civil}
          icon={allegory.icons?.civil}
          place={data.civilPlace}
          address={data.civilAddress}
          date={data.civilDate}
          time={data.civilTime}
          mapUrl={data.civilMapUnknown ? null : data.civilMapUrl}
          mapCta={allegory.copy.mapCta}
          isDemo={data.isDemo}
        />
      ),

    ceremony: () =>
      data.showCeremony && (
        <EventSection
          key="ceremony"
          id={eventId()}
          title={allegory.titles.ceremony}
          icon={allegory.icons?.ceremony}
          place={data.ceremonyPlace}
          address={data.ceremonyAddress}
          date={data.ceremonyDate}
          time={data.ceremonyTime}
          mapUrl={data.ceremonyMapUnknown ? null : data.ceremonyMapUrl}
          mapCta={allegory.copy.mapCta}
          isDemo={data.isDemo}
        />
      ),

    party: () =>
      data.showParty && (
        <EventSection
          key="party"
          id={eventId()}
          title={allegory.titles.party}
          icon={allegory.icons?.party}
          placeLabel="Salón"
          place={data.eventVenue || data.partyPlace}
          address={data.partyAddress}
          date={data.partyDateString}
          time={data.partyTime}
          mapUrl={data.partyMapUnknown ? null : data.partyMapUrl}
          mapCta={allegory.copy.mapCta}
          isDemo={data.isDemo}
        />
      ),

    countdown: () =>
      data.showCountdown && <CountdownSection key="countdown" data={data} allegory={allegory} />,

    rsvp: () => data.showRSVP && <RsvpSection key="rsvp" data={data} allegory={allegory} />,

    dresscode: () =>
      data.showDressCode && <DressCodeSection key="dresscode" data={data} allegory={allegory} />,

    gifts: () => data.showGifts && <GiftsSection key="gifts" data={data} allegory={allegory} />,

    gallery: () => data.showGallery && <GallerySection key="gallery" data={data} allegory={allegory} />,

    music: () => data.showMusic && <MusicSection key="music" data={data} allegory={allegory} />,

    closing: () => <ClosingSection key="closing" data={data} allegory={allegory} />,
  };

  const amb = allegory.ambience;
  const classes = [
    'inv',
    `inv--${allegory.id}`,
    amb && 'inv--rich',
    amb?.kenBurns && 'inv--kenburns',
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      {amb?.magicLight && allegory.tokens.magic && <div className="inv-magic-light" />}
      {amb?.particles && <AmbientParticles preset={amb.particles} count={amb.count} />}
      {amb?.vignette && <div className="inv-vignette" />}

      {allegory.sections.map((name) => renderers[name]?.() ?? null)}
    </div>
  );
}

export default AllegoryCard;

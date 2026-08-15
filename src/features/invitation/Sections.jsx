import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';

// Sections do not fade in as one block. Each part arrives a beat after the one
// before it, which is what makes the card feel composed instead of dumped on
// screen. `easeOutExpo` lands them softly rather than stopping dead.
const EASE = [0.16, 1, 0.3, 1];

const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// The medallion gets its own move: it grows in and settles.
const medallionIn = {
  hidden: { opacity: 0, scale: 0.74, y: 18 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const titleIn = {
  hidden: { opacity: 0, y: 24, letterSpacing: '0.22em' },
  show: {
    opacity: 1,
    y: 0,
    letterSpacing: 'var(--inv-title-spacing)',
    transition: { duration: 0.75, ease: EASE },
  },
};

// Photos come up from behind, slightly oversized, and settle into place.
const photoIn = {
  hidden: { opacity: 0, y: 26, scale: 1.05 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
};

/**
 * Where a section starts animating.
 *
 * The bottom of the detection box is pulled up by a quarter of the viewport, so
 * a section begins its entrance once it has climbed into the lower-middle of
 * the screen rather than the instant its top edge peeks in. With the old
 * `-80px` the whole animation finished off-screen and the reader only ever met
 * content that had already settled — which reads as lag, not as motion.
 */
const viewport = { once: true, amount: 0.2, margin: '0px 0px -25% 0px' };

// Served locally on purpose. Pulling these from Unsplash meant four cross-origin
// requests firing mid-scroll, and the paint when each one landed was the jolt
// showing up as stutter. Same pictures, 92KB total, no network.
const SAMPLE_PHOTOS = [
  '/allegories/_muestra/foto1.webp',
  '/allegories/_muestra/foto2.webp',
  '/allegories/_muestra/foto3.webp',
  '/allegories/_muestra/foto4.webp',
];

export function Ornament() {
  return <motion.div variants={item} className="inv-ornament" aria-hidden="true">✦</motion.div>;
}

/**
 * A section's medallion. Takes an image path/URL — the per-client artwork that
 * makes a card look commissioned rather than filled in — and falls back to a
 * glyph only when no art exists yet.
 */
export function Medallion({ icon }) {
  if (!icon) return null;

  const isImage = /^(https?:\/\/|\/|\.\/)/.test(icon) || /\.(png|jpe?g|svg|webp|avif|gif)$/i.test(icon);

  return (
    <motion.div
      variants={medallionIn}
      className={`inv-medallion${isImage ? ' inv-medallion--art' : ''}`}
      aria-hidden="true"
    >
      {/* Eager on purpose. Medallions are a handful of ~20KB files, and lazy
          loading them meant an empty circle popped into art a beat after the
          section had already animated in — which is most of what reads as lag. */}
      {isImage ? <img src={icon} alt="" decoding="async" /> : icon}
    </motion.div>
  );
}

/**
 * A call to action that survives having no destination yet.
 *
 * On a real card the link is there and this is just an anchor. In the public
 * showcase the sample data has no map URL and no shared album, so the buttons
 * used to vanish and the feature looked missing. Here they stay, and explain
 * themselves when tapped.
 */
function ActionButton({ href, children, demoNote, isDemo, variant = '' }) {
  const [showNote, setShowNote] = useState(false);
  const className = `inv-btn${variant ? ` ${variant}` : ''}`;

  if (href && href !== '#') {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  if (!isDemo || !demoNote) return null;

  return (
    <>
      <button type="button" className={className} onClick={() => setShowNote(true)}>
        {children}
      </button>
      {showNote && <p className="inv-note">{demoNote}</p>}
    </>
  );
}

/** Section shell: every section gets the same rhythm, heading treatment and reveal. */
function Section({ id, title, icon, children, tight = false }) {
  return (
    <motion.section
      id={id}
      className={`inv-section${tight ? ' inv-section--tight' : ''}`}
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <Medallion icon={icon} />
      <Ornament />
      {title && (
        <motion.h2 variants={titleIn} className="inv-title">{title}</motion.h2>
      )}
      <motion.div variants={item}>{children}</motion.div>
    </motion.section>
  );
}

export function HeroSection({ data, allegory }) {
  const { name1, name2, welcomePhrase, invitePhrase } = data;
  const video = data.heroVideo || allegory.tokens.backgroundVideo;
  const poster = data.heroImage || allegory.tokens.heroImage || allegory.tokens.backgroundImage;

  return (
    <section id="section-hero" className="inv-hero">
      {/* The poster sits on the layer itself, so the hero still reads while the
          video buffers — and stays correct when reduced motion hides the video. */}
      <div
        className="inv-hero__media"
        style={poster ? { backgroundImage: `url("${poster}")` } : undefined}
      >
        {video && (
          <video autoPlay loop muted playsInline preload="metadata" poster={poster || undefined}>
            <source src={video} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="inv-hero__veil" />

      <div className="inv-hero__content">
        {welcomePhrase && <p className="inv-hero__eyebrow">{welcomePhrase}</p>}
        <h1 className="inv-hero__name">{name1}</h1>
        {name2 && (
          <>
            <p className="inv-hero__amp">&</p>
            <h1 className="inv-hero__name">{name2}</h1>
          </>
        )}
        {invitePhrase && <p className="inv-hero__phrase">{invitePhrase}</p>}
      </div>

      <p className="inv-hero__scroll" aria-hidden="true">
        {allegory.copy.scrollHint || 'Desplazá para descubrir'} ⌄
      </p>
    </section>
  );
}

/** The client's own words. Absent in the editor today — present in every card that sold. */
export function StorySection({ data, allegory }) {
  if (!data.story) return null;
  return (
    <Section title={allegory.titles.story} icon={allegory.icons?.story}>
      {data.story
        .split('\n')
        .filter(Boolean)
        .map((paragraph, i) => (
          <p key={i} className="inv-body">{paragraph}</p>
        ))}
    </Section>
  );
}

/**
 * One component for civil, religious and party alike. These were three
 * near-identical copies whose only real difference was a hardcoded heading.
 */
export function EventSection({ id, title, icon, place, placeLabel = 'Lugar', address, date, time, mapUrl, mapCta, isDemo }) {
  if (!place && !address && !date && !time) return null;
  return (
    <Section id={id} title={title} icon={icon}>
      <div className="inv-event">
        {place && (
          <p className="inv-event__row">
            <span className="inv-label">{placeLabel}</span>
            <span className="inv-value">{place}</span>
          </p>
        )}
        {address && (
          <p className="inv-event__row">
            <span className="inv-label">Ubicación</span>
            <span className="inv-value">{address}</span>
          </p>
        )}
        {date && (
          <p className="inv-event__row">
            <span className="inv-label">Día</span>
            <span className="inv-value">{date}</span>
          </p>
        )}
        {time && (
          <p className="inv-event__row">
            <span className="inv-label">Horario</span>
            <span className="inv-value">{time}</span>
          </p>
        )}
        <ActionButton
          href={mapUrl}
          isDemo={isDemo}
          demoNote="En tu tarjeta, este botón abre la ubicación exacta en Google Maps."
        >
          {mapCta}
        </ActionButton>
      </div>
    </Section>
  );
}

const UNITS = [
  ['days', 'Días'],
  ['hours', 'Horas'],
  ['minutes', 'Minutos'],
  ['seconds', 'Segundos'],
];

export function CountdownSection({ data, allegory }) {
  const timeLeft = useCountdown(data.eventDate);
  const target = new Date(data.eventDate).getTime();
  // A delivered card was found counting to -266 days because nothing handled
  // the event already having happened. Guests keep opening these links for
  // months afterwards, so the passed state is a real state, not an edge case.
  const hasPassed = !isNaN(target) && target <= Date.now();

  return (
    <Section id="section-countdown" title={allegory.titles.countdown} icon={allegory.icons?.countdown}>
      {hasPassed ? (
        <p className="inv-countdown__done">{allegory.copy.countdownPassed || '¡Llegó el gran día!'}</p>
      ) : (
        <div className="inv-countdown">
          {UNITS.map(([key, label]) => (
            <div key={key} className="inv-countdown__box">
              <span className="inv-countdown__num">{timeLeft[key]}</span>
              <span className="inv-countdown__unit">{label}</span>
            </div>
          ))}
        </div>
      )}
      {!hasPassed && <p className="inv-body">{allegory.copy.countdownFoot}</p>}
    </Section>
  );
}

export function RsvpSection({ data, allegory }) {
  const { whatsappNumber } = data;
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(allegory.copy.rsvpWhatsapp)}`;
  return (
    <Section id="section-rsvp" title={allegory.titles.rsvp} icon={allegory.icons?.rsvp}>
      <p className="inv-body">{allegory.copy.rsvpBody}</p>
      {data.rsvpDeadline && (
        <p className="inv-body">
          Confirmá antes del <strong>{data.rsvpDeadline}</strong>.
        </p>
      )}
      {data.rsvpFormUrl ? (
        <a href={data.rsvpFormUrl} target="_blank" rel="noopener noreferrer" className="inv-btn">
          {allegory.copy.rsvpCta}
        </a>
      ) : (
        whatsappNumber && (
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="inv-btn">
            {allegory.copy.rsvpCta}
          </a>
        )
      )}
    </Section>
  );
}

export function DressCodeSection({ data, allegory }) {
  return (
    <Section id="section-dresscode" title={allegory.titles.dresscode} icon={allegory.icons?.dresscode}>
      <p className="inv-body">{data.dressCodeDescription || 'Elegante'}</p>
      {data.dressCodeColorNote && <p className="inv-body">{data.dressCodeColorNote}</p>}
    </Section>
  );
}

export function GiftsSection({ data, allegory }) {
  const { giftMode = 'cbu', alias, bankCbu } = data;
  const showBank = giftMode === 'cbu' || giftMode === 'both';
  const showChest = giftMode === 'cofre' || giftMode === 'both';
  return (
    <Section id="section-gifts" title={allegory.titles.gifts} icon={allegory.icons?.gifts}>
      <p className="inv-body">{allegory.copy.giftsBody}</p>
      {showBank && alias && (
        <p className="inv-body">
          <span className="inv-label">Alias</span>
          <span className="inv-value">{alias}</span>
        </p>
      )}
      {showBank && bankCbu && (
        <p className="inv-body">
          <span className="inv-label">CBU</span>
          <span className="inv-value">{bankCbu}</span>
        </p>
      )}
      {showChest && <p className="inv-body">{allegory.copy.giftsChest}</p>}
    </Section>
  );
}

export function GallerySection({ data, allegory }) {
  const [lightbox, setLightbox] = useState(null);
  const photos = data.galleryPhotos?.length ? data.galleryPhotos : SAMPLE_PHOTOS;

  return (
    <Section id="section-gallery" title={allegory.titles.gallery} icon={allegory.icons?.gallery}>
      {allegory.copy.galleryTagline && (
        <p className="inv-body">{allegory.copy.galleryTagline}</p>
      )}
      <motion.div
        className="inv-gallery"
        variants={group}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
      >
        {photos.slice(0, 8).map((src, i) => (
          <motion.button
            key={i}
            variants={photoIn}
            type="button"
            className="inv-gallery-item"
            onClick={() => setLightbox(src)}
            aria-label={`Ampliar foto ${i + 1}`}
          >
            <img src={src} alt="" loading="lazy" decoding="async" />
          </motion.button>
        ))}
      </motion.div>

      {/* Guests uploading their own photos appeared in three of four delivered
          cards, and the editor could not produce it. */}
      <ActionButton
        href={data.sharedAlbumUrl}
        isDemo={data.isDemo}
        variant="inv-btn--ghost"
        demoNote="En tu tarjeta, este botón abre el álbum compartido donde tus invitados suben sus fotos."
      >
        {allegory.copy.sharedAlbumCta}
      </ActionButton>

      {lightbox && (
        <button
          type="button"
          className="inv-lightbox"
          onClick={() => setLightbox(null)}
          aria-label="Cerrar"
        >
          <img src={lightbox} alt="" />
        </button>
      )}
    </Section>
  );
}

export function MusicSection({ data, allegory }) {
  if (!data.musicPlaylistUrl) return null;
  return (
    <Section id="section-music" title={allegory.titles.music || 'Música'} icon={allegory.icons?.music}>
      <p className="inv-body">{allegory.copy.musicBody || '¿Qué canción no puede faltar?'}</p>
      <a href={data.musicPlaylistUrl} target="_blank" rel="noopener noreferrer" className="inv-btn">
        {allegory.copy.musicCta || 'Sugerir canción'}
      </a>
    </Section>
  );
}

export function ClosingSection({ data, allegory }) {
  const names = [data.name1, data.name2].filter(Boolean).join(' & ');
  return (
    <motion.footer
      className="inv-closing"
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      <Ornament />
      <motion.h2 variants={titleIn} className="inv-title">{allegory.titles.closing}</motion.h2>
      {names && <motion.p variants={item} className="inv-body">{names}</motion.p>}
      <motion.p variants={item} className="inv-closing__credit">FX Estudio</motion.p>
    </motion.footer>
  );
}

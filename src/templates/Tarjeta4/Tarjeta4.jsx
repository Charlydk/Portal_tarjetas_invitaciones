import React, { useEffect, useState } from 'react';
import styles from './Tarjeta4.module.css';

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!targetDate) return;
    const parseDate = (d) => {
      const t = Date.parse(d);
      if (!isNaN(t)) return t;
      return new Date(d.replace(/-/g, '/')).getTime();
    };

    const target = parseDate(targetDate);
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days:    Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
  'https://images.unsplash.com/photo-1522673607200-1648832cee98?w=800&q=80',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80',
];

function getSpotifyEmbedUrl(url) {
  if (!url) return null;
  try {
    const match = url.match(/spotify\.com\/(playlist|album|track|artist)\/([a-zA-Z0-9]+)/);
    if (match) return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`;
  } catch (e) {}
  return null;
}

export default function Tarjeta4({ data }) {
  const timeLeft = useCountdown(data?.eventDate);

  const whatsappMessage = `¡Hola! Confirmo mi asistencia al casamiento de ${data?.name1 || 'Zoe'} y ${data?.name2 || 'Lucas'}.`;
  const whatsappUrl = `https://wa.me/${data?.whatsappCountryCode || '54'}${data?.whatsappLocalNumber || '9381000000'}?text=${encodeURIComponent(whatsappMessage)}`;

  const galleryPhotos = (data?.galleryPhotos?.length > 0) ? data.galleryPhotos : SAMPLE_PHOTOS;
  const isUsingDemo  = !(data?.galleryPhotos?.length > 0);
  const spotifyEmbedUrl = getSpotifyEmbedUrl(data?.musicPlaylistUrl);

  const civilMap    = data?.civilMapUrl    || 'https://www.google.com/maps/search/?api=1&query=Registro+Civil';
  const ceremonyMap = data?.ceremonyMapUrl || 'https://www.google.com/maps/search/?api=1&query=Parroquia';
  const partyMap    = data?.partyMapUrl    || 'https://www.google.com/maps/search/?api=1&query=Salon+de+Fiesta';

  return (
    <div className={styles.tarjeta4Container}>
      <div className={styles.scrollArea}>

        {/* ── Hero ── */}
        <section className={styles.hero} id="section-hero">
          <video autoPlay loop muted playsInline className={styles.heroVideo}>
            <source src="/templates/tarjeta4/video/tomados_de_la_mano.mp4" type="video/mp4" />
          </video>
          <div className={styles.overlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.titleName}>{data?.name1 || 'Zoe'} & {data?.name2 || 'Lucas'}</h1>
            <p className={styles.subtitle}>{data?.welcomePhrase || '¡Nos Casamos!'}</p>
            <div className={styles.heroDivider} />
            <p className={styles.heroInvite}>
              {data?.invitePhrase || 'Con amor los invitamos a compartir este día tan especial.'}
            </p>
          </div>
        </section>

        <div className={styles.mainBackground}>

          {/* ── Civil ── */}
          {data?.showCivil && (
            <section className={styles.sectionBlock} id="section-civil">
              <img src="/templates/tarjeta4/img/check.gif" alt="Civil" className={styles.sectionImg} />
              <h2 className={styles.sectionTitle}>Ceremonia Civil</h2>
              <div className={styles.sectionDivider} />
              <div className={styles.infoBlock}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Lugar</span>
                  <span className={styles.infoValue}>{data.civilPlace || 'Registro Civil'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Dirección</span>
                  <span className={styles.infoValue}>{data.civilAddress || 'Calle 123, Ciudad'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Fecha</span>
                  <span className={styles.infoValue}>{data.civilDate || 'A confirmar'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Horario</span>
                  <span className={styles.infoValue}>{data.civilTime || 'A confirmar'}</span>
                </div>
              </div>
              <a href={civilMap} target="_blank" rel="noreferrer" className={styles.btnPrimary}>Cómo llegar</a>
            </section>
          )}

          {/* ── Religioso ── */}
          {data?.showCeremony && (
            <section className={data?.showCivil ? styles.sectionBlockDark : styles.sectionBlock} id="section-ceremony">
              <img src="/templates/tarjeta4/img/iglesia.gif" alt="Iglesia" className={styles.sectionImg} />
              <h2 className={styles.sectionTitle}>Ceremonia Religiosa</h2>
              <div className={styles.sectionDivider} />
              <div className={styles.infoBlock}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Parroquia</span>
                  <span className={styles.infoValue}>{data.ceremonyPlace || 'Parroquia Central'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Dirección</span>
                  <span className={styles.infoValue}>{data.ceremonyAddress || 'Av. Principal'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Fecha</span>
                  <span className={styles.infoValue}>{data.ceremonyDate || 'A confirmar'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Horario</span>
                  <span className={styles.infoValue}>{data.ceremonyTime || 'A confirmar'}</span>
                </div>
              </div>
              <a href={ceremonyMap} target="_blank" rel="noreferrer" className={styles.btnPrimary}>Cómo llegar</a>
            </section>
          )}

          {/* ── Fiesta ── */}
          {data?.showParty && (
            <section className={data?.showCivil || data?.showCeremony ? styles.sectionBlock : styles.sectionBlockDark} id="section-party">
              <img src="/templates/tarjeta4/img/reciencasados.gif" alt="Fiesta" className={styles.sectionImg} />
              <h2 className={styles.sectionTitle}>Recepción</h2>
              <div className={styles.sectionDivider} />
              <div className={styles.infoBlock}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Salón</span>
                  <span className={styles.infoValue}>{data.partyPlace || data.eventVenue || 'Salón Las Nubes'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Dirección</span>
                  <span className={styles.infoValue}>{data.partyAddress || 'Yerba Buena'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Fecha</span>
                  <span className={styles.infoValue}>{data.partyDateString || 'A confirmar'}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Horario</span>
                  <span className={styles.infoValue}>{data.partyTime || '22:00 hs'}</span>
                </div>
              </div>
              <a href={partyMap} target="_blank" rel="noreferrer" className={styles.btnPrimary}>Ver ubicación</a>
            </section>
          )}

          {/* ── Countdown ── */}
          {data?.showCountdown && (
            <section className={styles.sectionBlockDark} id="section-countdown">
              <h2 className={styles.sectionTitle}>Falta muy poco...</h2>
              <div className={styles.sectionDivider} />
              <div className={styles.countdownContainer}>
                {[['days','Días'],['hours','Horas'],['minutes','Min'],['seconds','Seg']].map(([key, label]) => (
                  <div key={key} className={styles.countdownBox}>
                    <p className={styles.cdValue}>{timeLeft[key]}</p>
                    <span className={styles.cdLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Dress Code ── */}
          {data?.showDressCode && (
            <section className={styles.sectionBlock} id="section-dresscode">
              <img src="/templates/tarjeta4/img/ropa_traje_vestido.jpg" alt="Dress Code" className={styles.dressCodeImg} />
              <h2 className={styles.sectionTitle}>Dress Code</h2>
              <div className={styles.sectionDivider} />
              <p className={styles.dressCodeText}>
                Pedimos asistir con vestimenta <strong>{data.dressCodeDescription || 'Elegante'}</strong>.
              </p>
              {data.showDressCodeColorNote && (
                <p className={styles.dressCodeNote}>
                  {data.dressCodeColorNote || 'Reservamos el blanco para la novia'}
                </p>
              )}
            </section>
          )}

          {/* ── Galería ── */}
          {data?.showGallery && (
            <section className={styles.sectionBlockDark} id="section-gallery" style={{ padding: '4rem 0' }}>
              <h2 className={styles.sectionTitle} style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>Nosotros ♥</h2>
              {isUsingDemo && (
                <div className={styles.demoNote} style={{ margin: '0 1.5rem 2rem' }}>
                  📸 Modo demo — cargá tus fotos en el paso Galería.
                </div>
              )}
              <div className={styles.photoCarousel}>
                {galleryPhotos.map((url, i) => (
                  <div key={i} className={styles.carouselItem}>
                    <img src={url} alt={`Nosotros ${i + 1}`} className={styles.carouselImg} />
                  </div>
                ))}
              </div>
              <p className={styles.carouselHint}>Deslizá para ver más fotos</p>
            </section>
          )}

          {/* ── Regalos ── */}
          {data?.showGifts && (
            <section className={styles.sectionBlock} id="section-gifts">
              <img src="/templates/tarjeta4/img/gifbox.gif" alt="Regalos" className={styles.sectionImg} />
              <h2 className={styles.sectionTitle}>Regalos</h2>
              <div className={styles.sectionDivider} />
              <p className={styles.giftIntro}>
                Tu presencia es nuestro mejor regalo. Si querés hacernos un presente:
              </p>
              <div className={styles.giftList}>
                {(data.giftMode === 'cbu' || data.giftMode === 'both') && (
                  <div className={styles.giftData}>
                    <h4 className={styles.giftTitle}>Transferencia</h4>
                    {data.bankCbu && <p className={styles.giftDetail}><strong>CBU:</strong> {data.bankCbu}</p>}
                    <p className={styles.giftDetail}><strong>Alias:</strong> {data.alias || 'nombre.alias.mp'}</p>
                  </div>
                )}
                {(data.giftMode === 'cofre' || data.giftMode === 'both') && (
                  <div className={styles.giftData}>
                    <h4 className={styles.giftTitle}>Cofre de Sobres</h4>
                    <p className={styles.giftDetail}>Habrá un buzón para sobres en el salón.</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ── Playlist ── */}
          {data?.showMusic && (
            <section className={styles.sectionBlockDark} id="section-music" style={{ paddingBottom: '5rem' }}>
              <h2 className={styles.sectionTitle}>Nuestra Playlist</h2>
              <div className={styles.sectionDivider} />
              <p className={styles.playlistIntro}>Las canciones que nos definen</p>
              {spotifyEmbedUrl ? (
                <div style={{ padding: '0 10px' }}>
                  <iframe
                    src={spotifyEmbedUrl}
                    width="100%"
                    height="500"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    style={{ borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                  />
                </div>
              ) : (
                <div className={styles.playlistEmpty}>
                  <p>🎧 Tu playlist aparecerá acá.</p>
                </div>
              )}
            </section>
          )}

          {/* ── RSVP ── */}
          {data?.showRSVP && (
            <section className={styles.sectionBlock} id="section-rsvp">
              <img src="/templates/tarjeta4/img/sobre.gif" alt="RSVP" className={styles.sectionImg} />
              <h2 className={styles.sectionTitle}>Confirmación</h2>
              <div className={styles.sectionDivider} />
              <p className={styles.rsvpText}>¿Nos acompañás?</p>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className={`${styles.btnPrimary} ${styles.btnGreen}`}>
                Confirmar asistencia
              </a>
            </section>
          )}

          <footer className={styles.footer}>
            <p className={styles.footerThanks}>¡Gracias!</p>
            <p className={styles.footerNames}>{data?.name1 || 'Zoe'} & {data?.name2 || 'Lucas'}</p>
          </footer>

        </div>
      </div>
    </div>
  );
}

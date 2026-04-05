import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
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
  const targetEventDate = data?.eventDate;
  const timeLeft = useCountdown(targetEventDate);

  const whatsappMessage = `¡Hola! Confirmo mi asistencia al casamiento de ${data?.name1 || 'Zoe'} y ${data?.name2 || 'Lucas'}.`;
  const whatsappUrl = `https://wa.me/${data?.whatsappCountryCode || '54'}${data?.whatsappLocalNumber || '9381000000'}?text=${encodeURIComponent(whatsappMessage)}`;

  const galleryPhotos = (data?.galleryPhotos?.length > 0) ? data.galleryPhotos : SAMPLE_PHOTOS;
  const isUsingDemo = !(data?.galleryPhotos?.length > 0);
  const spotifyEmbedUrl = getSpotifyEmbedUrl(data?.musicPlaylistUrl);

  const civilMap = data?.civilMapUrl || "https://www.google.com/maps/search/?api=1&query=Registro+Civil";
  const ceremonyMap = data?.ceremonyMapUrl || "https://www.google.com/maps/search/?api=1&query=Parroquia";
  const partyMap = data?.partyMapUrl || "https://www.google.com/maps/search/?api=1&query=Salon+de+Fiesta";

  return (
    <div className={styles.tarjeta4Container}>
      <div className={styles.scrollArea}>

        {/* ── Hero ── */}
        <section className={styles.hero} id="section-hero">
          <video autoPlay loop muted playsInline className={styles.heroVideo}>
            <source src="/templates/tarjeta4/video/tomados_de_la_mano.mp4" type="video/mp4" />
          </video>
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <h1 className={styles.titleName}>{data?.name1 || 'Zoe'} & {data?.name2 || 'Lucas'}</h1>
            <p className={styles.subtitle}>{data?.welcomePhrase || '¡Nos Casamos!'}</p>
            <p style={{ fontFamily: "'Kalam', cursive", marginTop: '2rem', fontSize: '1.4rem', fontWeight: 300, color: 'rgba(255,255,255,0.9)' }}>
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
              <div style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
                <p><strong>LUGAR:</strong> {data.civilPlace || 'Registro Civil'}</p>
                <p><strong>UBICACIÓN:</strong> {data.civilAddress || 'Calle 123, Ciudad'}</p>
                <p><strong>DIA:</strong> {data.civilDate || 'A confirmar'}</p>
                <p><strong>HORARIO:</strong> {data.civilTime || 'A confirmar'}</p>
              </div>
              <a href={civilMap} target="_blank" rel="noreferrer" className={styles.btnPink}>CÓMO LLEGAR</a>
            </section>
          )}

          {/* ── Religioso ── */}
          {data?.showCeremony && (
            <section className={data?.showCivil ? styles.sectionBlockDark : styles.sectionBlock} id="section-ceremony">
              <img src="/templates/tarjeta4/img/iglesia.gif" alt="Iglesia" className={styles.sectionImg} />
              <h2 className={styles.sectionTitle}>Ceremonia Religiosa</h2>
              <div style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
                <p><strong>PARROQUIA:</strong> {data.ceremonyPlace || 'Parroquia Central'}</p>
                <p><strong>UBICACIÓN:</strong> {data.ceremonyAddress || 'Av. Principal'}</p>
                <p><strong>DIA:</strong> {data.ceremonyDate || 'A confirmar'}</p>
                <p><strong>HORARIO:</strong> {data.ceremonyTime || 'A confirmar'}</p>
              </div>
              <a href={ceremonyMap} target="_blank" rel="noreferrer" className={styles.btnPink}>CÓMO LLEGAR</a>
            </section>
          )}

          {/* ── Fiesta ── */}
          {data?.showParty && (
            <section className={data?.showCivil || data?.showCeremony ? styles.sectionBlock : styles.sectionBlockDark} id="section-party">
              <img src="/templates/tarjeta4/img/reciencasados.gif" alt="Fiesta" className={styles.sectionImg} />
              <h2 className={styles.sectionTitle}>Fiesta</h2>
              <div style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
                <p><strong>SALÓN:</strong> {data.partyPlace || 'Salón Las Nubes'}</p>
                <p><strong>UBICACIÓN:</strong> {data.partyAddress || 'Yerba Buena'}</p>
                <p><strong>DIA:</strong> {data.partyDateString || 'A confirmar'}</p>
                <p><strong>HORARIO:</strong> {data.partyTime || '22:00 HS'}</p>
              </div>
              <a href={partyMap} target="_blank" rel="noreferrer" className={styles.btnPink}>VER UBICACIÓN</a>
            </section>
          )}

          {/* ── Countdown ── */}
          {data?.showCountdown && (
            <section className={styles.sectionBlockDark} id="section-countdown">
              <h2 className={styles.sectionTitle} style={{ marginBottom: '1.5rem' }}>Falta muy poco...</h2>
              <div className={styles.countdownContainer}>
                {[['days','DÍAS'],['hours','HS'],['minutes','MIN'],['seconds','SEG']].map(([key, label]) => (
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
              <img src="/templates/tarjeta4/img/ropa_traje_vestido.jpg" alt="Dress Code" className={styles.sectionImg} />
              <h2 className={styles.sectionTitle}>Dress Code</h2>
              <p style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
                Pedimos asistir con vestimenta <strong>{data.dressCodeDescription || 'Elegante'}</strong>.
              </p>
              {data.showDressCodeColorNote && (
                <p style={{ fontSize: '1.2rem', marginTop: '10px', fontStyle: 'italic', color: '#ff4081' }}>
                  🎨 {data.dressCodeColorNote || 'Reservamos el blanco para la novia'}
                </p>
              )}
            </section>
          )}

          {/* ── Galería (Carrusel Pro) ── */}
          {data?.showGallery && (
            <section className={styles.sectionBlockDark} id="section-gallery" style={{ padding: '4rem 0' }}>
              <h2 className={styles.sectionTitle} style={{ marginBottom: '2rem', padding: '0 1.5rem' }}>Nosotros ♥</h2>
              {isUsingDemo && (
                <div style={{ margin: '0 1.5rem 2rem', background: 'rgba(255,255,255,0.05)', border: '1px dashed #FF69B4', borderRadius: '12px', padding: '10px', fontSize: '0.85rem', color: '#FF69B4', textAlign: 'center' }}>
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
              <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', opacity: 0.5, fontStyle: 'italic', textAlign: 'center' }}>
                Deslizá para ver más fotos
              </p>
            </section>
          )}

          {/* ── Regalos ── */}
          {data?.showGifts && (
            <section className={styles.sectionBlock} id="section-gifts">
              <img src="/templates/tarjeta4/img/gifbox.gif" alt="Regalos" className={styles.sectionImg} />
              <h2 className={styles.sectionTitle}>Regalos</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Tu presencia es nuestro mejor regalo. Si querés hacernos un presente:</p>
              <div className={styles.giftList}>
                {(data.giftMode === 'cbu' || data.giftMode === 'both') && (
                  <div className={styles.giftData}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#FF69B4', fontSize: '1.3rem' }}>Transferencia</h4>
                    {data.bankCbu && <p style={{ margin: '0 0 8px 0', fontSize: '1rem' }}><strong>CBU:</strong> {data.bankCbu}</p>}
                    <p style={{ margin: '0', fontSize: '1.1rem' }}><strong>Alias:</strong> {data.alias || 'nombre.alias.mp'}</p>
                  </div>
                )}
                {(data.giftMode === 'cofre' || data.giftMode === 'both') && (
                  <div className={styles.giftData}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#FF69B4', fontSize: '1.3rem' }}>Cofre de Sobres</h4>
                    <p style={{ margin: '0' }}>Habrá un buzón para sobres en el salón.</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ── Playlist Spotify ── */}
          {data?.showMusic && (
            <section className={styles.sectionBlockDark} id="section-music" style={{ paddingBottom: '5rem' }}>
              <h2 className={styles.sectionTitle} style={{ marginBottom: '0.5rem' }}>🎵 Nuestra Playlist</h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>¡Las canciones que nos definen!</p>
              {spotifyEmbedUrl ? (
                <div style={{ padding: '0 10px' }}>
                  <iframe
                    src={spotifyEmbedUrl}
                    width="100%" 
                    height="500" /* Agrandado de 352 a 500 para llenar más espacio */
                    frameBorder="0" 
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy" 
                    style={{ borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                  />
                </div>
              ) : (
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '15px', padding: '3rem', textAlign: 'center', color: '#888' }}>
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
              <p style={{ fontSize: '1.3rem', marginBottom: '25px' }}>¿Nos acompañás?</p>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className={`${styles.btnPink} ${styles.btnGreen}`}>CONFIRMAR ASISTENCIA</a>
            </section>
          )}

          <footer className={styles.sectionBlockDark} style={{ backgroundColor: '#000', padding: '5rem 1.5rem' }}>
            <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: '4.5rem', color: 'white', marginBottom: '1rem' }}>¡Gracias!</h2>
            <p style={{ fontSize: '1.6rem', color: '#FF69B4', fontFamily: "'Kalam', cursive" }}>{data?.name1 || 'Zoe'} & {data?.name2 || 'Lucas'}</p>
          </footer>

        </div>
      </div>
    </div>
  );
}

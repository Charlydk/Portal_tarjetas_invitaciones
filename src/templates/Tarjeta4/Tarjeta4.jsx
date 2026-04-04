import React, { useState, useRef, useEffect } from 'react';
import styles from './Tarjeta4.module.css';

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    if (!targetDate) return;
    const target = new Date(targetDate).getTime();
    if (isNaN(target)) return;
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) { 
        clearInterval(interval); 
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

export default function Tarjeta4({ data, theme }) {
  const [showModal, setShowModal] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Intentamos basar el countdown en la fiesta, si no existe en la civil, sino en la religiosa.
  const targetEventDate = data?.eventDate || data?.ceremonyDateTime || data?.civilDateTime || "2025-11-15T22:00:00";
  const timeLeft = useCountdown(targetEventDate);

  const handlePlayMusic = (play) => {
    setShowModal(false);
    if (play && audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio error:', e));
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play(); setIsPlaying(true); }
  };

  const whatsappMessage = `¡Hola! Confirmo mi asistencia al casamiento de ${data?.name1 || "Belen"} y ${data?.name2 || "Agustin"}.`;
  const whatsappUrl = `https://wa.me/${data?.whatsappCountryCode || '54'}${data?.whatsappLocalNumber || '93813852485'}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className={styles.tarjeta4Container}>
      <audio ref={audioRef} loop preload="auto">
        <source src={data?.musicUrl || "/templates/tarjeta4/audio/CarlosRivera-OtrasVidas.mp3"} type="audio/mpeg" />
      </audio>

      {/* Floating Music Button */}
      {!showModal && (
        <button onClick={toggleMusic} style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 1000, background: '#FF69B4', color: 'white', border: 'none', borderRadius: '50%', width: 60, height: 60, cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', transition: '0.3s' }}>
          {isPlaying ? '⏸' : '▶'}
        </button>
      )}

      {showModal && (
        <div className={styles.welcomeModal}>
          <div className={styles.modalContent}>
            <h3 style={{ fontFamily: "'Great Vibes', cursive", fontSize: '3.5rem', color: '#FF69B4', marginBottom: '1rem', marginTop: 0 }}>¡Bienvenidos!</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', color: '#555', marginBottom: '2rem', lineHeight: 1.5 }}>🌺 Hay un sonido que forma parte de esta experiencia… ¿Te gustaría escucharlo?</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
               <button className={styles.btnPink} style={{ padding: '12px 25px' }} onClick={() => handlePlayMusic(true)}>Sí, ¡claro!</button>
               <button style={{ backgroundColor: '#9ca3af', color: 'white', fontWeight: 'bold', padding: '12px 25px', borderRadius: '30px', border: 'none', cursor: 'pointer', transition: '0.3s' }} onClick={() => handlePlayMusic(false)}>No, gracias</button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.scrollArea}>
        {/* Hero */}
        <section className={styles.hero}>
          <video autoPlay loop muted playsInline className={styles.heroVideo}>
            <source src="/templates/tarjeta4/video/tomados_de_la_mano.mp4" type="video/mp4" />
          </video>
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
             <h1 className={styles.titleName}>{data?.name1 || "Belen"} & {data?.name2 || "Agustin"}</h1>
             <p className={styles.subtitle}>¡Nos Casamos!</p>
             <p style={{ fontFamily: "'Kalam', cursive", marginTop: '2rem', fontSize: '1.5rem', fontWeight: 300 }}>
               {data?.invitePhrase || "Con amor los invitamos a compartir este día tan especial."}
             </p>
          </div>
        </section>

        {/* Main Content Wrapper */}
        <div className={styles.mainBackground}>
           
           {data?.showCivil && (
             <section className={styles.sectionBlock}>
               <img src="/templates/tarjeta4/img/check.gif" alt="Civil" className={styles.sectionImg} />
               <h2 className={styles.sectionTitle}>Ceremonia Civil</h2>
               <p style={{ fontSize: '1.3rem', marginBottom: '10px' }}><strong>LUGAR:</strong> {data.civilPlace}</p>
               <p style={{ fontSize: '1.3rem', marginBottom: '10px' }}><strong>UBICACIÓN:</strong> {data.civilAddress}</p>
               <p style={{ fontSize: '1.3rem', marginBottom: '10px' }}><strong>DIA:</strong> {data.civilDate}</p>
               <p style={{ fontSize: '1.3rem', marginBottom: '20px' }}><strong>HORARIO:</strong> {data.civilTime}</p>
               {data.civilMapUrl && (
                  <a href={data.civilMapUrl} target="_blank" rel="noreferrer" className={styles.btnPink}>CÓMO LLEGAR</a>
               )}
             </section>
           )}

           {data?.showCeremony && (
             <section className={data?.showCivil ? styles.sectionBlockDark : styles.sectionBlock}>
               <img src="/templates/tarjeta4/img/iglesia.gif" alt="Iglesia" className={styles.sectionImg} />
               <h2 className={styles.sectionTitle}>Ceremonia Religiosa</h2>
               <p style={{ fontSize: '1.3rem', marginBottom: '10px' }}><strong>PARROQUIA:</strong> {data.ceremonyPlace}</p>
               <p style={{ fontSize: '1.3rem', marginBottom: '10px' }}><strong>UBICACIÓN:</strong> {data.ceremonyAddress}</p>
               <p style={{ fontSize: '1.3rem', marginBottom: '10px' }}><strong>DIA:</strong> {data.ceremonyDate}</p>
               <p style={{ fontSize: '1.3rem', marginBottom: '20px' }}><strong>HORARIO:</strong> {data.ceremonyTime}</p>
               {data.ceremonyMapUrl && (
                  <a href={data.ceremonyMapUrl} target="_blank" rel="noreferrer" className={styles.btnPink}>CÓMO LLEGAR</a>
               )}
             </section>
           )}

           {data?.showParty && (
             <section className={(data?.showCivil && !data?.showCeremony) || (!data?.showCivil && data?.showCeremony) ? styles.sectionBlockDark : styles.sectionBlock}>
               <img src="/templates/tarjeta4/img/reciencasados.gif" alt="Fiesta" className={styles.sectionImg} />
               <h2 className={styles.sectionTitle}>Fiesta</h2>
               <p style={{ fontSize: '1.3rem', marginBottom: '10px' }}><strong>SALÓN:</strong> {data.partyPlace}</p>
               <p style={{ fontSize: '1.3rem', marginBottom: '10px' }}><strong>UBICACIÓN:</strong> {data.partyAddress}</p>
               <p style={{ fontSize: '1.3rem', marginBottom: '10px' }}><strong>DIA:</strong> {data.partyDateString || data.ceremonyDate}</p>
               <p style={{ fontSize: '1.3rem', marginBottom: '20px' }}><strong>HORARIO:</strong> {data.partyTime || "22:00 HS"}</p>
               {data.partyMapUrl && (
                  <a href={data.partyMapUrl} target="_blank" rel="noreferrer" className={styles.btnPink}>VER UBICACIÓN</a>
               )}
             </section>
           )}

           {data?.showCountdown && (
             <section className={styles.sectionBlockDark} style={{ backgroundColor: 'rgba(51,51,51,0.9)' }}>
                <h2 className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>¡Pronto el gran día!</h2>
                <div className={styles.countdownContainer}>
                  <div className={styles.countdownBox}>
                    <p className={styles.cdValue}>{timeLeft.days}</p>
                    <span className={styles.cdLabel}>Días</span>
                  </div>
                  <div className={styles.countdownBox}>
                    <p className={styles.cdValue}>{timeLeft.hours}</p>
                    <span className={styles.cdLabel}>Hs</span>
                  </div>
                  <div className={styles.countdownBox}>
                    <p className={styles.cdValue}>{timeLeft.minutes}</p>
                    <span className={styles.cdLabel}>Min</span>
                  </div>
                  <div className={styles.countdownBox}>
                    <p className={styles.cdValue}>{timeLeft.seconds}</p>
                    <span className={styles.cdLabel}>Seg</span>
                  </div>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.2rem', marginTop: '2rem' }}>Con vos compartiendo este momento, será aún más significativo.</p>
             </section>
           )}

           {data?.showDressCode && (
             <section className={styles.sectionBlock}>
               <img src="/templates/tarjeta4/img/ropa_traje_vestido.jpg" alt="Dress Code" className={styles.sectionImg} />
               <h2 className={styles.sectionTitle}>Dress Code</h2>
               <p style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
                 Pedimos asistir con vestimenta <strong>{data.dressCodeDescription || 'Elegante'}</strong>.
               </p>
             </section>
           )}

           {data?.showGifts && (
             <section className={styles.sectionBlockDark}>
               <img src="/templates/tarjeta4/img/gifbox.gif" alt="Regalos" className={styles.sectionImg} />
               <h2 className={styles.sectionTitle}>Regalos</h2>
               <p style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Tu regalo es tu presencia. Si querés hacernos un presente, te dejamos las opciones:</p>
               
               {data.giftMode === 'cbu' || data.giftMode === 'both' ? (
                 <div className={styles.giftData}>
                   <h4 style={{ margin: '0 0 10px 0', color: '#FF69B4' }}>Transferencia Bancaria</h4>
                   <p style={{ margin: '0 0 5px 0' }}><strong>CBU/CVU:</strong> {data.bankCbu || "0000003100009496507226"}</p>
                   <p style={{ margin: '0' }}><strong>Alias:</strong> {data.bankAlias || "belen.agustin.boda"}</p>
                 </div>
               ) : null}

               {data.giftMode === 'cofre' || data.giftMode === 'both' ? (
                 <div className={styles.giftData}>
                   <h4 style={{ margin: '0 0 10px 0', color: '#FF69B4' }}>Cofre de Sobres</h4>
                   <p style={{ margin: '0' }}>Tendremos un buzón en el salón para que nos dejes tu saludo o regalo.</p>
                 </div>
               ) : null}
             </section>
           )}

           {data?.showGallery && (
             <section className={styles.sectionBlock}>
               <h2 className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>Nosotros ♥</h2>
               <p style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Cada historia de amor es diferente, ¡pero la nuestra es única!</p>
               
               {data.galleryPhotos && data.galleryPhotos.length > 0 ? (
                 <div className={styles.galleryGrid}>
                   {data.galleryPhotos.map((url, index) => (
                     <img key={index} src={url} alt={`Foto ${index+1}`} className={styles.galleryImg} />
                   ))}
                 </div>
               ) : (
                 <div className={styles.galleryGrid}>
                   <img src="/templates/tarjeta4/img/foto1.jpg" alt="Gallery 1" className={styles.galleryImg} />
                   <img src="/templates/tarjeta4/img/foto2.jpg" alt="Gallery 2" className={styles.galleryImg} />
                   <img src="/templates/tarjeta4/img/foto3.jpg" alt="Gallery 3" className={styles.galleryImg} />
                 </div>
               )}
               <br />
               <a href="https://photos.app.goo.gl/29d3orxp9gh2Jgia6" target="_blank" rel="noreferrer" className={styles.btnPink} style={{ marginTop: '20px' }}>Compartí tus fotos acá</a>
             </section>
           )}

           {data?.showRSVP && (
             <section className={data?.showGallery ? styles.sectionBlockDark : styles.sectionBlock}>
               <img src="/templates/tarjeta4/img/sobre.gif" alt="RSVP" className={styles.sectionImg} />
               <h2 className={styles.sectionTitle}>Confirmá tu Asistencia</h2>
               <p style={{ fontSize: '1.3rem', marginBottom: '20px' }}>¡Tu presencia es muy importante para nosotros! Confirmanos antes del evento.</p>
               
               {data?.askDiets && (
                 <p style={{ fontSize: '1.1rem', marginBottom: '20px', fontStyle: 'italic', opacity: 0.9 }}>
                   🥗 Si tenés alguna restricción alimentaria o menú especial, avisanos al confirmar.
                 </p>
               )}

               <a href={whatsappUrl} target="_blank" rel="noreferrer" className={`${styles.btnPink} ${styles.btnGreen}`}>CONFIRMAR ASISTENCIA</a>
             </section>
           )}
           
           <section className={styles.sectionBlockDark} style={{ backgroundColor: 'rgba(20,20,20,0.95)' }}>
             <h2 style={{ fontFamily: "'Great Vibes', cursive", fontSize: '4.5rem', color: 'white', marginBottom: '1rem' }}>¡Gracias!</h2>
             <p style={{ fontSize: '1.8rem', color: '#FF69B4', fontFamily: "'Kalam', cursive" }}>{data?.name1 || "Belen"} & {data?.name2 || "Agustin"}</p>
             <p style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.6 }}>© {new Date().getFullYear()} - Hecho con Portal Invitaciones</p>
           </section>

        </div>
      </div>
    </div>
  );
}

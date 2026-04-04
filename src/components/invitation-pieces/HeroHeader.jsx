import React from 'react';
import { motion } from 'framer-motion';

export function HeroHeader({ id, videoUrl, imageUrl, title, name2, subtitle, welcomePhrase, invitePhrase, scrollText = '﹀ Desplazar hacia abajo' }) {
  const displayTitle = name2 ? `${title} & ${name2}` : title;
  const displaySubtitle = welcomePhrase || subtitle || '¡ESTÁS INVITADO!';
  const displayPhrase = invitePhrase || 'Con cariño te invito a compartir este día tan especial.';

  return (
    <header id={id} className="header">
      {videoUrl ? (
        <video className="video-background" autoPlay loop muted playsInline key={videoUrl}>
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div
          className="video-background"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}
      <div className="overlay">
        <motion.h1
          className="title"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {displayTitle}
        </motion.h1>
        <motion.h2
          className="subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {displaySubtitle}
        </motion.h2>
        <motion.p
          className="hero-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {displayPhrase}
        </motion.p>
        <div className="scroll-indicator">{scrollText}</div>
      </div>
    </header>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

export function HeroHeader({ videoUrl, imageUrl, title, subtitle, welcomePhrase, scrollText = '﹀ Desplazar hacia abajo' }) {
  return (
    <header className="header">
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
        ></div>
      )}
      <div className="overlay">
        <motion.h1
            className="title"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        >
            {title}
        </motion.h1>
        <motion.h2
            className="subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
        >
            {welcomePhrase || subtitle || '¡ESTÁS INVITADO!'}
        </motion.h2>
        <motion.p
            className="hero-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
        >
            Con cariño te invito a compartir este día tan especial.
        </motion.p>
        <div className="scroll-indicator">{scrollText}</div>
      </div>
    </header>
  );
}

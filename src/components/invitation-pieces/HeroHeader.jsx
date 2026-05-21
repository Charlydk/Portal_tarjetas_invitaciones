import React from 'react';
import { motion } from 'framer-motion';

export function HeroHeader({
  id,
  videoUrl,
  imageUrl,
  title,
  name2,
  // subtitle ignored — welcomePhrase lo reemplaza
  welcomePhrase,
  invitePhrase,
}) {
  return (
    <header id={id} className="hero-header">

      {/* ── Fondo ── */}
      {videoUrl ? (
        <video className="hero-bg-media" autoPlay loop muted playsInline key={videoUrl}>
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div
          className="hero-bg-media"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* Gradientes para legibilidad — sin caja fea */}
      <div className="hero-gradient-top"    aria-hidden="true" />
      <div className="hero-gradient-bottom" aria-hidden="true" />

      {/* ── Contenido anclado al fondo ── */}
      <div className="hero-content">

        {welcomePhrase && (
          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
          >
            {welcomePhrase}
          </motion.p>
        )}

        <div className="hero-names-block">
          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.1 }}
          >
            {title}
          </motion.h1>

          {name2 && (
            <>
              <motion.span
                className="hero-ampersand"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.8, ease: 'backOut' }}
              >
                &amp;
              </motion.span>
              <motion.h1
                className="hero-name"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95, duration: 1.1 }}
              >
                {name2}
              </motion.h1>
            </>
          )}
        </div>

        {/* Línea dorada de acento */}
        <motion.div
          className="hero-accent-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.9, ease: 'easeOut' }}
        />

        {invitePhrase && (
          <motion.p
            className="hero-invite-phrase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.35, duration: 1 }}
          >
            {invitePhrase}
          </motion.p>
        )}

        {/* Flecha de scroll */}
        <motion.div
          className="hero-scroll-arrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.9, duration: 1 }}
          aria-hidden="true"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 10l6 6 6-6" />
          </svg>
        </motion.div>

      </div>
    </header>
  );
}

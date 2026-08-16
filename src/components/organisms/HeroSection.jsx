import React from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';
import { waLink, hasWhatsApp } from '../../lib/whatsapp';
import { PLAZO_ENTREGA } from '../../data/homeData';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: 'easeOut', delay },
});

function HeroSection() {
  return (
    <header className={styles.heroWrapper}><div className={styles.heroSection}>

      {/* ── Fondo decorativo ── */}
      <div className={styles.bgBlob1} aria-hidden="true" />
      <div className={styles.bgBlob2} aria-hidden="true" />
      <div className={styles.bgDots}  aria-hidden="true" />

      {/* ── Columna izquierda ── */}
      <div className={styles.heroLeft}>
        <motion.p className={styles.eyebrow} {...fadeUp(0)}>
          ✦ Invitaciones digitales hechas a medida
        </motion.p>

        <motion.h1 className={styles.heroTitle} {...fadeUp(0.15)}>
          Que tu invitación cuente tu historia
        </motion.h1>

        <motion.p className={styles.heroSubtitle} {...fadeUp(0.28)}>
          Elegí el diseño que te enamore, contanos cómo soñaste tu día y te lo
          entregamos hecho invitación. Con música, video e ilustraciones pensadas
          para vos.
        </motion.p>

        <motion.div className={styles.heroActions} {...fadeUp(0.4)}>
          <a href="#templates" className={styles.btnMain}>Ver los diseños</a>
          {hasWhatsApp && (
            <a
              href={waLink('¡Hola! Vi el portal y me interesan las invitaciones. ¿Me contás cómo es?')}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnOutline}
            >
              Escribinos por WhatsApp
            </a>
          )}
        </motion.div>

        <motion.div className={styles.trustRow} {...fadeUp(0.52)}>
          {/* Entrega primero: es el dato más competitivo del set — el mercado
              promete 3 días. */}
          <span>✓ Entrega en {PLAZO_ENTREGA}</span>
          <span>✓ Diseño a medida</span>
          <span>✓ Se abre en cualquier celular</span>
        </motion.div>
      </div>

      {/* ── Columna derecha — phone mockup ── */}
      <motion.div
        className={styles.heroRight}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
      >
        <div className={styles.phoneGlow} aria-hidden="true" />
        <div className={styles.phoneFrame}>
          <div className={styles.phoneNotch} />
          {/* One of the real cards, not a stock photo of somebody else's
              wedding. The hero should show what is actually being sold. */}
          <img
            src="/allegories/cenicienta/fondo.jpeg"
            alt="Invitación Cenicienta — vista previa"
            className={styles.phoneScreen}
            fetchPriority="high"
          />
        </div>

        {/* Badges flotantes decorativos */}
        <motion.div
          className={styles.badge1}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6, ease: 'backOut' }}
        >
          ✨ ¡Es tu día!
        </motion.div>
        <motion.div
          className={styles.badge2}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.6, ease: 'backOut' }}
        >
          💌 Comparte al instante
        </motion.div>
      </motion.div>

    </div></header>
  );
}

export default HeroSection;

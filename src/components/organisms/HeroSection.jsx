import React from 'react';
import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';

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
          ✦ Invitaciones digitales para tus eventos
        </motion.p>

        <motion.h1 className={styles.heroTitle} {...fadeUp(0.15)}>
          El día que soñaste merece la invitación perfecta
        </motion.h1>

        <motion.p className={styles.heroSubtitle} {...fadeUp(0.28)}>
          Interactivas, elegantes y listas para compartir en segundos. Sin imprimir, sin esperar.
        </motion.p>

        <motion.div className={styles.heroActions} {...fadeUp(0.4)}>
          <a href="#templates" className={styles.btnMain}>Ver modelos</a>
          <a
            href="https://wa.me/5491100000000?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20las%20invitaciones"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnOutline}
          >
            Hablar con un asesor
          </a>
        </motion.div>

        <motion.div className={styles.trustRow} {...fadeUp(0.52)}>
          <span>✓ Sin contrato</span>
          <span>✓ Entrega en 24 hs</span>
          <span>✓ Soporte incluido</span>
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
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600"
            alt="Vista previa de invitación"
            className={styles.phoneScreen}
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

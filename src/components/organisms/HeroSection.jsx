import React from 'react';
import HeroCarousel from '../HeroCarousel';
import styles from './HeroSection.module.css';

function HeroSection() {
  return (
    <header className={styles.heroSection}>
      <div className={styles.heroCarouselContainer}>
        <HeroCarousel />
      </div>
      
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Invitaciones Web que Cautivan</h1>
        <p className={styles.heroSubtitle}>
          Crea y comparte invitaciones interactivas e inolvidables en minutos. Perfectas para cualquier ocasión y amigables con el planeta.
        </p>
        <a href="#templates" className={styles.ctaButton}>Ver Plantillas</a>
      </div>
    </header>
  );
}

export default HeroSection;

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
        <h1 className={styles.heroTitle}>Invitaciones Elegantes para tus Eventos</h1>
        <p className={styles.heroSubtitle}>
          Crea y comparte invitaciones cautivadoras en minutos. Totalmente interactivas y 100% digitales.
        </p>
        <a href="#templates" className="btn-primary">Descubrir Diseños</a>
      </div>
    </header>
  );
}

export default HeroSection;

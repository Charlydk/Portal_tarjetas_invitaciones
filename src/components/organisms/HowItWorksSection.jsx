import React from 'react';
import styles from './HowItWorksSection.module.css';

function HowItWorksSection() {
  return (
    <section className={styles.howItWorksSection}>
      <h2 className={styles.sectionTitle}>Fácil, Rápido y Sorprendente</h2>
      <div className={styles.stepsContainer}>
        <div className={styles.step}>
          <h3>1. Elige</h3>
          <p>Explora nuestra galería y selecciona la plantilla que mejor se adapte a tu evento.</p>
        </div>
        <div className={styles.step}>
          <h3>2. Personaliza</h3>
          <p>Edita los textos, fechas y detalles en tiempo real con nuestro panel interactivo.</p>
        </div>
        <div className={styles.step}>
          <h3>3. Comparte</h3>
          <p>Recibe un enlace único para enviar a tus invitados por WhatsApp, email o redes sociales.</p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;

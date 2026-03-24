import React from 'react';
import styles from './DemoSection.module.css';

function DemoSection() {
  return (
    <section className={styles.featuredDemoSection}>
      <h2 className={styles.sectionTitle}>Una Experiencia Interactiva Completa</h2>
      <p className={styles.sectionSubtitle}>
        Navega por una de nuestras invitaciones de ejemplo. Siente la fluidez y descubre todas las posibilidades.
      </p>
      
      <div className={styles.phoneMockup}>
        <div className={styles.phoneNotch}></div>
        <div className={styles.phoneScreenContainer}>
          <iframe 
            src="https://belenagustin.netlify.app/" 
            className={styles.phoneScreen}
            title="Ejemplo de Invitación Web Interactiva"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default DemoSection;

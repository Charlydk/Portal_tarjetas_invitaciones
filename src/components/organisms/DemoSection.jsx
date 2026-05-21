import React from 'react';
import { motion } from 'framer-motion';
import styles from './DemoSection.module.css';

function DemoSection() {
  return (
    <section className={styles.featuredDemoSection}>
      <motion.p
        className={styles.eyebrow}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Experiencia real
      </motion.p>
      <motion.h2
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Una experiencia interactiva completa
      </motion.h2>
      <motion.p
        className={styles.sectionSubtitle}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Navegá por una de nuestras invitaciones de ejemplo y sentí la fluidez.
      </motion.p>

      <motion.div
        className={styles.phoneMockup}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
      >
        <div className={styles.phoneNotch}></div>
        <div className={styles.phoneScreenContainer}>
          <iframe
            src="https://belenagustin.netlify.app/"
            className={styles.phoneScreen}
            title="Ejemplo de Invitación Web Interactiva"
            loading="lazy"
          ></iframe>
        </div>
      </motion.div>
    </section>
  );
}

export default DemoSection;

import React from 'react';
import { motion } from 'framer-motion';
import styles from './FinalCtaSection.module.css';

function FinalCtaSection() {
  return (
    <section className={styles.finalCtaSection}>
      <motion.h2
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        ¿Listo para crear tu invitación?
      </motion.h2>
      <motion.p
        className={styles.sectionSubtitle}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        Elegí tu modelo favorito y comenzá a enamorar a tus invitados hoy mismo.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.28 }}
      >
        <a href="#templates" className="btn-primary">
          Comenzar ahora
        </a>
      </motion.div>
    </section>
  );
}

export default FinalCtaSection;

import React from 'react';
import { motion } from 'framer-motion';
import styles from './DemoSection.module.css';
import DemoEmbed from '../DemoEmbed';

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
        Mirala como la va a ver tu invitado
      </motion.h2>
      <motion.p
        className={styles.sectionSubtitle}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Recorré una invitación completa, de la portada hasta la confirmación.
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
          {/* Was pointing at tarjeta4, a legacy design no longer offered. The
              featured demo has to be something the visitor can actually buy. */}
          <DemoEmbed variantId="cenicienta-baile" />
        </div>
      </motion.div>
    </section>
  );
}

export default DemoSection;

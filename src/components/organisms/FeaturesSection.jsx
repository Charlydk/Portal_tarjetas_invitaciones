import React from 'react';
import { motion } from 'framer-motion';
import styles from './FeaturesSection.module.css';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

function FeaturesSection({ features }) {
  return (
    <section id="features" className={styles.featuresSection}>
      <motion.p
        className={styles.eyebrow}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Por qué elegirnos
      </motion.p>
      <motion.h2
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Todo lo que necesitás para un evento inolvidable
      </motion.h2>

      <motion.div
        className={styles.featuresGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {features.map((feature, index) => (
          <motion.div className={styles.featureCard} key={index} variants={cardVariants}>
            <div className={styles.featureIcon}>{feature.icon}</div>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default FeaturesSection;

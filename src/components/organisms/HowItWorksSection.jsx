import React from 'react';
import { motion } from 'framer-motion';
import styles from './HowItWorksSection.module.css';

const STEPS = [
  {
    number: '01',
    icon: '🔍',
    title: 'Elegí tu diseño',
    description: 'Explorá nuestra galería y seleccioná la plantilla que mejor se adapte a tu evento.',
  },
  {
    number: '02',
    icon: '✏️',
    title: 'Personalizá',
    description: 'Editá nombres, fechas, lugar y fotos en tiempo real desde nuestro panel interactivo.',
  },
  {
    number: '03',
    icon: '🚀',
    title: 'Compartí',
    description: 'Recibí un enlace único para enviar a tus invitados por WhatsApp, email o redes.',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function HowItWorksSection() {
  return (
    <section className={styles.section}>
      <motion.p
        className={styles.eyebrow}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Cómo funciona
      </motion.p>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Tres pasos y listo
      </motion.h2>
      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Sin instalaciones. Sin complicaciones.
      </motion.p>

      <motion.div
        className={styles.stepsContainer}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {STEPS.map((step, i) => (
          <motion.div className={styles.step} key={i} variants={itemVariants}>
            <div className={styles.stepNumber}>{step.number}</div>
            <div className={styles.stepIcon}>{step.icon}</div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDesc}>{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default HowItWorksSection;

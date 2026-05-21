import React from 'react';
import { motion } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';
import { OrnamentDivider } from './Decoratives';

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: 'easeOut' },
};

export function CountdownBox({ eventDate }) {
  const timeLeft = useCountdown(eventDate);

  return (
    <motion.section className="countdown-section" {...fadeInUp}>
      <OrnamentDivider />
      <h3 className="countdown-title">Faltan solo</h3>
      <div className="timer-container">
        <div className="timer-box">
          <span>{timeLeft.days}</span>
          <p>Días</p>
        </div>
        <div className="timer-box">
          <span>{timeLeft.hours}</span>
          <p>Horas</p>
        </div>
        <div className="timer-box">
          <span>{timeLeft.minutes}</span>
          <p>Min</p>
        </div>
        <div className="timer-box">
          <span>{timeLeft.seconds}</span>
          <p>Seg</p>
        </div>
      </div>
      <p className="countdown-footer">¡Para el gran día!</p>
    </motion.section>
  );
}

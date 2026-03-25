import React from 'react';
import { motion } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

export function CountdownBox({ eventDate }) {
  const timeLeft = useCountdown(eventDate);
  
  return (
    <motion.section className="countdown-section" {...fadeInUp}>
      <h3 className="countdown-title">¡Pronto el gran día!</h3>
      <div className="timer-container">
          <div className="timer-box"><span>{timeLeft.days}</span><p>Días</p></div>
          <div className="timer-box"><span>{timeLeft.hours}</span><p>Horas</p></div>
          <div className="timer-box"><span>{timeLeft.minutes}</span><p>Min</p></div>
          <div className="timer-box"><span>{timeLeft.seconds}</span><p>Seg</p></div>
      </div>
      <p className="countdown-footer">Con vos compartiendo este momento, será aún más significativo. ¡Te espero!</p>
    </motion.section>
  );
}

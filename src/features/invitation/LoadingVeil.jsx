import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AmbientParticles from './AmbientParticles';

/**
 * What a guest sees while the hero video finishes loading.
 *
 * Not a spinner: the allegory's own ambience over its own background, with a
 * line taken from its story. The wait stops reading as a delay and starts
 * reading as the card opening. No progress bar on purpose — a bar frozen at 80%
 * advertises the problem, and there is nothing the guest can do about it.
 */
function LoadingVeil({ theme, allegory, slowAfter = 5000, giveUpAfter = 10000, onGiveUp }) {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const slowTimer = setTimeout(() => setSlow(true), slowAfter);
    // Hard ceiling. The original cards waited on the video forever, so a guest
    // on a bad connection could sit on a blank screen with no way out.
    const giveUpTimer = setTimeout(() => onGiveUp?.(), giveUpAfter);
    return () => { clearTimeout(slowTimer); clearTimeout(giveUpTimer); };
  }, [slowAfter, giveUpAfter, onGiveUp]);

  const amb = allegory?.ambience;

  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 32px',
        background: theme.bgImage
          ? `${theme.scrim}, url("${theme.bgImage}") center / cover no-repeat`
          : theme.bg,
      }}
    >
      {amb?.particles && <AmbientParticles preset={amb.particles} />}

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '340px' }}>
        <motion.p
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontFamily: theme.fontTitle,
            fontSize: 'clamp(1.4rem, 5vw, 2rem)',
            color: theme.accent,
            lineHeight: 1.35,
            margin: 0,
            textShadow: '0 2px 24px rgba(0,0,0,0.45)',
          }}
        >
          {allegory?.copy?.loading || 'Preparando tu invitación…'}
        </motion.p>

        {slow && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              marginTop: '22px',
              fontFamily: theme.fontBody,
              fontSize: '0.85rem',
              lineHeight: 1.6,
              color: theme.ink,
              opacity: 0.7,
            }}
          >
            Tu conexión está lenta. Aguantá unos segundos más…
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export default LoadingVeil;

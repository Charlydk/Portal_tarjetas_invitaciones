import React from 'react';
import { motion } from 'framer-motion';
import { DEFAULT_GATE, fade } from './gateTheme';

/**
 * La puerta de entrada de una tarjeta.
 *
 * Es lo primero que ve un invitado: su nombre, y la opción de escuchar la
 * música. Vivía dentro de PreviewPage, pero la tarjeta entregada de un cliente
 * la necesita igual, así que se extrajo en vez de duplicarla.
 *
 * Se viste con los tokens de la alegoría, de modo que la puerta y la tarjeta que
 * hay detrás se ven de la misma pieza.
 */

export function WelcomeScreen({ name1, name2, hasAudio, onEnter, theme = DEFAULT_GATE }) {
  return (
    <motion.div
      key="welcome"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: theme.bgImage
          ? `${theme.scrim}, url("${theme.bgImage}") center / cover no-repeat`
          : theme.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 32px',
        zIndex: 10,
      }}
    >
      {theme.bgVideo && (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={theme.bgImage || undefined}
            style={{
              position: 'absolute', inset: 0, zIndex: 0,
              width: '100%', height: '100%', objectFit: 'cover',
            }}
          >
            <source src={theme.bgVideo} type="video/mp4" />
          </video>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: theme.scrim }} />
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.9, ease: 'easeOut' }}
        style={{ maxWidth: '360px', width: '100%', position: 'relative', zIndex: 1 }}
      >
        <p style={{
          color: theme.accent,
          letterSpacing: '0.32em',
          fontSize: '0.68rem',
          textTransform: 'uppercase',
          fontFamily: theme.fontBody,
          margin: '0 0 28px',
        }}>
          Bienvenido/a
        </p>

        <h1 style={{
          fontFamily: theme.fontTitle,
          fontWeight: 400,
          fontSize: 'clamp(2.4rem, 9vw, 4.2rem)',
          color: theme.ink,
          lineHeight: 1.1,
          margin: '0 0 6px',
          textShadow: '0 4px 40px rgba(0,0,0,0.55)',
        }}>
          {name1}
        </h1>
        {name2 && (
          <>
            <p style={{
              fontFamily: theme.fontTitle,
              fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
              color: theme.accent,
              margin: '4px 0',
            }}>&</p>
            <h1 style={{
              fontFamily: theme.fontTitle,
              fontWeight: 400,
              fontSize: 'clamp(2.4rem, 9vw, 4.2rem)',
              color: theme.ink,
              lineHeight: 1.1,
              margin: '0 0 32px',
              textShadow: '0 4px 40px rgba(0,0,0,0.55)',
            }}>
              {name2}
            </h1>
          </>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto 32px', maxWidth: '220px' }}>
          <div style={{ flex: 1, height: '1px', background: fade(theme.accent, 0.4) }} />
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: theme.accent }} />
          <div style={{ flex: 1, height: '1px', background: fade(theme.accent, 0.4) }} />
        </div>

        {hasAudio ? (
          <>
            <p style={{
              color: fade(theme.ink, 0.75),
              fontSize: '1rem',
              fontFamily: theme.fontBody,
              lineHeight: 1.65,
              margin: '0 0 32px',
            }}>
              Esta invitación tiene música.<br />¿Querés escucharla?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => onEnter(true)}
                style={{
                  background: theme.accent, border: 'none', color: theme.accentInk,
                  padding: '14px 32px', borderRadius: '4px',
                  fontFamily: theme.fontBody, fontSize: '0.85rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  cursor: 'pointer', fontWeight: 600,
                }}
              >
                ♪ Sí, con música
              </button>
              <button
                onClick={() => onEnter(false)}
                style={{
                  background: 'transparent',
                  border: `1px solid ${fade(theme.ink, 0.3)}`,
                  color: fade(theme.ink, 0.7),
                  padding: '13px 32px', borderRadius: '4px',
                  fontFamily: theme.fontBody, fontSize: '0.85rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Entrar sin música
              </button>
            </div>
          </>
        ) : (
          <>
            <p style={{
              color: fade(theme.ink, 0.7),
              fontSize: '1rem',
              fontFamily: theme.fontBody,
              lineHeight: 1.65,
              margin: '0 0 32px',
            }}>
              Te invitamos a descubrir esta experiencia
            </p>
            <button
              onClick={() => onEnter(false)}
              style={{
                background: theme.accent, border: 'none', color: theme.accentInk,
                padding: '14px 40px', borderRadius: '4px',
                fontFamily: theme.fontBody, fontSize: '0.85rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                cursor: 'pointer', fontWeight: 600,
              }}
            >
              Ver invitación
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

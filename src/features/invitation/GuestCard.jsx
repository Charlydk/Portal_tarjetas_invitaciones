import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InvitationPreview from '../preview/InvitationPreview';
import LoadingVeil from './LoadingVeil';
import { WelcomeScreen } from './WelcomeGate';
import { gateThemeFor } from './gateTheme';
import { usePreload } from './usePreload';
import { allegoryImages, resolveAllegory } from '../../allegories';

/**
 * La experiencia completa de quien abre una tarjeta.
 *
 * Puerta de bienvenida → precarga → espera si el video no llegó → tarjeta.
 *
 * Lo usan por igual la muestra pública del catálogo (con datos de ejemplo y una
 * barra de venta encima) y la tarjeta entregada de un cliente (con sus datos y
 * sin barra). Antes esto vivía dentro de PreviewPage; si la tarjeta real lo
 * hubiera reimplementado, cada arreglo habría que hacerlo dos veces.
 */
function GuestCard({ variant, formData, skipGate = false, topBar = null }) {
  const [entered, setEntered] = useState(skipGate);
  const [waiting, setWaiting] = useState(false);
  const [withMusic, setWithMusic] = useState(false);

  const hasAudio = Boolean(variant?.assets?.audio);

  const allegory = useMemo(
    () => (variant?.allegory ? resolveAllegory(variant.allegory) : null),
    [variant]
  );

  // Se carga mientras el invitado lee su nombre en la puerta: es tiempo muerto,
  // y gastarlo acá es la razón de que después la tarjeta scrollee limpia.
  const preloadImages = useMemo(
    () => (allegory ? [...allegoryImages(allegory), ...(formData.galleryPhotos || [])] : []),
    [allegory, formData.galleryPhotos]
  );

  const { ready } = usePreload({
    images: preloadImages,
    video: allegory?.tokens?.backgroundVideo || null,
    // Sólo si pidió música: nadie tiene que pagar el peso de un audio que eligió
    // no escuchar.
    audio: withMusic ? variant?.assets?.audio || null : null,
  });

  const handleEnter = (music) => {
    setWithMusic(music);
    // El video es lo que distingue estas tarjetas, así que vale una espera
    // corta — corta, y nunca sobre una pantalla en blanco.
    if (ready) setEntered(true);
    else setWaiting(true);
  };

  const enterAnyway = useCallback(() => {
    setWaiting(false);
    setEntered(true);
  }, []);

  // Terminó de cargar mientras el invitado estaba en la pantalla de espera.
  useEffect(() => {
    if (waiting && ready) enterAnyway();
  }, [waiting, ready, enterAnyway]);

  return (
    <AnimatePresence mode="wait">
      {waiting ? (
        <LoadingVeil
          key="loading"
          theme={gateThemeFor(variant)}
          allegory={allegory}
          slowAfter={5000}
          giveUpAfter={10000}
          onGiveUp={enterAnyway}
        />
      ) : !entered ? (
        <WelcomeScreen
          key="welcome"
          name1={formData.name1}
          name2={formData.name2}
          hasAudio={hasAudio}
          onEnter={handleEnter}
          theme={gateThemeFor(variant)}
        />
      ) : (
        <motion.div
          key="invitation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ minHeight: '100vh' }}
        >
          {topBar}
          <div style={{ paddingTop: topBar ? '48px' : 0, minHeight: '100vh' }}>
            <InvitationPreview
              formData={formData}
              themeId={variant?.id}
              isEditorMode={false}
              fullScreen
              audioEnabled={withMusic}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default GuestCard;

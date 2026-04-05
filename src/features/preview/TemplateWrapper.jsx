import React, { useState, useRef, useEffect } from 'react';
import './TemplateWrapper.css';

function TemplateWrapper({ children, themeConfig, isEditorMode = false }) {
  // En modo editor el modal nunca debe aparecer — arranca cerrado
  const [showModal, setShowModal] = useState(!isEditorMode);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleEnter = () => {
    setShowModal(false);
    if (themeConfig?.assets?.audio) {
      playAudio();
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Autoplay blocked or error:", err);
      });
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        playAudio();
      }
    }
  };

  // If the audio URL changes, reset
  useEffect(() => {
    setIsPlaying(false);
  }, [themeConfig?.assets?.audio]);

  return (
    <div className="template-wrapper">
      {/* Welcome Modal — solo en vista final del invitado, nunca en el editor */}
      {themeConfig?.assets?.audio && !isEditorMode && (
        <div className={`modal-overlay ${!showModal ? 'hidden' : ''}`}>
          <div className="modal-content">
            <h2 className="modal-title">¡Bienvenidos!</h2>
            <p>🎵 Hay un sonido que forma parte de esta experiencia... <br/> ¿Te gustaría escucharlo?</p>
            <div className="modal-buttons">
              <button onClick={handleEnter} className="btn-modal primary">Sí, ¡claro!</button>
              <button onClick={() => setShowModal(false)} className="btn-modal secondary">No, gracias</button>
            </div>
          </div>
        </div>
      )}

      {/* Audio Element */}
      {themeConfig?.assets?.audio && (
        <audio ref={audioRef} loop key={themeConfig.assets.audio}>
          <source src={themeConfig.assets.audio} type="audio/mpeg" />
        </audio>
      )}

      {/* Floating Music Button — en editor: solo muestra indicador, sin audio */}
      {themeConfig?.assets?.audio && !isEditorMode && !showModal && (
        <button
          className={`music-toggle-btn ${isPlaying ? 'playing' : ''}`}
          onClick={toggleAudio}
          title={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      )}
      {themeConfig?.assets?.audio && isEditorMode && (
        <div className="music-editor-badge" title="Audio configurado (visible en la tarjeta final)">🎵</div>
      )}

      {/* Render the actual invitation (Skeleton) */}
      <div className="template-content">
        {children}
      </div>
    </div>
  );
}

export default TemplateWrapper;

import React, { useState, useRef, useEffect } from 'react';
import './TemplateWrapper.css';

function TemplateWrapper({ children, themeConfig, isEditorMode = false, audioEnabled = false }) {
  const [isPlaying, setIsPlaying]     = useState(false);
  const [isLoading, setIsLoading]     = useState(false);
  const [pendingPlay, setPendingPlay] = useState(false);
  const audioRef = useRef(null);

  // Eventos nativos del audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlaying = () => { setIsPlaying(true); setIsLoading(false); };
    const onPause   = () => { setIsPlaying(false); };
    const onWaiting = () => setIsLoading(true);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('pause',   onPause);
    audio.addEventListener('waiting', onWaiting);
    return () => {
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('pause',   onPause);
      audio.removeEventListener('waiting', onWaiting);
    };
  }, []);

  // Fase 2: play() se llama DESPUÉS de que React pintó el spinner
  useEffect(() => {
    if (!pendingPlay) return;
    const audio = audioRef.current;
    if (!audio) return;
    setPendingPlay(false);
    audio.play().catch(() => setIsLoading(false));
  }, [pendingPlay]);

  // Arrancar / pausar cuando cambia audioEnabled desde fuera (WelcomeScreen)
  useEffect(() => {
    if (!themeConfig?.assets?.audio) return;
    if (audioEnabled) {
      setIsLoading(true);   // Fase 1: spinner aparece
      setPendingPlay(true); // Fase 2: play() se ejecuta en el próximo efecto
    } else {
      audioRef.current?.pause();
    }
  }, [audioEnabled, themeConfig?.assets?.audio]);

  // Resetear al cambiar de canción
  useEffect(() => {
    setIsPlaying(false);
    setIsLoading(false);
  }, [themeConfig?.assets?.audio]);

  const toggleAudio = () => {
    if (isLoading) return;
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      setIsLoading(true);   // Fase 1: spinner
      setPendingPlay(true); // Fase 2: play() post-render
    }
  };

  return (
    <div className="template-wrapper">
      {themeConfig?.assets?.audio && (
        <audio ref={audioRef} loop preload="none" key={themeConfig.assets.audio}>
          <source src={themeConfig.assets.audio} type="audio/mpeg" />
        </audio>
      )}

      {/* Overlay de carga — fuera del template, imposible que quede tapado */}
      {isLoading && !isEditorMode && (
        <div className="audio-loading-overlay">
          <div className="audio-loading-spinner" />
          <p className="audio-loading-text">Cargando música...</p>
        </div>
      )}

      {themeConfig?.assets?.audio && !isEditorMode && !isLoading && (
        <button
          className={`music-toggle-btn ${isPlaying ? 'playing' : ''}`}
          onClick={toggleAudio}
          title={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      )}

      {themeConfig?.assets?.audio && isEditorMode && (
        <div className="music-editor-badge" title="Audio configurado (visible en la tarjeta final)">🎵</div>
      )}

      <div className="template-content">
        {children}
      </div>
    </div>
  );
}

export default TemplateWrapper;

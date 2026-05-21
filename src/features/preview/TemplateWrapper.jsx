import React, { useState, useRef, useEffect } from 'react';
import './TemplateWrapper.css';

function TemplateWrapper({ children, themeConfig, isEditorMode = false, audioEnabled = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  // Escuchar eventos nativos del audio — más confiables que la promesa de play()
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => { setIsPlaying(true); setIsLoading(false); };
    const onPause   = () => { setIsPlaying(false); setIsLoading(false); };

    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('pause',   onPause);

    return () => {
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('pause',   onPause);
    };
  }, []);

  // Arrancar / pausar cuando cambia audioEnabled
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !themeConfig?.assets?.audio) return;
    if (audioEnabled) {
      setIsLoading(true);
      audio.play().catch(() => setIsLoading(false));
    } else {
      audio.pause();
    }
  }, [audioEnabled, themeConfig?.assets?.audio]);

  // Resetear al cambiar de canción
  useEffect(() => {
    setIsPlaying(false);
    setIsLoading(false);
  }, [themeConfig?.assets?.audio]);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio || isLoading) return;
    if (isPlaying) {
      audio.pause();
    } else {
      setIsLoading(true);
      audio.play().catch(() => setIsLoading(false));
    }
  };

  return (
    <div className="template-wrapper">
      {themeConfig?.assets?.audio && (
        <audio ref={audioRef} loop key={themeConfig.assets.audio}>
          <source src={themeConfig.assets.audio} type="audio/mpeg" />
        </audio>
      )}

      {themeConfig?.assets?.audio && !isEditorMode && (
        <button
          className={`music-toggle-btn ${isPlaying ? 'playing' : ''} ${isLoading ? 'loading' : ''}`}
          onClick={toggleAudio}
          title={isLoading ? 'Cargando...' : isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isLoading ? <span className="music-spinner" /> : isPlaying ? '⏸' : '▶'}
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

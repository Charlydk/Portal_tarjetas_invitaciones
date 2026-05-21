import React, { useState, useRef, useEffect } from 'react';
import './TemplateWrapper.css';

function TemplateWrapper({ children, themeConfig, isEditorMode = false, audioEnabled = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current || !themeConfig?.assets?.audio) return;
    if (audioEnabled) {
      setIsLoading(true);
      audioRef.current.play()
        .then(() => { setIsPlaying(true); setIsLoading(false); })
        .catch(() => { setIsLoading(false); });
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, [audioEnabled, themeConfig?.assets?.audio]);

  useEffect(() => {
    setIsPlaying(false);
    setIsLoading(false);
  }, [themeConfig?.assets?.audio]);

  const toggleAudio = () => {
    if (!audioRef.current || isLoading) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      audioRef.current.play()
        .then(() => { setIsPlaying(true); setIsLoading(false); })
        .catch(() => { setIsLoading(false); });
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

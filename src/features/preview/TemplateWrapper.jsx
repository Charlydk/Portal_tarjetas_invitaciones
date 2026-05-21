import React, { useState, useRef, useEffect } from 'react';
import './TemplateWrapper.css';

function TemplateWrapper({ children, themeConfig, isEditorMode = false, audioEnabled = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current || !themeConfig?.assets?.audio) return;
    if (audioEnabled) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [audioEnabled, themeConfig?.assets?.audio]);

  useEffect(() => {
    setIsPlaying(false);
  }, [themeConfig?.assets?.audio]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
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

import React from 'react';

function getSpotifyEmbedUrl(url) {
  if (!url) return null;
  try {
    const match = url.match(/spotify\.com\/(playlist|album|track|artist)\/([a-zA-Z0-9]+)/);
    if (match) return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`;
  } catch (e) {}
  return null;
}

export function StepMusic({ formData, handleChange }) {
  const embedUrl = getSpotifyEmbedUrl(formData.musicPlaylistUrl);
  const hasUrl = !!formData.musicPlaylistUrl;

  return (
    <div className="panel-section">
      <h3>🎵 Playlist de Spotify</h3>
      <p className="step-description">
        Compartí la playlist que los acompañó en su historia. Los invitados podrán escucharla directamente desde la tarjeta.
      </p>

      <div className="form-group">
        <label>Link de Spotify</label>
        <input
          type="text"
          name="musicPlaylistUrl"
          value={formData.musicPlaylistUrl || ''}
          onChange={handleChange}
          placeholder="https://open.spotify.com/playlist/..."
        />
        <small>
          En Spotify: <strong>Compartir → Copiar enlace</strong> y pegalo acá. Funciona con playlists, álbumes y canciones.
        </small>
      </div>

      {embedUrl ? (
        <div className="form-group">
          <label>Vista previa del embed:</label>
          <iframe
            src={embedUrl}
            width="100%" height="200" frameBorder="0" allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            style={{ borderRadius: '12px' }}
          />
        </div>
      ) : hasUrl ? (
        <small className="error-text">⚠️ Link no reconocido. Asegurate de copiar el link desde Spotify.</small>
      ) : null}

      <div className="info-box">
        <p>
          💡 <strong>¿Cómo obtener el link?</strong> Abrí Spotify → tu playlist → los tres puntos (···) → <em>Compartir</em> → <em>Copiar enlace de la playlist</em>.
        </p>
      </div>
    </div>
  );
}

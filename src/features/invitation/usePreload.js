import { useEffect, useRef, useState } from 'react';

/**
 * Warms an invitation's assets while the welcome screen is on screen.
 *
 * The guest spends a few seconds reading their name and choosing whether they
 * want music. Loading during that gap costs nothing in perceived time, and it
 * is the difference between a card that scrolls clean and one that stutters as
 * each image lands mid-scroll.
 *
 * The video is fetched through a detached element pointing at the same URL, so
 * the real one in the hero is served from cache when it mounts.
 */
export function usePreload({ images = [], video = null, audio = null }) {
  const [imagesReady, setImagesReady] = useState(images.length === 0);
  const [videoReady, setVideoReady] = useState(!video);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!images.length) { setImagesReady(true); return; }

    let cancelled = false;
    let done = 0;

    const tick = () => {
      done += 1;
      if (!cancelled && done >= images.length) setImagesReady(true);
    };

    const loaders = images.map((src) => {
      const img = new Image();
      // A missing asset must never hold the gate shut: failures count as done.
      img.onload = tick;
      img.onerror = tick;
      img.src = src;
      return img;
    });

    return () => {
      cancelled = true;
      loaders.forEach((img) => { img.onload = null; img.onerror = null; });
    };
  }, [images.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!video) { setVideoReady(true); return; }

    const el = document.createElement('video');
    el.preload = 'auto';
    el.muted = true;
    el.playsInline = true;
    videoRef.current = el;

    // `canplaythrough`, not `canplay`: `canplay` fires as soon as a few frames
    // are decodable, which on a throttled connection let the gate open before
    // the video could actually run. Waiting for the full estimate is only safe
    // because the caller caps the wait — without that cap this is the event
    // that hangs a card forever.
    const onReady = () => setVideoReady(true);
    el.addEventListener('canplaythrough', onReady);
    el.addEventListener('error', onReady);

    el.src = video;
    el.load();

    return () => {
      el.removeEventListener('canplaythrough', onReady);
      el.removeEventListener('error', onReady);
      el.removeAttribute('src');
      el.load();
      videoRef.current = null;
    };
  }, [video]);

  // Audio is warmed but never gates the entrance. Blocking on it would stack
  // another 1–2MB onto a wait the guest is already sitting through; a head
  // start is enough for the track to be buffered by the time the card opens,
  // so the separate "Cargando música" overlay stops appearing on top of it.
  useEffect(() => {
    if (!audio) return;
    const el = document.createElement('audio');
    el.preload = 'auto';
    el.src = audio;
    el.load();
    return () => {
      el.removeAttribute('src');
      el.load();
    };
  }, [audio]);

  return { ready: imagesReady && videoReady, imagesReady, videoReady };
}
